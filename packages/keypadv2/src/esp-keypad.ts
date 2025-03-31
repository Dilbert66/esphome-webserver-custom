import { html, css, LitElement } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { getBasePath } from "./esp-entity-table";
import cssKeypad from "./css/esp_keypad";
import { isJson, encrypt, decrypt } from "./esp-crypt";
let basePath = getBasePath();

@customElement("esp-keypad")
export class keyPad extends LitElement {

    @property({ type: String }) scheme = "";
    @property({ type: Number }) current_partition = 1;

    @state({type: Object }) _config;
    @state({ type: String }) _line1;
    @state({ type: String }) _line2;
    @state({ type: String }) _iconA;
    @state({ type: String }) _status_A_state;
    @state({ type: String }) _iconB;
    @state({ type: String }) _status_B_state;
    @state({ type: String }) _iconC;
    @state({ type: String }) _status_C_state;
    @state({ type: String }) _iconD;
    @state({ type: String }) _status_D_state;
    @state({ type: String }) _iconE;
    @state({ type: String }) _status_E_state;
    @state({ type: String }) _iconF;
    @state({ type: String }) _status_F_state;
    @state({ type: String }) _iconG;
    @state({ type: String }) _status_G_state;
    @state({ type: String }) _iconH;
    @state({ type: String }) _status_H_state;



    render() {
        return html`

         <div class='container' @click="${this.stopPropagation}" color-scheme="${this.scheme}">
          
              <div class='keypad'>
                <div class="keypad_title">Partition: ${this.current_partition}</div>              
                ${this._view_display ? html`
                  <div class="display">
                    <div class="display_line" id="display_line1">${this._line1}</div>
                    <div class="display_line" id="display_line2">${this._line2}</div>
                </div>`: ''}

                ${this._view_status ? html`
                <div class='pad'>
                    <div class='mdc-button' ><span class="icon-label">${this._status_A}</span>
 <iconify-icon
          icon=${this._iconA}
          height="20px"
          title="${this._status_A}"
          style="color:${this._status_A_state}"
          class="mdc-icon"
          id="icona"
        ></iconify-icon>
                    </div>
                    <div class='mdc-button' ><span class="icon-label">${this._status_B}</span>
 <iconify-icon
          icon=${this._iconB}
          height="20px"
          title="${this._status_B}"
          class="mdc-icon"
          style='color:${this._status_B_state}'
          id="iconb"
        ></iconify-icon>
                    </div>
                    <div class='mdc-button' ><span class="icon-label">${this._status_C}</span>
 <iconify-icon
          .icon=${this._iconC}
          height="20px"
          .title="${this._status_C}"
          class="mdc-icon"
          style='color:${this._status_C_state}'
          id="iconc"
        ></iconify-icon>
                    </div>
                    <div class='mdc-button' ><span class="icon-label">${this._status_D}</span>
 <iconify-icon
          .icon=${this._iconD}
          height="20px"
          .title="${this._status_D}"
          class="mdc-icon"
          style='color:${this._status_D_state}'
          id="icond"
        ></iconify-icon>
                    </div>                    
                </div>`: ''}
                

                ${this._view_status2 ? html`
                <div class='pad'>
                    <div class='mdc-button' ><span class="icon-label">${this._status_E}</span>
   <iconify-icon
          icon=${this._iconE}
          height="20px"
          title="${this._status_E}"
          class="mdc-icon"
          style='color:${this._status_E_state}'
          id="icone"
        ></iconify-icon>
                    </div>
  
                    <div class='mdc-button' ><span class="icon-label">${this._status_F}</span>
 <iconify-icon
          icon=${this._iconF}
          height="20px"
          title="${this._status_F}"
          class="mdc-icon"
          style='color:${this._status_F_state}'
          id="iconf"
        ></iconify-icon>
                    </div>

                    <div class='mdc-button' ><span class="icon-label">${this._status_G}</span>
 <iconify-icon
          icon=${this._iconG}
          height="20px"
          title="${this._status_G}"
          class="mdc-icon"
          style='color:${this._status_G_state}'
          id="icong"
        ></iconify-icon>
                    </div>
                    <div class='mdc-button' ><span class="icon-label">${this._status_H}</span>
 <iconify-icon
          icon=${this._iconH}
          height="20px"
          title="${this._status_H}"
          class="mdc-icon"
          style='color:${this._status_H_state}'
          id="iconh"
        ></iconify-icon>
                    </div>                    
                </div>`: ''}

                ${this._view_pad ? html`                
                  <div class="pad">
                  
                ${this._button_left ? html`  
                    <div>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_A}'
                         state="A"
                       @click="${this.setState}"
                        title='${this._button_A}'>${this._button_A}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_B}'
                         state="B"
                       @click="${this.setState}"
                        title='${this._button_B}'>${this._button_B}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_C}'
                         state="C"
                       @click="${this.setState}"
                        title='${this._button_C}'>${this._button_C}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_D}'
                         state="D"
                       @click="${this.setState}"
                        title='${this._button_D}'>${this._button_D}
                      </button>
                     ${this._view_bottom ? html`                       
                     <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_E}'
                         state="H"
                       @click="${this.setState}"
                        title='${this._button_H}'>${this._button_H}
                     </button>`: ''}
                     

                    </div>`: ''}    
                    
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

