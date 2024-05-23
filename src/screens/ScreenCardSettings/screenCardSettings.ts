import styles from './screenCardSettings.css';

class ScreenCardSettings extends HTMLElement {
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
      <div class = "container-settings">
        <single-card-settings></single-card-settings>
      </div>
      `;
		}
	}
}

customElements.define('screen-card-settings', ScreenCardSettings);
export default ScreenCardSettings;
