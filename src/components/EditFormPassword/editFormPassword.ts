import styles from './editFormPassword.css';

class EditFormPassword extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}

customElements.define('edit-form-password', EditFormPassword);
export default EditFormPassword;
