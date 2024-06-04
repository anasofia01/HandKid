import styles from './singleCardSettings.css';

class SingleCardSettings extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addListenerFormEdit();
		this.addListenerFormEditPassword();
		this.addListenerArrow();
	}

	addListenerFormEdit() {
		const editBtn = this.shadowRoot?.querySelector('.item-1');
		if (editBtn) {
			editBtn.addEventListener('click', () => {
				this.dispatchEvent(
					new CustomEvent('edit-profile-clicked', {
						bubbles: true,
						composed: true,
					})
				);
			});
		}
	}

	addListenerFormEditPassword() {
		const passwordBtn = this.shadowRoot?.querySelector('.item-2');
		if (passwordBtn) {
			passwordBtn.addEventListener('click', () => {
				this.dispatchEvent(
					new CustomEvent('edit-password-clicked', {
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
					new CustomEvent('profile-clicked', {
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
			<div class = "main-container">
				<div class = "container-settings">
					<div class = "arrow-left">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#404040" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
					</div>
					<div class = "title-panel">Settings</div>
					<div class = "items-settings">
						<div class = "item-1">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#404040" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
							<small>Edit Account Information</small>
						</div>
						<div class = "item-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#404040" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>
							<small>Change your password</small>
						</div>
					</div>
				</div>
			</div>
      `;
		}
	}
}

customElements.define('single-card-settings', SingleCardSettings);
export default SingleCardSettings;
