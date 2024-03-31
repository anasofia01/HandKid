import styles from './singleCardPost.css';

export enum Attribute {
	'avatar' = 'avatar',
	'name' = 'name',
	'username' = 'username',
	'description' = 'description',
	'timestamp' = 'timestamp',
	'hashtags' = 'hashtags',
	'mentions' = 'mentions',
	'media' = 'media',
}

class SingleCardPost extends HTMLElement {
	avatar?: string;
	name?: string;
	username?: string;
	description?: string;
	timestamp?: string;
	hashtags?: string;
	mentions?: string;
	media?: string;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			avatar: null,
			name: null,
			username: null,
			description: null,
			timestamp: null,
			hashtags: null,
			mentions: null,
			media: null,
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

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;

		this.render();
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
						<span>${this.hashtags}</span>
						<div class = "image-post">
							<img src = "${this.media}"></img>
						</div>
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
