import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";

import "./esp-entity-table";
import "./esp-log";
import "./esp-switch";
import "./esp-range-slider";
import "./esp-logo";
import "./dsc-keypad"
import cssReset from "./css/reset";
import cssButton from "./css/button";
import cssApp from "./css/app";
import cssTab from "./css/tab";
import {encrypt,decrypt,isJson,initcrypt,cryptconf,login,logout} from "./esp-crypt";

let basePath = getBasePath(); 
window.source = new EventSource(getBasePath() + "/events");


interface Config {
  ota: boolean;
  log: boolean;
  title: string;
  comment: string;
  partitions: Number;
  keypad: boolean;
  crypt: boolean;
  cid: Number;
  token: string;
}

//const salt:string="77992288";
var partitions:Number=0;
var numbers=[];

function getRelativeTime(diff: number) {
  const mark = Math.sign(diff);

  if (diff === 0) return new Intl.RelativeTimeFormat("en").format(0, "second");

  const times = [
    { type: "year", seconds: 12 * 30 * 24 * 60 * 60 * 1000 },
    { type: "month", seconds: 30 * 24 * 60 * 60 * 1000 },
    { type: "week", seconds: 7 * 24 * 60 * 60 * 1000 },
    { type: "day", seconds: 24 * 60 * 60 * 1000 },
    { type: "hour", seconds: 60 * 60 * 1000 },
    { type: "minute", seconds: 60 * 1000 },
    { type: "second", seconds: 1000 },
  ];

  let result = "";
  const timeformat = new Intl.RelativeTimeFormat("en");
  let count = 0;
  for (let t of times) {
    const segment = Math.trunc(Math.abs(diff / t.seconds));
    if (segment > 0) {
      const part = timeformat.format(
        segment * mark,
        t.type as Intl.RelativeTimeFormatUnit
      );
      diff -= segment * t.seconds * mark;
      // remove "ago" from the first segment - if not the only one
      result +=
        count === 0 && t.type != "second" ? part.replace(" ago", " ") : part;
      if (count++ >= 1) break; // do not display detail after two segments
    }
  }
  return result;
}

@customElement("esp-app")
export default class EspApp extends LitElement {
  @state() scheme: string = "";
  @state() ping: number = 0;
  @state() connected: boolean = true;
  @state() lastUpdate: number = 0;
  @query("#beat")
  beat!: HTMLSpanElement;

  version: String = import.meta.env.PACKAGE_VERSION;
  config: Config = { ota: false, log: true, title: "", comment: "" ,cid: 9, token : ""};

  darkQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

  frames = [{}, { color: "rgba(0, 196, 21, 0.75)" }, {}];

  constructor() {
    super();
    const conf = document.querySelector("script#config");
    if (conf) this.setConfig(JSON.parse(conf.innerText));
  }

 sendAck(cid) {
     let data=JSON.stringify({
         'cid': cid,
         'method': "POST",
         'action': "set",
         'oid': "auth",
         'domain': "auth",
     });

    fetch(`${basePath}/api`, {
      method: "POST",
      body: encrypt(data)
    }).then((r) => {
       if (!r.ok) {
            console.log(r);
                //ev.target.renderRoot.querySelector('#el3').innerText = 'OTA upload error: '+res.statusText;
            }  else {
               // ev.target.renderRoot.querySelector('#el3').innerText = 'Uploaded ' + r.result.byteLength + ' bytes';
            }
    }).catch((error)=>console.log(error)); 

}

