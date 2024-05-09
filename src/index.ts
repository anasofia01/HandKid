import styles from './index.css';
import './screens/index';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.renderPageInit();
		this.shadowRoot?.addEventListener('login-view-clicked', () => this.renderLogin());
	}

	renderPageInit() {
		const container = this.shadowRoot?.querySelector('.app-container');
		if (container) {
			container.innerHTML = '';
			const screenPage = document.createElement('screen-page-init');
			container.appendChild(screenPage);
		}
	}

	renderLogin() {}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <style>${styles}</style>
				<div class = "app-container"></div>
      `;
		}
	}
}

customElements.define('app-container', AppContainer);
