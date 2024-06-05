import SingleCardFriend, { Attribute } from '../../components/SingleCardFriend/singleCardFriend';
import styles from './screenCardFriends.css';
import { onUserLogin, getFriends } from '../../utils/firebase';
import { addObserver, dispatch, appState } from '../../store';
import { getFriendsAction } from '../../store/actions';
import { SVG } from '../../types/media';

class ScreenCardFriends extends HTMLElement {
	users: SingleCardFriend[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		/* if (appState.friends.length === 0) {
			const action = await getFriendsAction();
			dispatch(action);
		} else { */
		this.render();
		// }
	}

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<style>${styles}</style>
			<div class = "container-friends">
			<div class="search">
				${SVG.IS_FRIEND}
				<b>Potential Friends</b>
			</div>
				<div class = "friends-cards-container"></div>
			</div>
			`;
			const friendsContainer = this.shadowRoot?.querySelector('.friends-cards-container');
			if (friendsContainer) {
				const result = onUserLogin(async (userLogin) => {
					if (userLogin) {
						friendsContainer.innerHTML = '';
						// const friends = appState.friends;
						const friends = await getFriends(userLogin);
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
				});
			}
		}
	}
}

customElements.define('screen-card-friends', ScreenCardFriends);
export default ScreenCardFriends;
