import styles from './singleButtonComment.css';

export enum Attribute {
	'avatar' = 'avatar',
	'username' = 'username',
	'comment' = 'comment',
}

class SingleButtonComment extends HTMLElement {
	avatar?: string;
	username?: string;
	comment?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			avatar: null,
			username: null,
			comment: null,
		};
		return Object.keys(classAttribute);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<style>${styles}</style>
        <div class = "container-comment">
          <div class = "user-info">
            <img src = "${this.avatar}" class = "avatar" alt = "avatar-user">
            <small class = "username">@chloe.laMasBonita</small>
          </div>
          <div class = "description-comment">
            <p class = "comment">${this.comment}</p>
          </div>
        </div>
      `;
		}
	}
}

customElements.define('single-button-comment', SingleButtonComment);
export default SingleButtonComment;
