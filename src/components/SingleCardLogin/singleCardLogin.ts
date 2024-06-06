import styles from './singleCardLogin.css';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { navigate } from '../../store/actions';
import { login } from '../../utils/firebase';
import { SVG } from '../../types/media';

class SingleCardLogin extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addLoginListener();
		this.buttonListenerRegister();
		this.buttonListenerRecover();
	}

	addLoginListener() {
		const form = this.shadowRoot?.querySelector('#form-info');
		if (form) {
			form.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	async handleSubmit(event: any) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const result = await login(email, password);
		if (result) {
			dispatch(navigate(Screens.DASHBOARD));
			return true;
		}
		alert('Unable to Log In');
		return;
	}

	buttonListenerRegister() {
		const btnRegister = this.shadowRoot?.querySelector('#register');
		if (btnRegister) {
			btnRegister.addEventListener('click', () => {
				dispatch(navigate(Screens.REGISTER));
			});
		}
	}

	buttonListenerRecover() {
		const recoverBtn = this.shadowRoot?.querySelector('#recover');
		if (recoverBtn) {
			recoverBtn.addEventListener('click', () => {
				dispatch(navigate(Screens.RECOVER));
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-login">
        <div class = "container-img">
        </div>
        <div class = "form-login">
					<div class = "arrow-left">
						${SVG.ARROW}
					</div>
          <div class = "container-logo">
						${SVG.LOGO}
            HandKid
          </div>
          <div class = "container-form">
            <div class = "title-login">Log In</div>
            <form id = "form-info">
              <div class = "email-data">
                <input type = "email" placeholder = "Email" name = "email" required>
              </div>
              <div class = "password-data">
                <input type = "password" placeholder = "Password" name = "password" required>
              </div>
              <div class = "btn-data">
                <input type = "submit" id = "login" value = "Log In">
              </div>
            </form>
          </div>
          <div class = "recover-password">
            <small id = "recover">Forgot your password?</small>
          </div>
          <div class = "link-register">
            <small>Don't have an account yet?</small>
            <small class = "small-link" id = "register"><b>Sign Up</b></small>
          </div>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('single-card-login', SingleCardLogin);
export default SingleCardLogin;
