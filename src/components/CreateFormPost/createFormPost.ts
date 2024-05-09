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
							<div class = "img-1">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
								<input type = "text" placeHolder = "Add Media" name = "img1"></input>
							</div>
							<div class = "img-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
								<input type = "text" placeHolder = "Add Media" name = "img2"></input>
							</div>
						</div>
						<div>
							<textarea name="description" rows="10" cols="50" placeholder="Description"></textarea>
						</div>
						<div class = "tag-inputs">
							<div class = "tag-input1">
								<input type = "text" placeHolder = "Hashtags" name = "tags1"></input>
							</div>
							<div class = "tag-input2">
								<input type = "text" placeHolder = "Hashtags" name = "tags2"></input>
							</div>
						</div>
						<div>
							<input type = "submit" id = "save-post" value = "Post"></input>
						</div>
          </form>
        </div>
      `;
		}
	}
}

customElements.define('create-form-post', CreateFormPost);
export default CreateFormPost;
