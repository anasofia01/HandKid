import styles from './containerFriends.css';

class ContainerFriends extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.render();
	}

	render() {
		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('container-friends', ContainerFriends);
export default ContainerFriends;
