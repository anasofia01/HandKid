import styles from './screenCardPassword.css';

class ScreenCardPassword extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-password">
      </div>
      `;
		}
	}
}

customElements.define('screen-card-password', ScreenCardPassword);
export default ScreenCardPassword;
