import styles from './createFormComment.css';

class CreateFormComment extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		const form = this.shadowRoot?.querySelector('#form-create-comment') as HTMLFormElement;
		if (form) {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				const commentSave = formData.get('comment');
				this.dispatchEvent(
					new CustomEvent('comment-submitted', {
						detail: { commentSave },
						bubbles: true,
						composed: true,
					})
				);
				form.reset();
			});
		}
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
