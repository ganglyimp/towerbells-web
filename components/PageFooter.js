class PageFooter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.pagePath = this.getAttribute('pagePath');
		this.dateCreated = this.getAttribute('dateCreated');
		this.dateModified = this.getAttribute('dateModified');
		this.mailSubject = encodeURIComponent(this.getAttribute('mailSubject'));
	}

	connectedCallback() {
		const { shadowRoot } = this;
		shadowRoot.innerHTML = this.getDefaultHtml();
		shadowRoot.appendChild(this.getStyles());
	}

	getDefaultHtml() {
		return `
		<footer>
			<div class="footer-links">
				<div>
					<a href="/pages/SearchTowerBells.html">
						<!-- Search Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
						</svg>
						<br>
						<b>Search</b>
					</a>
				</div>

				<div>
					<a href="/pages/WebsiteMap.html">
						<!-- Map Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
						  </svg>
						<br>
						<b>Site Map</b>
					</a>
				</div>

				<div>
					<a href="/pages/Introduction/CSZ.html">
						<!-- Person Circle Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
						  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
						  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
						</svg>
						<br>
						<b>About</b>
					</a>
				</div>

				<div>
					<a href="/pages/Subscribe.html">
						<!-- Bell Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
  							<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
						</svg>
						<br>
						<b>Subscribe</b>
					</a>
				</div>
			</div>

			<small>
				<p>
					Page created ${this.dateCreated}, last revised ${this.dateModified}
				</p>
				<b>&#x2022;</b>
				<p>
					<a href="/pages/PrivacyPolicy.html">Privacy Policy</a>
				</p>
				<b>&#x2022;</b>
				<p>
					Send comments about this page to 
					<a href="mailto:csz_stl@swbell.net?subject=${this.mailSubject}">
						the site owner
					</a><br>
				</p>
			</small>
		</footer>`;
	}

	getStyles() {
		const style = document.createElement('style');
		style.textContent = `
		footer {
			padding: 50px 25px;
			padding-bottom: 10px;
			background: var(--footer-bg-color);
			color: var(--footer-text-color);
			border-radius: 20px 20px 0 0;
		}

			footer a {
				color: inherit;
			}

			footer .footer-links {
				width: 100%;
				margin: auto;
				margin: auto 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.5em;
				text-align: center;
			}

				footer .footer-links div {
					margin: 0 20px;
				}

				footer .footer-links svg {
					height: 50px;
					width: 50px;
				}

			footer small {
				display: flex;
				justify-content: center;
				margin-top: 30px;
				font-size: 16px;
			}
				footer small p {
					margin: 0 10px;
				}
		  
		  @media (max-width: 800px) {
				footer .footer-links {
					display: grid;
				  	grid-template-columns: 1fr 1fr;
				  	font-size: 1.25em;
			  	}

				footer .footer-links div {
					flex: 50%;
					margin: 5px 0;
				}
				
				footer .footer-links a {
					display: flex;
					align-items: center;
				}
				
				footer .footer-links svg {
					height: 30px;
					width: 30px;
					margin-right: 10px;
				}

				footer .footer-links br {
					display: none;
				}
			  
				footer small {
					display: block;
					text-align: center;
					font-size: 14px;
				}
					
					footer small b {
						display: none;
					}
		  }`;

		  return style;
	}
}

customElements.define('page-footer', PageFooter);