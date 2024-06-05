import styles from './singleCardRegister.css';
import { setInfoRegister } from '../../utils/storage';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/navigation';
import { SVG } from '../../types/media';

class SingleCardRegister extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addNextListener();
		this.buttonListenerLogin();
	}

	addNextListener() {
		const form = this.shadowRoot?.querySelector('#form-info');
		if (form) {
			form.addEventListener('submit', this.handleNext.bind(this));
		}
	}

	handleNext(event: any) {
		event.preventDefault();
		const formData = new FormData(event.target);
		let formValues = [];
		formValues.push({
			fullname: formData.get('fullname'),
			username: formData.get('username'),
			email: formData.get('email'),
			birthdate: formData.get('birthdate'),
		});
		if (setInfoRegister(JSON.stringify(formValues))) {
			dispatch(navigate(Screens.PASSWORD));
		}
	}

	buttonListenerLogin() {
		const btnLogin = this.shadowRoot?.querySelector('#login');
		if (btnLogin) {
			btnLogin.addEventListener('click', () => {
				dispatch(navigate(Screens.LOGIN));
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-register">
        <div class = "container-img">
        </div>
        <div class = "form-register">
          <div class = "container-logo">
						${SVG.LOGO}
            HandKid
          </div>
          <div class = "container-form">
            <div class = "title-register">Sign Up</div>
              <form id = "form-info">
                <div class = "name-data">
                  <input type = "text" placeholder = "Name" name = "fullname" required>
                </div>
                <div class = "username-data">
                  <input type = "text" placeholder = "Username" name = "username" required>
                </div>
                <div class = "email-data">
                  <input type = "email" placeholder = "Email" name = "email" required>
                </div>
                <div class = "date-data">
                  <input type = "date" placeholder = "Birthdate" name = "birthdate" required>
                </div>
                <div class = "btn-data">
                  <input type = "submit" id = "next-screen" value = "Next">
                </div>
              </form>
            </div>
						<div class = "link-login">
							<small>Already have an account?</small>
							<small class = "small-link" id = "login"><b>Sign In</b></small>
          	</div>
          </div>
        </div>
        `;
		}
	}
}

customElements.define('single-card-register', SingleCardRegister);
export default SingleCardRegister;
