import styles from './singleCardEdit.css';

class SingleCardEdit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('single-card-edit', SingleCardEdit);
export default SingleCardEdit;
