import SingleCardPost, { Attribute } from '../singleCardPost/singleCardPost';
import styles from './cardsContainer.css';
import { dataPost } from '../../../data/data';

class CardsContainer extends HTMLElement {
	cards: SingleCardPost[] = [];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.getValueData();
	}

	connectedCallback() {
		this.render();
	}

	getValueData() {
		dataPost.forEach((user: any) => {
			const postCard = this.ownerDocument.createElement('single-card-post') as SingleCardPost;
			postCard.setAttribute(Attribute.avatar, user.person.avatar);
			postCard.setAttribute(Attribute.name, user.person.name);
			postCard.setAttribute(Attribute.username, user.person.username);
			postCard.setAttribute(Attribute.description, user.post.description);
			postCard.setAttribute(Attribute.timestamp, user.post.timestamp);
			postCard.setAttribute(Attribute.hashtags, user.post.hashtags);
			postCard.setAttribute(Attribute.media, user.post.media);
			this.cards.push(postCard);
		});
	}

	render() {
		if (this.shadowRoot) {
			const containerCards = this.ownerDocument.createElement('section');
			this.cards.forEach((component) => {
				containerCards.appendChild(component);
			});
			this.shadowRoot?.appendChild(containerCards);
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('cards-container', CardsContainer);
export default CardsContainer;
