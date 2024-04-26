import SingleCardFriend, { Attribute } from '../../components/SingleCardFriend/singleCardFriend';
import styles from './screenCardFriends.css';
import { dataFriends } from '../../data/data';

class ScreenCardFriends extends HTMLElement {
	users: SingleCardFriend[] = [];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.getValueData();
	}
	connectedCallback() {
		this.render();
	}

	getValueData() {
		dataFriends.forEach((user: any) => {
			const userComponent = this.ownerDocument.createElement('single-card-friend') as SingleCardFriend;
			userComponent.setAttribute(Attribute.avatar, user.avatar);
			userComponent.setAttribute(Attribute.name, user.name);
			userComponent.setAttribute(Attribute.username, user.username);
			this.users.push(userComponent);
		});
	}

	render() {
		if (this.shadowRoot) {
			const containerTitle = this.ownerDocument.createElement('div');
			const titleFriends = this.ownerDocument.createElement('h3');
			titleFriends.textContent = 'Friends';
			const iconSearch = this.ownerDocument.createElement('i');
			iconSearch.className = 'fa-solid fa-magnifying-glass';

			containerTitle.appendChild(titleFriends);
			containerTitle.appendChild(iconSearch);

			const containerFriends = this.ownerDocument.createElement('section');
			containerFriends.appendChild(containerTitle);
			containerFriends.className = 'container-friends';
			this.users.forEach((component) => {
				containerFriends.appendChild(component);
			});

			this.shadowRoot?.appendChild(containerFriends);
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('screen-card-friends', ScreenCardFriends);
export default ScreenCardFriends;
