import ButtonNav from '../buttonNav/buttonNav';
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
			<button-nav iconGeneral = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"></button-nav>
			<button-nav iconGeneral = "https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png"></button-nav>
			<button-nav iconGeneral = "https://cdn-icons-png.flaticon.com/512/25/25694.png"></button-nav>
			<button-nav iconGeneral = "https://static.vecteezy.com/system/resources/previews/005/337/802/non_2x/icon-symbol-chat-outline-illustration-free-vector.jpg"></button-nav>
			<button-nav iconGeneral = "https://static-00.iconduck.com/assets.00/settings-icon-1964x2048-8nigtrtt.png"></button-nav>
			`;
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('nav-bar', NavBar);
export default NavBar;
