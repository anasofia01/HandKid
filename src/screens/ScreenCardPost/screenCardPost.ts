import SingleCardPost from '../../components/SingleCardPost/singleCardPost';
import styles from './screenCardPost.css';
import { getPosts } from '../../utils/firebase';

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
			dataNewPost.forEach((post: any) => {
				console.log(post);
				const postCard = this.ownerDocument.createElement('single-card-post') as SingleCardPost;
				postCard.idPost = post.id;
				postCard.avatar = 'https://i.pinimg.com/474x/75/23/31/752331da9e7d5256b512f92c6de24849.jpg';
				postCard.name = 'El Guapito';
				postCard.username = '@guapito.2304';
				postCard.description = post.description;
				postCard.timestamp = post.timestamp;
				postCard.hashtags = post.hashtags.map((tag: string) => tag.trim());
				postCard.media = post.media.map((media: string) => media.trim());
				postCard.likes = post.likes;
				postCard.comments = post.comments;
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
