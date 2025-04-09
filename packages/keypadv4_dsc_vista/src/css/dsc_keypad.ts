import { css } from "lit";

export default css`
*,
*::before,
*::after {
  box-sizing: border-box;
}

:host {
position: relative;
}



div.container[color-scheme="dark"] {
--maingrpbgcolor: var(--maingrpbgcolordark,#111);
--btngrpbgcolor: var(--btngrpbgcolordark,#111);
--buttonbgcolor: var(--buttonbgcolordark,#252525);
--buttontextcolor: var(--buttontextcolordark,#03a9f4);
--lcdbgcolor: var(--lcdbgcolordark1,#859c99);
--lcdtextcolor: var(--lcdtextcolordark,#222);
--sensoroff: var(--sensoroffdark,#303030);
--bordercolor: var(--bordercolordark,#333);
--hovercolor: var(--hovercolordark,#444);
--activecolor: var(--activecolordark,#555);
--focuscolor: var(--focuscolordark,#454545);

}


div.container[color-scheme="light"] {
--maingrpbgcolor: var(--maingrpbgcolorlight,#ddd);
--btngrpbgcolor:  var(--btngrpbgcolorlight,whitesmoke);
--buttonbgcolor: var(--buttonbgcolorlight,#d9dcdf);
--buttontextcolor: var(--buttontextcolorlight, #000);
--lcdbgcolor: var(--lcdbgcolorlight,#859c99);
--lcdtextcolor: var(--lcdtextcolorlight,#222); 
--sensoroff: var(--sensorofflight,#ccc);
--bordercolor: var(--bordercolorlight,#bbb);
--hovercolor: var(--hovercolorlight,#c0c0c0);
--activecolor: var(--activecolorlight,#d0d0d0);
--focuscolor: var(--focuscolorlight,#c5c5c5);
}

        .container {
            justify-content: center;
            align-items: center;
            border-radius: 1em;
            border: 1px solid var(--bordercolor);    
   
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
  font-size: .5rem;
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
      .btn{
        &:hover {
            background-color: var(--hovercolor);
            color: var(--buttontextcolor);
          }
        &:focus {
            background-color: var(--focuscolor);
            color: var(--buttontextcolor);
          }
        &:active {
            background-color: var(--activecolor);
            color: var(--buttontextcolor);
          }
        }


      button.keypad_button {
        border-radius: 1.5rem;
        background-color: var(--buttonbgcolor);
        border: 2px solid var(--bordercolor);
        color: var(--buttontextcolor);

      }

      button.keypad_button_pad {
        width: 32%;
        font-weight: bold;
        font-size: 0.8rem;
        background-color: var(--buttonbgcolor);
        border: 2px solid var(--bordercolor);
        min-height: 2.3rem;
        color: var(--buttontextcolor);
        line-height: 1;
        margin: auto;

      }


      button.keypad_button_small {
        font-weight: bold;
        font-size: 0.8rem;
        min-height: 1.8rem;
        width: 2.2rem;
        line-height: 1;
        background-color: var(--buttonbgcolor);
        border: 2px solid var(--bordercolor); 
        margin: auto;       
      }


      button.keypad_button_slim {
        line-height: 1;
        min-height: 1.5rem;
        background-color: var(--buttonbgcolor);
        border: 2px solid var(--bordercolor);  
        margin-top: 6px;
        width: 100%;      
      }


       .keypad_cmd_text {
        font-size: .4rem;
        font-style: italic; 
        margin-top: 2px;
       }


      button.keypad_button_control {
        background-color: var(--buttonbgcolor);
        line-height: 0.6;
        min-height: 1.5rem;
        width: 100%
        margin: auto;
      }

         .keypad_title {
          margin: auto;
          padding-bottom: 5px;
          display: flex;
          justify-content: center          
         }    


            div.virtual_lcd {
                flex: 1;
                /*font-family: "Dot Matrix", sans-serif;*/
                font-family: "Arial";
                background-color: var(--lcdbgcolor);
                font-size: 1.3rem;
                border-radius: 8px;
                text-align: center; 
                color: var(--lcdtextcolor);
                overflow: auto;
                margin: 5px 0px 5px 5px;
                padding: 5px;
                padding-top: 10px;
                border: 1px solid var(--bordercolor);
                
             }
    



       div#first_line {
        height: 1.5em;
      }
       div#second_line {
        height: 1.5em;
      }

      
      div#lcd_container {
        margin: 4px 6px 4px 6px;
        border: 1px solid var(--bordercolor);
        padding: 4px;
        background-color: var(--btngrpbgcolor);
        border-radius: 10px;
        white-space: nowrap;
        display: flex;
      }

      div.keypad_button_row {
        margin:8px;
        text-align: center;
        white-space: nowrap;
      }



      div.container {
        border-radius: 20px;
        padding: 4px;
        background-color: var(--maingrpbgcolor);
        max-width: 600px;
        margin: 5px;

      }


      div.status_icons {
        text-align: center;
        padding: 2px;
        margin: 0px 0px 0px 5px;
        flex: 0;
        color: grey;

      }

      div.status_icons i {
        display: block;
        padding: 3px ;

      }

      div#left_buttons,
      div#right_buttons,
      div#keypad_container {
        margin: 4px;
        border: 1px solid var(--bordercolor);
        border-radius: 8px;
        background-color: var(--btngrpbgcolor);
      }

      div#left_buttons {


      }


      div#keypad_container {
        display: flex;
        justify-content: center;
        flex-direction: column;

      }

      div#right_buttons {

      }

      div#buttons_area {
        display: flex;

      }

      div#regular_icons {
        display: flex;
        justify-content: space-between;
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
/*  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
*/
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


.btn-outline-dark:focus, .btn-outline-dark.focus {
 /* box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);*/
}


.btn-outline-dark.disabled, .btn-outline-dark:disabled {

  background-color: transparent;
}



.btn-outline-dark:not(:disabled):not(.disabled):active:focus, .btn-outline-dark:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

`;
