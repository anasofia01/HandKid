import styles from './userFriend.css';

export enum Attribute {
	'avatar' = 'avatar',
	'name' = 'name',
	'username' = 'username',
}

class UserFriends extends HTMLElement {
	avatar?: string;
	name?: string;
	username?: string;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			avatar: null,
			name: null,
			username: null,
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
          <div class = "friend-container>
            <div class = "frame">
            <img src = "${this.avatar}"></img>
            </div>
            <div class = "info-friend>
              <span>${this.name}</span>
              <span>${this.username}</span>
            </div>
          </div>
      `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('user-friends', UserFriends);
export default UserFriends;
