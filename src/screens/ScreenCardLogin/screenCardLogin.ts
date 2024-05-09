import styles from './screenCardLogin.css';
import '../../components/index';

class ScreenCardLogin extends HTMLElement {
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
      <div class = "container-login">
        <single-card-login></single-card-login>
      </div>
      `;
		}
	}
}

customElements.define('screen-card-login', ScreenCardLogin);
export default ScreenCardLogin;
