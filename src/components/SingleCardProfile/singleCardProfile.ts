import styles from './singleCardProfile.css';

class SingleCardProfile extends HTMLElement {
	banner?: string;
	avatar?: string;
	name?: string;
	username?: string;
	age?: number;
	friends?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'banner') {
			this.banner = newValue;
		} else if (name === 'avatar') {
			this.avatar = newValue;
		} else if (name === 'name') {
			this.name = newValue;
		} else if (name === 'username') {
			this.username = newValue;
		} else if (name === 'age') {
			this.age = newValue ? Number(newValue) : undefined;
		} else if (name === 'friends') {
			this.friends = newValue ? Number(newValue) : undefined;
		}

		this.render();
	}

	static get observedAttributes() {
		return ['banner', 'avatar', 'name', 'username', 'age', 'friends'];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class = "container-profile">
          <div class = "head-container">
            <img class = "banner" src = "${this.banner}">
            <img class = "avatar" src = "${this.avatar}">
          </div>
          <div class = "info-user-container">
            <span class = "span-name">${this.name}</span>
            <span class = "span-user-name">${this.username}</span>
          </div>
          <div class = "footer-container">
            <span class = "span-age">Age: ${this.age}</span>
            <span class = "span-friends">Friends: ${this.friends}</span>
          </div>
        </div>
      `;
		}
	}
}

customElements.define('single-card-profile', SingleCardProfile);
export default SingleCardProfile;
