import { Utf8,WordArray} from 'crypto-es/lib/core.js';
import { Base64 } from 'crypto-es/lib/enc-base64.js';
import { AES } from 'crypto-es/lib/aes.js';
import { CBC,Pkcs7} from 'crypto-es/lib/cipher-core.js';
import {HMAC} from 'crypto-es/lib/hmac.js';
import {SHA256Algo} from 'crypto-es/lib/sha256.js';
import {SHA256} from 'crypto-es/lib/sha256.js';

const KEYSIZE=32

const salt:string="77992288"; //not really unique. Just using it to expand the key. Same value preset on web server.

export interface cryptvars {
    aeskey?:any;
    hmackey?:any;
    token:string;
    cid:Number;
    seq:Number;
    crypt:boolean;
}

let config: Config = {};

export function initcrypt(conf:Config){
    config=conf;
    config.aeskey=Base64.parse(localStorage.getItem("aeskey"));
    config.hmackey=Base64.parse(localStorage.getItem("hmackey"));
}

export function decrypt(obj) {
    if (obj instanceof Object && config.aeskey != null) {
        if ("iv" in obj) {
            var myiv=obj["iv"];
            var mydata=obj["data"];
            var hash=obj["hash"];
            var hmacHasher = HMAC.create(SHA256Algo, config.hmackey);
            hmacHasher.update(myiv);
            var sig=hmacHasher.finalize(mydata);
            var esig=Base64.stringify(sig);

            if (esig != hash) {
                console.log("Decrypt: hmac mismatch");
                return "";
            }
            var iv = Base64.parse(myiv);
            var decrypted = AES.decrypt(mydata, config.aeskey,{iv:iv,padding: Pkcs7,mode: CBC});
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

export function encrypt(msg) {
  if (!config.crypt || config.aeskey == null || msg=="") return msg;
    msg=msg+"\0";
    var iv = WordArray.random(16);
    var encrypted = AES.encrypt(msg,config.aeskey,{iv: iv ,padding: Pkcs7,mode: CBC});
    var eiv=Base64.stringify(iv);
    var hmacHasher = HMAC.create(SHA256Algo, config.hmackey);
    hmacHasher.update(eiv);
    if (config.token != undefined && config.token != "" && config.cid > 0) {
      hmacHasher.update(config.token);
    }
    hmacHasher.update(config.seq.toString());

    var sig=hmacHasher.finalize(encrypted.toString());
    var esig=Base64.stringify(sig);
    var out="{\"iv\":\"" +eiv + "\",\"hash\":\""+esig+"\",\"data\":\""+encrypted.toString()+"\",\"cid\":\""+config.cid+"\",\"seq\":\""+config.seq+"\"}";
    config.seq=config.seq+1;
    return out;
    
}


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

  export function logout() {
       localStorage.setItem("aeskey","");
       localStorage.setItem("hmackey","");
       location.reload();
  }
  
 export function login() {
       
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


