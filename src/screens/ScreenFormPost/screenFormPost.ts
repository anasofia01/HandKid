import '../../components/index';

class ScreenFormPost extends HTMLElement {
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
        <create-form-post></create-form-post>
      </div>
    `;
		}
	}
}

customElements.define('screen-form-post', ScreenFormPost);
export default ScreenFormPost;
