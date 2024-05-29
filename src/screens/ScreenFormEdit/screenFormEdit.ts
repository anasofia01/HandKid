import styles from './screenFormEdit.css';
import '../../components/index';

class ScreenFormEdit extends HTMLElement {
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
        <edit-form-profile></edit-form-profile>
      </div>
      `;
		}
	}
}

customElements.define('screen-form-edit', ScreenFormEdit);
export default ScreenFormEdit;
