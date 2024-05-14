import styles from './index.css';
import './screens/index';
import { addObserver } from './store';

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
		}
	}
}

customElements.define('app-container', AppContainer);
