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

	connectedCallback() {
		this.render();
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
					this.createHashtags();
				} else {
					this.hashtags = undefined;
				}
				break;

			case Attribute.media:
				if (newValue) {
					this.media = JSON.parse(newValue);
					this.createImages();
				} else {
					this.media = undefined;
				}
				break;

			default:
				this[propName] = newValue;
				break;
		}

		this.render();
	}

	createHashtags() {
		this.hashtags?.forEach((hashtag) => {
			this.tags = this.tags + `<span>${hashtag}</span>`;
		});
	}

	createImages() {
		this.media?.forEach((image) => {
			this.images = this.images + `<img src='${image}'></img>`;
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div>
					<div class = "container-info">
						<div class = "post-info">
							<img src = "${this.avatar}"></img>
							<span>${this.name}</span>
							<span>${this.username}</span>
							<span>${this.timestamp}</span>
							<p>${this.description}</p>
							<div class = "hashtag-post">${this.tags}</div>
						</div>
						<div class = "image-post">
							${this.images}
						</div>
						<div class="container-buttonInteraction">
							<button class= "icon-button"><img class= "icon-img"src = ""></button>
							<span>${this.comments}</span>
							<button class= "icon-button"><img class= "icon-img"src = ""></button>
							<span>${this.likes}</span>
						</div>
				</div>
			</div>
    `;
		}
	}
}

customElements.define('single-card-post', SingleCardPost);
export default SingleCardPost;
