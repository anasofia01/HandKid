import SingleCardPost from '../../components/SingleCardPost/singleCardPost';
import styles from './screenCardPost.css';
import { getPosts, getUserById, getUserLogin } from '../../utils/firebase';
import { dataPost } from '../../services/data';

class ScreenCardPost extends HTMLElement {
	cards: SingleCardPost[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.loadPosts();
	}

	async loadPosts() {
		const postContainer = this.shadowRoot?.querySelector('.posts-cards-container');
		const dataNewPost = await getPosts();
		if (postContainer) {
			/* dataNewPost.forEach((post: any) => { */
			for (const post of dataNewPost) {
				const postCard = this.ownerDocument.createElement('single-card-post') as SingleCardPost;
				const userInfo = await getUserById(post.user || '');
				console.log(userInfo.username);
				postCard.idPost = post.id;
				postCard.avatar = userInfo.avatar;
				postCard.name = userInfo.fullname;
				postCard.username = userInfo.username;
				postCard.description = post.description;
				postCard.timestamp = post.timestamp;
				/* postCard.hashtags = post.hashtags.map((tag: string) => tag.trim());
				postCard.media = post.media.map((media: string) => media.trim()); */
				postCard.likes = post.likes;
				postCard.comments = post.comments;
				postContainer.appendChild(postCard);
			}
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class = "posts-cards-container"></div>
				`;
		}
	}
}

customElements.define('screen-card-post', ScreenCardPost);
export default ScreenCardPost;
