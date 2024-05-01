class CreateFormPost extends HTMLElement {
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
        <div class = "container-form">
          <form>
            <input type = "text" placeHolder = "Add Media" name = "img2"></input>
            <input type = "text" placeHolder = "Add Media" name = "img1"></input>
            <input type = "text" placeHolder = "Description" name = "description"></input>
            <input type = "text" placeHolder = "Hashtags" name = "tags1"></input>
            <input type = "text" placeHolder = "Hashtags" name = "tags2"></input>
          </form>
        </div>
      `;
		}
	}
}

customElements.define('create-form-post', CreateFormPost);
export default CreateFormPost;
