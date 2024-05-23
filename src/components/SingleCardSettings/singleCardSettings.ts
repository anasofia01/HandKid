import styles from './singleCardSettings.css';

class SingleCardSettings extends HTMLElement {
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
      `;
		}
	}
}

customElements.define('single-card-settings', SingleCardSettings);
export default SingleCardSettings;
