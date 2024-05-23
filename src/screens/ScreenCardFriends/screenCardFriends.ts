import SingleCardFriend, { Attribute } from '../../components/SingleCardFriend/singleCardFriend';
import styles from './screenCardFriends.css';
import { dataFriends } from '../../services/data';
import { getFriends, getUserLogin } from '../../utils/firebase';

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

	async loadFriends() {
		const friendsContainer = this.shadowRoot?.querySelector('.friends-cards-container');
		if (friendsContainer) {
			const userLogin = await getUserLogin();
			if (userLogin) {
				const friends = await getFriends(userLogin);
				friendsContainer.innerHTML = '';
				let count = 0;
				for (let i = 0; i < friends.length && count <= 5; i++) {
					const friend = friends[i];
					const friendComponent = this.ownerDocument.createElement('single-card-friend') as SingleCardFriend;
					friendComponent.avatar = friend.avatar;
					friendComponent.name = friend.fullname;
					friendComponent.username = friend.username;
					friendComponent.description = friend.description ?? '';
					friendComponent.banner = friend.banner;
					friendComponent.age = friend.age;
					friendComponent.friends = friend.friends;
					friendComponent.idFriend = friend.idFriend;
					friendsContainer.appendChild(friendComponent);
					count++;
				}
			}
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<style>${styles}</style>
			<div class = "container-friends">
			<div class="search">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
				<b>Potential Friends</b>
			</div>
			<div class = "friends-cards-container"></div>
		</div>
			`;
		}
	}
}

customElements.define('screen-card-friends', ScreenCardFriends);
export default ScreenCardFriends;