                     ${this._view_bottom ? html`   
                     <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_E}'
                         state="E"
                       @click="${this.setState}"
                        title='${this._button_E}'>${this._button_E}
                     </button>`: ''}
                      
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

                     ${this._view_bottom ? html`                       
                     <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_F}'
                         state="F"
                       @click="${this.setState}"
                        title='${this._button_F}'>${this._button_F}
                     </button>`: ''}
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
                      ${this._view_bottom ? html`                      
                     <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_G}'
                         state="G"
                       @click="${this.setState}"
                        title='${this._button_G}'>${this._button_G}
                      </button>`: ''}
                   
                    </div>
                   ${this._button_left ? '' : html`  
                    <div>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_A}'
                         state="A"
                       @click="${this.setState}"
                        title='${this._button_A}'>${this._button_A}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_B}'
                         state="B"
                       @click="${this.setState}"
                        title='${this._button_B}'>${this._button_B}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_C}'
                         state="C"
                       @click="${this.setState}"
                        title='${this._button_C}'>${this._button_C}
                      </button>
                      <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_D}'
                         state="D"
                       @click="${this.setState}"
                        title='${this._button_D}'>${this._button_D}
                      </button>
                     ${this._view_bottom ? html`                       
                     <button
                        class='mdc-button mdc-button--outlined${this._button_disabled_H}'
                         state="H"
                       @click="${this.setState}"
                        title='${this._button_H}'>${this._button_H}
                     </button>`: ''}
                     
                    </div>`}
                  
                    
                </div>`: ''}
                  

                

              </div>
              
              
              
          </div>

    `;
    }


    setConfig(keypad_config) {
        //console.log("data="+keypad_config);
        //let keypad_config=JSON.parse(data);
        this._line1id = keypad_config["line_1"] != null ? keypad_config["line_1"] : "";
        this._line2id = keypad_config["line_2"] != null ? keypad_config["line_2"] : "";

        this._button_A = keypad_config["button_A"] != null ? keypad_config["button_A"] : "";
        this._button_B = keypad_config["button_B"] != null ? keypad_config["button_B"] : "";
        this._button_C = keypad_config["button_C"] != null ? keypad_config["button_C"] : "";
        this._button_D = keypad_config["button_D"] != null ? keypad_config["button_D"] : "";
        this._button_E = keypad_config["button_E"] != null ? keypad_config["button_E"] : "";
        this._button_F = keypad_config["button_F"] != null ? keypad_config["button_F"] : "";
        this._button_G = keypad_config["button_G"] != null ? keypad_config["button_G"] : "";
        this._button_H = keypad_config["button_H"] != null ? keypad_config["button_H"] : "";

        this._status_A = keypad_config["status_A"] != null ? keypad_config["status_A"] : "";
        this._status_B = keypad_config["status_B"] != null ? keypad_config["status_B"] : "";
        this._status_C = keypad_config["status_C"] != null ? keypad_config["status_C"] : "";
        this._status_D = keypad_config["status_D"] != null ? keypad_config["status_D"] : "";
        this._status_E = keypad_config["status_E"] != null ? keypad_config["status_E"] : "";
        this._status_F = keypad_config["status_F"] != null ? keypad_config["status_F"] : "";
        this._status_G = keypad_config["status_G"] != null ? keypad_config["status_G"] : "";
        this._status_H = keypad_config["status_H"] != null ? keypad_config["status_H"] : "";

        this._sensor_A = keypad_config["sensor_A"] != null ? keypad_config["sensor_A"] : "";
        this._sensor_B = keypad_config["sensor_B"] != null ? keypad_config["sensor_B"] : "";
        this._sensor_C = keypad_config["sensor_C"] != null ? keypad_config["sensor_C"] : "";
        this._sensor_D = keypad_config["sensor_D"] != null ? keypad_config["sensor_D"] : "";
        this._sensor_E = keypad_config["sensor_E"] != null ? keypad_config["sensor_E"] : "";
        this._sensor_F = keypad_config["sensor_F"] != null ? keypad_config["sensor_F"] : "";
        this._sensor_G = keypad_config["sensor_G"] != null ? keypad_config["sensor_G"] : "";
        this._sensor_H = keypad_config["sensor_H"] != null ? keypad_config["sensor_H"] : "";

        this._status_A_on_icon = (keypad_config["status_A_on_icon"] != null ) ? keypad_config["status_A_on_icon"] : "mdi:check-circle-outline"
        this._status_A_off_icon = (keypad_config["status_A_off_icon"] != null) ? keypad_config["status_A_off_icon"] : "mdi:circle-outline"
        this._status_B_on_icon = (keypad_config["status_B_on_icon"] != null) ? keypad_config["status_B_on_icon"] : "mdi:check-circle-outline"
        this._status_B_off_icon = (keypad_config["status_B_off_icon"] != null) ? keypad_config["status_B_off_icon"] : "mdi:circle-outline"
        this._status_C_on_icon = (keypad_config["status_C_on_icon"] != null) ? keypad_config["status_C_on_icon"] : "mdi:check-circle-outline"
        this._status_C_off_icon = (keypad_config["status_C_off_icon"] != null) ? keypad_config["status_C_off_icon"] : "mdi:circle-outline"
        this._status_D_on_icon = (keypad_config["status_D_on_icon"] != null) ? keypad_config["status_D_on_icon"] : "mdi:check-circle-outline"
        this._status_D_off_icon = (keypad_config["status_D_off_icon"] != null) ? keypad_config["status_D_off_icon"] : "mdi:circle-outline"
        this._status_E_on_icon = (keypad_config["status_E_on_icon"] != null) ? keypad_config["status_E_on_icon"] : "mdi:check-circle-outline"
        this._status_E_off_icon = (keypad_config["status_E_off_icon"] != null) ? keypad_config["status_E_off_icon"] : "mdi:circle-outline"
        this._status_F_on_icon = (keypad_config["status_F_on_icon"] != null) ? keypad_config["status_F_on_icon"] : "mdi:check-circle-outline"
        this._status_F_off_icon = (keypad_config["status_F_off_icon"] != null) ? keypad_config["status_F_off_icon"] : "mdi:circle-outline"
        this._status_G_on_icon = (keypad_config["status_G_on_icon"] != null) ? keypad_config["status_G_on_icon"] : "mdi:check-circle-outline"
        this._status_G_off_icon = (keypad_config["status_G_off_icon"] != null) ? keypad_config["status_G_off_icon"] : "mdi:circle-outline"
        this._status_H_on_icon = (keypad_config["status_H_on_icon"] != null) ? keypad_config["status_H_on_icon"] : "mdi:check-circle-outline"
        this._status_H_off_icon = (keypad_config["status_H_off_icon"] != null) ? keypad_config["status_H_off_icon"] : "mdi:circle-outline"

        this._status_A_color = (keypad_config["status_A_color"] != null) ? keypad_config["status_A_color"] : "green"
        this._status_B_color = (keypad_config["status_B_color"] != null) ? keypad_config["status_B_color"] : "green"
        this._status_C_color = (keypad_config["status_C_color"] != null) ? keypad_config["status_C_color"] : "green"
        this._status_D_color = (keypad_config["status_D_color"] != null) ? keypad_config["status_D_color"] : "green"
        this._status_E_color = (keypad_config["status_E_color"] != null) ? keypad_config["status_E_color"] : "green"
        this._status_F_color = (keypad_config["status_F_color"] != null) ? keypad_config["status_F_color"] : "green"
        this._status_G_color = (keypad_config["status_G_color"] != null) ? keypad_config["status_G_color"] : "green"
        this._status_H_color = (keypad_config["status_H_color"] != null) ? keypad_config["status_H_color"] : "green"



        this._cmd_A = keypad_config["cmd_A"] != null ? keypad_config["cmd_A"] : "";
        this._cmd_B = keypad_config["cmd_B"] != null ? keypad_config["cmd_B"] : "";
        this._cmd_C = keypad_config["cmd_C"] != null ? keypad_config["cmd_C"] : "";
        this._cmd_D = keypad_config["cmd_D"] != null ? keypad_config["cmd_D"] : "";
        this._cmd_E = keypad_config["cmd_E"] != null ? keypad_config["cmd_E"] : "disabled";
        this._cmd_F = keypad_config["cmd_F"] != null ? keypad_config["cmd_F"] : "";
        this._cmd_G = keypad_config["cmd_G"] != null ? keypad_config["cmd_G"] : "";
        this._cmd_H = keypad_config["cmd_H"] != null ? keypad_config["cmd_H"] : "disabled";


        this._button_disabled_A = keypad_config["button_disabled_A"] || this._cmd_A == "disabled" ? " disabled" : "";
        this._button_disabled_B = keypad_config["button_disabled_B"] || this._cmd_B == "disabled" ? " disabled" : "";
        this._button_disabled_C = keypad_config["button_disabled_C"] || this._cmd_C == "disabled" ? " disabled" : "";
        this._button_disabled_D = keypad_config["button_disabled_D"] || this._cmd_D == "disabled" ? " disabled" : "";
        this._button_disabled_E = keypad_config["button_disabled_E"] || this._cmd_E == "disabled" ? " disabled" : "";
        this._button_disabled_F = keypad_config["button_disabled_F"] || this._cmd_F == "disabled" ? " disabled" : "";
        this._button_disabled_G = keypad_config["button_disabled_G"] || this._cmd_G == "disabled" ? " disabled" : "";
        this._button_disabled_H = keypad_config["button_disabled_H"] || this._cmd_H == "disabled" ? " disabled" : "";

        this._text_0 = keypad_config["text_0"] != null ? keypad_config["text_0"] : "";
        this._text_1 = keypad_config["text_1"] != null ? keypad_config["text_1"] : "";
        this._text_2 = keypad_config["text_2"] != null ? keypad_config["text_2"] : "";
        this._text_3 = keypad_config["text_3"] != null ? keypad_config["text_3"] : "";
        this._text_4 = keypad_config["text_4"] != null ? keypad_config["text_4"] : "";
        this._text_5 = keypad_config["text_5"] != null ? keypad_config["text_5"] : "";
        this._text_6 = keypad_config["text_6"] != null ? keypad_config["text_6"] : "";
        this._text_7 = keypad_config["text_7"] != null ? keypad_config["text_7"] : "";
        this._text_8 = keypad_config["text_8"] != null ? keypad_config["text_8"] : "";
        this._text_9 = keypad_config["text_9"] != null ? keypad_config["text_9"] : "";

        this._text_star = keypad_config["text_star"] != null ? keypad_config["text_star"] : "";
        this._text_pound = keypad_config["text_pound"] != null ? keypad_config["text_pound"] : "";
        this._view_display = keypad_config["view_display"] != null ? keypad_config["view_display"] : true;
        this._view_pad = keypad_config["view_pad"] != null ? keypad_config["view_pad"] : true;
        this._view_bottom = keypad_config["view_bottom"] != null ? keypad_config["view_bottom"] : false;
        this._view_status = keypad_config["view_status"] != null ? keypad_config["view_status"] : false;
        this._view_status2 = keypad_config["view_status2"] != null ? keypad_config["view_status2"] : false;
        this._button_left = keypad_config["button_left"] != null ? keypad_config["button_left"] : false;
        this._vibration_duration = keypad_config["vibration_duration"] != null ? keypad_config["vibration_duration"] : 50;


       this._iconA = this._sensor_A!=""? this._status_A_off_icon:"";
       this._status_A_state = 'var(--sensoroff)';
       this._iconB = this._sensor_B!=""? this._status_B_off_icon:"";
       this._status_B_state ='var(--sensoroff)';
       this._iconC = this._sensor_C!=""? this._status_C_off_icon:"";
       this._status_C_state = 'var(--sensoroff)';
       this._iconD = this._sensor_D!=""? this._status_D_off_icon:"";
       this._status_D_state ='var(--sensoroff)';
       this._iconE = this._sensor_E!=""? this._status_E_off_icon:"";
       this._status_E_state = 'var(--sensoroff)';
       this._iconF = this._sensor_F!=""? this._status_F_off_icon:"";
       this._status_F_state = 'var(--sensoroff)';
       this._iconG = this._sensor_G!=""? this._status_G_off_icon:"";
       this._status_G_state = 'var(--sensoroff)';
       this._iconH = this._sensor_H!=""? this._status_H_off_icon:"";
       this._status_H_state = 'var(--sensoroff)';

       this._style = keypad_config["style"] != null ? keypad_config["style"]:"";

       for (let i in this._style) {
        if (this._style[i] == null) continue;
        var v=this._style[i].replace(/;/gi,'');
        //console.log(i,v);
        this.style.setProperty(i,v);
       }

}
//    protected firstUpdated() {
//         this.getConfig();
//
//    }


    connectedCallback() {
        super.connectedCallback();

        window.source?.addEventListener("key_config", (e: Event) => {
            const messageEvent = e as MessageEvent;
            this._config = messageEvent.data;
            if (isJson(this._config))
                this._config = JSON.parse(this._config);
            if ("iv" in this._config) this._config = decrypt(this._config);
            this.setConfig(this._config);
        });


        window.source?.addEventListener("state", (e: Event) => {
            const messageEvent = e as MessageEvent;
            var data = messageEvent.data;

            if (isJson(data))
                data = JSON.parse(data);
            if (data['iv'] != null) data = decrypt(data);

            if (data.id) {
                let parts = data.id.split("-");
                let id_code = ""
                if (data.id_code)
                    id_code = data.id_code;
                else if (parts[2] != undefined)  //deprecated
                    id_code = parts[2];

                if (id_code != "") {
                    if (id_code == this._line1id.replace("?", this.current_partition)) {
                        this._line1 = data.value;
                    } else
                        if (id_code == this._line2id.replace("?", this.current_partition)) {
                            this._line2 = data.value;
                        } else
                            if (id_code == this._sensor_A.replace("?", this.current_partition)) {
                                this._iconA = data.value ? this._status_A_on_icon : this._status_A_off_icon;
                                this._status_A_state = data.value ? this._status_A_color : 'var(--sensoroff)';
                            } else
                                if (id_code == this._sensor_B.replace("?", this.current_partition)) {
                                    this._iconB = data.value ? this._status_B_on_icon : this._status_B_off_icon;
                                    this._status_B_state = data.value ? this._status_B_color : 'var(--sensoroff)';
                                } else
                                    if (id_code == this._sensor_C.replace("?", this.current_partition)) {
                                        this._iconC = data.value ? this._status_C_on_icon : this._status_C_off_icon;
                                        this._status_C_state = data.value ? this._status_C_color : 'var(--sensoroff)';
                                    } else
                                        if (id_code == this._sensor_D.replace("?", this.current_partition)) {
                                            this._iconD = data.value ? this._status_D_on_icon : this._status_D_off_icon;
                                            this._status_D_state = data.value ? this._status_D_color : 'var(--sensoroff)';
                                        } else
                                            if (id_code == this._sensor_E.replace("?", this.current_partition)) {
                                                this._iconE = data.value ? this._status_E_on_icon : this._status_E_off_icon;
                                                this._status_E_state = data.value ? this._status_E_color : 'var(--sensoroff)';
                                            } else
                                                if (id_code == this._sensor_F.replace("?", this.current_partition)) {
                                                    this._iconF = data.value ? this._status_F_on_icon : this._status_F_off_icon;
                                                    this._status_F_state = data.value ? this._status_F_color : 'var(--sensoroff)';
                                                } else
                                                    if (id_code == this._sensor_G.replace("?", this.current_partition)) {
                                                        this._iconG = data.value ? this._status_G_on_icon : this._status_G_off_icon;
                                                        this._status_G_state = data.value ? this._status_G_color : 'var(--sensoroff)';
                                                    } else
                                                        if (id_code == this._sensor_H.replace("?", this.current_partition)) {
                                                            this._iconH = data.value ? this._status_H_on_icon : this._status_H_off_icon;
                                                            this._status_H_state = data.value ? this._status_H_color : 'var(--sensoroff)';
                                                        }
                }
            }

        });
    }

