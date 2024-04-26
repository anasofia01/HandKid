import styles from './index.css';
import './components/index';
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
				<div class="main-container">
					<div class="logo-container">
						<h1>HandKid</h1>
					</div>
					<div class="column1">
						<screen-nav-bar></screen-nav-bar>
					</div>
					<div class="column2">
						<screen-card-post></screen-card-post>
					</div>
					<div class="column3">
						<screen-card-friends></screen-card-friends>
					</div>
				</div>
      `;
		}
	}
}

customElements.define('app-container', AppContainer);
