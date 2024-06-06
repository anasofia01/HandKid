import styles from './editFormProfile.css';
import { onUserLogin, getUserById } from '../../utils/firebase';
import { SVG } from '../../types/media';

class EditFormProfile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		await this.loadUserData();
		this.render();
		this.setUpFormSubmit();
		this.addListenerArrow();
	}

	async loadUserData() {
		const result = onUserLogin(async (userLogin) => {
			if (userLogin) {
				const result = getUserById(userLogin, (userData) => {
					if (userData) {
						const fullnameInput = this.shadowRoot?.querySelector('#fullname') as HTMLFormElement;
						if (fullnameInput) {
							fullnameInput.value = userData?.fullname || '';
						}
						const usernameInput = this.shadowRoot?.querySelector('#username') as HTMLFormElement;
						if (usernameInput) {
							usernameInput.value = userData?.username || '';
						}
						const descriptionInput = this.shadowRoot?.querySelector('#description') as HTMLFormElement;
						if (descriptionInput) {
							descriptionInput.value = userData?.description || '';
						}
					} else {
						alert('No Found User');
					}
				});
			}
		});
	}

	setUpFormSubmit() {
		const form = this.shadowRoot?.querySelector('#form-edit-profile') as HTMLFormElement;
		if (form) {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				this.dispatchEvent(
					new CustomEvent('form-edit-submitted', {
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
				<form id = "form-edit-profile">
					<div class = "image-inputs">
						<div class = "img-1">
							${SVG.IMG}
							<small>Upload Banner Image:</small>
							<input type = "file" name = "banner"></input>
						</div>
						<div class = "img-2">
							${SVG.IMG}
							<small>Upload Avatar Image:</small>
							<input type = "file" name = "avatar"></input>
						</div>
					</div>
					<div>
						<textarea name = "description" id = "description" rows = "10" cols = "30" placeholder = "Profile Description"></textarea>
					</div>
					<div class = "tag-inputs">
						<div class = "tag-input1">
							${SVG.TAG}
							<input type = "text" placeholder = "Fullname" id = "fullname" name = "fullname" required></input>
						</div>
						<div class = "tag-input2">
							${SVG.TAG}
							<input type = "text" placeholder = "Username" id = "username" name = "username" required></input>
						</div>
					</div>
					<div>
					 <input type = "submit" id = "save-profile" value = "Edit Profile"></input>
					</div>
				</form>
			</div>
      `;
		}
	}
}

customElements.define('edit-form-profile', EditFormProfile);
export default EditFormProfile;
