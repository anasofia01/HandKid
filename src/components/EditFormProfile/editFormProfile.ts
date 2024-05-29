import styles from './editFormProfile.css';
import { UserData } from '../../types/userData';
import { onUserLogin, getUserById } from '../../utils/firebase';

class EditFormProfile extends HTMLElement {
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
      `;
		}
	}
}

customElements.define('edit-form-profile', EditFormProfile);
export default EditFormProfile;
