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
<div class="container">


      <div id="lcd_container">
        <div class="virtual_lcd">

          <div id="first_line">&nbsp;</div>
          <div id="second_line">&nbsp;</div>
          <div id="event_info">&nbsp;</div>          
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
        
            <div class="keypad_button_row">
            <button type="button" id="btn_c" class="btn btn-outline-dark keypad_text keypad_button_slim" onclick="javascript:startSocket()">CONN</button>
          </div>   
          <div class="keypad_button_row">
            <button type="button" id="btn_l" class="btn btn-outline-dark keypad_text keypad_button_slim" onclick="javascript:setPass();">LOGIN</button>
          </div>     
 
  
       </div>

        <div id="keypad_container">
          <div class="keypad_button_row">
            <button type="button" id="btn_1" class="btn btn-outline-dark keypad_button">1<span class="keypad_cmd_text">OFF</span></button>
            <button type="button" id="btn_2" class="btn btn-outline-dark keypad_button">2<span class="keypad_cmd_text">AWAY</span></button>
            <button type="button" id="btn_3" class="btn btn-outline-dark keypad_button">3<span class="keypad_cmd_text">STAY</span></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_4" class="btn btn-outline-dark keypad_button">4<span class="keypad_cmd_text">MAX</span></button>
            <button type="button" id="btn_5" class="btn btn-outline-dark keypad_button">5<span class="keypad_cmd_text">TEST</span></button>
            <button type="button" id="btn_6" class="btn btn-outline-dark keypad_button">6<span class="keypad_cmd_text">BYPASS</span></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_7" class="btn btn-outline-dark keypad_button">7<span class="keypad_cmd_text">INSTANT</span></button>
            <button type="button" id="btn_8" class="btn btn-outline-dark keypad_button">8<span class="keypad_cmd_text">CODE</span></button>
            <button type="button" id="btn_9" class="btn btn-outline-dark keypad_button">9<span class="keypad_cmd_text">CHIME</span></button>
          </div>
          <div class="keypad_button_row">
            <button type="button" id="btn_*" class="btn btn-outline-dark keypad_button"><i class="keypad-icon icon-star"></i><span class="keypad_cmd_text">READY</span></button>
            <button type="button" id="btn_0" class="btn btn-outline-dark keypad_button">0</button>
            <button type="button" id="btn_#" class="btn btn-outline-dark keypad_button">#</button>
          </div>
        </div>

        <div id="right_buttons">
          <div class="keypad_button_row">
            <button type="button" id="btn_w" class="btn btn-outline-dark keypad_button keypad_button_control">
            <i class="keypad-icon icon-stay_empty"></i>
          </button>
          </div>        
          <div class="keypad_button_row">
            <button type="button" id="btn_s" class="btn btn-outline-dark keypad_button keypad_button_control">
            <i class="keypad-icon icon-stay_away"></i>
          </button>
          </div>

          <div class="keypad_button_row">
            <button type="button" id="btn_c" class="btn btn-outline-dark keypad_button keypad_button_control">
          <i class="keypad-icon icon-bell"></i>
          </button>
          </div>

          <div class="keypad_button_row">
            <button type="button" id="btn_x" class="btn btn-outline-dark keypad_button keypad_button_control">
            <i class="keypad-icon icon-exit"></i>
          </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container zones">
      <div id="regular_icons">
        <div class="zone inline_container">
          <i class="far fa-circle" id="fire_icon"></i> Fire
        </div>
        <div class="zone inline_container">
          <i class="far fa-circle" id="memory_icon"></i> Memory
        </div>
        <div class="zone inline_container">
          <i class="far fa-circle" id="bypass_icon"></i> Bypass
        </div>
        <div class="zone inline_container">
          <i class="far fa-circle" id="program_icon"></i> Program
        </div>
      </div>
      <div id="zones_list"></div>

    </div>
    
    
<!-- Modal -->
<div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="passwordModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
  <div class="form-group">
    <input type="password" class="form-control" id="inputPassword" placeholder="Password" value="">
  </div>
   <button type="button" class="btn btn-secondary" id="modalCancel" data-dismiss="modal">Cancel</button>
   <button type="button" class="btn btn-primary" id="savePassword" >Enter</button>
      </div>
    </div>
  </div>
