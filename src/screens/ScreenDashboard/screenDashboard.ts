import styles from './screenDashboard.css';
import '../../components/index';
import '../../screens/index';
import { ProfileData } from '../../types/profileData';
import { PostData } from '../../types/postData';
import { CommentsData } from '../../types/commentsData';
import SingleCardProfile from '../../components/SingleCardProfile/singleCardProfile';
import { createPost } from '../../utils/firebase';
import { SingleCardPost } from '../../components/index';

class ScreenDashboard extends HTMLElement {
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
		const getPhoneMenu = this.shadowRoot?.querySelector('.phone-menu');
		if (getPhoneMenu) {
			getPhoneMenu.addEventListener('click', () => this.renderPhoneMenu());
		}
		const getPhoneFriends = this.shadowRoot?.querySelector('.phone-friends');
		if (getPhoneFriends) {
			getPhoneFriends.addEventListener('click', () => this.renderPhoneFriends());
		}

		this.addEventListener('comment-clicked', (event) => {
			const detail = (event as CustomEvent).detail;
			this.addComment(detail);
		});
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
		const datePost = new Date();
		const postDataInfo: PostData = {
			user: '',
			description: description,
			timestamp: datePost.toISOString(),
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

	renderPhoneMenu() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const menu = document.createElement('screen-nav-bar');
			container.appendChild(menu);
		}
	}

	renderPhoneFriends() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const friendsView = document.createElement('screen-card-friends');
			container.appendChild(friendsView);
		}
	}

	addComment(detail: CommentsData) {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const postCard = document.createElement('single-card-post') as SingleCardPost;
			const formComment = document.createElement('create-form-comment');
			postCard.idPost = detail.idPost;
			postCard.avatar = detail.avatar;
			postCard.name = detail.name;
			postCard.username = detail.username;
			postCard.description = detail.description;
			postCard.timestamp = detail.timestamp;
			postCard.hashtags = detail.hashtags.map((tag: string) => tag.trim());
			postCard.media = detail.media.map((media: string) => media.trim());
			postCard.likes = detail.likes;
			postCard.comments = detail.comments;
			container.appendChild(postCard);
			container.appendChild(formComment);

			formComment.addEventListener('comment-submitted', (event: any) => {
				const comment = event.detail.comment;
			});
		}
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
					<div class = "phone-friends">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
					</div>
					<div class = "phone-menu">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
					</div>
				</div>
      `;
		}
	}
}

customElements.define('screen-dashboard', ScreenDashboard);
export default ScreenDashboard;
