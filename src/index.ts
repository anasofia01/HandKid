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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64V261.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75H296h8c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5V160c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2V96c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1c0 0 0-.1 0-.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16V95.9c0 0 0 .1 0 .1V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16v55.9c0 0 0 .1 0 .1v80c0 13.3 10.7 24 24 24s24-10.7 24-24V160.1c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16V332.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2H296h-8.5c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z"/></svg>
						HandKid
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
