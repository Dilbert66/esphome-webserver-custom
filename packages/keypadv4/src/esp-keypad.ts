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
  @property({type: Number })  _vibration_duration=5;


  _labelOff="🌒"
  _labelOn="☀️"
  _line1=""
  _line2=""
  
  _ReadyStyle="color: #ccc;";
  _armedStyle="color: #ccc;";
  _chimeStyle="color: #ccc;";
  _troubleStyle="color: #ccc;";
  _acStyle="color: #ccc;";
  _iconF="color: #ccc;";
  _iconG="color: #ccc;";
  _iconH="color: #ccc;";
  

 setConfig(keypad_config) {
      //console.log("data="+keypad_config);
      //let keypad_config=JSON.parse(data);
      this._line1id=keypad_config["line_1"]!=null?keypad_config["line_1"]:"";
      this._line2id=keypad_config["line_2"]!=null?keypad_config["line_2"]:"";
      this._button_A=keypad_config["button_A"]!=null?keypad_config["button_A"]:"&nbsp;";
      this._button_B=keypad_config["button_B"]!=null?keypad_config["button_B"]:"&nbsp;";
      this._button_C=keypad_config["button_C"]!=null?keypad_config["button_C"]:"&nbsp;";
      this._button_D=keypad_config["button_D"]!=null?keypad_config["button_D"]:"&nbsp;";
      this._button_E=keypad_config["button_E"]?keypad_config["button_E"]:"";
//      this._button_F=keypad_config["button_F"]!=null?keypad_config["button_F"]:"";
//      this._button_G=keypad_config["button_G"]!=null?keypad_config["button_G"]:"";
//      this._button_H=keypad_config["button_H"]!=null?keypad_config["button_H"]:"";   
//      this._status_A=keypad_config["status_A"]!=null?keypad_config["status_A"]:"";
//      this._status_B=keypad_config["status_B"]!=null?keypad_config["status_B"]:"";
//      this._status_C=keypad_config["status_C"]!=null?keypad_config["status_C"]:"";
//      this._status_D=keypad_config["status_D"]!=null?keypad_config["status_D"]:""; 
//      this._status_E=keypad_config["status_E"]!=null?keypad_config["status_E"]:"";
      this._status_F=keypad_config["status_F"]!=null?keypad_config["status_F"]:"&nbsp;"; 
      this._status_G=keypad_config["status_G"]!=null?keypad_config["status_G"]:"&nbsp;"; 
      this._status_H=keypad_config["status_H"]!=null?keypad_config["status_H"]:"&nbsp;"; 
      this._status_H=keypad_config["status_I"]!=null?keypad_config["status_I"]:"&nbsp;"; 
      this._status_H=keypad_config["status_J"]!=null?keypad_config["status_J"]:"&nbsp;"; 
      this._sensor_A=keypad_config["sensor_A"]!=null?keypad_config["sensor_A"]:"";
      this._sensor_B=keypad_config["sensor_B"]!=null?keypad_config["sensor_B"]:""; 
      this._sensor_C=keypad_config["sensor_C"]!=null?keypad_config["sensor_C"]:"";
      this._sensor_D=keypad_config["sensor_D"]!=null?keypad_config["sensor_D"]:""; 
      this._sensor_E=keypad_config["sensor_E"]!=null?keypad_config["sensor_E"]:"";
      this._sensor_F=keypad_config["sensor_F"]!=null?keypad_config["sensor_F"]:""; 
      this._sensor_G=keypad_config["sensor_G"]!=null?keypad_config["sensor_G"]:""; 
      this._sensor_H=keypad_config["sensor_H"]!=null?keypad_config["sensor_H"]:""; 
      this._sensor_H=keypad_config["sensor_I"]!=null?keypad_config["sensor_I"]:"";    
      this._sensor_H=keypad_config["sensor_J"]!=null?keypad_config["sensor_J"]:"";        
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
            this._ReadyStyle=data.value?"color: green;":"color: #ccc;";
            changed=true ;           
          } else
          if (id_code==this._sensor_B.replace("?",this._current_partition)) {
            this._armedStyle=data.value?"color: red;":"color: #ccc;";
            changed=true ;             
          } else
          if (id_code==this._sensor_C.replace("?",this._current_partition)) {
            this._chimeStyle=data.value?"color: green;":"color: #ccc;";
            changed=true ;             
          } else
          if (id_code==this._sensor_D.replace("?",this._current_partition)) {
            this._troubleStyle=data.value?"color: yellow;":"color: #ccc;";
            changed=true ;             
          } else
          if (id_code==this._sensor_E.replace("?",this._current_partition)) {
            this._acStyle=data.value?"color: green;":"color: #ccc;";
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

static docStyles = [css`
@font-face {
  /* Font data below from example project at: https://github.com/taligentx/dscKeybusInterface/tree/master/examples/esp32/VirtualKeypad-Web/data/fonts/ */
  font-family: 'keypad_icons';
    src: url(data:font/woff;charset=utf-8;base64,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Ih8IBAkEBQQECQQEBQQIBQMFBAQEBQQECAQJBAgECAgEAwQEBAQEAwQICAQDBAMIBAMDBA4DBAMEAwQDAwcDCQMDAwMJAwMDAwIDAwMSAgMCAwIFAgICAgICAwYBAgICAgEEAgECAwIBAgEBAQIBAQIBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgEBAgEHAgIBAgIBAgICAgIBAgIGAwEDAgIDAgICAwIDAgMCCAMDAgMDAwMOAwMDAwQGAwMDBwQDAwMHBAQKAwQDDAcEAwQEBAMEBAQEBAQEAwQEBQQICAQIBAgEBQQECAUEBAQEBQQEBAUEBBEFBAQJCAUFBAQEEgkHBwYHBwYGBwYGBgUGBgULBAUEBAMDAwIDAgEBAQEBAQECAgIGAwQEBQUFBQYFBgUMBgcGBwcHBggHCAcHBwcGBwYGDAUGBQYFBQUFBAMEAwIDAgECAQECAQICAgMDAwQEBAUFCgYFBgYGBgYGBwcGBwi5AU8CBQgICAgICAH+bQURCAkICAYBAQECCAgICQkGA78BAgEBAQEBAQEBAQEBAQQBAQEBAgECAQECAgEEAQICAgMCAgIKAgIFAgICAwIDAgMPAwMDAgMDCQIDBgMEAgcDBAMDAwQDAwQDBAMDBwQEAwQDBAQDBAQEAxcEBAQEBAMEBAQEBQQEBAQEBAgFBAMFBAQFBAQEBQMFBAQFBAQFBAQECQUEBAQFBAUEBAQFDQQFBAQECQQFBAUEBAQFBAQFBAQFCAQFAwUEBAQEBQQEBQQIBAQECAQEBQMIBAQEBAQDBAQEBAQEAwcEBAQDBAcEAwMDBQMDBAYEAwMDBAMDAwMEAgQFBAYCAwYCAwMCAwMCAwMEAwIDAgIDBAICAgMCAgEEAgICAwIDAgIDAgEBAQMCAQIBAQEBAQEBAQIBAQEDAQEBAQEBAQEBAQEBAQECAQEBAQEBAgEBAwEEAQMCAwQCAgECAgICAgIEBQICAgMEAwICAwsCAwMCAwMDAgYECAQCAwMKAwMEAwMEAwMZBAMEAwQHBAQDBAQEBAsEBAQEBAMJBAMFCAQEBQMEBAQFBAUEAwUEBAUEBAQFBAQEBAUEBAQFBAUEBAUEBQQECQMEBQQJBAUEBAQFBAUEBAUEBQQEBAQFBAQEBQQEBAQFBAQFBAQEBBUEAwUEAwUEAwUD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) format('woff');
  font-weight: normal;
  font-style: normal;
}`];

  applyStylesToRoot() {
    const {docStyles} = (this.constructor as typeof keyPad);
    const root = document; //this.getRootNode() as ShadowRoot|Document;
    docStyles.forEach(style => {
      const sheet = (style as CSSResult).styleSheet ?? style as CSSStyleSheet;
      if (!root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets.push(sheet);
      }
    });
  }

  createRenderRoot() {
    this.applyStylesToRoot();
    return super.createRenderRoot();
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
   
confirmState(e)   {
var key=e.currentTarget.getAttribute('state');
if (confirm("Are you sure you want to send the cmd [" + key + "]?" ) == true)
    setState(e);
else 
    alert("Cmd ["+key+"] cancelled");
}

setState(e) {
  
     var key=e.currentTarget.getAttribute('state');
      if (key==null|| key == "") return;
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

    <div class="container" >

      <div id="lcd_container">
        <div class="virtual_lcd">
          <div id="virtual_lcd_lines">
          <div id="first_line">${this._line1}</div>
          <div id="second_line">${this._line2}</div>
          </div>
        </div>
        <div class="status_icons">
          <i class="keypad-icon icon-check" id="ready_icon" title="Ready"></i>
          <i class="keypad-icon icon-armed" id="armed_icon" title="Armed"></i>
          <i class="keypad-icon icon-bell" id="chime_icon" title="Chime"></i>          
          <i class="keypad-icon icon-trouble" id="trouble_icon" title="System Trouble"></i>
          <i class="keypad-icon icon-ac" id="ac_icon" title="AC Power"></i>
        </div>
      </div>


      <div id="buttons_area">

        <div id="left_buttons">
 ${this._button_left?
html`
     <div class="keypad_button_row">
            <button type="button" id="btn_a" class="btn btn-outline-dark keypad_button keypad_button_control" state="A"  @click="${this.setState}" title="${this._button_A}">${this._button_A}
          </button>
          </div>
          <div class="keypad_button_row">
          <button type="button" id="btn_b" class="btn btn-outline-dark keypad_button keypad_button_control" state="B"  @click="${this.setState}" title="${this._button_B}">${this._button_B}
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_c" class="btn btn-outline-dark keypad_button keypad_button_control" state="C"  @click="${this.setState}" title="${this._button_C}">${this._button_C}
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_d" class="btn btn-outline-dark keypad_button keypad_button_control" state="D"  @click="${this.setState}" title="${this._button_D}">${this._button_D}
          </button>
          </div>
          <div class="keypad_button_row">
          <button type="button" id="btn_e" class="btn btn-outline-dark keypad_button keypad_button_control" state="E"  @click="${this.setState}" title="${this._button_E}">${this._button_E}
          </button>
          </div>

`
:html`
          <div class="keypad_button_row">
            <button type="button" id="btn_<" class="btn btn-outline-dark keypad_button keypad_button_small" state="<"  @click="${this.setState}" title="<">&lt;</button>
            <button type="button" id="btn_>" class="btn btn-outline-dark keypad_button keypad_button_small" state=">"  @click="${this.setState}" title=">">&gt;</i></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_f" class="btn btn-outline-dark keypad_button keypad_button_slim" state="fire"  @click="${this.confirmState}" title="Fire">
          <i class="keypad-icon icon-flame" ></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_a" class="btn btn-outline-dark keypad_button keypad_button_slim" state="alert"  @click="${this.confirmState}" title="Alert">
            <i class="keypad-icon icon-alert" ></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_p" class="btn btn-outline-dark keypad_button keypad_button_slim" state="panic"  @click="${this.confirmState}" title="Panic">
            <i class="keypad-icon icon-thief" ></i>
          </button>
            <div class="keypad_button_row">
            </div>
          </div>
`}
       </div>

        <div id="keypad_container">
          <div class="keypad_button_row">
            <button type="button" id="btn_1" class="btn btn-outline-dark keypad_button" state="1"  @click="${this.setState}" title="1">1<span class="keypad_cmd_text">${this._text_1}</span></button>
            <button type="button" id="btn_2" class="btn btn-outline-dark keypad_button" state="2"  @click="${this.setState}" title="2">2<span class="keypad_cmd_text">${this._text_2}</span></button>
            <button type="button" id="btn_3" class="btn btn-outline-dark keypad_button" state="3"  @click="${this.setState}" title="3">3<span class="keypad_cmd_text">${this._text_3}</span></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_4" class="btn btn-outline-dark keypad_button" state="4"  @click="${this.setState}" title="4">4<span class="keypad_cmd_text">${this._text_4}</span></button>
            <button type="button" id="btn_5" class="btn btn-outline-dark keypad_button" state="5"  @click="${this.setState}" title="5">5<span class="keypad_cmd_text">${this._text_5}</span></button>
            <button type="button" id="btn_6" class="btn btn-outline-dark keypad_button" state="6"  @click="${this.setState}" title="6">6<span class="keypad_cmd_text">${this._text_6}</span></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_7" class="btn btn-outline-dark keypad_button" state="7"  @click="${this.setState}" title="7">7<span class="keypad_cmd_text">${this._text_7}</span></button>
            <button type="button" id="btn_8" class="btn btn-outline-dark keypad_button" state="8"  @click="${this.setState}" title="8">8<span class="keypad_cmd_text">${this._text_8}</span></button>
            <button type="button" id="btn_9" class="btn btn-outline-dark keypad_button" state="9"  @click="${this.setState}" title="9">9<span class="keypad_cmd_text">${this._text_9}</span></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_*" class="btn btn-outline-dark keypad_button" state="*"  @click="${this.setState}" title="*"><i class="keypad-icon icon-star"></i><span class="keypad_cmd_text">${this._text_star}</span></button>
            <button type="button" id="btn_0" class="btn btn-outline-dark keypad_button" state="0"  @click="${this.setState}" title="0">0</button>
            <button type="button" id="btn_#" class="btn btn-outline-dark keypad_button"  state="#"  @click="${this.setState}" title="#">#<span class="keypad_cmd_text">${this._text_pound}</span></button>
          </div>
        </div>


        <div id="right_buttons">
 ${this._button_left?html`
  <div class="keypad_button_row">
            <button type="button" id="btn_a" class="btn btn-outline-dark keypad_button keypad_button_control" state="F"  @click="${this.setState}" title="${this._button_F}">${this._button_F}
          </button>
          </div>
          <div class="keypad_button_row">
          <button type="button" id="btn_b" class="btn btn-outline-dark keypad_button keypad_button_control" state="G"  @click="${this.setState}" title="${this._button_G}">${this._button_G}
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_c" class="btn btn-outline-dark keypad_button keypad_button_control" state="H"  @click="${this.setState}" title="${this._button_H}">${this._button_H}
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_d" class="btn btn-outline-dark keypad_button keypad_button_control" state="I"  @click="${this.setState}" title="${this._button_I}">${this._button_I}
          </button>
          </div>
          <div class="keypad_button_row">
          <button type="button" id="btn_e" class="btn btn-outline-dark keypad_button keypad_button_control" state="J"  @click="${this.setState}" title="${this._button_J}">${this._button_J}
          </button>
          </div>
`:html`
          <div class="keypad_button_row">
            <button type="button" id="btn_s" class="btn btn-outline-dark keypad_button keypad_button_control" state="stay"  @click="${this.setState}" title="stay">
            <i class="keypad-icon icon-stay_away"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_w" class="btn btn-outline-dark keypad_button keypad_button_control" state="away"  @click="${this.setState}" title="away">
            <i class="keypad-icon icon-stay_empty"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_c" class="btn btn-outline-dark keypad_button keypad_button_control" state="chime"  @click="${this.setState}" title="chime">
          <i class="keypad-icon icon-bell"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_r" class="btn btn-outline-dark keypad_button keypad_button_control" state="reset"  @click="${this.setState}" title="reset">
          <i class="keypad-icon icon-refresh"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_x" class="btn btn-outline-dark keypad_button keypad_button_control" state="exit"  @click="${this.setState}" title="exit">
            <i class="keypad-icon icon-exit"></i>
          </button>
          </div>
        </div>
`}
     </div>
    </div>

    `;
  }
  
  static get styles() {
    return [
      css`  


*,
*::before,
*::after {
  box-sizing: border-box;
}

div.container {
  margin-top: 5px;

}

i.keypad-icon {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'keypad_icons' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-star:before {
  content: "\\e905";
  font-size: 15px;
}
.icon-ac:before {
  content: "\\e90d";
}
.icon-trouble:before {
  content: "\\e90e";
}
.icon-armed:before {
  content: "\\e90f";
}
.icon-check:before {
  content: "\\e910";
}
.icon-thief:before {
  content: "\\e90b";
}
.icon-alert:before {
  content: "\\e90c";
}
.icon-sleep:before {
  content: "\\e90a";
}
.icon-bypass:before {
  content: "\\e909";
}
.icon-programming:before {
  content: "\\e908";
}
.icon-flame:before {
  content: "\\e907";
}
.icon-info:before {
  content: "\\e906";
}
.icon-stay_away:before {
  content: "\\e904";
}
.icon-stay_empty:before {
  content: "\\e903";
}
.icon-bell:before {
  content: "\\e900";
}
.icon-refresh:before {
  content: "\\e902";
}
.icon-exit:before {
  content: "\\e901";
}
      .btn {
        &:hover {
          background-color: #000 !important;
          }
        }
      html {
        font-size: 16px;
      }

      @media screen and (min-width: 955px) {
        body {
          font-size: 1.265rem !important;
        }
        button.keypad_button {
          width: 5rem !important;
          font-size: 1.2rem !important;
          
        }
        button.keypad_button_small {
          width: 2.3rem !important;
        }

        i.keypad-icon.icon-star {
          font-size: 1.0rem !important;
        }

      }

      .greenbullet {
        color: #28a745;
      }

      .redbullet {
        color: #dc3545;
      }

      button.keypad_button {
        width: calc(0.6rem + 10vw);
        border-radius: 1.5rem;
        font-weight: bold;
        font-size: calc(0.6rem + 1vw);
        padding: 0.2rem;
        max-width: 5rem;
        background-color: #d9dcdf;
        border: 2px solid #898e94;
        min-height: 1.5em;
      }

      button.keypad_button_small {
        width: 7.0vw;
        padding: 2px;
        max-width: 2.2rem;
        line-height: 1 !important;
        background-color: #d9dcdf;
        border: 2px solid #898e94;         
      }
      button.keypad_button_medium {
        width: 7.0vw;
        padding: 2px;
        max-width: 2.4rem;
        line-height: 1 !important;
        background-color: #d9dcdf;
        border: 2px solid #898e94;         
      }

      button.keypad_button_slim {
        width: 14.5vw;
        padding: 2px;
        line-height: 1;
        max-width: 4.5rem;
        line-height: 1 !important;
        background-color: #d9dcdf;
        border: 2px solid #898e94;        
      }

      button.keypad_text {
        width: calc(0.6rem + 10vw);
        border-radius: 1.5rem;
        font-size: calc(0.1rem + 1vw);
        padding: 0.2rem;
        max-width: 4.5rem;
      }
       .keypad_cmd_text {
        font-size: calc(.4rem + .2vw);
        font-style: italic; 
        padding-left: .2rem;
       }

      button.keypad_button_control {
        width: 11vw;
        padding: 2px;
        font-size: calc(0.6rem + 1vw);
        line-height: 1 !important;
        max-width: 4.0rem;
        font-size: 0.92rem !important;
      }


      div.virtual_lcd {
        background-color: #5f7cd8;
        color: #ffffff;
        font-family: 'Courier Prime';
        font-size: calc(1rem + 1.0vw);
        font-weight: bold;
        padding: 2px 10px;
        border-radius: 8px;
        flex: 1;
      }


       div#first_line {


        text-align: left;
        height: 1em;
      }
       div#second_line {

        text-align: left;
        height: 1em;
      }

      
      div#lcd_container {
        width: 100%;
        margin: 0 auto;
        border: 1px solid lightgrey;
        padding: 7px;
        background-color: whitesmoke;
        border-radius: 10px;
        white-space: nowrap;
        margin-bottom: 10px;
        display: flex;
      }

      div.keypad_button_row {
        margin: 12px 10px;
        text-align: center;
        white-space: nowrap;
      }

      div.container {
        border: 1px solid #939393;
        border-radius: 20px;
        padding: 10px;
        width: 100vw;
        background-color: #cacaca;
        max-width: 500px;
        min-width: 320px;
        margin-bottom: 10px;
      }

      div.inline_container {
        display: inline-block;
      }

      div.status_icons {
        text-align: center;
        padding: 0px;
        margin: 0px 0px 0px 5px;
        flex: 0;
        color: grey;
      }

      div.status_icons i {
        display: block;
        padding: 1px 0px;
        margin: 0px;
      }

      div#left_buttons,
      div#right_buttons,
      div#keypad_container {
        border: 1px solid lightgrey;
        padding: 7px 0px;
        border-radius: 8px;
        background-color: whitesmoke;
      }

      div#left_buttons {
        flex: 1;
        max-width: 5.9rem;
        line-height: 1 !important;
      }

      div#right_buttons div.keypad_button_row {
        margin: 8px 10px;
      }

      div#keypad_container {
        flex: 2;
        margin: 0px 10px;
        max-width: 17.5rem;
        line-height: 1.5 !important;
      }

      div#right_buttons {
        flex: 0;
        max-width: 5.8rem;
        line-height: 1 !important;

      }

      div#buttons_area {
        display: flex;

      }

      div#regular_icons {
        display: flex;
        justify-content: space-between;
      }

      .green_circle {
        color: green;
      }

      .red_circle {
        color: red;
      }

      .orange_color {
        color: orange;
      }

 
