import styles from './screenPageInit.css';
import '../../components/index';

class ScreenPageInit extends HTMLElement {
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
      <div class = "container-page-init"></div>
      `;
		}
	}
}

customElements.define('screen-page-init', ScreenPageInit);
export default ScreenPageInit;
