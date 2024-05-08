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
      <div class = "container-form">
        <form id = "form-create-comment" class = "grid-form">
          <div class = "comment-text">
            <textarea name = "comment" placeholder = "Comment Here" required></textarea>
          </div>
          <div class = "btn-form">
            <input type = "submit" id = "save-comment" value = "Send">
          </div>
        </form>
      </div>
      `;
		}
	}
}

customElements.define('create-form-comment', CreateFormComment);
export default CreateFormComment;
