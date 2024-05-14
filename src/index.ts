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
			console.log(appState.screen);
			switch (appState.screen) {
				case Screens.MAIN:
					const initView = this.ownerDocument.createElement('screen-page-init');
			}
		}
	}
}

customElements.define('app-container', AppContainer);
