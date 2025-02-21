import { html, css, LitElement } from "lit";
import { customElement, property,state } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";
import cssKeypad from "./css/dsc_keypad";
import icons from "./css/dsc-icons";
import {isJson,encrypt,decrypt} from "./esp-crypt";

let basePath=getBasePath();

@customElement("esp-keypad")
export class keyPad extends LitElement  {

  @property({ type: String }) scheme = "";   
  @property({ type: Number })  current_partition=1; 

  @state({ type: String })  _line1=""
  @state({ type: String })  _line2=""
  @state({ type: String })  _readyStyle="color: var(--unavailable);";
  @state({ type: String })  _armedStyle="color: var(--unavailable);";
  @state({ type: String }) _chimeStyle="color: var(--unavailable);";
  @state({ type: String })  _troubleStyle="color: var(--unavailable);";
  @state({ type: String }) _acStyle="color: var(--unavailable);";
  @state({ type: String }) _dscKeypad=false;

  private  _line1id = ""; //display lines
  private  _line2id = "";  

  private _cmd_stay = ""; //cmds to send
  private _cmd_away = "";
  private _cmd_chime = ""; 
  private _cmd_reset = "";
  private _cmd_exit = "";  
  private _cmd_fire = "";  
  private _cmd_alert = "";
  private _cmd_panic = "";  
  
  
  private _sensor_ready=""; //id of sensor
  private _sensor_armed="";
  private _sensor_trouble="";
  private _sensor_ac="";
  private _sensor_chime="";
  private _cmd_A = ""; //cmds to send
  private _cmd_B = "";
  private _cmd_C = ""; 
  private _cmd_D = "";
  
  private _text_0="" //key label for secondary function for panel
  private _text_1="" 
  private _text_2=""
  private _text_3=""
  private _text_4=""
  private _text_5=""
  private _text_6=""
  private _text_7=""
  private _text_8=""
  private _text_9=""
  private _text_star=""
  private _text_pound=""
   
  
  private _partitions=1;
  private _vibration_duration=5;



  

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
        let id_code=""
        if (data.id_code)
            id_code=data.id_code;        
        else if (parts[2] != undefined)  //deprecated
            id_code=parts[2];

        if (id_code != "") {
          if (id_code==this._line1id.replace("?",this.current_partition)) {
              this._line1=data.value;

          }  else
          if (id_code==this._line2id.replace("?",this.current_partition)) {
              this._line2=data.value;

          }   else
          if (id_code==this._sensor_ready.replace("?",this.current_partition)) {
            this._readyStyle=data.value?"color: green;":"color: var(--unavailable);";
      
          } else
          if (id_code==this._sensor_armed.replace("?",this.current_partition)) {
            this._armedStyle=data.value?"color: red;":"color: var(--unavailable);";
          
          } else
          if (id_code==this._sensor_trouble.replace("?",this.current_partition)) {
            this._troubleStyle=data.value?"color: orange;":"color: var(--unavailable);";
          
          } else
          if (id_code==this._sensor_ac.replace("?",this.current_partition)) {
            this._acStyle=data.value?"color: green;":"color: var(--unavailable);";
            
          } else
          if (id_code==this._sensor_chime.replace("?",this.current_partition)) {
            this._chimeStyle=data.value?"color: green;":"color: var(--unavailable);";
          }

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
         'partition':this.current_partition,
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


setPartition(e) {
    var p=e.currentTarget.getAttribute('state');
    this.current_partition=p;
    this.sendKey('R');
   }
   
confirmState(e)   {
var key=e.currentTarget.getAttribute('state');
let msg="";
switch (key) {
    case 'a':msg="Alert";break;
    case 'f':msg="Fire";break;
    case 'p':msg="Panic";break;
    default:break;
}
if (confirm("Are you sure you want to trigger the "+msg + " command" ) == true)
    this.setState(e);
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
         case '>': key='>';break;
         case '<': key='<';break;
         
     }
     if ('vibrate' in navigator) {
        navigator.vibrate(this._vibration_duration);
     } 
     this.sendKey(key);
  }

  
  render() {
    return html`
    <div class="container" color-scheme="${this.scheme}" >

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
      </div> <!-- lcd -->


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
           </div>
       </div> <!-- left buttons -->

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
        </div> <!-- keypad -->


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
        </div> <!-- right -->

     </div> <!-- buttons -->
    </div> <!-- container -->


    `;
  }
  
  static get styles() {
        return [cssKeypad];
  }

}



