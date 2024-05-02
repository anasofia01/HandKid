import styles from './singleButtonNav.css';

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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class = "container-menu">
					<button class = "btnMenu" id = "home">Home</button>
					<button class = "btnMenu" id = "addPost">Add Post</button>
					<button class = "btnMenu" id = "profile">Profile</button>
				</div>
      `;
		}
	}
}

customElements.define('single-button-nav', SingleButtonNav);
export default SingleButtonNav;
