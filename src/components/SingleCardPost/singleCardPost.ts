import styles from './singleCardPost.css';

export enum Attribute {
	'avatar' = 'avatar',
	'name' = 'name',
	'username' = 'username',
	'description' = 'description',
	'timestamp' = 'timestamp',
	'hashtags' = 'hashtags',
	'media' = 'media',
	'likes' = 'likes',
	'comments' = 'comments',
	'images' = 'images',
	'tags' = 'tags',
}

class SingleCardPost extends HTMLElement {
	avatar?: string;
	name?: string;
	username?: string;
	description?: string;
	timestamp?: string;
	hashtags?: Array<string>;
	media?: Array<string>;
	likes?: number;
	comments?: number;
	images?: string = '';
	tags?: string = '';

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			avatar: null,
			name: null,
			username: null,
			description: null,
			timestamp: null,
			hashtags: null,
			media: null,
			likes: null,
			comments: null,
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
		this.shadowRoot?.querySelector('.btn-like')?.addEventListener('click', this.likePost.bind(this));
	}

	likePost() {
		this.likes = (this.likes || 0) + 1;
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="container-info">
					<div class="post-info-head">
						<img class="avatar" src="${this.avatar}"></img>
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
						<button class="icon-button btn-comment"></button>
						<span>${this.comments}</span>
						<button class="icon-button btn-like"></button>
						<span>${this.likes}</span>
					</div>
			</div>
    `;
		}
	}
}

customElements.define('single-card-post', SingleCardPost);
export default SingleCardPost;
