import styles from './singleCardProfile.css';
import { onUserLogin, addFriendToUser, getFriendsById, updateFriendsListById } from '../../utils/firebase';
import { SVG } from '../../types/media';

class SingleCardProfile extends HTMLElement {
	banner?: string;
	avatar?: string;
	name?: string;
	username?: string;
	description?: string;
	age?: number;
	friends?: number;
	btnEdit?: boolean;
	btnAddFriends?: boolean;
	idFriend?: string;
	isFriend?: boolean;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'banner') {
			this.banner = newValue;
		} else if (name === 'avatar') {
			this.avatar = newValue;
		} else if (name === 'name') {
			this.name = newValue;
		} else if (name === 'username') {
			this.username = newValue;
		} else if (name === 'description') {
			this.description = newValue;
		} else if (name === 'age') {
			this.age = newValue ? Number(newValue) : undefined;
		} else if (name === 'friends') {
			this.friends = newValue ? Number(newValue) : undefined;
		} else if (name === 'btnEdit') {
			this.btnEdit = newValue === 'true';
		} else if (name === 'btnAddFriends') {
			this.btnAddFriends = newValue === 'true';
		} else if (name === 'idFriend') {
			this.idFriend = newValue;
		}
		this.render();
	}

	static get observedAttributes() {
		return [
			'banner',
			'avatar',
			'name',
			'username',
			'description',
			'age',
			'friends',
			'btnEdit',
			'btnAddFriends',
			'idFriend',
		];
	}

	connectedCallback() {
		this.render();
		this.shadowRoot?.querySelector('.btn-friends')?.addEventListener('click', this.addFriends.bind(this));
		this.addListenerSettings();
	}

	addListenerSettings() {
		const settingsBtn = this.shadowRoot?.querySelector('.btn-setting');
		if (settingsBtn) {
			settingsBtn.addEventListener('click', () => {
				this.dispatchEvent(
					new CustomEvent('settings-clicked', {
						bubbles: true,
						composed: true,
					})
				);
			});
		}
	}

	async addFriends() {
		const result = onUserLogin(async (userLogin) => {
			if (userLogin) {
				await addFriendToUser(this.idFriend || '', userLogin);
				this.btnAddFriends = false;
				this.isFriend = true;
				const friendUsers = await getFriendsById(userLogin);
				const userFriend = await getFriendsById(this.idFriend || '');
				if (friendUsers !== null && friendUsers !== undefined) {
					const newFriends = friendUsers + 1;
					if (userFriend !== null && userFriend !== undefined) {
						const newFriendsUser = userFriend + 1;
						await updateFriendsListById(this.idFriend || '', newFriendsUser);
						this.friends = newFriendsUser;
					}
					await updateFriendsListById(userLogin, newFriends);
					this.render();
				}
			}
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class = "container-profile">
          <div class = "head-container">
            <img class = "banner" src = "${this.banner}" alt = "banner user">
            <img class = "avatar" src = "${this.avatar}" alt = "avatar user">
          </div>
					${
						this.btnEdit
							? `
					<div class = "btn-edit-settings">
						<div class = "btn-setting">
							${SVG.ADD2}
							Settings
						</div>
					</div>
					`
							: ''
					}
					${
						this.btnAddFriends
							? `
					<div class = "btn-add-friends">
						<div class = "btn-friends">
							${SVG.FRIENDS}
							Add Friend
						</div>
					</div>
					`
							: ''
					}
					${
						this.isFriend
							? `
					<div class = "btn-add-friends">
						<div class = "btn-is-friends">
							${SVG.IS_FRIEND}
							Friends
						</div>
					</div>
					`
							: ''
					}
          <div class = "info-user-container">
            <span class = "span-name"><b>${this.name}</b></span>
            <span class = "span-user-name">${this.username}</span>
						<p class = "span-description">${this.description}</p>
          </div>
          <div class = "footer-container">
            <span class = "span-age">Age: ${this.age}</span>
            <span class = "span-friends">Friends: ${this.friends}</span>
          </div>
        </div>
      `;
		}
	}
}

customElements.define('single-card-profile', SingleCardProfile);
export default SingleCardProfile;
