import styles from './singleCardPassword.css';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { navigate } from '../../store/actions';
import { getInfoRegister, clearInfoRegister } from '../../utils/storage';
import { UserData } from '../../types/userData';
import { createUser } from '../../utils/firebase';
import { SVG } from '../../types/media';

class SingleCardPassword extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addPasswordListener();
	}

	addPasswordListener() {
		const form = this.shadowRoot?.querySelector('#form-info');
		if (form) {
			form.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	async handleSubmit(event: any) {
		event.preventDefault();
		const formNextData = getInfoRegister();
		const formData = new FormData(event.target);
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirmed') as string;
		const policyCheck = this.shadowRoot?.querySelector('#policy-check') as HTMLInputElement;
		const age = this.calculateAge(formNextData.birthdate ?? '');
		if (password.length < 8) {
			alert('The password must be at least 8 characters long');
			return;
		}
		if (passwordConfirm !== password) {
			alert('The passwords do not match, check');
			return;
		}
		if (!policyCheck.checked) {
			alert('Please accept the Privacy Policy');
			return;
		}
		const userData: UserData = {
			fullname: formNextData.fullname ?? '',
			username: '@' + (formNextData.username ?? ''),
			birthdate: formNextData.birthdate ?? '',
			email: formNextData.email ?? '',
			password: password,
			policy: policyCheck.checked,
			avatar: 'https://www.autoocupacio.org/wp-content/uploads/2017/07/Usuario-Vacio.png',
			banner:
				'https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/00acdc9462f3b2ccd275d65f3f42e5d3?t=1710413812&webp_fallback=png',
			friends: 0,
			age: age,
		};
		const result = await createUser(userData);
		if (result) {
			clearInfoRegister();
			dispatch(navigate(Screens.DASHBOARD));
			return true;
		}
		return;
	}

	calculateAge(birthdate: string): number {
		const birthDate = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-password">
        <div class = "container-img"></div>
        <div class = "form-password">
          <div class = "container-logo">
						${SVG.LOGO}
            HandKid
          </div>
          <div class = "container-form">
            <div class = "title-password">New Password</div>
            <small class = "text-password">Make sure it has 8 characters or more</small>
            <form id = "form-info">
              <div class = "password-data">
                <input type = "password" placeholder = "Password" name = "password">
              </div>
              <div class = "title-password">Verify your Password</div>
              <div class = "verify-password">
                <input type = "password" placeholder = "Password" name = "passwordConfirmed">
              </div>
              <div class = "policy-container">
                <input type = "checkbox" id = "policy-check" name="policy-check">
                HandKid: Nurturing a Secure Sanctuary for Children. By joining our community, you affirm your commitment to uphold our rigorous security measures and respect our comprehensive privacy policy, ensuring a safe and enriching experience for all.
              </div>
              <div class = "btn-data">
                <input type = "submit" id = "password-password" value = "Sign Up">
              </div>
            </form>
          </div>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('single-card-password', SingleCardPassword);
export default SingleCardPassword;
