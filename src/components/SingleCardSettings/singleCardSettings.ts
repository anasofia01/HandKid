import styles from './singleCardSettings.css';

class SingleCardSettings extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('single-card-settings', SingleCardSettings);
export default SingleCardSettings;
