import styles from './singleCardPassword.css';

class SingleCardPassword extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.addPasswordListener();
	}

	addPasswordListener() {
		const passwordButton = this.shadowRoot?.querySelector('#password-password');
		if (passwordButton) {
			passwordButton.addEventListener('click', () => {
				this.dispatchEvent(
					new CustomEvent('password-button-clicked', {
						bubbles: true,
						composed: true,
					})
				);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-password">
        <div class = "container-img"></div>
        <div class = "form-password">
          <div class = "container-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fecd1a" d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64V261.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75H296h8c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5V160c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2V96c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1c0 0 0-.1 0-.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16V95.9c0 0 0 .1 0 .1V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16v55.9c0 0 0 .1 0 .1v80c0 13.3 10.7 24 24 24s24-10.7 24-24V160.1c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16V332.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2H296h-8.5c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z"/></svg>
            HandKid
          </div>
          <div class = "container-form">
            <div class = "title-password">New Password</div>
            <small class = "text-password">Make sure it has 8 characters or more</small>
            <form id = "form-info">
              <div class = "password-data">
                <input type = "password" placeholder = "Password" name = "password">
              </div>
              <div class = "title-password">Verify your Password</div>
              <div class = "verify-password">
                <input type = "password" placeholder = "Password" name = "passwordConfirmed">
              </div>
              <div class = "policy-container">
                <input type = "checkbox" id = "policy-check" name="policy-check">
                HandKid: Nurturing a Secure Sanctuary for Children. By joining our community, you affirm your commitment to uphold our rigorous security measures and respect our comprehensive privacy policy, ensuring a safe and enriching experience for all.
              </div>
              <div class = "btn-data">
                <input type = "submit" id = "password-password" value = "Sign Up">
              </div>
            </form>
          </div>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('single-card-password', SingleCardPassword);
export default SingleCardPassword;
