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

}


div.container[color-scheme="light"] {

--btngrpbgcolor:  whitesmoke;
--maingrpbgcolor: #cacaca;
--bgkeycolor: #d9dcdf;
--cmdkeycolor: #fff;
--textcolor: #000;
--bglcd: #748C74;
--lcdtextcolor: #000;  

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
          background-color: #000 !important;
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
          font-size: 0.7rem;
        }

      button.keypad_button {
        width: calc(0.6rem + 10vw);
        border-radius: 1.5rem;
        font-weight: bold;
        font-size: calc(1rem );
        padding: 2px;
        max-width: 4rem;
        
        line-height: 1;
        background-color: var(--bgkeycolor);
        border: 2px solid #898e94;
        min-height: 1.8em;
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
        padding: .15rem;
        font-size: calc(0.6rem + 1vw);
        line-height: 0.8 !important;
        max-width: 3.0rem;
        font-size: calc(0.7rem);
        min-height: 1.6em;
        max-height: 2em;
      }


            div.virtual_lcd {
                flex: 1;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                 margin: 0;
                /*font-family: "Dot Matrix", sans-serif;*/
                font-family: "Arial";
                background-color: var(--bglcd);
                font-size: calc(0.8rem + 1vw);
                border-radius: 8px;
                align-content: center;
                text-align: center; /* Added text align center */
                color: var(--lcdtextcolor);
                letter-spacing: 1.px;
                overflow: auto;
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
        border: 1px solid lightgrey;
        padding: 8px;
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
        background-color: var(--btngrpbgcolor);
      }

      div#left_buttons {
        flex: 1;
        max-width: 5.9rem;
        line-height: 1.5 !important;
      }

      div#right_buttons div.keypad_button_row div#left_buttons{
        margin: 8px 10px;
      }

      div#keypad_container {
        flex: 2;
        margin: 0px 5px;
        max-width: 17.5rem;
        line-height: 1.5 !important;
      }

      div#right_buttons {
        flex: 0;
        max-width: 5.8rem;
        line-height: 1.0 !important;

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