</div>
    `;
  }
  
startSocket( ) {
          if (ws != null) ws.close();
          if (document.location.protocol !== 'https:') {
             ws = new WebSocket('ws://' + cnn_string + '/ws');
          } else
              ws = new WebSocket('wss://' + cnn_string + '/ws');
  
          ws.binaryType = "arraybuffer";
          ws.onopen = function(e) {
              //keepAlive();
          };
          ws.onclose = function(e) {
            console.log("WS disconnected");
              //cancelKeepAlive();
                   $("#first_line").html("*** disconnected ***");
                  $("#second_line").html();           
            ws = null;
          };
          ws.onerror = function(e) {
           console.log("ws error", e);
          };
          ws.onmessage = function(e) {
  
            var msg = "";
            if (e.data instanceof ArrayBuffer) {
              msg = "BIN:";
              var bytes = new Uint8Array(e.data);
              for (var i = 0; i < bytes.length; i++) {
                msg += String.fromCharCode(bytes[i]);
              }
              console.log(msg);
            } else {
              if (IsJsonString(e.data)) {
                try {
                  var dec=decrypt(e.data);
                  var obj = JSON.parse(dec);
                } catch (err) {
                   $("#first_line").html("*** Invalid code ****");
                  $("#second_line").html("&nbsp;&nbsp;&nbsp;&nbsp;Please login  ");                
                  console.log(e.data);
                }
                if (obj instanceof Object) {
  
                  if ("open_zone_0" in obj) {
                    //console.log(Object.keys(obj));
                    var obj_keys = Object.keys(obj);
           
                    for (var j = 0; j < obj_keys.length; j++) {
                      for (var z = 0; z < 8; z++) {
                        var zone_id = "zone_" + ((z + 1) + (j * 8));
                        //console.log(zone_id);
                        //console.log($("#zone_"+zone_id+" > i").attr("class"));
                        if ((obj[obj_keys[j]] >> z) % 2 != 0) {
                          $("#" + zone_id + " > i").removeClass("far").addClass("fas").removeClass("red_circle").removeClass("orange_color").addClass("green_circle");
                        } else {
                          $("#" + zone_id + " > i").removeClass("fas").addClass("far").removeClass("orange_color").removeClass("green_circle");
                        }
  
                      }
                    }
                  } else if ("alarm_zone_0" in obj) {
                    //console.log(Object.keys(obj));
                    var obj_keys = Object.keys(obj);
                    for (var j = 0; j < obj_keys.length; j++) {
                      for (var z = 0; z < 8; z++) {
                        var zone_id = "zone_" + ((z + 1) + (j * 8));
                        //console.log(zone_id);
                        //console.log($("#zone_"+zone_id+" > i").attr("class"));
                        if ((obj[obj_keys[j]] >> z) % 2 != 0 ) {
                          $("#" + zone_id + " > i").removeClass("alarm_zone").addClass("alarm_zone");;
                          $("#" + zone_id + "").removeClass("alarm_zone").addClass("alarm_zone");
                        } else {
                          $("#" + zone_id + "").removeClass("alarm_zone");
                          $("#" + zone_id + " > i").removeClass("alarm_zone");
                        }
  
                      }
                    }
                  } else if ("bypass_zone_0" in obj) {
                    //console.log(Object.keys(obj));
                    var obj_keys = Object.keys(obj);
                    for (var j = 0; j < obj_keys.length; j++) {
                      for (var z = 0; z < 8; z++) {
                        var zone_id = "zone_" + ((z + 1) + (j * 8));
                        //console.log(zone_id);
                        //console.log($("#zone_"+zone_id+" > i").attr("class"));
                        if ((obj[obj_keys[j]] >> z) % 2 != 0 ) {
                          $("#" + zone_id + " > i").removeClass("bypass_zone").addClass("bypass_zone");
                          $("#" + zone_id + "").removeClass("bypass_zone").addClass("bypass_zone");
                        } else {
                          $("#" + zone_id + "").removeClass("bypass_zone");
                          $("#" + zone_id + " > i").removeClass("bypass_zone");
                        }
  
                      }
                    }
                  }
                  if ("program_zone_0" in obj) {
                    //console.log(Object.keys(obj));
                    var obj_keys = Object.keys(obj);
                    for (var j = 0; j < obj_keys.length; j++) {
                      for (var z = 0; z < 8; z++) {
                        var zone_id = "zone_" + ((z + 1) + (j * 8));
                        //console.log(zone_id);
                        //console.log($("#zone_"+zone_id+" > i").attr("class"));
                        if ((obj[obj_keys[j]] >> z) % 2 != 0) {
                          $("#" + zone_id + " > i").removeClass("far").addClass("fas").addClass("orange_color");
                        } else {
                          $("#" + zone_id + " > i").removeClass("fas").addClass("far").removeClass("orange_color");
                        }
  
                      }
                    }
                  }  else if ("power_status" in obj) {
                    var powerStatus = parseInt(obj.power_status);
                    if (powerStatus) {
                      $("#ac_icon").addClass("green_circle").removeClass("orange_color");
                    }
                    else if (!powerStatus ) {
                      $("#ac_icon").addClass("orange_color").removeClass("green_circle");
                    }
  
                  } else if ("status_lights" in obj) {
                    var panel_status = parseInt(obj.status_lights);
  
                    //ready icon logic
                    if ((panel_status & 0x01) != 0 && !$("#ready_icon").hasClass("green_circle")) {
                      $("#ready_icon").addClass("green_circle");
                    } else if ((panel_status & 0x01) == 0 && $("#ready_icon").hasClass("green_circle")) {
                      $("#ready_icon").removeClass("green_circle");
                    }
  
                    //armed icon logic
                    if ((panel_status & 0x02) != 0 && !$("#armed_icon").hasClass("red_circle")) {
                      $("#armed_icon").addClass("red_circle");
                    } else if ((panel_status & 0x02) == 0 && $("#armed_icon").hasClass("red_circle")) {
                      $("#armed_icon").removeClass("red_circle");
                    }
  
                    //memory light logic
                    if ((panel_status & 0x04) != 0 && !$("#memory_icon").hasClass("orange_color")) {
                      $("#memory_icon").removeClass("far").addClass("fas").addClass("orange_color");
                    } else if ((panel_status & 0x04) == 0 && $("#memory_icon").hasClass("orange_color")) {
                      $("#memory_icon").removeClass("fas").addClass("far").removeClass("orange_color");
                    }
  
                    //bypass light logic
                    if ((panel_status & 0x08) != 0 && !$("#bypass_icon").hasClass("orange_color")) {
                      $("#bypass_icon").removeClass("far").addClass("fas").addClass("orange_color");
                    } else if ((panel_status & 0x08) == 0 && $("#bypass_icon").hasClass("orange_color")) {
                      $("#bypass_icon").removeClass("fas").addClass("far").removeClass("orange_color");
                    }
  
                    //trouble light logic
                    if ((panel_status & 0x10) != 0 && !$("#trouble_icon").hasClass("orange_color")) {
                      $("#trouble_icon").addClass("orange_color");
                    } else if ((panel_status & 0x10) == 0 && $("#trouble_icon").hasClass("orange_color")) {
                      $("#trouble_icon").removeClass("orange_color");
                    }
  
                    //program light logic
                    if ((panel_status & 0x20) != 0 && !$("#program_icon").hasClass("green_circle")) {
                      $("#program_icon").removeClass("far").addClass("fas").addClass("green_circle");
                    } else if ((panel_status & 0x20) == 0 && $("#program_icon").hasClass("green_circle")) {
                      $("#program_icon").removeClass("fas").addClass("far").removeClass("green_circle");
                    }
  
                    //fire light logic
                    if ((panel_status & 0x40) != 0 && !$("#fire_icon").hasClass("red_circle")) {
                      $("#fire_icon").removeClass("far").addClass("fas").addClass("red_circle");
                    } else if ((panel_status & 0x40) == 0 && $("#fire_icon").hasClass("red_circle")) {
                      $("#fire_icon").removeClass("fas").addClass("far").removeClass("red_circle");
                    }
                    //chime icon logic
                    if ((panel_status & 0x80) != 0 && !$("#chime_icon").hasClass("green_circle")) {
                      $("#chime_icon").addClass("green_circle");
                    } else if ((panel_status & 0x80) == 0 && $("#chime_icon").hasClass("green_circle")) {
                      $("#chime_icon").removeClass("green_circle");
                    }                  
                    
  
                  } else if ("lcd_lower" in obj || "lcd_upper" in obj || "event_info" in obj) {
                    if ("event_info" in obj) $("#event_info").html(obj.event_info);
                    if ("lcd_upper" in obj) $("#first_line").html(obj.lcd_upper);
                    if ("lcd_lower" in obj) $("#second_line").html(obj.lcd_lower);
                  } else {
                    console.log(obj);
                  }
                } else {
                 // console.log(obj);
                }
              } else {
                console.log(e.data);
              }
            }
          };
  

  
          $(".btn").click(function(event) {
            // Removes focus of the button.
            $(this).blur();
          });
  
          for (var i = 1; i <= 64; i++) {
            $("#zones_list").append('<div class="zone" id="zone_' + i + '"><i class="far fa-circle"></i> Zone ' + i + '</div>');
          }
  
          $(".btn").click(function(e) {
            action = {
              'btn_single_click': $(this).attr("id")
            };
            if (ws != null && ws.readyState && $(this).attr("id") !=  "savePassword" && $(this).attr("id") !=  "modalCancel") {
              var a=encrypt(JSON.stringify(action));
              ws.send(a);
           } else if ($(this).attr("id") !=  "btn_c" && $(this).attr("id") !=  "btn_l" && $(this).attr("id") !=  "savePassword" && $(this).attr("id") !=  "modalCancel")
              alert("Websocket disconnected. Click 'CONN' or Refresh the browser");
            console.log(action);
          });
  
  
  
        }

  
  static get styles() {
    return [
      css`
     @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans');
      @import url('https://fonts.googleapis.com/css2?family=Courier+Prime');


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
        div.virtual_lcd {
          font-size: 2.36rem !important;
        }
        div#zones_list {
          font-size: 0.75rem !important;
        }
        i.keypad-icon.icon-star {
          font-size: 1.0rem !important;
        }

      }

      body {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: calc(0.38rem + 1.5vw);
      }

      .greenbullet {
        color: #28a745;
      }

      .redbullet {
        color: #dc3545;
      }

      p.state_title {
        display: inline-block;
      }

      p.state_title:not(:first-child) {
        margin-left: 10px;
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
      }

      button.keypad_button_small {
        width: 7.0vw;
        padding: 2px;
        max-width: 2.2rem;
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
        font-size: calc(0.3rem + 1vw);
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
      }


      div.virtual_lcd {
        background-color: #5f7cd8;
        color: #ffffff;
        font-family: 'Courier Prime';
        font-size: calc(1.1rem + 1.8vw);
        font-weight: bold;
        padding: 2px 10px;
        border-radius: 8px;
        flex: 1;
      }

      div#event_info {
        font-size: calc(0.8rem + 1vw);
        font-weight: normal;
        height: 3em;
        white-space: normal ;
        line-height: 1 !important; 
        padding-top: 1em;        
      }
       div#first_line {
        height: 1em;
      }
       div#second_line {
        height: 1em;
      }

      div#lcd_container a {
              color: #ffffff;
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
        padding: 4px 0px;
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

      div.zones {
        background-color: whitesmoke;
      }

      div#zones_list {
        border-top: 1px solid grey;
        margin-top: 5px;
        padding-top: 5px;

        display: grid;
        grid-template-rows: repeat(16, auto);
        grid-gap: 10px;
        grid-auto-flow: column;
        font-size: 0.75rem;
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
      i.keypad-icon.icon-star {
        font-size: calc(0.45rem + 0.8vw);
        padding: 1rem 0px;

      }

      .alarm_zone {
        color: red;
      }
      
      .bypass_zone {
        color: orange;
      }      

    `,
    ];
  }
}



