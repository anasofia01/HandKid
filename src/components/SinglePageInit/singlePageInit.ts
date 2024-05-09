import styles from './singlePageInit.css';

class SinglePageInit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('single-page-init', SinglePageInit);
export default SinglePageInit;
