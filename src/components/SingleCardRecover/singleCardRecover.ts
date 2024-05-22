import styles from './singleCardRecover.css';

class SingleCardRecover extends HTMLElement {
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

customElements.define('single-card-recover', SingleCardRecover);
export default SingleCardRecover;