  setConfig(config: any) {
    if (!("log" in config)) {
      config.log = this.config.log;
    }
    this.config = config;
    partitions=config.partitions;
    document.title = config.title;

    document.title = config.title;
    document.documentElement.lang = config.lang;
    var c:cryptconf={};
    c.cid=config.cid;
    c.token=config.token;
    c.seq=1;
    c.crypt=config.crypt;
    initcrypt(c);

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
      'data:image/svg+xml,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><style>path{stroke-width:1;fill:black;stroke:black;stroke-linecap:round;stroke-linejoin:round}@media (prefers-color-scheme:dark){path{fill:white;stroke:white}}</style><path d="M1.3 18H5v10h21.8V18h3.7l-3.7-3.7V7.8h-2.4V12l-8.7-8.7L1.3 18Z"/></svg>';
    //this.scheme = this.schemeDefault();
     this.scheme=localStorage.getItem("scheme")===null?this.schemeDefault():localStorage.getItem("scheme");

    window.source.addEventListener("ping", (e: MessageEvent) => {
      if (e.data?.length) {
      let data=e.data
      if (isJson(data)) 
        data = JSON.parse(data); 
      if (data['iv'] != null) data=decrypt(data);
      if (data)
        this.setConfig(data);
        this.requestUpdate();
      }
      this._updateUptime(e);
      this.lastUpdate = Date.now();
    });
    
      window.source?.addEventListener("ota", (e: Event) => {
      var data = e.data
      if (isJson(data)) 
        data = JSON.parse(data); 
      if (data['iv'] != null) data=decrypt(data);
       this.renderRoot.querySelector('#el3').innerText=data;
       this.requestUpdate();
    });  
 
    window.source.addEventListener("log", (e: MessageEvent) => {
      this._updateUptime(e);
      this.lastUpdate = Date.now();
    });
    window.source.addEventListener("state", (e: MessageEvent) => {
      this.lastUpdate = Date.now();
    });
    window.source.addEventListener("error", (e: Event) => {
      console.dir(e);
      //console.log("Lost event stream!")
      this.connected = false;
      this.requestUpdate();
    });
    setInterval(() => {
      this.connected = !!this.ping && Date.now() - this.lastUpdate < 15000;
    }, 5000);
    document.addEventListener('entity-tab-header-double-clicked', (e) => {
      const mainElement = this.shadowRoot?.querySelector('main.flex-grid-half');
      mainElement?.classList.toggle('expanded_entity');
    });
    document.addEventListener('log-tab-header-double-clicked', (e) => {
      const mainElement = this.shadowRoot?.querySelector('main.flex-grid-half');
      mainElement?.classList.toggle('expanded_logs');
    });
    var c:cryptconf={};
    c.cid=this.config.cid;
    c.token=this.config.token;
    c.seq=1;
    c.crypt=this.config.crypt;
    initcrypt(c);
  
  }

  schemeDefault() {
    return this.darkQuery.matches ? "dark" : "light";
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("scheme")) {
      let el = document.documentElement;
      document.documentElement.style.setProperty("color-scheme", this.scheme);
      localStorage.setItem("scheme",this.scheme);
    }
    if (changedProperties.has("ping")) {
      if (!!this.ping) this.beat.animate(this.frames, 1000);
    }
  }

  uptime() {
    return `${getRelativeTime(-this.ping | 0)}`;
  }

selectfile(ev: any) {
      f = ev.target.files[0];
      if (!f) return;
      this.renderRoot.querySelector('#el4').innerText = f.name;
      this.renderRoot.querySelector('#el5').removeAttribute('disabled');
      this.renderRoot.querySelector('#el3').innerText = ' ';
    };

openselect(ev: any){
this.renderRoot.querySelector('#el1').click();
}

//this.renderRoot.querySelector('#showlogin').innerText
  renderOta() {
    if (this.config.ota) {
      let basePath = getBasePath();
     return html`<div class="tab-header">OTA Update</div>
<div class="tab-container">
        <input type="file" @change="${this.selectfile}" id="el1" style="display: none"/>
        <button class="btn" id="el2" @click="${this.openselect}">choose file...</button>
        <span> Selected file:</span> <span id="el4"></span> <br/>
        <button class="btn" id="el5" @click="${this.upload}"  disabled>upload file</button>
        <div id="el3" style="margin-top: 1em;"></div>
</div>
`;

    }
  }



