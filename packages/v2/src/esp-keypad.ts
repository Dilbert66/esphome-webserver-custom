import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";
import {decrypt,encrypt,isJson ,crypt} from "./esp-app";

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
      //console.log(r);
    }); 
    
}

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
                        class='mdc-button mdc-button--outlined'
                         state="1"
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

        @keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}
        @keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}
        @keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-button{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.0892857143em;text-decoration:none;text-transform:uppercase;--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;padding:0 8px 0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;height:36px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:hidden;vertical-align:middle;border-radius:4px}.mdc-button::before,.mdc-button::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-button.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-button.mdc-ripple-upgraded--foreground-activation::after{animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:150ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button::before,.mdc-button::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-button.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{background-color:transparent;color:rgba(0,0,0,.37);cursor:default;pointer-events:none}.mdc-button.mdc-button--dense{border-radius:4px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:not(:disabled){color:currentColor;color:var(--mdc-theme-primary, currentColor)}.mdc-button::before,.mdc-button::after{background-color:currentColor}@supports not (-ms-ime-align: auto){.mdc-button::before,.mdc-button::after{background-color:var(--mdc-ripple-color, #03A9F4)}}.mdc-button:hover::before{opacity:.04}.mdc-button:not(.mdc-ripple-upgraded):focus::before,.mdc-button.mdc-ripple-upgraded--background-focused::before{transition-duration:75ms;opacity:.12}.mdc-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.16}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.16}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12);color:rgba(0,0,0,.37)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:currentColor}@supports not (-ms-ime-align: auto){.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-primary, currentColor)}}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised::before,.mdc-button--raised::after,.mdc-button--unelevated::before,.mdc-button--unelevated::after{background-color:#fff}@supports not (-ms-ime-align: auto){.mdc-button--raised::before,.mdc-button--raised::after,.mdc-button--unelevated::before,.mdc-button--unelevated::after{background-color:var(--mdc-theme-on-primary, #fff)}}.mdc-button--raised:hover::before,.mdc-button--unelevated:hover::before{opacity:.08}.mdc-button--raised:not(.mdc-ripple-upgraded):focus::before,.mdc-button--raised.mdc-ripple-upgraded--background-focused::before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus::before,.mdc-button--unelevated.mdc-ripple-upgraded--background-focused::before{transition-duration:75ms;opacity:.24}.mdc-button--raised:not(.mdc-ripple-upgraded)::after,.mdc-button--unelevated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active::after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.32}.mdc-button--raised.mdc-ripple-upgraded,.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.32}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{border-style:solid;padding:8px 8px 8px 8px;border-width:1px}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.37)}.mdc-button--outlined:not(:disabled){border-color:currentColor;border-color:var(--mdc-button-outline-color, currentColor)}.mdc-button--dense{height:32px;font-size:.8125rem}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}:host{display:inline-flex;outline:none}.mdc-button{flex:1}



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



