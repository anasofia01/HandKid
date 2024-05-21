import SingleCardPost from '../../components/SingleCardPost/singleCardPost';
import styles from './screenCardPost.css';
import { getPosts, getUserById, getUserLogin } from '../../utils/firebase';
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

	async loadPosts() {}

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
