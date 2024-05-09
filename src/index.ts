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
		this.shadowRoot?.addEventListener('register-view-clicked', () => this.renderRegister());
		this.shadowRoot?.addEventListener('log-in-clicked', () => this.renderDashboard());
		this.shadowRoot?.addEventListener('register-next-clicked', () => this.renderPassword());
	}

	renderPageInit() {
		const container = this.shadowRoot?.querySelector('.app-container');
		if (container) {
			container.innerHTML = '';
			const screenPage = document.createElement('screen-page-init');
			container.appendChild(screenPage);
		}
	}

	renderLogin() {
		const container = this.shadowRoot?.querySelector('.app-container');
		if (container) {
			container.innerHTML = '';
			const screenLogin = document.createElement('screen-card-login');
			container.appendChild(screenLogin);
		}
	}

	renderRegister() {
		const container = this.shadowRoot?.querySelector('.app-container');
		if (container) {
			container.innerHTML = '';
			const screenRegister = document.createElement('screen-card-register');
			container.appendChild(screenRegister);
		}
	}

	renderPassword() {
		const container = this.shadowRoot?.querySelector('.app-container');
		if (container) {
			container.innerHTML = '';
			const screenPassword = document.createElement('screen-card-password');
			container.appendChild(screenPassword);
		}
	}

	renderDashboard() {
		const container = this.shadowRoot?.querySelector('.app-container');
		if (container) {
			container.innerHTML = '';
			const screenDashboard = document.createElement('screen-dashboard');
			container.appendChild(screenDashboard);
		}
	}

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
