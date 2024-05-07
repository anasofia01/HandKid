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

	render() {}
}

customElements.define('app-container', AppContainer);
