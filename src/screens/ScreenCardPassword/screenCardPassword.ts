import styles from './screenCardPassword.css';

class ScreenCardPassword extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('screen-card-password', ScreenCardPassword);
export default ScreenCardPassword;
