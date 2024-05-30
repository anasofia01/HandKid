import styles from './screenEditPassword.css';
import '../../components/index';

class ScreenEditPassword extends HTMLElement {
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
      <div class = "container-form">
        <edit-form-password></edit-form-password>
      </div>
      `;
		}
	}
}

customElements.define('screen-edit-password', ScreenEditPassword);
export default ScreenEditPassword;
