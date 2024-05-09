import styles from './screenCardRegister.css';
import '../../components/index';

class ScreenCardRegister extends HTMLElement {
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
      <div class = "container-register">

      </div>
      `;
		}
	}
}

customElements.define('screen-card-register', ScreenCardRegister);
export default ScreenCardRegister;
