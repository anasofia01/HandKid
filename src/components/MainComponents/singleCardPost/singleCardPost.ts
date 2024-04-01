import ButtonPostInteractions, { PostAttribute } from '../buttonPostInteractions/buttonPostInteractions';
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
	images?: string;
	tags?: string;

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
		this.createImages();
		this.createHashtags();
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.likes:
				if (newValue) {
					this.likes = Number(newValue);
				} else {
					this.likes = undefined;
				}
				break;
		}

		switch (propName) {
			case Attribute.comments:
				if (newValue) {
					this.comments = Number(newValue);
				} else {
					this.comments = undefined;
				}
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
				<figure>
					<div class = "container-info">
						<div class = "frame">
							<img src = "${this.avatar}"></img>
						</div>
						<div class = "user-info">
							<span>${this.name}</span>
							<span>${this.username}</span>
							<span>${this.timestamp}</span>
						</div>
						<p>${this.description}</p>
						<span>${this.tags}</span>
						<div class = "image-post">
							${this.images}
						</div>
						<button-interactions iconBefore = "https://cdn-icons-png.freepik.com/256/1077/1077035.png"
						iconAfter = "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png"
						digit = "${this.likes}">
						</button-interactions>
						<button-interactions iconGeneral = "https://cdn.iconscout.com/icon/free/png-256/free-comment-2652894-2202811.png" digit = "${this.comments}"></button-interactions>
					</div>
				</figure>
    `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('single-card-post', SingleCardPost);
export default SingleCardPost;
