import styles from './screenCardRecover.css';
import '../../components/index';

class ScreenCardRecover extends HTMLElement {
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
      <div class = "container-recover">
        <single-card-recover></single-card-recover>
      </div>
      `;
		}
	}
}

customElements.define('screen-card-recover', ScreenCardRecover);
export default ScreenCardRecover;
