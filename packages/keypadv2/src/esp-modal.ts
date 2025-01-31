import { html, css, LitElement } from "lit";
import { customElement,property } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';

@customElement("modal-dialog") 
export class ModalDialog extends LitElement {


@property({type: String}) title;
@property({type: Boolean}) open;
@property({type: String}) text;
@property({type: String}) clickAction="Login";

@property({type: String}) username;
@property({type: String}) password;

 static get styles() {
    return css`
      :host {
        font-family: Arial, Helvetica, sans-serif;
      }
      .wrapper {
        opacity: 0;
        position: absolute;
        z-index: 10;
        transition: opacity 0.25s ease-in;
      }
      .wrapper:not(.open) {
        visibility: hidden;
      }
      .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 580px;
        height: 580px;
        opacity: 1;
        visibility: visible;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        width: 100%;
        position: relative;
      }
      .dialog {
        background: #ffffff;
        border-radius: 13px;
        max-width: 600px;
        padding: 1rem;
        position: absolute;
      }
      .dialog h1 {
        margin: 0 0 10px;
      }
      .dialog button {
        background-color: #d81e5b;
        color: white;
        width: 100%;
        font-size: 16px;
        padding: 15px 32px;
        border: none;
        border-radius: 10px;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;
      }`;
  }

render() {
    return html`
      <div class="${classMap({wrapper: true, open: this.open})}">
        <div class="overlay" @click="${this.close}"></div>
        <div class="dialog">
          <h1 id="title">${this.title}</h1>
          <div class="keypad_row">
                   <input id="username" type="username" placeholder="Your username">
                <input id="password" type="password" placeholder="Password">
                <button @click=${this.login}>${this.clickAction}</button>
            </div>
        </div>
      </div>
    `;
  }

  close() {
    this.open = false;
  }
  
   login() {

       this.username = this.shadowRoot.querySelector("#username").value;
       this.password = this.shadowRoot.querySelector("#password").value;
       this.close();

  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('button-click'));
    this.close();
  }
}




