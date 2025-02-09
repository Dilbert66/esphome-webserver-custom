import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";
import {decrypt,encrypt,isJson ,crypt} from "./esp-app";
import * as mdc from 'material-components-web';
//import '@material/web/button/outlined-button.js';

let basePath=getBasePath();

@customElement("esp-keypad")
export class keyPad extends LitElement  {
    
  @property({ type: String }) _line1id = ""; //display lines
  @property({ type: String }) _line2id = "";  

  @property({ type: String }) _cmd_A = ""; //cmds to send
  @property({ type: String }) _cmd_B = "";
  @property({ type: String }) _cmd_C = ""; 
  @property({ type: String }) _cmd_D = "";
  @property({ type: String }) _cmd_E = "";  
  @property({ type: String }) _cmd_F = "";  
  @property({ type: String }) _cmd_G = "";
  @property({ type: String }) _cmd_H = "";  
  
  @property({ type: String }) _button_A = ""; //name of cmd button
  @property({ type: String }) _button_B = "";
  @property({ type: String }) _button_C = ""; 
  @property({ type: String }) _button_D = "";
  @property({ type: String }) _button_E = "";  
  @property({ type: String }) _button_F = "";  
  @property({ type: String }) _button_G = ""; 
  @property({ type: String }) _button_H = "";  
  
  @property({ type: String }) _status_A=""; //name of sensor
  @property({ type: String }) _status_B="";
  @property({ type: String }) _status_C="";
  @property({ type: String }) _status_D="";
  @property({ type: String }) _status_E="";
  @property({ type: String }) _status_F="";
  @property({ type: String }) _status_G="";
  @property({ type: String }) _status_H="";
  
  @property({ type: String}) _sensor_A=""; //id of sensor
  @property({ type: String}) _sensor_B="";
  @property({ type: String}) _sensor_C="";
  @property({ type: String}) _sensor_D="";
  @property({ type: String}) _sensor_E="";
  @property({ type: String}) _sensor_F="";;
  @property({ type: String}) _sensor_G="";
  @property({ type: String}) _sensor_H=""; 
  
  @property({ type: String }) _text_0="" //key label for secondary function for panel
  @property({ type: String }) _text_1="" 
  @property({ type: String }) _text_2=""
  @property({ type: String }) _text_3=""
  @property({ type: String }) _text_4=""
  @property({ type: String }) _text_5=""
  @property({ type: String }) _text_6=""
  @property({ type: String }) _text_7=""
  @property({ type: String }) _text_8=""
  @property({ type: String }) _text_9=""
  @property({ type: String }) _text_star=""
  @property({ type: String }) _text_pound=""
   
  @property({ type: Boolean }) _view_display=true;
  @property({ type: Boolean }) _view_status=true;
  @property({ type: Boolean }) _view_status2=false;
  @property({ type: Boolean }) _view_bottom=true;
  @property({ type: Boolean }) _view_pad=true;  
  @property({ type: Boolean }) _button_left=false; 
  
  @property({ type: Number }) _partitions=1;
  @property({ type: Number }) _current_partition=1;
  @property({type: Number })  _vibration_duration=5;


  _labelOff="🌒"
  _labelOn="☀️"
  _line1=""
  _line2=""
  
  _iconA="";
  _iconB="";
  _iconC="";
  _iconD="";
  _iconE="";
  _iconF="";
  _iconG="";
  _iconH="";
  

