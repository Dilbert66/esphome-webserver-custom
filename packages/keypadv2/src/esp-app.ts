import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";
import { Utf8,WordArray} from 'crypto-es/lib/core.js';
import { Base64 } from 'crypto-es/lib/enc-base64.js';
import { AES } from 'crypto-es/lib/aes.js';
import { CBC,Pkcs7} from 'crypto-es/lib/cipher-core.js';
import {HMAC} from 'crypto-es/lib/hmac.js';
import {SHA256Algo} from 'crypto-es/lib/sha256.js';
import {SHA256} from 'crypto-es/lib/sha256.js';

import "./esp-entity-table";
import "./esp-log";
import "./esp-switch";
import "./esp-logo";
import "./esp-keypad";
import cssReset from "./css/reset";
import cssButton from "./css/button";

let basePath = getBasePath(); 

window.source = new EventSource(basePath + "/events");

var crypt=false;

interface Config {
  ota: boolean;
  log: boolean;
  title: string;
  comment: string;
  partitions: Number;
  keypad: boolean;
  crypt: boolean;
  cid: Number;
}

var aeskey="";
var hmackey="";
const KEYSIZE=32
const salt="77992288";

function decrypt(obj) {
    if (obj instanceof Object && aeskey != null) {
        if ("iv" in obj) {
            var myiv=obj["iv"];
            var mydata=obj["data"];
            var hash=obj["hash"];
            var hmacHasher = HMAC.create(SHA256Algo, hmackey);
            hmacHasher.update(myiv);
            var sig=hmacHasher.finalize(mydata);
            var esig=Base64.stringify(sig);

            if (esig != hash) {
                console.log("Decrypt: hmac mismatch");
                return "";
            }
            var iv = Base64.parse(myiv);
            var decrypted = AES.decrypt(mydata, aeskey,{iv:iv,padding: Pkcs7,mode: CBC});
            try {
                var data=decrypted.toString(Utf8);
                data=data.slice(0,-1);
            } catch (e) {
                console.log("invalid utf8 data");
                return "";
            }
            if (isJson(data))
                return JSON.parse(data);
            else
                return data;
        } 
    }
    return "";
}

function encrypt(msg) {
  if (!crypt || aeskey == null || msg=="") return msg;
    msg=msg+"\0";
    var iv = WordArray.random(16);
    var encrypted = AES.encrypt(msg,aeskey,{iv: iv ,padding: Pkcs7,mode: CBC});
    var eiv=Base64.stringify(iv);
    var hmacHasher = HMAC.create(SHA256Algo, hmackey);
    hmacHasher.update(eiv);
    var sig=hmacHasher.finalize(encrypted.toString());
    var esig=Base64.stringify(sig);
    var out="{\"iv\":\"" +eiv + "\",\"hash\":\""+esig+"\",\"data\":\""+encrypted.toString()+"\"}";
    return out;
    
}

export { encrypt, decrypt,crypt }

export function isJson(str) {
    try {
        if (str=="") return false;
        JSON.parse(str);
    } catch (e) {
        //console.log("error parsing [" + str + "]," +e);
        return false;
    }
    return true;
}

@customElement("esp-app")
export default class EspApp extends LitElement {
  @state() scheme: string = "";
  @state() ping: string = "";
  @query("#beat")
  beat!: HTMLSpanElement;
  
  _partitions: Number=0;
  
  version: String = import.meta.env.PACKAGE_VERSION;
  config: Config = { ota: false, log: false, title: "Login", comment: "",partitions:1 ,keypad:true,crypt: false,cid:0};

  darkQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

  frames = [
    { color: "inherit" },
    { color: "red", transform: "scale(1.25) translateY(-30%)" },
    { color: "inherit" },
  ];

  constructor() {
    super();
    const conf = document.querySelector('script#config');
    if ( conf ) this.setConfig(JSON.parse(conf.innerText));
  }
  
