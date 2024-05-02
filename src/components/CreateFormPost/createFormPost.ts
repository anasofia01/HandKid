import styles from './createFormPost.css';

class CreateFormPost extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		const form = this.shadowRoot?.querySelector('#form-create-post') as HTMLFormElement;
		if (form) {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				this.dispatchEvent(
					new CustomEvent('form-submitted', {
						detail: formData,
						bubbles: true,
						composed: true,
					})
				);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
        <div class = "container-form">
          <form id = "form-create-post">
						<div class = "image-inputs">
							<input type = "text" placeHolder = "Add Media" name = "img1" required></input>
							<input type = "text" placeHolder = "Add Media" name = "img2" required></input>
						</div>
						<div>
							<textarea name="description" rows="10" cols="50" placeholder="Description" required></textarea>
						</div>
						<div class = "tag-inputs">
							<input type = "text" placeHolder = "Hashtags" name = "tags1" required></input>
							<input type = "text" placeHolder = "Hashtags" name = "tags2" required></input>
						</div>
						<div>
							<input type = "submit" id = "save-post" value = "save"></input>
						</div>
          </form>
        </div>
      `;
		}
	}
}

customElements.define('create-form-post', CreateFormPost);
export default CreateFormPost;
