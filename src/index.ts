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
			const logoContainer = this.ownerDocument.createElement('div');
			const logoHandkid = this.ownerDocument.createElement('span');
			logoHandkid.textContent = 'HandKid';

			logoContainer.appendChild(logoHandkid);
			this.shadowRoot?.appendChild(logoContainer);

			this.shadowRoot.innerHTML = `
      <nav-bar></nav-bar>
      <cards-container></cards-container>
      <container-friends></container-friends>
      `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('app-container', AppContainer);
