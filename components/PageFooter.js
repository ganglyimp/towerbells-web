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
			<div class="footer-content">
				<a href="/towerbells-web/index.html">
					<img src="/towerbells-web/images/logos/bell_logo.png" alt="TowerBells Logo" width="100px" />
				</a>

				<ul>
					<li>
						<a href="/towerbells-web/pages/SearchTowerBells.html">Search</a>
					</li>
					<li>
						<a href="/towerbells-web/pages/WebsiteMap.html">Site Map</a>
					</li>
					<li>
						<a href="/towerbells-web/pages/Introduction/CSZ.html">About</a>
					</li>
					<li>
						<a href="/towerbells-web/pages/Subscribe.html">Subscribe</a>
					</li>
				</ul>
			</div>

			<small>
				<p>
					Page created ${this.dateCreated}, last revised ${this.dateModified}
				</p>
				<b>&#x2022;</b>
				<p>
					Send comments about this page to 
					<a href="mailto:csz_stl@swbell.net?subject=${this.mailSubject}">
						the site owner
					</a>
				</p>
				<b>&#x2022;</b>
				<p>
					<a href="/towerbells-web/pages/PrivacyPolicy.html">Privacy Policy</a>
				</p>
			</small>
		</footer>`;
	}

	getStyles() {
		const style = document.createElement('style');
		style.textContent = `
		footer {
			padding: 1rem;
			padding-bottom: 10px;
			background: var(--footer-bg-color);
			color: var(--footer-text-color);
			border-radius: 20px 20px 0 0;
		}

			footer a {
				color: inherit;
			}

			footer .footer-content {
				width: 100%;
				display: flex;
				gap: 1rem;
				align-items: center;
			}

				footer .footer-content img {
					width: 85px;
					filter: invert(1);
				}

				footer .footer-content ul {
					width: 100%;
					padding: 0;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					gap: 1rem;
					font-size: 1.5rem;
					list-style: none;
				}

					footer .footer-content ul li:not(:last-child) {
						border-right: 2px solid var(--footer-text-color);
						padding-right: 1rem;
					}

			footer small {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16px;
			}
				footer small p {
					margin: 0 10px;
					text-align: center;
				}

				footer small p:first-child {
					margin-left: 0;
				}

				footer small p:last-child {
					margin-right: 0;
				}
		  
		  @media (max-width: 800px) {
				footer .footer-content ul {
					display: grid;
				  	grid-template-columns: 1fr 1fr;
				  	font-size: 1.25em;
			  	}

					footer .footer-content ul li:not(:last-child) {
						border-right: none;
						padding-right: 0;
					}
				
				footer .footer-content a {
					width: fit-content;
					display: flex;
					align-items: center;
				}
			  
				footer small {
					display: block;
					text-align: center;
					font-size: 14px;
				}

					footer small p {
						margin: 0;
					}
					
					footer small b {
						display: none;
					}
		  }`;

		  return style;
	}
}

customElements.define('page-footer', PageFooter);