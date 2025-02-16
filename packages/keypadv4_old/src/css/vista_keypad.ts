import { css } from "lit";

export default css`
*,
*::before,
*::after {
  box-sizing: border-box;
}

div.container[color-scheme="dark"] {
 --btngrpbgcolor:  #000;
--maingrpbgcolor: #000;
--bgkeycolor: #000;
--cmdkeycolor: #000;
--textcolor: #ccc;
--bglcd: #748C74;
--lcdtextcolor: #000;
    --error-color: #db4437;
    --warning-color: #ffa600;
    --success-color: #43a047;
    --info-color: #039be5;

}


div.container[color-scheme="light"] {

--btngrpbgcolor:  whitesmoke;
--maingrpbgcolor: #cacaca;
--bgkeycolor: #d9dcdf;
--cmdkeycolor: #fff;
--textcolor: #000;
--bglcd: #748C74;
--lcdtextcolor: #000; 
/*
    --error-color: #db4437;
    --warning-color: #ffa600;
    --success-color: #43a047;
    --info-color: #039be5;   
*/
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
          background-color: var(--textcolor) !important;
          color: var(--btngrpbgcolor) !important;
          }
        }
      html {
        font-size: 16px;
      }

      .greenbullet {
        color: #28a745;
      }

      .redbullet {
        color: #dc3545;
      }
        i.keypad-icon.icon-star {
         font-size: 0.6rem;
        }

      button.keypad_button {
        width: calc(0.6rem + 10vw);
        border-radius: 0.5rem;
        font-weight: bold;
        font-size: calc(0.4rem + 1vw);
        padding: 0.2rem;
        max-width: 6rem;
        min-width: 3.5rem;
        background-color: var(--bgkeycolor);
        border: 2px solid #898e94;
        min-height: 1.5em;
        color: var(--textcolor);
      }

      button.keypad_button_small {
        width: 7.0vw;
        padding: 2px;
        max-width: 2.2rem;
        line-height: 1 !important;
        background-color: var(--bgkeycolor);
        border: 2px solid #898e94;         
      }
      button.keypad_button_medium {
        width: 7.0vw;
        padding: 2px;
        max-width: 2.4rem;
        line-height: 1 !important;
        background-color: var(--bgkeycolor);
        border: 2px solid #898e94;         
      }

      button.keypad_button_slim {
        width: 14.5vw;
        padding: 2px;
        line-height: 1;
        max-width: 4.5rem;
        line-height: 1 !important;
        background-color: var(--bgkeycolor);
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
        background-color: var(--bgkeycolor);
        border: 2px solid #898e94; 
        min-width: 3.2rem;
      }


          div.virtual_lcd {
                flex: 1;
                justify-content: center;
                align-items: center;
                margin: 0;
                border: 1px solid #898e94; 
                /*font-family: "Dot Matrix";*/
                font-family: "Arial";
                background-color: var(--bglcd);
                border-radius: 10px;
                align-content: center;
                text-align: center; 
                font-size: calc(0.8rem + .6vw);
                color: var(--lcdtextcolor);
                letter-spacing: 1px;
                overflow:auto;
                padding: 5px;
            }



       div#first_line {
        height: 1.5em;
      }
       div#second_line {
        height: 1.5em;
      }

      
      div#lcd_container {
      
        margin: 0 auto;
        border: 1px solid #898e94;
        padding: 7px;
        background-color: var(--btngrpbgcolor);
        border-radius: 10px;
        white-space: nowrap;
        margin-bottom: 5px;
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
        padding: 8px;
        background-color: var(--maingrpbgcolor);
        max-width: 500px;
        min-width: 300px;
        margin-bottom: 5px;
      }

      div.inline_container {
        display: inline-block;
      }

      div.status_icons {
        text-align: center;
        padding: 0px;
        margin: 0px 0px 0px 5px;
        flex: 0;
        color: #f2f2f2;
      }

      div.status_icons i {
        display: block;
        padding: 1px 0px;
        margin: 0px;
      }

      div#left_buttons,
      div#right_buttons,
      div#keypad_container {
        border: 1px solid #f2f2f2;
        padding: 7px 0px;
        border-radius: 8px;
        background-color: var(--btngrpbgcolor);
      }

      div#left_buttons {
        flex: 1;
        max-width: 6.5rem;
        line-height: 1 !important;
        margin-right: 5px;
      }

      div#right_buttons div.keypad_button_row div#.left_buttons {
        margin: 8px 10px;
      }

      div#keypad_container {
        flex: 2;
        line-height: 1.5 !important;
      }

      div#right_buttons {
        flex: 1;
        max-width: 6.5rem;
        line-height: 1 !important;
        margin-left: 5px;

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
`;
