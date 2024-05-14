import styles from './singlePageInit.css';

class SinglePageInit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addLoginButtonListener();
		this.addRegisterButtonListener();
	}

	addLoginButtonListener() {
		const loginButton = this.shadowRoot?.querySelector('#btn-login');
		if (loginButton) {
			loginButton.addEventListener('click', () => {});
		}
	}

	addRegisterButtonListener() {
		const registerButton = this.shadowRoot?.querySelector('#btn-register');
		if (registerButton) {
			registerButton.addEventListener('click', () => {});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-init">
        <div class = "container-column1"></div>
        <div class = "container-column2">
          <div class = "container-logo">
            <div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>
              HandKid
            </div>
          </div>
          <div class = "container-text">
            <p>Join HandKid: safe fun guaranteed.</p>
          </div>
          <div class = "container-buttons">
            <div class = "btn1">
              <button id = "btn-register">Create an Account</button>
            </div>
            <div class = "or">
              <small>Or</small>
            </div>
            <div class = "btn2">
              <button id = "btn-login">Sign in</button>
            </div>
          </div>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('single-page-init', SinglePageInit);
export default SinglePageInit;
