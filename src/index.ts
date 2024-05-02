import styles from './index.css';
import './components/index';
import './screens/index';
import { ProfileData } from './types/profileData';
import { PostData } from './types/postData';
import SingleCardProfile from './components/SingleCardProfile/singleCardProfile';
import { createPost } from './utils/firebase';

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
			const detail = (event as CustomEvent).detail;
			this.renderFriendProfile(detail);
		});
		this.addEventListener('add-post-clicked', () => this.renderForm());
		const logoElement = this.shadowRoot?.querySelector('.logo-container');
		if (logoElement) {
			logoElement.addEventListener('click', () => this.renderPost());
		}
	}

	renderMyProfile() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const profileContent = document.createElement('single-card-profile') as SingleCardProfile;
			profileContent.banner =
				'https://png.pngtree.com/background/20230524/original/pngtree-emojiees-with-different-expressions-on-a-table-picture-image_2710520.jpg';
			profileContent.avatar = 'https://i.pinimg.com/564x/06/1b/82/061b82351616561cddb942c7b64a6bd3.jpg';
			profileContent.name = 'El Matiassx';
			profileContent.username = '@Matixgr1212_';
			profileContent.age = 8;
			profileContent.friends = 5;
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

	renderForm() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const formContent = document.createElement('screen-form-post');
			container.appendChild(formContent);

			formContent.addEventListener('form-submitted', (event) => {
				const formInfo = (event as CustomEvent).detail;
				this.processFormData(formInfo);
			});
		}
	}

	async processFormData(formInfo: FormData) {
		const img1 = formInfo.get('img1') as string;
		const img2 = formInfo.get('img2') as string;
		const description = formInfo.get('description') as string;
		const tags1 = formInfo.get('tags1') as string;
		const tags2 = formInfo.get('tags2') as string;
		const postDataInfo: PostData = {
			user: '',
			description: description,
			timestamp: '',
			likes: 0,
			comments: 0,
			media: [img1, img2],
			hashtags: [tags1, tags2],
		};
		try {
			const result = await createPost(postDataInfo);
			alert('saved info');
		} catch (error) {
			alert('error');
			console.error(error);
		}
		this.renderPost();
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
