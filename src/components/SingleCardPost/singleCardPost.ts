import styles from './singleCardPost.css';
import {
	getLikesById,
	onUserLogin,
	updateLikesById,
	checkedIfUserHasLike,
	addUserLikedToPost,
} from '../../utils/firebase';
import { SVG } from '../../types/media';

export enum Attribute {
	'idPost' = 'idPost',
	'avatar' = 'avatar',
	'name' = 'name',
	'username' = 'username',
	'description' = 'description',
	'timestamp' = 'timestamp',
	'hashtags' = 'hashtags',
	'media' = 'media',
	'likes' = 'likes',
	'comments' = 'comments',
	'liked' = 'liked',
	'images' = 'images',
	'tags' = 'tags',
}

class SingleCardPost extends HTMLElement {
	idPost?: string;
	avatar?: string;
	name?: string;
	username?: string;
	description?: string;
	timestamp?: string;
	hashtags?: Array<string>;
	media?: Array<string>;
	likes?: number;
	liked?: boolean;
	comments?: number;
	images?: string = '';
	tags?: string = '';
	private authUnsuscribe: (() => void) | null = null;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			idPost: null,
			avatar: null,
			name: null,
			username: null,
			description: null,
			timestamp: null,
			hashtags: null,
			media: null,
			likes: null,
			comments: null,
			liked: null,
			images: null,
			tags: null,
		};
		return Object.keys(classAttribute);
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	attributeChangedCallback(propName: Attribute, oldValue: any, newValue: any) {
		switch (propName) {
			case Attribute.likes:
				if (newValue) {
					this.likes = Number(newValue);
				} else {
					this.likes = undefined;
				}
				break;

			case Attribute.comments:
				if (newValue) {
					this.comments = Number(newValue);
				} else {
					this.comments = undefined;
				}
				break;

			case Attribute.hashtags:
				if (newValue) {
					this.hashtags = JSON.parse(newValue);
				} else {
					this.hashtags = undefined;
				}
				break;

			case Attribute.media:
				if (newValue) {
					this.media = JSON.parse(newValue);
				} else {
					this.media = undefined;
				}
				break;

			default:
				this[propName] = newValue;
				break;
		}
	}

	connectedCallback() {
		this.render();
		this.setUpCommentButtonListener();
		this.setUpLikeButtonListener();
	}

	desconectedCallback() {
		if (this.authUnsuscribe) {
			this.authUnsuscribe();
			this.authUnsuscribe = null;
		}
	}

	likePost() {
		this.authUnsuscribe = onUserLogin(async (userLogin) => {
			if (this.idPost) {
				if (userLogin) {
					const hasLikesBefore = await checkedIfUserHasLike(this.idPost, userLogin);
					if (hasLikesBefore) {
						alert('Already liked');
						return;
					}
					const likesPost = await getLikesById(this.idPost);
					if (likesPost !== null && likesPost !== undefined) {
						const newLikes = likesPost + 1;
						await updateLikesById(this.idPost, newLikes);
						await addUserLikedToPost(this.idPost, userLogin);
						this.likes = newLikes;
						this.liked = true;
						this.render();
						this.setUpCommentButtonListener();
					}
				}
			}
			if (this.authUnsuscribe) {
				this.authUnsuscribe();
				this.authUnsuscribe = null;
			}
		});
	}

	setUpCommentButtonListener() {
		const commentButton = this.shadowRoot?.querySelector('.btn-comment');
		if (commentButton) {
			commentButton.addEventListener('click', () => {
				const commentEvent = new CustomEvent('comment-clicked', {
					detail: {
						idPost: this.idPost,
						avatar: this.avatar,
						name: this.name,
						username: this.username,
						description: this.description,
						timestamp: this.timestamp,
						hashtags: this.hashtags,
						media: this.media,
						likes: this.likes,
						comments: this.comments,
						images: this.images,
						tags: this.tags,
					},
					bubbles: true,
					composed: true,
				});
				this.dispatchEvent(commentEvent);
			});
		}
	}

	setUpLikeButtonListener() {
		const likeButton = this.shadowRoot?.querySelector('.btn-like');
		if (likeButton) {
			likeButton.addEventListener('click', this.likePost.bind(this));
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="container-info">
					<div class="post-info-head">
						<img class="avatar" src="${this.avatar}" alt="avatar user"></img>
						<span><b>${this.name}</b></span>
						<span class="span-head span-username">${this.username}</span>
						<span class="span-head span-timestamp">${this.timestamp}</span>
					</div>
					<div class="post-info-body">
						<div class="post-description">
							${this.description}
						</div>
						<div class="post-images">
							${this.media?.map((image) => `<img src="${image}" alt="Image">`).join('') ?? ''}
						</div>
						<div class="post-hashtag">
							${this.hashtags?.map((tag) => `<span>${tag}</span>`).join('') ?? ''}
						</div>
					</div>
					<div class="container-buttons-interaction">
						<div class="icon-button btn-comment">
							${SVG.COMMENT}
						</div>
						<span>${this.comments}</span>
						<div class="icon-button btn-like">
							${
								this.liked
									? `
									${SVG.LIKE1}
							`
									: `
									${SVG.LIKE2}
							`
							}
						</div>
						<span>${this.likes}</span>
					</div>
			</div>
    `;
		}
	}
}

customElements.define('single-card-post', SingleCardPost);
export default SingleCardPost;
