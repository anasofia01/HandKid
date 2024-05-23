import SingleCardPost from '../../components/SingleCardPost/singleCardPost';
import styles from './screenCardPost.css';
import { getPosts, getUserById, getUserLogin, checkedIfUserHasLike } from '../../utils/firebase';
import { dataPost } from '../../services/data';
import { addObserver, appState, dispatch } from '../../store';
import { getPostsAction } from '../../store/actions';

class ScreenCardPost extends HTMLElement {
	cards: SingleCardPost[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		if (appState.post.length === 0) {
			const action = await getPostsAction();
			dispatch(action);
		} else {
			this.render();
		}
	}

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class = "posts-cards-container"></div>
				`;
		}
		const postContainer = this.shadowRoot?.querySelector('.posts-cards-container');
		if (postContainer) {
			for (const post of appState.post) {
				const postCard = this.ownerDocument.createElement('single-card-post') as SingleCardPost;
				const userInfo = await getUserById(post.user || '');
				const userLogin = await getUserLogin();
				if (userLogin) {
					const hasLikesBefore = await checkedIfUserHasLike(post.id || '', userLogin);
					if (hasLikesBefore) {
						postCard.liked = true;
					} else {
						postCard.liked = false;
					}
				}
				postCard.idPost = post.id;
				postCard.avatar = userInfo.avatar;
				postCard.name = userInfo.fullname;
				postCard.username = userInfo.username;
				postCard.description = post.description;
				postCard.timestamp = post.timestamp;
				postCard.hashtags = post.hashtags?.map((tag: string) => tag.trim());
				postCard.media = post.media?.map((media: string) => media.trim());
				postCard.likes = post.likes;
				postCard.comments = post.comments;
				postContainer.appendChild(postCard);
			}
		}
	}
}

customElements.define('screen-card-post', ScreenCardPost);
export default ScreenCardPost;
