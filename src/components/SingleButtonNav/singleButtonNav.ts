import styles from './singleButtonNav.css';
import { navigate } from '../../store/actions';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { logout } from '../../utils/firebase';
import { SVG } from '../../types/media';

class SingleButtonNav extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addProfileButtonListener();
		this.addHomeButtonListener();
		this.addFormButtonListener();
		this.addLogoutButtonListener();
	}

	addProfileButtonListener() {
		const profileButton = this.shadowRoot?.querySelector('#profile');
		if (profileButton) {
			profileButton.addEventListener('click', () => {
				this.dispatchEvent(new CustomEvent('profile-clicked', { bubbles: true, composed: true }));
			});
		}
	}

	addHomeButtonListener() {
		const homeButton = this.shadowRoot?.querySelector('#home');
		if (homeButton) {
			homeButton.addEventListener('click', () => {
				this.dispatchEvent(new CustomEvent('home-clicked', { bubbles: true, composed: true }));
			});
		}
	}

	addFormButtonListener() {
		const formButton = this.shadowRoot?.querySelector('#addPost');
		if (formButton) {
			formButton.addEventListener('click', () => {
				this.dispatchEvent(new CustomEvent('add-post-clicked', { bubbles: true, composed: true }));
			});
		}
	}

	addLogoutButtonListener() {
		const pageInit = this.shadowRoot?.querySelector('#logout');
		if (pageInit) {
			pageInit.addEventListener('click', async () => {
				await logout();
				dispatch(navigate(Screens.MAIN));
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class = "container-menu">
					<div class = "container-btn-home" id = "home">${SVG.HOME}</div>
					<div class = "container-btn-add" id = "addPost">${SVG.ADD}</div>
					<div class = "container-btn-profile" id = "profile">${SVG.PROFILE}</div>
					<div class = "container-btn-logout" id = "logout">${SVG.LOGOUT}</div>
				</div>
      `;
		}
	}
}

customElements.define('single-button-nav', SingleButtonNav);
export default SingleButtonNav;
