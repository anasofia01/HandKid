import styles from './screenCardRegister.css';

class ScreenCardRegister extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('screen-card-register', ScreenCardRegister);
export default ScreenCardRegister;
