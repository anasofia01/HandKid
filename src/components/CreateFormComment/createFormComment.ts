import styles from './createFormComment.css';

class CreateFormComment extends HTMLElement {
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
      `;
		}
	}
}

customElements.define('create-form-comment', CreateFormComment);
export default CreateFormComment;
