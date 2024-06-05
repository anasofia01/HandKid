import styles from './editFormPassword.css';
import { SVG } from '../../types/media';

class EditFormPassword extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.setUpFormSubmit();
		this.addListenerArrow();
	}

	setUpFormSubmit() {
		const form = this.shadowRoot?.querySelector('#form-edit-password') as HTMLFormElement;
		if (form) {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				this.dispatchEvent(
					new CustomEvent('form-edit-password-submitted', {
						detail: formData,
						bubbles: true,
						composed: true,
					})
				);
			});
		}
	}

	addListenerArrow() {
		const arrowBtn = this.shadowRoot?.querySelector('.arrow-left');
		if (arrowBtn) {
			arrowBtn.addEventListener('click', () => {
				this.dispatchEvent(
					new CustomEvent('settings-clicked', {
						bubbles: true,
						composed: true,
					})
				);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-form">
				<div class = "arrow-left">
					${SVG.ARROW}
				</div>
        <form id = "form-edit-password">
          <div class = "email-input">
						${SVG.AT}
            <input type = "email" name = "email" id = "email" placeholder = "Email" required></input>
          </div>
          <div>
            <input type = "submit" id = "edit-save" value = "Save"></input>
          </div>
        </form>
      </div>
      `;
		}
	}
}

customElements.define('edit-form-password', EditFormPassword);
export default EditFormPassword;
