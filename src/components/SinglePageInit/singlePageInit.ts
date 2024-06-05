import styles from './singlePageInit.css';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { navigate } from '../../store/actions';
import { SVG } from '../../types/media';

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
			loginButton.addEventListener('click', () => {
				dispatch(navigate(Screens.LOGIN));
			});
		}
	}

	addRegisterButtonListener() {
		const registerButton = this.shadowRoot?.querySelector('#btn-register');
		if (registerButton) {
			registerButton.addEventListener('click', () => {
				dispatch(navigate(Screens.REGISTER));
			});
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
							${SVG.LOGO}
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