 sendAck(cid) {
     let data=JSON.stringify({
         'cid': cid,
         'method': "POST",
         'action': "set",
         'oid': "auth",
         'domain': "auth"         
     });

    fetch(`${basePath}/api`, {
      method: "POST",
      body: encrypt(data)
    }).then((r) => {
      //console.log(r);
    }); 
    
}
  setConfig(config: any) {
    this.config = config;
    this._partitions=config.partitions;
    document.title = config.title;
    crypt=config.crypt;
    console.log(this.config);
    document.documentElement.lang = config.lang;
    if (config.cid) this.sendAck(config.cid);
    if (config.cid ) 
        this.hideLoginForm();
    
    this.requestUpdate();    
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    document.getElementsByTagName("head")[0].innerHTML +=
      '<meta name=viewport content="width=device-width, initial-scale=1,user-scalable=no">';
    const l = <HTMLLinkElement>document.querySelector("link[rel~='icon']"); // Set favicon to house
    l.href =
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><path d="M1 12.5h2.9v7.8h17v-7.8h2.9l-2.9-2.9V4.5h-1.8v3.3L12.3 1 1 12.5Z"/></svg>';
    this.darkQuery.addEventListener("change", () => {
      this.scheme = this.isDark();
    });
    this.scheme = localStorage.getItem("color-scheme");
    
        /* window.source?.addEventListener("ota", (e: Event) => {
      const messageEvent = e as MessageEvent;
       this.uploadMessage=messageEvent.data;
       this.requestUpdate();
    });   
    */
    window.source.addEventListener("ping", (e: Event) => {
      const messageEvent = e as MessageEvent;
       let data=messageEvent.data;
      if (isJson(data)) 
        data = JSON.parse(data); 
      if (data['iv'] != null) data=decrypt(data);
      if (data)
        this.setConfig(data);

      this.ping = messageEvent.lastEventId;
    });
     window.source.onerror = function (e: Event) {
      console.dir(e);
      //alert("Lost event stream!")
    };

    aeskey=Base64.parse(localStorage.getItem("aeskey"));
    hmackey=Base64.parse(localStorage.getItem("hmackey"));
  } 

  isDark() {
    return this.darkQuery.matches ? "dark" : "light";
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("scheme")) {
      let el = document.documentElement;
      document.documentElement.style.setProperty("color-scheme", this.scheme);
      localStorage.setItem("color-scheme",this.scheme);
    }
    if (changedProperties.has("ping")) {
      this.beat.animate(this.frames, 1000);
    }
  }
 /*
 uploadFileName(e) { 
  this.fileName=e.target.files[0];
}
*/
/*
uploadFile(e) {
    console.log("uploading " + this.fileName);
    e.preventDefault();
    const formData = new FormData();
    formData.append('uploadfile', this.fileName);
   fetch("${basePath}/update", {
          method: 'POST',
          body: formData
        })
    .then(response => {
        
    })
    .then(data => {
        console.log('server response: ',data);
    })
    .catch(error => {('error uploading file:',error);

    });
}
 */ 

  ota() {
/*
      if (this.config.ota) return html`<h2>OTA Update</h2>
        <form
          method="POST"
          action="/update"
          enctype="multipart/form-data"
        >
          <div name="message" >&nbsp;${this.uploadMessage}&nbsp;</div>
          <input class="btn" type="file" @change="${this.uploadFileName}" name="update" />
          <input class="btn" type="submit" @click="${this.uploadFile}" value="Update" />
        </form>
        
         `;
         */
   
  }
    logout() {
       localStorage.setItem("aeskey","");
       localStorage.setItem("hmackey","");
       location.reload();
  }
  
  login() {

       const username = this.shadowRoot.querySelector("#username").value;
       const password = this.shadowRoot.querySelector("#password").value;

       var key=username + salt + password;
       
       var aesHasher = HMAC.create(SHA256Algo,key);
       var aeskey=aesHasher.finalize("aeskey"); 
       
       var hmacHasher = HMAC.create(SHA256Algo, key);
       var hmackey=hmacHasher.finalize("hmackey"); 

       localStorage.setItem("aeskey",Base64.stringify(aeskey));
       localStorage.setItem("hmackey",Base64.stringify(hmackey));
       location.reload();

  } 
  
 renderLogin() {

      return html`
                <div id="login"  >      
                <div class="login_row">
                   <input  class="keypad" id="username" type="username" placeholder="Your username" autocomplete="off">
                &nbsp;<input class="keypad" id="password" type="password" placeholder="Password">
                </div>
<div class="login_row">                
               <button  @click="${this.login}">Submit</button>
               </div>
</div>`;
  }
  
  renderKeypads() {
         if (!this.config.keypad ) return nothing;
         this.numbers=[];
          for (let i=1; i<=this._partitions;i++) {
                this.numbers.push(i);
            }
           return html`
        ${this.numbers.map(num => html`<div class="keypad"><esp-keypad _current_partition=${num} ></esp-keypad></div>`)}`;
  }                  
     
  
  renderComment() {
    return this.config.comment
      ? html`<h3>${this.config.comment}</h3>`
      : nothing;
  }
  
