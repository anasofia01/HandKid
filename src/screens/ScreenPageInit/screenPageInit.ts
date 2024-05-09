import styles from './screenPageInit.css';

class ScreenPageInit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('screen-page-init', ScreenPageInit);
export default ScreenPageInit;
