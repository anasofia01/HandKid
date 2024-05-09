import styles from './screenCardLogin.css';

class ScreenCardLogin extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('screen-card-login', ScreenCardLogin);
export default ScreenCardLogin;
