import styles from './buttonNav.css';

export enum Attribute {
	'icongeneral' = 'icongeneral',
}

class ButtonNav extends HTMLElement {
	icongeneral?: string;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			icongeneral: null,
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
          <button><icon-component iconimage = "${this.icongeneral}"></icon-component></button>
      `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('button-nav', ButtonNav);
export default ButtonNav;