/*boot strap css */
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: lscolor 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media screen and (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}

.btn:hover, .btn:focus {
  text-decoration: none;
}

.btn:focus, .btn.focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn.disabled, .btn:disabled {
  opacity: 0.65;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

a.btn.disabled,
fieldset:disabled a.btn {
  pointer-events: none;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus, .btn-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-primary.disabled, .btn-primary:disabled {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #0062cc;
  border-color: #005cbf;
}

.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus,
.show > .btn-primary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  color: #fff;
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-secondary:focus, .btn-secondary.focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.btn-secondary.disabled, .btn-secondary:disabled {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #fff;
  background-color: #545b62;
  border-color: #4e555b;
}

.btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  color: #fff;
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-success:focus, .btn-success.focus {
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
}

.btn-success.disabled, .btn-success:disabled {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active,
.show > .btn-success.dropdown-toggle {
  color: #fff;
  background-color: #1e7e34;
  border-color: #1c7430;
}

.btn-success:not(:disabled):not(.disabled):active:focus, .btn-success:not(:disabled):not(.disabled).active:focus,
.show > .btn-success.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
}

.btn-info {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  color: #fff;
  background-color: #138496;
  border-color: #117a8b;
}

.btn-info:focus, .btn-info.focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-info.disabled, .btn-info:disabled {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active,
.show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #117a8b;
  border-color: #10707f;
}

.btn-info:not(:disabled):not(.disabled):active:focus, .btn-info:not(:disabled):not(.disabled).active:focus,
.show > .btn-info.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-warning {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:hover {
  color: #212529;
  background-color: #e0a800;
  border-color: #d39e00;
}

.btn-warning:focus, .btn-warning.focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-warning.disabled, .btn-warning:disabled {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:not(:disabled):not(.disabled):active, .btn-warning:not(:disabled):not(.disabled).active,
.show > .btn-warning.dropdown-toggle {
  color: #212529;
  background-color: #d39e00;
  border-color: #c69500;
}

.btn-warning:not(:disabled):not(.disabled):active:focus, .btn-warning:not(:disabled):not(.disabled).active:focus,
.show > .btn-warning.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-danger:focus, .btn-danger.focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}

.btn-danger.disabled, .btn-danger:disabled {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:not(:disabled):not(.disabled):active, .btn-danger:not(:disabled):not(.disabled).active,
.show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #bd2130;
  border-color: #b21f2d;
}

.btn-danger:not(:disabled):not(.disabled):active:focus, .btn-danger:not(:disabled):not(.disabled).active:focus,
.show > .btn-danger.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}

.btn-light {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-light:hover {
  color: #212529;
  background-color: #e2e6ea;
  border-color: #dae0e5;
}

.btn-light:focus, .btn-light.focus {
  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
}

.btn-light.disabled, .btn-light:disabled {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-light:not(:disabled):not(.disabled):active, .btn-light:not(:disabled):not(.disabled).active,
.show > .btn-light.dropdown-toggle {
  color: #212529;
  background-color: #dae0e5;
  border-color: #d3d9df;
}

.btn-light:not(:disabled):not(.disabled):active:focus, .btn-light:not(:disabled):not(.disabled).active:focus,
.show > .btn-light.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
}

.btn-dark {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-dark:hover {
  color: #fff;
  background-color: #23272b;
  border-color: #1d2124;
}

.btn-dark:focus, .btn-dark.focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

.btn-dark.disabled, .btn-dark:disabled {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-dark:not(:disabled):not(.disabled):active, .btn-dark:not(:disabled):not(.disabled).active,
.show > .btn-dark.dropdown-toggle {
  color: #fff;
  background-color: #1d2124;
  border-color: #171a1d;
}

.btn-dark:not(:disabled):not(.disabled):active:focus, .btn-dark:not(:disabled):not(.disabled).active:focus,
.show > .btn-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

.btn-outline-primary {
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
}



.btn-outline-secondary {
  color: #6c757d;
  background-color: transparent;
  background-image: none;
  border-color: #6c757d;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-secondary:focus, .btn-outline-secondary.focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.btn-outline-secondary.disabled, .btn-outline-secondary:disabled {
  color: #6c757d;
  background-color: transparent;
}

.btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active,
.show > .btn-outline-secondary.dropdown-toggle {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-secondary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.btn-outline-success {
  color: #28a745;
  background-color: transparent;
  background-image: none;
  border-color: #28a745;
}

.btn-outline-success:hover {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:focus, .btn-outline-success.focus {
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
}

.btn-outline-success.disabled, .btn-outline-success:disabled {
  color: #28a745;
  background-color: transparent;
}

.btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active,
.show > .btn-outline-success.dropdown-toggle {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:not(:disabled):not(.disabled):active:focus, .btn-outline-success:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-success.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
}

.btn-outline-info {
  color: #17a2b8;
  background-color: transparent;
  background-image: none;
  border-color: #17a2b8;
}

.btn-outline-info:hover {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-outline-info:focus, .btn-outline-info.focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-outline-info.disabled, .btn-outline-info:disabled {
  color: #17a2b8;
  background-color: transparent;
}

.btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active,
.show > .btn-outline-info.dropdown-toggle {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-outline-info:not(:disabled):not(.disabled):active:focus, .btn-outline-info:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-info.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-outline-warning {
  color: #ffc107;
  background-color: transparent;
  background-image: none;
  border-color: #ffc107;
}

.btn-outline-warning:hover {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-outline-warning:focus, .btn-outline-warning.focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-outline-warning.disabled, .btn-outline-warning:disabled {
  color: #ffc107;
  background-color: transparent;
}

.btn-outline-warning:not(:disabled):not(.disabled):active, .btn-outline-warning:not(:disabled):not(.disabled).active,
.show > .btn-outline-warning.dropdown-toggle {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-outline-warning:not(:disabled):not(.disabled):active:focus, .btn-outline-warning:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-warning.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-outline-danger {
  color: #dc3545;
  background-color: transparent;
  background-image: none;
  border-color: #dc3545;
}

.btn-outline-danger:hover {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:focus, .btn-outline-danger.focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}

.btn-outline-danger.disabled, .btn-outline-danger:disabled {
  color: #dc3545;
  background-color: transparent;
}

.btn-outline-danger:not(:disabled):not(.disabled):active, .btn-outline-danger:not(:disabled):not(.disabled).active,
.show > .btn-outline-danger.dropdown-toggle {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:not(:disabled):not(.disabled):active:focus, .btn-outline-danger:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-danger.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}

.btn-outline-light {
  color: #f8f9fa;
  background-color: transparent;
  background-image: none;
  border-color: #f8f9fa;
}

.btn-outline-light:hover {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-outline-light:focus, .btn-outline-light.focus {
  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
}

.btn-outline-light.disabled, .btn-outline-light:disabled {
  color: #f8f9fa;
  background-color: transparent;
}

.btn-outline-light:not(:disabled):not(.disabled):active, .btn-outline-light:not(:disabled):not(.disabled).active,
.show > .btn-outline-light.dropdown-toggle {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-outline-light:not(:disabled):not(.disabled):active:focus, .btn-outline-light:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-light.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
}

.btn-outline-dark {
  color: #343a40;
  background-color: transparent;
  background-image: none;
  border-color: #343a40;
}

.btn-outline-dark:hover {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-outline-dark:focus, .btn-outline-dark.focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

.btn-outline-dark.disabled, .btn-outline-dark:disabled {
  color: #343a40;
  background-color: transparent;
}

.btn-outline-dark:not(:disabled):not(.disabled):active, .btn-outline-dark:not(:disabled):not(.disabled).active,
.show > .btn-outline-dark.dropdown-toggle {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-outline-dark:not(:disabled):not(.disabled):active:focus, .btn-outline-dark:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

.btn-link {
  font-weight: 400;
  color: #007bff;
  background-color: transparent;
}

.btn-link:hover {
  color: #0056b3;
  text-decoration: underline;
  background-color: transparent;
  border-color: transparent;
}

.btn-link:focus, .btn-link.focus {
  text-decoration: underline;
  border-color: transparent;
  box-shadow: none;
}

.btn-link:disabled, .btn-link.disabled {
  color: #6c757d;
  pointer-events: none;
}

.btn-lg, .btn-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.btn-sm, .btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-block + .btn-block {
  margin-top: 0.5rem;
}

    `,
    ];
  }
}



