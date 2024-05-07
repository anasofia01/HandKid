class CreateFormComment extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}
	render() {}
}

customElements.define('create-form-comment', CreateFormComment);
export default CreateFormComment;
