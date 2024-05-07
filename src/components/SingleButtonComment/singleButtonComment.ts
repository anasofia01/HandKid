class SingleButtonComment extends HTMLElement {
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
        <div class = "container-comment">
          <div class = "user-info">
            <img src = "" class = "avatar" alt = "avatar-user">
            <small class = "username">Username:</small>
          </div>
          <div class = "description-comment">
            <p class = "comment"></p>
          </div>
        </div>
      `;
		}
	}
}

customElements.define('single-button-comment', SingleButtonComment);
export default SingleButtonComment;
