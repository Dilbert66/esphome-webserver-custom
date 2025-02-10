import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";
import {decrypt,encrypt,isJson ,crypt} from "./esp-app";
import cssKeypad from "./css/dsc_keypad";
import icons from "./dsc-icons";

let basePath=getBasePath();

@customElement("esp-keypad")
export class keyPad extends LitElement  {
    
  @property({ type: String }) _line1id = ""; //display lines
  @property({ type: String }) _line2id = "";  

  @property({ type: String }) _cmd_stay = ""; //cmds to send
  @property({ type: String }) _cmd_away = "";
  @property({ type: String }) _cmd_chime = ""; 
  @property({ type: String }) _cmd_reset = "";
  @property({ type: String }) _cmd_exit = "";  
  @property({ type: String }) _cmd_fire = "";  
  @property({ type: String }) _cmd_alert = "";
  @property({ type: String }) _cmd_panic = "";  
  
  
  @property({ type: String}) _sensor_ready=""; //id of sensor
  @property({ type: String}) _sensor_armed="";
  @property({ type: String}) _sensor_trouble="";
  @property({ type: String}) _sensor_ac="";
  @property({ type: String}) _sensor_chime="";
  
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
   
  @property({ type: Boolean }) _button_left=false; 
  
  @property({ type: Number }) _partitions=1;
  @property({ type: Number }) _current_partition=1;
  @property({type: Number })  _vibration_duration=5;

  _line1=""
  _line2=""
  
  _readyStyle="color: #ccc;";
  _armedStyle="color: #ccc;";
  _chimeStyle="color: #ccc;";
  _troubleStyle="color: #ccc;";
  _acStyle="color: #ccc;";
  _dscKeypad=false;
  

 setConfig(keypad_config) {
      this._line1id=keypad_config["line_1"]!=null?keypad_config["line_1"]:"ln1_?";
      this._line2id=keypad_config["line_2"]!=null?keypad_config["line_2"]:"ln2_?";

      this._sensor_ready=keypad_config["sensor_ready"]!=null?keypad_config["sensor_ready"]:"rdy_?"; 
      this._sensor_armed=keypad_config["sensor_armed"]!=null?keypad_config["sensor_armed"]:"arm_?"; 
      this._sensor_trouble=keypad_config["sensor_trouble"]!=null?keypad_config["sensor_trouble"]:"tr"; 
      this._sensor_ac=keypad_config["sensor_ac"]!=null?keypad_config["sensor_ac"]:"ac"; 
     // this._sensor_chime=keypad_config["sensor_chime"]!=null?keypad_config["sensor_chime"]:""; 

      this._cmd_stay=keypad_config["cmd_stay"]!=null?keypad_config["cmd_stay"]:"S";
      this._cmd_away=keypad_config["cmd_away"]!=null?keypad_config["cmd_away"]:"W"; 
      this._cmd_chime=keypad_config["cmd_chime"]!=null?keypad_config["cmd_chime"]:"C";
      this._cmd_reset=keypad_config["cmd_reset"]!=null?keypad_config["cmd_reset"]:"R";  
      this._cmd_exit=keypad_config["cmd_exit"]!=null?keypad_config["cmd_exit"]:"X"; 
      this._cmd_fire=keypad_config["cmd_fire"]!=null?keypad_config["cmd_fire"]:"F"; 
      this._cmd_alert=keypad_config["cmd_alert"]!=null?keypad_config["cmd_alert"]:"A"; 
      this._cmd_panic=keypad_config["cmd_panic"]!=null?keypad_config["cmd_panic"]:"P"; 

      this._text_0=keypad_config["text_0"]!=null?keypad_config["text_0"]:"";
      this._text_1=keypad_config["text_1"]!=null?keypad_config["text_1"]:"BYPASS";  
      this._text_2=keypad_config["text_2"]!=null?keypad_config["text_2"]:"SERV";  
      this._text_3=keypad_config["text_3"]!=null?keypad_config["text_3"]:"ALARMS";  
      this._text_4=keypad_config["text_4"]!=null?keypad_config["text_4"]:"CHIME";  
      this._text_5=keypad_config["text_5"]!=null?keypad_config["text_5"]:"CODES";  
      this._text_6=keypad_config["text_6"]!=null?keypad_config["text_6"]:"FUNC";  
      this._text_7=keypad_config["text_7"]!=null?keypad_config["text_7"]:"OUTP";  
      this._text_8=keypad_config["text_8"]!=null?keypad_config["text_8"]:"PROG"; 
      this._text_9=keypad_config["text_9"]!=null?keypad_config["text_9"]:"NIGHT"; 
      this._text_star=keypad_config["text_star"]!=null?keypad_config["text_star"]:"SELECT";
      this._text_pound=keypad_config["text_pound"]!=null?keypad_config["text_pound"]:"ENTER";
      this._vibration_duration=keypad_config["vibration_duration"]!=null?keypad_config["vibration_duration"]:5;

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
          if (id_code==this._sensor_ready.replace("?",this._current_partition)) {
            this._readyStyle=data.value?"color: green;":"color: #ccc;";
            changed=true ;           
          } else
          if (id_code==this._sensor_armed.replace("?",this._current_partition)) {
            this._armedStyle=data.value?"color: red;":"color: #ccc;";
            changed=true ;             
          } else
          if (id_code==this._sensor_trouble.replace("?",this._current_partition)) {
            this._troubleStyle=data.value?"color: orange;":"color: #ccc;";
            changed=true ;             
          } else
          if (id_code==this._sensor_ac.replace("?",this._current_partition)) {
            this._acStyle=data.value?"color: green;":"color: #ccc;";
            changed=true ;             
          } else
          if (id_code==this._sensor_chime.replace("?",this._current_partition)) {
            this._chimeStyle=data.value?"color: green;":"color: #ccc;";
            changed=true ;             
          }
            if (changed) this.requestUpdate(); 
        }   
      } 
      
    });
  }



  applyStylesToRoot() {
      const sheet = (icons as CSSResult).styleSheet ?? icons as CSSStyleSheet;
      if (!document.adoptedStyleSheets.includes(sheet)) {
        document.adoptedStyleSheets.push(sheet);
      }
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
//else 
//    alert("Cmd ["+key+"] cancelled");
}

