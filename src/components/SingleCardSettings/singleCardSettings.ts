import styles from './singleCardSettings.css';
import { SVG } from '../../types/media';

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
						${SVG.ARROW}
					</div>
					<div class = "title-panel">Settings</div>
					<div class = "items-settings">
						<div class = "item-1">
							${SVG.EDIT_USER}
							<small>Edit Account Information</small>
						</div>
						<div class = "item-2">
							${SVG.KEY}
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
