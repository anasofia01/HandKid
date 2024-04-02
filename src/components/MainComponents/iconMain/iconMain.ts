export enum Attribute {
	'iconImage' = 'iconImage',
	'size' = 'size',
	'color' = 'color',
}

class IconComponent extends HTMLElement {
	iconImage?: string;
	size?: string = '24';
	color?: string = 'black';

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			iconImage: null,
			size: null,
			color: null,
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
      <img src = "${this.iconImage}"></img>
      `;
		}
	}
}

customElements.define('icon-component', IconComponent);
export default IconComponent;

//xmlns='http://www.w3.org/2000/svg'
//width='${this.size}'height='${this.size}'viewBox='0 0 24 24'fill='none'stroke='${this.color}'
/*stroke-width='2'
stroke-linecap='round'
stroke-linejoin='round'
class='feather feather-user'
>
<use href='feather-sprite.svg#icon-user' />
</svg> */
