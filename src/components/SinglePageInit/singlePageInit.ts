import styles from './singlePageInit.css';

class SinglePageInit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
}
