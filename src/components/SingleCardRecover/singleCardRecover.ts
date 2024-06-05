import styles from './singleCardRecover.css';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { navigate } from '../../store/actions';
import { resetPassword } from '../../utils/firebase';
import { SVG } from '../../types/media';

class SingleCardRecover extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addRecoverListener();
		this.buttonListenerMain();
	}

	addRecoverListener() {
		const form = this.shadowRoot?.querySelector('#form-info');
		if (form) {
			form.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	buttonListenerMain() {
		const mainButton = this.shadowRoot?.querySelector('.main');
		if (mainButton) {
			mainButton.addEventListener('click', () => {
				dispatch(navigate(Screens.MAIN));
			});
		}
	}

	async handleSubmit(event: any) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const email = formData.get('email') as string;
		const result = await resetPassword(email);
		if (result) {
			alert('An email was sent to you to reset your password.');
			dispatch(navigate(Screens.LOGIN));
			return;
		} else {
			alert('There was a problem, it was not sent.');
			dispatch(navigate(Screens.RECOVER));
			return;
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-recover">
        <div class = "container-img"></div>
        <div class = "form-recover">
          <div class = "container-logo">
						${SVG.LOGO}
            HandKid
          </div>
          <div class = "container-form">
            <div class = "title-recover">Recover Password</div>
            <form id = "form-info">
              <div class = "email-data">
                <input type = "email" placeholder = "Email" name = "email" required>
              </div>
              <div class = "btn-data">
                <input type = "submit" id = "recover" value = "Recover">
              </div>
            </form>
						<div class = "return-main">
							<small class = "main"><b>Return to Main</b></small>
						</div>
          </div>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('single-card-recover', SingleCardRecover);
export default SingleCardRecover;