//    getConfig() {
//
//        //console.log("path=" + basePath);
//        fetch(`${basePath}/alarm_panel/alarm_panel/getconfig`)
//            .then(response => response.text())
//            .then(data => {
//                this.setConfig(data);
//            })
//            .catch(error => console.error(error));
//    }

    sendKey(key) {
        let data = JSON.stringify({
            'keys': key,
            'partition': this.current_partition,
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
                alert("Error: " + r.statusText + "\nPress F5 to reload the page");
                //ev.target.renderRoot.querySelector('#el3').innerText = 'OTA upload error: '+res.statusText;
            } else {
                // ev.target.renderRoot.querySelector('#el3').innerText = 'Uploaded ' + r.result.byteLength + ' bytes';
            }
        }).catch((error) => {
            console.log(error);
            alert(error + "\nPress F5 to reload the page");
        }

        )
    }

    /*
    sendKey1(key) {
        const data=new URLSearchParams();
        data.append('keys',key);
        data.append('partition',this.current_partition);
    
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

//    setPartition(e) {
//        var p = e.currentTarget.getAttribute('state');
//        this.current_partition = p;
//        this.sendKey('R');
//    }


    setState(e) {

        var key = e.currentTarget.getAttribute('state');

        switch (key) {
            case 'A': key = this._cmd_A; break;
            case 'B': key = this._cmd_B; break;
            case 'C': key = this._cmd_C; break;
            case 'D': key = this._cmd_D; break;
            case 'E': key = this._cmd_E; break;
            case 'F': key = this._cmd_F; break;
            case 'G': key = this._cmd_G; break;
            case 'H': key = this._cmd_H; break;
            case '0': key = '0'; break;
            case '1': key = '1'; break;
            case '2': key = '2'; break;
            case '3': key = '3'; break;
            case '4': key = '4'; break;
            case '5': key = '5'; break;
            case '6': key = '6'; break;
            case '7': key = '7'; break;
            case '8': key = '8'; break;
            case '9': key = '9'; break;
            case '*': key = '*'; break;
            case '#': key = '#'; break;
            default: return;

        }
        if (key == "") return;
        this.sendKey(key);
        if ('vibrate' in navigator)
            navigator.vibrate(this._vibration_duration);


    }


    static get styles() {
        return [cssKeypad];
    }
}



