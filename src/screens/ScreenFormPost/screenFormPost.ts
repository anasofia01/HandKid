import styles from './screenFormPost.css';
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
			<style>${styles}</style>
      <div class = "container-form">
        <create-form-post></create-form-post>
      </div>
    `;
		}
	}
}

customElements.define('screen-form-post', ScreenFormPost);
export default ScreenFormPost;
