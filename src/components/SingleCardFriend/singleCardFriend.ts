import styles from './singleCardFriend.css';

export enum Attribute {
	'avatar' = 'avatar',
	'name' = 'name',
	'username' = 'username',
	'description' = 'description',
	'banner' = 'banner',
	'age' = 'age',
	'friends' = 'friends',
	'idFriend' = 'idFriend',
}

class SingleCardFriend extends HTMLElement {
	avatar?: string;
	name?: string;
	username?: string;
	description?: string;
	banner?: string;
	age?: number;
	friends?: number;
	idFriend?: string;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			avatar: null,
			name: null,
			username: null,
			description: null,
			banner: null,
			age: null,
			friends: null,
			idFriend: null,
		};
		return Object.keys(classAttribute);
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addEventListener('click', () => {
			this.dispatchEvent(
				new CustomEvent('friend-clicked', {
					detail: {
						avatar: this.avatar,
						name: this.name,
						username: this.username,
						description: this.description,
						banner: this.banner,
						age: this.age,
						friends: this.friends,
					},
					bubbles: true,
					composed: true,
				})
			);
		});
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		if (propName === Attribute.age || propName === Attribute.friends) {
			this[propName] = newValue ? Number(newValue) : undefined;
		} else {
			this[propName] = newValue;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
        <div class = "container-friend card-friend">
					<div class = "text-container">
						<span class = "friend-name"><b>${this.name}</b></span>
						<span class = "friend-username">${this.username}</span>
					</div>
					<div class = "avatar-container">
						<img src = "${this.avatar}" class = "avatar"></img>
					</div>
      	</div>
      `;
		}
	}
}

customElements.define('single-card-friend', SingleCardFriend);
export default SingleCardFriend;
