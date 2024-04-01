import UserFriends, { Attribute } from '../userFriend/userFriend';
import styles from './containerFriends.css';
import { dataFriends } from '../../../data/data';

class ContainerFriends extends HTMLElement {
	users: UserFriends[] = [];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.render();
		this.getValueData();
	}

	getValueData() {
		const dataInfo = dataFriends.map((user: any) => {
			const userComponent = this.ownerDocument.createElement('user-friends') as UserFriends;
			userComponent.setAttribute(Attribute.avatar, user.person.avatar);
			userComponent.setAttribute(Attribute.name, user.person.name);
			userComponent.setAttribute(Attribute.username, user.person.username);
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
			this.shadowRoot?.appendChild(containerTitle);

			const containerFriends = this.ownerDocument.createElement('section');
			this.users.forEach((component) => {
				containerFriends.appendChild(component);
				this.shadowRoot?.appendChild(containerFriends);
			});
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('container-friends', ContainerFriends);
export default ContainerFriends;
