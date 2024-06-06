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
	uploadImages,
} from '../../utils/firebase';
import { SingleButtonComment, SingleCardPost } from '../../components/index';
import { navigate } from '../../store/actions';
import { dispatch } from '../../store';
import { Screens } from '../../types/navigation';
import { SVG } from '../../types/media';

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
			alert('Unable to send mail');
		}
	}

	processFormDataEdit(formInfo: FormData) {
		const result = onUserLogin(async (userLogin) => {
			if (userLogin) {
				const description = formInfo.get('description') as string;
				const fullname = formInfo.get('fullname') as string;
				const username = formInfo.get('username') as string;
				const avatar = formInfo.get('avatar') as File;
				const banner = formInfo.get('banner') as File;
				try {
					let imgAvatarUrl: string | undefined;
					let imgBannerUrl: string | undefined;
					if (avatar.name) {
						imgAvatarUrl = await uploadImages(avatar, `users/${avatar.name}`);
					}
					if (banner.name) {
						imgBannerUrl = await uploadImages(banner, `users/${banner.name}`);
					}
					const userDataEdit: UserData = {
						username: username,
						fullname: fullname,
						description: description,
					};
					if (imgAvatarUrl) {
						userDataEdit.avatar = imgAvatarUrl;
					}
					if (imgBannerUrl) {
						userDataEdit.banner = imgBannerUrl;
					}
					await updateUserInfo(userLogin, userDataEdit);
					alert('The information was successfully edited');
				} catch (error) {
					alert('Profile not updated');
				}
				this.renderPost();
			}
			result();
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

	renderMyProfile() {
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

	renderFriendProfile(profileData: ProfileData) {
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

	processFormData(formInfo: FormData) {
		const result = onUserLogin(async (userLogin) => {
			if (userLogin) {
				const img1 = formInfo.get('img1') as File;
				const img2 = formInfo.get('img2') as File;
				const description = formInfo.get('description') as string;
				const tags1 = '#' + (formInfo.get('tags1') as string);
				const tags2 = '#' + (formInfo.get('tags2') as string);
				const datePost = new Date();
				try {
					const img1Url = await uploadImages(img1, `images/${img1.name}`);
					const img2Url = await uploadImages(img2, `images/${img2.name}`);
					const postDataInfo: PostData = {
						user: userLogin,
						description: description,
						timestamp: datePost.toISOString(),
						likes: 0,
						comments: 0,
						media: [img1Url, img2Url],
						hashtags: [tags1, tags2],
					};
					const result = await createPost(postDataInfo);
					alert('Saved Info');
				} catch (error) {
					alert('Error');
					console.error(error);
				}
				this.renderPost();
			}
			result();
		});
	}

	addComment(detail: CommentsData) {
		const userLoginResult = onUserLogin(async (userLogin) => {
			const postResult = getPostById(detail.idPost, async (postData) => {
				if (postData) {
					const userResult = getUserById(postData.user || '', async (userData) => {
						const container = this.shadowRoot?.querySelector('.column2');
						if (container && postData && userLogin && userData) {
							container.innerHTML = '';
							this.addNewContainers(container);
							this.addContainerCardPost(postData, userData, userLogin);
							this.addContainerFormComment(postData.id);
							this.listComments(postData.id);
						}
					});
				}
			});
		});
	}

	addNewContainers(container: any) {
		const newDiv1 = document.createElement('div');
		newDiv1.className = 'postsDiv';
		container.appendChild(newDiv1);

		const newDiv2 = document.createElement('div');
		newDiv2.className = 'formDiv';
		container.appendChild(newDiv2);

		const newDiv3 = document.createElement('div');
		newDiv3.className = 'commentsDiv';
		container.appendChild(newDiv3);
	}

	async addContainerCardPost(postData: PostData, userData: UserData, userLogin: any) {
		const container = this.shadowRoot?.querySelector('.postsDiv');
		if (container) {
			const postCard = document.createElement('single-card-post') as SingleCardPost;
			const hasLikesBefore = await checkedIfUserHasLike(postData.id || '', userLogin);

			if (hasLikesBefore) {
				postCard.liked = true;
			} else {
				postCard.liked = false;
			}

			postCard.idPost = postData.id;
			postCard.avatar = userData.avatar;
			postCard.name = userData.fullname;
			postCard.username = userData.username;
			postCard.description = postData.description;
			postCard.timestamp = postData.timestamp;
			postCard.hashtags = postData.hashtags ? postData.hashtags.map((tag: string) => tag.trim()) : [];
			postCard.media = postData.media ? postData.media.map((media: string) => media.trim()) : [];
			postCard.likes = postData.likes;
			postCard.comments = postData.comments;
			container.appendChild(postCard);
		}
	}

	addContainerFormComment(idPost: any) {
		const container = this.shadowRoot?.querySelector('.formDiv');
		if (container) {
			const formComment = document.createElement('create-form-comment');
			container.appendChild(formComment);

			formComment.addEventListener('comment-submitted', async (event: any) => {
				const comment = event.detail.comment;
				await this.addCommentToPost(comment, idPost);
			});
		}
	}

	addCommentToPost(comment: string, idPost: string) {
		const unsubscribe = onUserLogin(async (userLogin) => {
			if (userLogin) {
				await addCommentToPost(idPost, comment, userLogin);
				const commentsPost = await getCommentById(idPost);
				if (commentsPost !== null && commentsPost !== undefined) {
					const newComments = commentsPost + 1;
					await updateCommentsById(idPost, newComments);
				}
			}
			unsubscribe();
		});
	}

	listComments(idPost: any) {
		const unsubscribe = getCommentsById(idPost, (comments) => {
			const container = this.shadowRoot?.querySelector('.commentsDiv');
			if (container && comments) {
				container.innerHTML = '';
				comments.forEach(async (comment: any) => {
					const unsubscribeUser = getUserById(comment.userId, (userData) => {
						const commentItem = this.ownerDocument.createElement('single-button-comment') as SingleButtonComment;
						if (userData) {
							commentItem.comment = comment.text;
							commentItem.avatar = userData.avatar;
							commentItem.username = userData.username;
							container.appendChild(commentItem);
						} else {
							alert('User not found');
						}
					});
				});
			}
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="main-container">
					<div class="logo-container">
						${SVG.LOGO}
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
						${SVG.FRIENDS_MENU}
					</div>
					<div class = "phone-menu">
						${SVG.BURGER_MENU}
					</div>
				</div>
      `;
		}
	}
}

customElements.define('screen-dashboard', ScreenDashboard);
export default ScreenDashboard;
