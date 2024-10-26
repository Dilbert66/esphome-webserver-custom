import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {decrypt,encrypt ,isJson} from "./esp-app";

interface recordConfig {
  type: string;
  level: string;
  tag: string;
  detail: string;
  when: string;

}

@customElement("esp-log")
export class DebugLog extends LitElement {
  @property({ type: Number }) rows = 10;
  @state() logs: string = [];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    window.source?.addEventListener("log", (e: Event) => {
      const messageEvent = e as MessageEvent;
      var data=messageEvent.data;
      if (isJson(data))
         data=JSON.parse(data);
      if (data['iv'] != null) data=decrypt(data);
      const d: String = data;
      if (!d.length) return;
      let parts = d.slice(10, d.length - 4).split(":");
      let tag = parts.slice(0, 2).join(":");
      let detail = d.slice(12 + tag.length, d.length - 4);
      //let t=tag.split("'");//remove extra task indicator if present
     // tag=t[0];
     tag=tag.split("'")[0];
   /*   
      let tsk="";
      if (t.length > 1) {
          tsk=t[1] + " ";
               let s='[1;31m';
               if (tsk.includes(s)) {
                tsk=tsk.replace( s, "");
               }
               s='[0;33m';
               if (tsk.includes(s)) {
                 tsk=tsk.replace( s, "");
               }
               s='[0;32m';
               if (tsk.includes(s)) {
                 tsk=tsk.replace( s, "");
               }
               s='[0;35m';
               if (tsk.includes(s)) {
                 tsk=tsk.replace( s, "");
               } 
               s='[0;36m';
               if (tsk.includes(s)) {
                }
               s='[0;37m';
               if (tsk.includes(s)) {
                 tsk=tsk.replace( s, "");
               } 
               s='[0m';
               if (tsk.includes(s)) {
                 tsk=tsk.replace( s, "");
               } 
      }
 
     */ 

 const types: Record<string, string> = {
        "\x27[1;31m": "e",
        "\x27[0;33m": "w",
        "\x27[0;32m": "i",
        "\x27[0;35m": "c",
        "\x27[0;36m": "d",
        "\x27[0;37m": "v",
        "\"27[0m":"n",
      };  
   
      const record = {
        type: types[d.slice(0, 7)],
        level: d.slice(7, 10),
        tag: tag,
        detail: detail,
        when: new Date().toTimeString().split(" ")[0],
      } as recordConfig;
      

      this.logs.push(record);
      this.logs = this.logs.slice(-this.rows);
    });
  }

  render() {
    return html`
      <div class="flow-x ">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>level</th>
              <th>Tag</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            ${this.logs.map(
              (log:string) =>
                html`
                <tr class="${log.type}">
                  <td>${log.when}</td>
                  <td>${log.level}</td>
                  <td>${log.tag}</td>
                  <td><pre>${log.detail}</pre></td>
                </tr>

              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  static get styles() {
    return css`
      table {
        font-family: monospace;
        background-color: #1c1c1c;
        color: white;
        width: 100%;
        border: 1px solid #dfe2e5;
        line-height: 1;
      }

      thead {
        border: 1px solid #dfe2e5;
        line-height: 1rem;
      }
      th {
        text-align: left;
      }
      th,
      td {
        padding: 0.25rem 0.5rem;
      }
      pre {
        margin: 0;
      }
      .v {
        color: #888888;
      }
      .d {
        color: #00dddd;
      }
      .c {
        color: magenta;
      }
      .i {
        color: limegreen;
      }
      .w {
        color: yellow;
      }
      .e {
        color: red;
        font-weight: bold;
      }
      .flow-x {
        overflow-x: auto;
      }
    `;
  }
}
