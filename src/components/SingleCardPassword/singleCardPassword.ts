import styles from './singleCardPassword.css';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { navigate } from '../../store/actions';
import { getInfoRegister, clearInfoRegister } from '../../utils/storage';
import { UserData } from '../../types/userData';
import { createUser } from '../../utils/firebase';

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
			alert('La contraseña debe tener al menos 8 caracteres');
			return;
		}
		if (passwordConfirm !== password) {
			alert('Las contraseñas no coinciden, verifica');
			return;
		}
		if (!policyCheck.checked) {
			alert('Por favor acepta las políticas de privacidad');
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>
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
