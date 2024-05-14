import styles from './index.css';
import './screens/index';
import { addObserver, appState } from './store';
import { Screens } from './types/navigation';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			switch (appState.screen) {
				case Screens.MAIN:
					const initView = this.ownerDocument.createElement('screen-page-init');
					this.shadowRoot?.appendChild(initView);
					break;
				case Screens.LOGIN:
					const loginView = this.ownerDocument.createElement('screen-card-login');
					this.shadowRoot?.appendChild(loginView);
					break;
				case Screens.REGISTER:
					const registerView = this.ownerDocument.createElement('screen-card-register');
					this.shadowRoot?.appendChild(registerView);
					break;
				case Screens.PASSWORD:
					const passwordView = this.ownerDocument.createElement('screen-card-password');
					this.shadowRoot?.appendChild(passwordView);
					break;
				case Screens.DASHBOARD:
					const dashboardView = this.ownerDocument.createElement('screen-dashboard');
					this.shadowRoot?.appendChild(dashboardView);
					break;
			}
		}
	}
}

customElements.define('app-container', AppContainer);
