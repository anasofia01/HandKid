import SingleCardFriend, { Attribute } from '../../components/SingleCardFriend/singleCardFriend';
import styles from './screenCardFriends.css';
import { dataFriends } from '../../services/data';

class ScreenCardFriends extends HTMLElement {
	users: SingleCardFriend[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.render();
		this.loadFriends();
	}

	loadFriends() {
		const friendsContainer = this.shadowRoot?.querySelector('.friends-cards-container');
		if (friendsContainer) {
			friendsContainer.innerHTML = '';
			dataFriends.forEach((friend: any) => {
				const friendComponent = this.ownerDocument.createElement('single-card-friend') as SingleCardFriend;
				friendComponent.avatar = friend.avatar;
				friendComponent.name = friend.name;
				friendComponent.username = friend.username;
				friendComponent.banner = friend.banner;
				friendComponent.age = friend.age;
				friendComponent.friends = friend.friends;
				friendsContainer.appendChild(friendComponent);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<style>${styles}</style>
			<div class = "container-friends">
				<div class = "friends-cards-container">
				</div>
			</div>
			`;
		}
	}
}

customElements.define('screen-card-friends', ScreenCardFriends);
export default ScreenCardFriends;
