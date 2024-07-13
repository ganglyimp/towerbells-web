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
					<a href="/pages/Essays/UnrelatedEssays.html">
						<!-- Book Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
							<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
						</svg>
						<br>
						<b>Other Essays</b>
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