 setConfig(keypad_config) {
      //console.log("data="+keypad_config);
      //let keypad_config=JSON.parse(data);
      this._line1id=keypad_config["line_1"]!=null?keypad_config["line_1"]:"";
      this._line2id=keypad_config["line_2"]!=null?keypad_config["line_2"]:"";
      this._button_A=keypad_config["button_A"]!=null?keypad_config["button_A"]:"";
      this._button_B=keypad_config["button_B"]!=null?keypad_config["button_B"]:"";
      this._button_C=keypad_config["button_C"]!=null?keypad_config["button_C"]:"";
      this._button_D=keypad_config["button_D"]!=null?keypad_config["button_D"]:"";
      this._button_E=keypad_config["button_E"]!=null?keypad_config["button_E"]:"";
      this._button_F=keypad_config["button_F"]!=null?keypad_config["button_F"]:"";
      this._button_G=keypad_config["button_G"]!=null?keypad_config["button_G"]:"";
      this._button_H=keypad_config["button_H"]!=null?keypad_config["button_H"]:"";   
      this._status_A=keypad_config["status_A"]!=null?keypad_config["status_A"]:"";
      this._status_B=keypad_config["status_B"]!=null?keypad_config["status_B"]:"";
      this._status_C=keypad_config["status_C"]!=null?keypad_config["status_C"]:"";
      this._status_D=keypad_config["status_D"]!=null?keypad_config["status_D"]:""; 
      this._status_E=keypad_config["status_E"]!=null?keypad_config["status_E"]:"";
      this._status_F=keypad_config["status_F"]!=null?keypad_config["status_F"]:""; 
      this._status_G=keypad_config["status_G"]!=null?keypad_config["status_G"]:""; 
      this._status_H=keypad_config["status_H"]!=null?keypad_config["status_H"]:""; 
      this._sensor_A=keypad_config["sensor_A"]!=null?keypad_config["sensor_A"]:"";
      this._sensor_B=keypad_config["sensor_B"]!=null?keypad_config["sensor_B"]:""; 
      this._sensor_C=keypad_config["sensor_C"]!=null?keypad_config["sensor_C"]:"";
      this._sensor_D=keypad_config["sensor_D"]!=null?keypad_config["sensor_D"]:""; 
      this._sensor_E=keypad_config["sensor_E"]!=null?keypad_config["sensor_E"]:"";
      this._sensor_F=keypad_config["sensor_F"]!=null?keypad_config["sensor_F"]:""; 
      this._sensor_G=keypad_config["sensor_G"]!=null?keypad_config["sensor_G"]:""; 
      this._sensor_H=keypad_config["sensor_H"]!=null?keypad_config["sensor_H"]:"";     
      this._cmd_A=keypad_config["cmd_A"]!=null?keypad_config["cmd_A"]:"";
      this._cmd_B=keypad_config["cmd_B"]!=null?keypad_config["cmd_B"]:""; 
      this._cmd_C=keypad_config["cmd_C"]!=null?keypad_config["cmd_C"]:"";
      this._cmd_D=keypad_config["cmd_D"]!=null?keypad_config["cmd_D"]:"";  
      this._cmd_E=keypad_config["cmd_E"]!=null?keypad_config["cmd_E"]:""; 
      this._cmd_F=keypad_config["cmd_F"]!=null?keypad_config["cmd_F"]:""; 
      this._cmd_G=keypad_config["cmd_G"]!=null?keypad_config["cmd_G"]:""; 
      this._cmd_H=keypad_config["cmd_H"]!=null?keypad_config["cmd_H"]:"";         
      this._text_0=keypad_config["text_0"]!=null?keypad_config["text_0"]:"";
      this._text_1=keypad_config["text_1"]!=null?keypad_config["text_1"]:"";  
      this._text_2=keypad_config["text_2"]!=null?keypad_config["text_2"]:"";  
      this._text_3=keypad_config["text_3"]!=null?keypad_config["text_3"]:"";  
      this._text_4=keypad_config["text_4"]!=null?keypad_config["text_4"]:"";  
      this._text_5=keypad_config["text_5"]!=null?keypad_config["text_5"]:"";  
      this._text_6=keypad_config["text_6"]!=null?keypad_config["text_6"]:"";  
      this._text_7=keypad_config["text_7"]!=null?keypad_config["text_7"]:"";  
      this._text_8=keypad_config["text_8"]!=null?keypad_config["text_8"]:""; 
      this._text_9=keypad_config["text_9"]!=null?keypad_config["text_9"]:""; 
      this._text_star=keypad_config["text_star"]!=null?keypad_config["text_star"]:"";
      this._text_pound=keypad_config["text_pound"]!=null?keypad_config["text_pound"]:"";
      this._view_display=keypad_config["view_display"]!=null?keypad_config["view_display"]:true;
      this._view_pad=keypad_config["view_pad"]!=null?keypad_config["view_pad"]:true;
      this._view_bottom=keypad_config["view_bottom"]!=null?keypad_config["view_bottom"]:false;
      this._view_status=keypad_config["view_status"]!=null?keypad_config["view_status"]:false;
      this._view_status2=keypad_config["view_status2"]!=null?keypad_config["view_status2"]:false;
      this._button_left=keypad_config["button_left"]!=null?keypad_config["button_left"]:false;
      this._vibration_duration=keypad_config["vibration_duration"]!=null?keypad_config["vibration_duration"]:50;
      
      this._iconA=this._sensor_A?this._labelOff:"";
      this._iconB=this._sensor_B?this._labelOff:"";      
      this._iconC=this._sensor_C?this._labelOff:"";
      this._iconD=this._sensor_D?this._labelOff:"";
      this._iconE=this._sensor_E?this._labelOff:"";
      this._iconF=this._sensor_F?this._labelOff:"";
      this._iconG=this._sensor_G?this._labelOff:"";
   
      this._iconH=this._sensor_H?this._labelOff:"";
  }  

