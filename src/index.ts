import styles from './index.css';
import './screens/index';

class AppContainer extends HTMLElement {
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
				<single-card-login></single-card-login>

      `;
			// <screen-dashboard></screen-dashboard>
		}
	}
}

customElements.define('app-container', AppContainer);
