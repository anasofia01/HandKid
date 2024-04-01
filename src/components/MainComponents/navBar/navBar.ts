import ButtonNav, { Attribute } from '../buttonNav/buttonNav';
import SingleCardPost from '../singleCardPost/singleCardPost';
import styles from './navBar.css';

class NavBar extends HTMLElement {
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
			<button-nav id = "user"><i class = "fa-solid fa-user></i>"></button-nav>
			<button-nav id = "addPost"><i class = "fa-light fa-circle-plus"></i></button-nav>
			<button-nav id = "home"><i class = "fa-solid fa-house"></i></button-nav>
			<button-nav id = "chat"><i class = "fa-solid fa-comments"></i></button-nav>
			<button-nav id = "settings"><i class = "fa-solid fa-gear"></i></button-nav>
			`;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('nav-bar', NavBar);
export default NavBar;
