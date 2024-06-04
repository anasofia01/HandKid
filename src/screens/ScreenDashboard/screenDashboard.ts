import styles from './screenDashboard.css';
import '../../components/index';
import '../../screens/index';
import { ProfileData } from '../../types/profileData';
import { UserData } from '../../types/userData';
import { PostData } from '../../types/postData';
import { CommentsData } from '../../types/commentsData';
import SingleCardProfile from '../../components/SingleCardProfile/singleCardProfile';
import {
	createPost,
	addCommentToPost,
	getPostById,
	getCommentsById,
	getCommentById,
	updateCommentsById,
	getUserById,
	onUserLogin,
	checkedIfUserHasLike,
	checkedIfUserIsFriend,
	updateUserInfo,
	resetPassword,
	logout,
} from '../../utils/firebase';
import { SingleButtonComment, SingleCardPost } from '../../components/index';
import { navigate } from '../../store/actions';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';

class ScreenDashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.renderPost();
		this.setUpEventListener();
		this.setUpLogoClickedListener();
		this.setUpPhoneMenuListener();
	}

	setUpEventListener() {
		this.addEventListener('profile-clicked', () => this.renderMyProfile());
		this.addEventListener('home-clicked', () => this.renderPost());
		this.addEventListener('friend-clicked', (event) => {
			const detail = (event as CustomEvent).detail;
			this.renderFriendProfile(detail);
		});
		this.addEventListener('add-post-clicked', () => this.renderForm());
		this.addEventListener('comment-clicked', (event) => {
			const detail = (event as CustomEvent).detail;
			this.addComment(detail);
		});
		this.addEventListener('edit-profile-clicked', this.renderFormEdit.bind(this));
		this.addEventListener('settings-clicked', this.renderSettings.bind(this));
		this.addEventListener('edit-password-clicked', this.renderFormEditPassword.bind(this));
	}

	renderFormEdit() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const formContent = document.createElement('screen-form-edit');
			container.appendChild(formContent);
			formContent.addEventListener('form-edit-submitted', (event) => {
				const formInfo = (event as CustomEvent).detail;
				this.processFormDataEdit(formInfo);
			});
		}
	}

	renderFormEditPassword() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const formContent = document.createElement('screen-edit-password');
			container.appendChild(formContent);
			formContent.addEventListener('form-edit-password-submitted', (event) => {
				const formInfo = (event as CustomEvent).detail;
				this.processFormEditPassword(formInfo);
			});
		}
	}

	async processFormEditPassword(formInfo: FormData) {
		const email = formInfo.get('email') as string;
		const result = await resetPassword(email);
		if (result) {
			await logout();
			dispatch(navigate(Screens.MAIN));
		} else {
			alert('No se pudo enviar el correo');
		}
	}

	processFormDataEdit(formInfo: FormData) {
		const result = onUserLogin(async (userLogin) => {
			if (userLogin) {
				const description = formInfo.get('description') as string;
				const fullname = formInfo.get('fullname') as string;
				const username = formInfo.get('username') as string;
				const userDataEdit: UserData = {
					username: username,
					fullname: fullname,
					description: description,
				};
				try {
					await updateUserInfo(userLogin, userDataEdit);
					alert('Se editó la información con éxito');
				} catch (error) {
					alert('No se actualizó el perfil');
				}
				this.renderPost();
			}
		});
	}

	setUpLogoClickedListener() {
		const logoElement = this.shadowRoot?.querySelector('.logo-container');
		if (logoElement) {
			logoElement.addEventListener('click', () => this.renderPost());
		}
	}

	setUpPhoneMenuListener() {
		const getPhoneMenu = this.shadowRoot?.querySelector('.phone-menu');
		if (getPhoneMenu) {
			getPhoneMenu.addEventListener('click', () => this.renderPhoneMenu());
		}
		const getPhoneFriends = this.shadowRoot?.querySelector('.phone-friends');
		if (getPhoneFriends) {
			getPhoneFriends.addEventListener('click', () => this.renderPhoneFriends());
		}
	}

	renderContent(containerSelector: string, elementTag: string) {
		const container = this.shadowRoot?.querySelector(containerSelector);
		if (container) {
			container.innerHTML = '';
			const newElement = document.createElement(elementTag);
			container.appendChild(newElement);
		}
	}

	renderPost() {
		this.renderContent('.column2', 'screen-card-post');
	}

	renderSettings() {
		this.renderContent('.column2', 'screen-card-settings');
	}

	renderPhoneMenu() {
		this.renderContent('.column2', 'screen-nav-bar');
	}

	renderPhoneFriends() {
		this.renderContent('.column2', 'screen-card-friends');
	}

	async renderMyProfile() {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const profileContent = document.createElement('single-card-profile') as SingleCardProfile;
			const result = onUserLogin(async (userLogin) => {
				if (userLogin) {
					const result = getUserById(userLogin, (userInfo) => {
						if (userInfo) {
							profileContent.banner = userInfo.banner;
							profileContent.avatar = userInfo.avatar;
							profileContent.name = userInfo.fullname;
							profileContent.username = userInfo.username;
							profileContent.description = userInfo.description ?? '';
							profileContent.age = userInfo.age;
							profileContent.friends = userInfo.friends;
							profileContent.btnEdit = true;
							profileContent.btnAddFriends = false;
							container.appendChild(profileContent);
						} else {
							alert('The Profile Information could not be obtained');
						}
					});
				}
			});
		}
	}

	async renderFriendProfile(profileData: ProfileData) {
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			container.innerHTML = '';
			const profileContent = document.createElement('single-card-profile') as SingleCardProfile;
			const result = onUserLogin(async (userLogin) => {
				if (userLogin) {
					const hasFriendBefore = await checkedIfUserIsFriend(profileData.idFriend || '', userLogin);
					if (hasFriendBefore) {
						profileContent.btnAddFriends = false;
						profileContent.isFriend = true;
					} else {
						profileContent.btnAddFriends = true;
					}
				}
				const result = getUserById(profileData.idFriend || '', (dataUser) => {
					if (dataUser) {
						profileContent.banner = dataUser?.banner;
						profileContent.avatar = dataUser?.avatar;
						profileContent.name = dataUser?.fullname;
						profileContent.username = dataUser?.username;
						profileContent.description = dataUser?.description || '';
						profileContent.age = Number(dataUser?.age);
						profileContent.friends = dataUser?.friends;
						profileContent.btnEdit = false;
						profileContent.idFriend = dataUser?.idFriend;
						container.appendChild(profileContent);
					}
				});
			});
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
		const result = onUserLogin(async (userLogin) => {
			const img1 = formInfo.get('img1') as string;
			const img2 = formInfo.get('img2') as string;
			const description = formInfo.get('description') as string;
			const tags1 = formInfo.get('tags1') as string;
			const tags2 = formInfo.get('tags2') as string;
			const datePost = new Date();
			if (userLogin) {
				const postDataInfo: PostData = {
					user: userLogin,
					description: description,
					timestamp: datePost.toISOString(),
					likes: 0,
					comments: 0,
					media: [img1, img2],
					hashtags: [tags1, tags2],
				};
				try {
					const result = await createPost(postDataInfo);
					alert('Saved Info');
				} catch (error) {
					alert('Error');
					console.error(error);
				}
				this.renderPost();
			}
		});
	}

	async addComment(detail: CommentsData) {
		const userLoginResult = onUserLogin(async (userLogin) => {
			const postResult = getPostById(detail.idPost, async (postData) => {
				if (postData) {
					const userResult = getUserById(postData.user || '', async (userData) => {
						const container = this.shadowRoot?.querySelector('.column2');
						if (container && postData && userLogin && userData) {
							container.innerHTML = '';
							this.addNewContainers(container);
						}
					});
				}
			});
			// const container = this.shadowRoot?.querySelector('.column2');
			// if (container) {
			/* container.innerHTML = '';
				const postCard = document.createElement('single-card-post') as SingleCardPost;
				const formComment = document.createElement('create-form-comment');
				if (userLogin) {
					const hasLikesBefore = await checkedIfUserHasLike(detail.idPost || '', userLogin);
					if (hasLikesBefore) {
						postCard.liked = true;
					} else {
						postCard.liked = false;
					}
				}
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

				formComment.addEventListener('comment-submitted', async (event: any) => {
					const comment = event.detail.comment;
					await this.addCommentToPost(comment, detail.idPost);
					postCard.comments = (postCard.comments || 0) + 1;
					postCard.render();
				});

				this.updateCommentsList(detail.idPost); */
			// }
		});
	}

	addNewContainers() {}

	async addCommentToPost(comment: string, idPost: string) {
		const result = onUserLogin(async (userLogin) => {
			if (userLogin) {
				await addCommentToPost(idPost, comment, userLogin);
				const commentsPost = await getCommentById(idPost);
				if (commentsPost !== null && commentsPost !== undefined) {
					const newComments = commentsPost + 1;
					await updateCommentsById(idPost, newComments);
				}
				await this.updateCommentsList(idPost);
			}
		});
	}

	async updateCommentsList(idPost: string) {
		const comments = await getCommentsById(idPost);
		const container = this.shadowRoot?.querySelector('.column2');
		if (container) {
			if (comments) {
				const commentElements = container.querySelectorAll('.comment');
				commentElements.forEach((element) => {
					element.remove();
				});
				comments.forEach(async (comment: any) => {
					const commentItem = this.ownerDocument.createElement('single-button-comment') as SingleButtonComment;
					commentItem.classList.add('comment');

					const unsubscribe = getUserById(comment.userId, (userData) => {
						if (userData) {
							commentItem.comment = comment.text;
							commentItem.avatar = userData.avatar;
							commentItem.username = userData.username;
							container.appendChild(commentItem);
						} else {
							console.log('Usuario no encontrado');
						}
					});
				});
			}
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="main-container">
					<div class="logo-container">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>
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
