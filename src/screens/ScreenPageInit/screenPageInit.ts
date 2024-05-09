import styles from './screenPageInit.css';

class ScreenPageInit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
}
