import styles from './screenCardRecover.css';
import '../../components/index';

class ScreenCardRecover extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {}
}