upload(ev: any) {
      var r = new FileReader();
      r.readAsArrayBuffer(f);
      r.onload = function() {
        ev.target.value = '';
        ev.target.renderRoot.querySelector('#el3').innerText = 'Uploading...';
        fetch('/update/' + encodeURIComponent(f.name), {
          method: 'POST',
            body: r.result,
        }).then(function(res) {
            if (!res.ok) {
            console.log(res);
                ev.target.renderRoot.querySelector('#el3').innerText = 'OTA upload error: '+res.statusText;
            }  else {
                ev.target.renderRoot.querySelector('#el3').innerText = 'Uploaded ' + r.result.byteLength + ' bytes';
            }
             ev.target.renderRoot.querySelector('#el5').setAttribute('disabled','');
        }).catch((error)=>console.log(error));
      };
    };


  renderLog() {
    if (!this.config.cid) return nothing;
    return this.config.log
      ? html`<section
          id="col_logs"
          class="col"
        >
          <esp-log rows="50" .scheme="${this.scheme}"></esp-log>
        </section>`
      : nothing;
  }

  renderTitle() {
    return html`
      <h1>${this.config.title || html`&nbsp;`}</h1>
      <div>
        ${[this.config.comment, `started ${this.uptime()}`]
          .filter((n) => n)
          .map((e) => `${e}`)
          .join(" · ")}
      </div>
    `;
  }

  render() {
    return html`
      <header>
          ${this.renderCryptState()}<br/>
        <a href="https://esphome.io/web-api" id="logo" title="${this.version}">
          <esp-logo style="width: 52px; height: 40px;"></esp-logo>
        </a>
        <iconify-icon
          .icon="${!!this.connected ? "mdi:circle" : "mdi:circle-off-outline"}"
          .title="${this.uptime()}"
          class="top-icon ${!!this.connected ? "connected" : ""}"
          id="beat"
        ></iconify-icon>
        <a
          href="#"
          id="scheme"
          @click="${() => {
            this.scheme = this.scheme !== "dark" ? "dark" : "light";
          }}"
        >
          <iconify-icon
            icon="mdi:theme-light-dark"
            class="top-icon"
          ></iconify-icon>
        </a>
        ${this.renderTitle()}
      </header>
      ${this.renderLogin()}  
      <div class="keypad_col">
      ${this.renderKeypads()}
</div>
      <main class="flex-grid-half" @toggle-layout="${this._handleLayoutToggle}">

        <section
          id="col_entities"
          class="col"          
        >
          <esp-entity-table .scheme="${this.scheme}"></esp-entity-table>
          ${this.renderOta()}
        </section>
        ${this.renderLog()}
      </main>
    `;
  }

  private _updateUptime(e: MessageEvent) {
    if (e.lastEventId) {
      this.ping = parseInt(e.lastEventId);
      this.connected = true;
      this.requestUpdate();
    }
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
          return html`<button id='logout' @click='${logout}'>Logout</button>`;  
   }   else if (!this.config.cid) {
        return html`<button id="showlogin" @click="${this.toggleLoginForm}">Login</button>`;
   }
      
  }

  renderKeypads() {
         if (!this.config.keypad ) return nothing;
         numbers=[];
          for (let i=1; i<=partitions;i++) {
                numbers.push(i);
            }
           return html`
        ${numbers.map(num => html`<div class="keypad"><esp-keypad .current_partition=${num} .scheme="${this.scheme}"></esp-keypad></div>`)}`;
  }  

  renderCryptState() {
    let icon="🔓";
   if (this.config.crypt ) {
    icon="🔐";
   }
   return html`
   <div id="cryptstate" >${icon}${this.renderLoginButton()}</div>
`;

  }

 renderLogin() {

      return html`
                <div id="login"  >   
                <h3 class="login_row">Alarm Panel Login</h3>
                <div class="login_row">
                   <input  class="keypad" id="username" type="username" placeholder="Your username" autocomplete="off">
                &nbsp;<input class="keypad" id="password" type="password" placeholder="Password">
                </div>
<div class="login_row">                
               <button  @click="${login}">Submit</button>
               </div>
</div>`;
  }


  static get styles() {
    return [cssReset, cssButton, cssApp, cssTab,   css`
       
        .keypad_col{
          display: flex;
          flex-wrap:wrap;
          justify-content: center;
        } 

        .keypad {
          max-width: 450px;
          width: 100%;   
          margin: 5px; 
        }

        .login_row {
           display: flex;
          flex-wrap:wrap;
          justify-content: center;
          padding-bottom: 15px;

         }          
        #cryptstate {
          float: left;
          height: 1rem;
        }        

        .right {
          float: right;
        }
        .hide { 
            display: none;
        }        
      `
    ];
  }
}