  protected firstUpdated() {
    // this.getConfig();

  }


  connectedCallback() {
    super.connectedCallback();
    
    window.source?.addEventListener("key_config", (e: Event) => {
      const messageEvent = e as MessageEvent;
      let data=messageEvent.data;
      if (isJson(data))
        data = JSON.parse(data);
      if ("iv" in data) data=decrypt(data);    
      this.setConfig(data);
    });
    
    window.source?.addEventListener("state", (e: Event) => {
        
      const messageEvent = e as MessageEvent;
      var data=messageEvent.data;

      if (isJson(data))
        data = JSON.parse(data);
      if (data['iv'] != null) data=decrypt(data); 
     
      if (data.id) {
        let parts = data.id.split("-");
        let changed=false;
        let id_code=""
        if (data.id_code)
            id_code=data.id_code;        
        else if (parts[2] != undefined)  //deprecated
            id_code=parts[2];

        if (id_code != "") {
          if (id_code==this._line1id.replace("?",this._current_partition)) {
              this._line1=data.value;
              changed=true;
          }  else
          if (id_code==this._line2id.replace("?",this._current_partition)) {
              this._line2=data.value;
               changed=true;
          }   else
          if (id_code==this._sensor_A.replace("?",this._current_partition)) {
            this._iconA=data.value?this._labelOn:this._labelOff;
            changed=true ;           
          } else
          if (id_code==this._sensor_B.replace("?",this._current_partition)) {
            this._iconB=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          } else
          if (id_code==this._sensor_C.replace("?",this._current_partition)) {
            this._iconC=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          } else
          if (id_code==this._sensor_D.replace("?",this._current_partition)) {
            this._iconD=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          } else
          if (id_code==this._sensor_E.replace("?",this._current_partition)) {
            this._iconE=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          } else
          if (id_code==this._sensor_F.replace("?",this._current_partition)) {
            this._iconF=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          } else
          if (id_code==this._sensor_G.replace("?",this._current_partition)) {
            this._iconG=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          } else
          if (id_code==this._sensor_H.replace("?",this._current_partition)) {
            this._iconH=data.value?this._labelOn:this._labelOff;
            changed=true ;             
          }
          if (changed) this.requestUpdate(); 
        }   
      } 
      
    });
  }

getConfig() {
  
    //console.log("path=" + basePath);
    fetch(`${basePath}/alarm_panel/alarm_panel/getconfig`)
    .then(response => response.text())
    .then(data => {
        this.setConfig(data);
    })
    .catch(error => console.error(error));
}

sendKey(key) {
     let data=JSON.stringify({
         'keys': key,
         'partition':this._current_partition,
         'method': "POST",
         'action': "set",
         'oid': "alarm_panel",
         'domain': "alarm_panel"         
     });

    fetch(`${basePath}/api`, {
      method: "POST",
      body: encrypt(data)
    }).then((r) => {
       if (!r.ok) {
            console.log(r);
            alert("Error: "+r.statusText+"\nPress F5 to reload the page");
                //ev.target.renderRoot.querySelector('#el3').innerText = 'OTA upload error: '+res.statusText;
            }  else {
               // ev.target.renderRoot.querySelector('#el3').innerText = 'Uploaded ' + r.result.byteLength + ' bytes';
            }
    }).catch((error)=> {
            console.log(error);
            alert(error+"\nPress F5 to reload the page");
    }   
    
)}

/*
sendKey1(key) {
    const data=new URLSearchParams();
    data.append('keys',key);
    data.append('partition',this._current_partition);

    fetch(`${basePath}/alarm_panel/alarm_panel/set`, {
      method: "POST",
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },      
      body: data,
    }).then((r) => {
      console.log(r);
    }); 
    
}
*/

setPartition(e) {
    var p=e.currentTarget.getAttribute('state');
    this._current_partition=p;
    this.sendKey('R');
   }
   
   
setState(e) {
  
     var key=e.currentTarget.getAttribute('state');
      
     switch (key) {
         case 'A': key=this._cmd_A; break;
         case 'B': key=this._cmd_B; break;
         case 'C': key=this._cmd_C; break;
         case 'D': key=this._cmd_D; break;
         case 'E': key=this._cmd_E; break;
         case 'F': key=this._cmd_F; break;
         case 'G': key=this._cmd_G; break;
         case 'H': key=this._cmd_H; break;         
         case '0': key='0'; break;
         case '1': key='1'; break;
         case '2': key='2'; break;
         case '3': key='3'; break;
         case '4': key='4'; break;
         case '5': key='5'; break;
         case '6': key='6'; break;
         case '7': key='7'; break;
         case '8': key='8'; break;
         case '9': key='9'; break;
         case '*': key='*'; break;
         case '#': key='#'; break;
         
     }
     if ('vibrate' in navigator) {
        navigator.vibrate(this._vibration_duration);
     } 
     this.sendKey(key);
  }

  
  render() {
    return html`
   <ha-card header="${this._title}">
        <div id="zoom" style="${this._scale}">
          <div class='flex-container' @click="${this.stopPropagation}">
          
              <div class='keypad'>
                <div class="keypad_title">Partition: ${this._current_partition}</div>              
                ${this._view_display?html`
                  <div class="keypad_display">
                    <div class="keypad_state" id="keypad_state1">${this._line1}</div>
                    <div class="keypad_state" id="keypad_state2">${this._line2}</div>
                </div>`:''}

                ${this._view_status?html`
                <div class='pad'>
                    <div class='mdc-button  mdc-icon'>${this._status_A}
                      <div>${this._iconA}</div>
                    </div>
                    <div class='mdc-button  mdc-icon'>${this._status_B}
                      <div>${this._iconB}</div>
                    </div>
                    <div class='mdc-button  mdc-icon'>${this._status_C}
                      <div>${this._iconC}</div>
                    </div>
                    <div class='mdc-button mdc-icon'>${this._status_D}
                      <div>${this._iconD}</div>
                    </div>                    
                </div>`:''}
                

                ${this._view_status2?html`
                <div class='pad'>
                    <div class='mdc-button  mdc-icon'>${this._status_E}
                      <div>${this._iconE}</div>
                    </div>
  
                    <div class='mdc-button  mdc-icon'>${this._status_F}
                      <div>${this._iconF}</div>
                    </div>

                    <div class='mdc-button  mdc-icon'>${this._status_G}
                      <div>${this._iconG}</div>
                    </div>
                    <div class='mdc-button mdc-icon'>${this._status_H}
                      <div>${this._iconH}</div>
                    </div>                    
                </div>`:''}

                ${this._view_pad?html`                
                  <div class="pad">
                  
                ${this._button_left?html`  
                    <div>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="A"
                       @click="${this.setState}"
                        title='${this._button_A}'>${this._button_A}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="B"
                       @click="${this.setState}"
                        title='${this._button_B}'>${this._button_B}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="C"
                       @click="${this.setState}"
                        title='${this._button_C}'>${this._button_C}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="D"
                       @click="${this.setState}"
                        title='${this._button_D}'>${this._button_D}
                      </button>
                     ${this._view_bottom?html`                       
                     <button
                        class='mdc-button mdc-button--outlined'
                         state="H"
                       @click="${this.setState}"
                        title='${this._button_H}'>${this._button_H}
                     </button>`:''}
                     

                    </div>`:''}    
                    
                    <div>
                      <button
                        class='mdc-button mdc-icon-button'
                         state="1" 
                        data-mdc-auto-init="MDCIconButtonToggle" 
                       @click="${this.setState}"
                        title='1'>1<span class="keypad_cmd_text">${this._text_1}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="4"
                       @click="${this.setState}"
                        title='4'>4<span class="keypad_cmd_text">${this._text_4}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="7"
                       @click="${this.setState}"
                        title='7'>7<span class="keypad_cmd_text">${this._text_7}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="*"
                       @click="${this.setState}"
                        title='*'>*<span class="keypad_cmd_text">${this._text_star}</span>
                      </button>

                     ${this._view_bottom?html`   
                     <button
                        class='mdc-button mdc-button--outlined'
                         state="E"
                       @click="${this.setState}"
                        title='${this._button_E}'>${this._button_E}
                     </button>`:''}
                      
                    </div>

                    <div>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="2"
                       @click="${this.setState}"
                        title='2'>2<span class="keypad_cmd_text">${this._text_2}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="5"
                       @click="${this.setState}"
                        title='5'>5<span class="keypad_cmd_text">${this._text_5}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="8"
                       @click="${this.setState}"
                        title='8'>8<span class="keypad_cmd_text">${this._text_8}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="0"
                       @click="${this.setState}"
                        title='0'>0<span class="keypad_cmd_text">${this._text_0}</span>
                      </button>

                     ${this._view_bottom?html`                       
                     <button
                        class='mdc-button mdc-button--outlined'
                         state="F"
                       @click="${this.setState}"
                        title='${this._button_F}'>${this._button_F}
                     </button>`:''}
                    </div>

                    <div>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="3"
                       @click="${this.setState}"
                        title='3'>3<span class="keypad_cmd_text">${this._text_3}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="6"
                       @click="${this.setState}"
                        title='6'>6<span class="keypad_cmd_text">${this._text_6}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="9"
                       @click="${this.setState}"
                        title='9'>9<span class="keypad_cmd_text">${this._text_9}</span>
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="#"
                       @click="${this.setState}"
                        title='#'>#<span class="keypad_cmd_text">${this._text_pound}</span>
                      </button>
                      ${this._view_bottom?html`                      
                     <button
                        class='mdc-button mdc-button--outlined'
                         state="G"
                       @click="${this.setState}"
                        title='${this._button_G}'>${this._button_G}
                      </button>`:''}
                   
                    </div>
                   ${this._button_left?'':html`  
                    <div>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="A"
                       @click="${this.setState}"
                        title='${this._button_A}'>${this._button_A}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="B"
                       @click="${this.setState}"
                        title='${this._button_B}'>${this._button_B}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="C"
                       @click="${this.setState}"
                        title='${this._button_C}'>${this._button_C}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined'
                         state="D"
                       @click="${this.setState}"
                        title='${this._button_D}'>${this._button_D}
                      </button>
                     ${this._view_bottom?html`                       
                     <button
                        class='mdc-button mdc-button--outlined'
                         state="H"
                       @click="${this.setState}"
                        title='${this._button_H}'>${this._button_H}
                     </button>`:''}
                     
                    </div>`}
                  
                    
                </div>`:''}
                  

                

              </div>
              
              
              
          </div>
      </div>
    </ha-card>
<script>mdc.autoInit()</script>
    `;
  }
  
