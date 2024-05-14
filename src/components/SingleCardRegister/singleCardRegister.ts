import styles from './singleCardRegister.css';
import { setInfoRegister } from '../../utils/storage';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/navigation';

class SingleCardRegister extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addNextListener();
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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-register">
        <div class = "container-img">
        </div>
        <div class = "form-register">
          <div class = "container-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>
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
          </div>
        </div>
        `;
		}
	}
}

customElements.define('single-card-register', SingleCardRegister);
export default SingleCardRegister;
