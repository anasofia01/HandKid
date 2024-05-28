import styles from './editFormProfile.css';
import { UserData } from '../../types/userData';
import { getUserLogin, getUserById } from '../../utils/firebase';

class EditFormProfile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}