  static get styles() {
    return [
      css`
        
       ha-card {  
          padding-bottom: 16px;
          position: relative;
          font-size: calc(var(--base-unit));
        }


        .flex-container {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1em;
            border: 1px solid currentColor;            
            background-color: var(--c-bg);
            
            
        }

     



        .keypad_display {
          background: #35758c;
          border-radius: 10px;
          width: 260px;
          height: 50px;
          margin: auto;
          padding-top: 15px;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
         .keypad_title {
          margin: auto;
          padding-bottom: 5px;
          display: flex;
          justify-content: center          
         }             
         .keypad {
          margin: auto;
          padding: 15px;
        } 
        .keypad_line_block {

        }       
        .keypad_state {
          font-size: calc(var(--base-unit) * 1);
          line-height: 1.1;
          font-family: monospace;
          display: flex;
          justify-content: center;
        }

        #keypad_state1 {
          padding-bottom: 10px;
          white-space: pre-wrap;
        }
        #keypad_state2 {
          white-space: pre-wrap;
        } 

        .pad {
          display: flex;
          justify-content: center;
        }
        .pad div {
          display: flex;
          flex-direction: column;
        }

        .mdc-button {
          margin-top: 8px;
          margin-right: 8px;
          margin-bottom: 8px;
          margin-left: 8px;
          
        }
        
        .mdc-icon {
          height: 42px;
          margin-top: 4px;
          margin-right: 4px;
          margin-bottom: 4px;
          margin-left: 4px;
        }

        .bottom {
          padding-left: 2px;
          text-align:center;
          justify-content: center;
          margin: auto;
        }

        .under {
          text-decoration: underline;
        }
  
        /* text blinking */
        .blink{
          animation:blinkingText 1.2s infinite;
        }
  
        @keyframes blinkingText{
            0%  { color: #000;        }
            49% { color: #000;        }
            60% { color: transparent; }
            99% { color:transparent;  }
            100%{ color: #000;        }
        }
        
       .keypad_cmd_text {
           
        font-size: calc(.3rem + .2vw);
        font-style: italic; 
        padding-left: .2rem;
       }        

    `,
    ];
  }
}



