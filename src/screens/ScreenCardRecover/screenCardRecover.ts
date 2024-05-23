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

      `;
		}
	}
}

customElements.define('screen-card-recover', ScreenCardRecover);
export default ScreenCardRecover;