setState(e) {
  
     var key=e.currentTarget.getAttribute('state');
      if (key==null|| key == "") return;
     switch (key) {
         case 's': key=this._cmd_stay; break;
         case 'w': key=this._cmd_away; break;
         case 'r': key=this._cmd_reset; break;
         case 'x': key=this._cmd_exit; break;  
         case 'c': key=this._cmd_chime; break;  
         case 'a': key=this._cmd_alert; break;  
         case 'f': key=this._cmd_fire; break; 
         case 'p': key=this._cmd_panic; break; 

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
          <div id="first_line">${this._line1}</div>
          <div id="second_line">${this._line2}</div>
        </div>
        <div class="status_icons">
          <i class="keypad-icon icon-check" id="ready_icon" title="Ready" style="${this._readyStyle}"></i>
          <i class="keypad-icon icon-armed" id="armed_icon" title="Armed" style="${this._armedStyle}"></i>
          ${this._sensor_chime?html`
          <i class="keypad-icon icon-bell" id="chime_icon" title="Chime" style="${this._chimeStyle}"></i>  
          `:''}        
          <i class="keypad-icon icon-trouble" id="trouble_icon" title="System Trouble" style="${this._troubleStyle}"></i>
          <i class="keypad-icon icon-ac" id="ac_icon" title="AC Power" style="${this._acStyle}"></i>
        </div>
      </div>


      <div id="buttons_area">

        <div id="left_buttons">
 
          <div class="keypad_button_row">
            <button type="button" id="btn_<" class="btn btn-outline-dark keypad_button keypad_button_small" state="<"  @click="${this.setState}" title="<">&lt;</button>
            <button type="button" id="btn_>" class="btn btn-outline-dark keypad_button keypad_button_small" state=">"  @click="${this.setState}" title=">">&gt;</i></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_f" class="btn btn-outline-dark keypad_button keypad_button_slim" state="f"  @click="${this.confirmState}" title="Fire">
          <i class="keypad-icon icon-flame" ></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_a" class="btn btn-outline-dark keypad_button keypad_button_slim" state="a"  @click="${this.confirmState}" title="Alert">
            <i class="keypad-icon icon-alert" ></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_p" class="btn btn-outline-dark keypad_button keypad_button_slim" state="p"  @click="${this.confirmState}" title="Panic">
            <i class="keypad-icon icon-thief" ></i>
          </button>
            <div class="keypad_button_row">
            </div>
          </div>

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
 
          <div class="keypad_button_row">
            <button type="button" id="btn_s" class="btn btn-outline-dark keypad_button keypad_button_control" state="s"  @click="${this.setState}" title="stay">
            <i class="keypad-icon icon-stay_away"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_w" class="btn btn-outline-dark keypad_button keypad_button_control" state="w"  @click="${this.setState}" title="away">
            <i class="keypad-icon icon-stay_empty"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_c" class="btn btn-outline-dark keypad_button keypad_button_control" state="c"  @click="${this.setState}" title="chime">
          <i class="keypad-icon icon-bell"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_r" class="btn btn-outline-dark keypad_button keypad_button_control" state="r"  @click="${this.setState}" title="reset">
          <i class="keypad-icon icon-refresh"></i>
          </button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_x" class="btn btn-outline-dark keypad_button keypad_button_control" state="x"  @click="${this.setState}" title="exit">
            <i class="keypad-icon icon-exit"></i>
          </button>
          </div>
        </div>

     </div>
    </div>


    `;
  }
  
  static get styles() {
        return [cssKeypad];
  }

}



