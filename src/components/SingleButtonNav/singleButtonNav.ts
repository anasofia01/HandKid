import styles from './singleButtonNav.css';

class SingleButtonNav extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<button class = "ayuda"><img alt = "User Icon" src = "../../resource/user-solid.svg">Hola</button>
				<button class = "ayuda"><img src = "https://www.nicepng.com/png/full/781-7812300_icono-persona-circle.png">Hola</button>
				<button class = "ayuda"><img src = "https://www.nicepng.com/png/full/781-7812300_icono-persona-circle.png">Hola</button>
				<button class = "ayuda"><img src = "https://www.nicepng.com/png/full/781-7812300_icono-persona-circle.png">Hola</button>
				<button class = "ayuda"><img src = "https://www.nicepng.com/png/full/781-7812300_icono-persona-circle.png">Hola</button>
      `;
		}
	}
}

customElements.define('single-button-nav', SingleButtonNav);
export default SingleButtonNav;
