import styles from './editFormProfile.css';
import { onUserLogin, getUserById } from '../../utils/firebase';

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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#404040" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
				</div>
				<form id = "form-edit-profile">
					<div class = "image-inputs">
						<div class = "img-1">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
							<input type = "file" name = "banner"></input>
						</div>
						<div class = "img-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
							<input type = "file" name = "avatar"></input>
						</div>
					</div>
					<div>
						<textarea name = "description" id = "description" rows = "10" cols = "30" placeholder = "Profile Description"></textarea>
					</div>
					<div class = "tag-inputs">
						<div class = "tag-input1">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
							<input type = "text" placeholder = "Fullname" id = "fullname" name = "fullname" required></input>
						</div>
						<div class = "tag-input2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
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
