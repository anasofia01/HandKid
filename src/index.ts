import styles from './index.css';
import './components/index';
import './screens/index';
import { ProfileData } from './types/profileData';
import SingleCardProfile from './components/SingleCardProfile/singleCardProfile';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.renderPost();
		this.addEventListener('profile-clicked', () => this.renderMyProfile());
		this.addEventListener('home-clicked', () => this.renderPost());
		this.addEventListener('friend-clicked', (event) => {
			console.log('holi');
			const detail = (event as CustomEvent).detail;
			this.renderFriendProfile(detail);
		});
	}

	renderMyProfile() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const profileContent = document.createElement('single-card-profile');
			container.appendChild(profileContent);
		}
	}

	renderPost() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const postContent = document.createElement('screen-card-post');
			container.appendChild(postContent);
		}
	}

	renderFriendProfile(profileData: ProfileData) {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			console.log(profileData.friends);
			container.innerHTML = '';
			const profileContent = document.createElement('single-card-profile') as SingleCardProfile;
			profileContent.banner = profileData.banner;
			profileContent.avatar = profileData.avatar;
			profileContent.name = profileData.name;
			profileContent.username = profileData.username;
			profileContent.age = Number(profileData.age);
			profileContent.friends = Number(profileData.friends);
			container.appendChild(profileContent);
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="main-container">
					<div class="logo-container">
						<h1>HandKid</h1>
					</div>
					<div class="column1">
						<screen-nav-bar></screen-nav-bar>
					</div>
					<div class="column2">
					</div>
					<div class="column3">
						<screen-card-friends></screen-card-friends>
					</div>
				</div>
      `;
		}
	}
}

customElements.define('app-container', AppContainer);
