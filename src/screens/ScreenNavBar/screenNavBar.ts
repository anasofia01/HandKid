import '../../components/index';
import styles from './screenNavBar.css';

class ScreenNavBar extends HTMLElement {
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
				<single-button-nav></single-button-nav>
			`;
		}
	}
}

customElements.define('screen-nav-bar', ScreenNavBar);
export default ScreenNavBar;
