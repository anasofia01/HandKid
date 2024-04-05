import styles from './index.css';
import './components/index';

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
      

	  <div class="body">
			<div class = "logo-container">
				<h1>HandKid</h1>
			</div>
				<nav-bar></nav-bar>

				<cards-container></cards-container>
				<container-friends></container-friends>
				
	  </div>
      `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('app-container', AppContainer);
