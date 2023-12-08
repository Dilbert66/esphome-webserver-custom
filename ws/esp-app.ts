import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";

import "./esp-entity-table";
import "./esp-log";
import "./esp-switch";
import "./esp-keypad";
import cssReset from "./css/reset";
import cssButton from "./css/button";

//window.source = new EventSource(getBasePath() + "/events");
//window.source = new WebSocket("ws://vistaalarmtest.local/ws");
 window.source = new WebSocket("ws://" + getBasePath() + "/ws");
//wsURL - the string URL of the websocket
//waitTimer - the incrementing clock to use if no connection made
//waitSeed - used to reset the waitTimer back to default on a successful connection
//multiplier - how quickly you want the timer to grow on each unsuccessful connection attempt



interface Config {
  ota: boolean;
  log: boolean;
  title: string;
  comment: string;
  partitions: Number;
}

@customElement("esp-app")
export default class EspApp extends LitElement {
  @state() scheme: string = "";
  @state() ping: string = "";
  @query("#beat")
  beat!: HTMLSpanElement;
  
  _partitions: Number=0;
  
  version: String = import.meta.env.PACKAGE_VERSION;
  config: Config = { ota: false, log: true, title: "", comment: "",partitions:0 };

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
  
  setConfig(data) {
    this.config = data; 
    this._partitions=data.partitions;
    document.title = data.title;
    document.documentElement.lang = data.lang;
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
    this.scheme = this.isDark();

    window.source.addEventListener("message", (e: Event) => {

      const messageEvent = e as MessageEvent;
      if (messageEvent.data == '__pong__') {
        pong();
        return;
      }      
      const msg = JSON.parse(messageEvent.data); 
      if (msg.type != undefined && msg.type =="app_config" ) {
        this.setConfig(msg.data);
      } else if (msg.type != undefined && msg.type=="ping") {
          //console.log("ping" + messageEvent.lastEventId);
          this.ping = msg.data;
      } else if (msg.type != undefined && msg.type=="ota") { 
             //console.log("data=" + msg.data);
             this.uploadMessage=msg.data;
             this.requestUpdate();
      }
    });
    
    window.source.onopen = function () {
    setInterval(this.pingServer, 30000);
    }
    window.source.onerror = function (e: Event) {
      console.dir(e);
      console.log(" error");
    };
    window.source.onclose = function() {
       console.log("web socket closed");
       //location.reload();   
    }
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
    if (changedProperties.has("ping")) {
      this.beat.animate(this.frames, 1000);
    }
  }
 
uploadFileName(e) { 

  this.fileName=e.target.files[0];
}

uploadFile(e) {
    console.log("uploading " + this.fileName);
    e.preventDefault();
    const formData = new FormData();
    formData.append('uploadfile', this.fileName);
   fetch("http://vistaalarmtest.local/update", {
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
  ota() {

      return html`<h2>OTA Update</h2>
        <form
          method="POST"
          action="/update"
          enctype="multipart/form-data"
        >
          <div name="message" >${this.uploadMessage}</div>
          <input class="btn" type="file" @change="${this.uploadFileName}" name="update" />
          <input class="btn" type="submit" @click="${this.uploadFile}" value="Update" />
        </form>
        
         `;
   
  }
  
  
pingServer() {
        window.source.send('__ping__');
        tm = setTimeout(function () {

           /// ---connection closed ///


    }, 5000);
}

pong() {
    clearTimeout(tm);
}  
 
  
  renderKeypads() {
//this._partitions=3;
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

  renderLog() {
    return this.config.log
      ? html`<section class="col"><esp-log rows="50"></esp-log></section>`
      : nothing;
  }

  render() {
    return html`
      <h1>
        ${this.config.title}
        <span id="beat" title="${this.version}">❤</span>
      </h1>
      ${this.renderComment()}
      
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
        a.logo {
          height: 4rem;
          float: left;
          color: inherit;
        }
        .right {
          float: right;
        }
      `,
    ];
  }
}
