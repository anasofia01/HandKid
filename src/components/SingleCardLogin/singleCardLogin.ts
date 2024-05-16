import styles from './singleCardLogin.css';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { navigate } from '../../store/actions';

class SingleCardLogin extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addLoginListener();
	}

	addLoginListener() {
		const form = this.shadowRoot?.querySelector('#form-info');
		if (form) {
			form.addEventListener('submit', () => this.handleSubmit.bind(this));
		}
	}

	handleSubmit(event: any) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const email = formData.get('email');
		const password = formData.get('password');
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-login">
        <div class = "container-img">
        </div>
        <div class = "form-login">
          <div class = "container-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>
            HandKid
          </div>
          <div class = "container-form">
            <div class = "title-login">Log In</div>
            <form id = "form-info">
              <div class = "email-data">
                <input type = "email" placeholder = "Email" name = "email">
              </div>
              <div class = "password-data">
                <input type = "password" placeholder = "Password" name = "password">
              </div>
              <div class = "btn-data">
                <input type = "submit" id = "login" value = "Log In">
              </div>
            </form>
          </div>
          <div class = "recover-password">
            <small>Forgot your password?</small>
          </div>
          <div class = "link-register">
            <small>Don't have an account yet?</small>
            <small class = "small-link">Sign Up</small>
          </div>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('single-card-login', SingleCardLogin);
export default SingleCardLogin;
