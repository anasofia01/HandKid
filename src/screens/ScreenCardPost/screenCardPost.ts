import SingleCardPost from '../../components/SingleCardPost/singleCardPost';
import styles from './screenCardPost.css';
import { dataPost } from '../../data/data';

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

	loadPosts() {
		const postContainer = this.shadowRoot?.querySelector('.posts-cards-container');
		if (postContainer) {
			dataPost.forEach((post: any) => {
				const postCard = this.ownerDocument.createElement('single-card-post') as SingleCardPost;
				postCard.avatar = post.person.avatar;
				postCard.name = post.person.name;
				postCard.username = post.person.username;
				postCard.description = post.post.description;
				postCard.timestamp = post.post.timestamp;
				postCard.hashtags = post.post.hashtags.map((tag: string) => tag.trim());
				postCard.media = post.post.media.map((media: string) => media.trim());
				postCard.likes = post.post.likes;
				postCard.comments = post.post.comments;
				postContainer.appendChild(postCard);
			});
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