hideLoginForm() {
        this.renderRoot.querySelector('#login').className=""  
        this.renderRoot.querySelector('#login').classList.add("hide");
         
}
showLoginForm() {
        this.renderRoot.querySelector('#login').className="" 
      
}
toggleLoginForm() {
        if (this.renderRoot.querySelector('#login').classList=="hide")
            this.renderRoot.querySelector('#showlogin').innerText="Hide Login"; 
        else
            this.renderRoot.querySelector('#showlogin').innerText="Login"; 
        
        this.renderRoot.querySelector('#login').classList.toggle("hide");
      
}
  renderLoginButton() {
      if (this.config.crypt ) {
          return html`<button id='logout' @click='${this.logout}'>Logout</button>`;  
   }   else if (!this.config.cid) {
        return html`<button id="showlogin" @click="${this.toggleLoginForm}">Login</button>`;
   }
      
  }
 
/* 
  renderLoginButton() {
    if (!this.config.cid)
        return html`<button id="showlogin" @click="${this.toggleLoginForm}">Login</button>`;
  }
  */
  
  renderCryptState() {
    let icon="🔓";
   if (this.config.crypt ) {
    icon="🔐";
   }
   return html`
   <div id="cryptstate" >${icon}${this.renderLoginButton()}</div>
`;

  }
  
  renderLog() {
    return this.config.log
      ? html`<section class="col"><esp-log rows="50"></esp-log></section>`
      : nothing;
  }

  render() {
    return html`
          ${this.renderCryptState()}<br/>
      <h1>
         ${this.config.title}
<span id="beat" title="${this.version}">❤</span>
      </h1>
      ${this.renderComment()}
      ${this.renderLogin()}  
      <div class="keypad_row">
      ${this.renderKeypads()}
        </div>
       
      <main class="flex-grid-half">
    
        <section class="col">
          <esp-entity-table></esp-entity-table>
          <h2>
            <esp-switch
              color="var(--primary-color,currentColor)"
              class="right"
              .state="${this.scheme}"
              @state="${(e: CustomEvent) => (this.scheme = e.detail.state)}"
              labelOn="🌒"
              labelOff="☀️"
              stateOn="dark"
              stateOff="light"
              optimistic
            >
            </esp-switch>
            Scheme
          </h2>
          ${this.ota()}
        </section>
        ${this.renderLog()}

      </main>
    `;
  }

  static get styles() {
    return [
      cssReset,
      cssButton,
      css`
        .flex-grid {
          display: flex;
        }
        .flex-grid .col {
          flex: 2;
        }
        .flex-grid-half {
          display: flex;
          justify-content: space-evenly;
        }
        .col {
          width: 48%;
        }
        .keypad_row {
          display: flex;
          flex-wrap:wrap;
          justify-content: center;

         } 
        .login_row {
           display: flex;
          flex-wrap:wrap;
          justify-content: center;
          padding-bottom: 15px;

         }          
         .keypad {
             padding: 5px;
         }
        @media (max-width: 600px) {
          .flex-grid,
          .flex-grid-half {
            display: block;
          }
          .col {
            width: 100%;
            margin: 0 0 10px 0;
          }
        }

        * {
          box-sizing: border-box;
        }
        .flex-grid {
          margin: 0 0 20px 0;
        }
        h1 {
          text-align: center;
          width: 100%;
          line-height: 4rem;
 
        }
        h1,
        h2 {
          border-bottom: 1px solid #eaecef;
          margin-bottom: 0.25rem;
        }
        h3 {
          text-align: center;
          margin: 0.5rem 0;
        }
        #beat {
          float: right;
          height: 1rem;
        }
        #cryptstate {
          float: left;
          height: 1rem;
        }        
        a.logo {
          height: 4rem;
          float: left;
          color: inherit;
        }
        .right {
          float: right;
        }
        .hide { 
            display: none;
        }        
      `,
    ];
  }
}
