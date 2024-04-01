import styles from './buttonNav.css';

export enum Attribute {
	'iconUser' = 'iconUser',
	'iconAddPost' = 'iconAddPost',
	'iconHome' = 'iconHome',
	'iconMessage' = 'iconMessage',
	'iconSettings' = 'iconSettings',
}

class ButtonNav extends HTMLElement {
	iconUser?: string;
	iconAddPost?: string;
	iconHome?: string;
	iconMessage?: string;
	iconSettings?: string;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			iconUser: null,
			iconAddPost: null,
			iconHome: null,
			iconMessage: null,
			iconSettings: null,
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
        <div class = "container-buttons">
          <button><img src = "${this.iconUser}"></button>
          <button><img src = "${this.iconAddPost}"></button>
          <button><img src = "${this.iconHome}"></button>
          <button><img src = "${this.iconMessage}"></button>
          <button><img src = "${this.iconSettings}"></button>
        </div>
      `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('button-nav', ButtonNav);
export default ButtonNav;
