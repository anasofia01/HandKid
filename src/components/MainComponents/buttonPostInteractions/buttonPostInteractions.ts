import styles from './buttonPostInteractions.css';

export enum PostAttribute {
	'iconImage' = 'iconImage',
	'digitButton' = 'digitButton',
}

class ButtonPostInteractions extends HTMLElement {
	iconImage?: string;
	digitButton?: number;

	static get observedAttributes() {
		const classPostAttribute: Record<PostAttribute, null> = {
			iconImage: null,
			digitButton: null,
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
			case PostAttribute.digitButton:
				if (newValue) {
					this.digitButton = Number(newValue);
				} else {
					this.digitButton = undefined;
				}
				break;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <div class = "container-button">
          <div class = "button-comment">
            <button src = "${this.iconImage}"></button>
            <span>${this.digitButton}</span>
          </div>
          <div class = "button-like">
          <button src = "${this.iconImage}"></button>
          <span>${this.digitButton}</span>
        </div>
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
