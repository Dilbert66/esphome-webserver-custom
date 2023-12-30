import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement} from "lit/decorators.js";
//import { MD5 } from 'crypto-es/lib/md5.js';
//import { AES } from 'crypto-es/lib/aes.js';
import * as CryptoJS from 'crypto-js/index.js';
import * as digestAuthRequest from 'digest-auth-request/digestAuthRequest.js'
//import * as noise from 'noise-handshake';
//import * as createNoise from 'noise-c.wasm/src/noise-c.wasm';
//import { Handshake, Noise_25519_ChaChaPoly_BLAKE2s } from 'salty-crypto';
//import * as createNoise from './noise-c.wasm';
import sodium from 'libsodium-wrappers';
export function getBasePath() {
  let str = window.location.pathname;
  //console.log ("str= "+ str);
  //return "http://dscalarmmoduleapi.local";
  //return "http://vistaalarmtest.local"
  return str.endsWith("/") ? str.slice(0, -1) : str;
}

let basePath = getBasePath();

@customElement("esp-login")
export default class EspLogin extends LitElement {



  darkQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

  frames = [
    { color: "inherit" },
    { color: "red", transform: "scale(1.25) translateY(-30%)" },
    { color: "inherit" },
  ];

  constructor() {
    super();

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
    this.scheme = this.isDark();
    
  } 

  isDark() {
    return this.darkQuery.matches ? "dark" : "light";
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("scheme")) {
      let el = document.documentElement;
      document.documentElement.style.setProperty("color-scheme", this.scheme);
    }
  }
  
  
  
  
  renderComment() {
    return this.config.comment
      ? html`<h3>${this.config.comment}</h3>`
      : nothing;
  }
  
  
  sendKey(key) {
    const data=new URLSearchParams();
    data.append('keys',key);
    data.append('partition',this._current_partition);

    fetch(`${basePath}/alarm_panel/alarm_panel/set`, {
      method: "POST",
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },      
      body: data,
    }).then((r) => {
      console.log(r);
    }); 
    
}

writePacket(packet) {}
readPacket() {}


decrypt(msg) {
    var aeskey="key1";    
    try {
        var obj = JSON.parse(msg);
    } catch (err) {
        console.log(e.data);
    }
    if (obj instanceof Object) {
        if ("nonce" in obj) {
            var nonce=sodium.from_hex(obj["nonce"]);
            var key=sodium.crypto_generichash(sodium.crypto_secretbox_KEYBYTES,aeskey,nonce);            
            var data=sodium.from_hex(obj["data"]);
            let d=sodium.to_string(sodium.crypto_secretbox_open_easy(data,nonce,key));
            return d;

        }        
        
    }
    return "";
}

IsJsonString(MyTestStr) {
        try {
          var MyJSON = JSON.stringify(MyTestStr);
          var json = JSON.parse(MyJSON);
          if (typeof(MyTestStr) == 'string')
            if (MyTestStr.length == 0)
              return false;
        } catch (e) {
          return false;
        }
        return true;
}

encrypt(msg) {
 var aeskey="key1";
let nonce=sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
let key=sodium.crypto_generichash(sodium.crypto_secretbox_KEYBYTES,aeskey,nonce);
let c=sodium.crypto_secretbox_easy(msg,nonce,key);
  var out="{\"nonce\":\"" +sodium.to_hex(nonce) + "\",\"data\":\""+sodium.to_hex(c)+"\"}";
  return out; 
    
}

    
   login() {
var url = '/';       
var getRequest = new digestAuthRequest('GET', url, 'username', 'password');  
console.log("object= %o",getRequest);  
      var test=this.encrypt("test");
   //   alert(test);
   console.log("encrypt="+test);
   
            try {
                var dec=this.decrypt(test);
                //var obj = JSON.parse(dec);
              } catch (err) {
                console.log("error decrypting");
                console.log(test);
              }
   
   
      //var dec=this.decrypt(test);
      console.log("decrypt="+dec);
    //  alert(dec);


//let key = sodium.from_hex('724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed');
let pass1="test124";
let hashed=new ArrayBuffer(32);


let nonce=sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
console.log ("nonce="+sodium.to_hex(nonce));
let key=sodium.crypto_generichash(32,pass1,nonce);
console.log("key="+sodium.to_hex(key));

let c=sodium.crypto_secretbox_easy("test message",nonce,key);
console.log ("c="+sodium.to_hex(c));
let d=sodium.to_string(sodium.crypto_secretbox_open_easy(c,nonce,key));
console.log("d="+d);


        const username = this.shadowRoot.querySelector("#username").value;
        const pass = this.shadowRoot.querySelector("#password").value;
        if(!!username && !!pass) {
    const data=new URLSearchParams();
    data.append('username',username);
    data.append('password',pass);
    fetch(`${basePath}/auth/login`, {
      method: "POST",
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },      
      body: data,
    }).then((r) => {
      console.log(r);
    }); 
    
            
            
        }
    }


  render() {
    return html`
                <div class="container">
                <h2>Login </h2>
                <input id="username" type="username" placeholder="Your username">
                <input id="password" type="password" placeholder="Password">

                <button @click="${this.login}">Login</button>
            </div>
    `;
  }

  static get styles() {
    return [
      css`
             .container {
                border: solid 3px #eaecef;
                border-radius: 10px;
                width: 350px;
                height: 400px;
                text-align: center;
            }

            input {
                width: 90%;
                height: 30px;
                margin-top: 8vh;
                border: solid 1px #eaecef;
                border-top: 0px;    
                border-radius: 5px;
            }

            button {
                width: 60%;
                height: 40px;
                background: #eaecef;
                color: #414141;
                border: none;
                border-radius: 6px;
                margin-top: 8vh;
            }

            button:hover {
                background: #0da35d;
                cursor: pointer;
            }
      `,
    ];
  }
}
