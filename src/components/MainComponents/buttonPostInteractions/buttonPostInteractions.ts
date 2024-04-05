import styles from './buttonPostInteractions.css';

export enum PostAttribute {
	'iconimage' = 'iconimage',
	'digitbutton' = 'digitbutton',
}

class ButtonPostInteractions extends HTMLElement {
	iconimage?: string;
	digitbutton?: number;

	static get observedAttributes() {
		const classPostAttribute: Record<PostAttribute, null> = {
			iconimage: null,
			digitbutton: null,
		};
		return Object.keys(classPostAttribute);
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: PostAttribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case PostAttribute.digitbutton:
				if (newValue) {
					this.digitbutton = Number(newValue);
				} else {
					this.digitbutton = undefined;
				}
				break;

			default:
				this[propName] = newValue;
				break;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
          <div class = "button-comment">
            <button class= "icon-button"><img class= "icon-img"src = ${this.iconimage}></img></button>
            <span>${this.digitbutton}</span>
          </div>
    `;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('button-interactions', ButtonPostInteractions);
export default ButtonPostInteractions;
