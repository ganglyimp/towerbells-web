class NavBar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		this.pagePath = this.getAttribute('pagePath');
		this.active = this.getAttribute('active');
		this.languageData = [];
	}

	async connectedCallback() {
		const { shadowRoot } = this;

		// Grab external JSON data
		let jsonResponse = await fetch(`${this.pagePath}/../data/languages.json`);
		this.languageData = await jsonResponse.json();

		shadowRoot.innerHTML = 
			`<nav class="nav-bar">
				<div class="nav-collapsed">
					<b>Tower Bells</b>

					<button class="collapse-button">
						<!-- List Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
			  			</svg>

						<!-- X Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
						</svg>
					</button>
				</div>

				<div class="nav-content collapsed">
					<li id="home"><a href="${this.pagePath}/../index.html">Home</a></li>
					<li id="introduction"><a href="${this.pagePath}/Introduction/TowerBells.html">Introduction</a></li>
					<li id="find-carillons"><a href="./data/Data_Top.html">Find Carillons</a></li>
					<li id="books"><a href="${this.pagePath}/BellBooks/BellBooks.html">Books</a></li>
					<li id="whats-new"><a href="${this.pagePath}/WhatsNew/WhatIsNew.html">What's New</a></li>
					<li id="subscribe"><a href="${this.pagePath}/Subscribe.html">Subscribe</a></li>
					<li id="web-history"><a href="${this.pagePath}/WebsiteHistory.html">Website History</a></li>

					<div class="translate-widget">
						<!-- Globe Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
  							<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
						</svg>

						<select id="googleTranslate"></select>
					</div>

					<!-- Search Icon -->
					<a href="${this.pagePath}/SearchTowerBells.html">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
						</svg>
					</a>
				</div>
			</nav>`;

		const googleTranslate = shadowRoot.getElementById('googleTranslate');

		// Dynamically add all language options from JSON
		this.languageData.forEach(lang => {
			let langOption = document.createElement('option');
			langOption.value = lang.code;
			langOption.innerText = lang.nativeName;

			// Preselecting English
			if(lang.code === 'en') langOption.selected = true;

			googleTranslate.appendChild(langOption);
		});

		// Append onChange event to Google Translate dropdown
		googleTranslate.addEventListener('change', (value) => this.openGoogleTranslate(value));

		// Add event listener to toggle open/close of mobile nav-bar
		const collapseButton = shadowRoot.querySelector('nav button');
		const navContent = shadowRoot.querySelector('.nav-content');

		collapseButton.addEventListener('click', (evt) => {
			collapseButton.classList.toggle('expanded');
			navContent.dispatchEvent(new CustomEvent('collapseToggle'));
		});

		navContent.addEventListener('collapseToggle', (evt) => {
			navContent.classList.toggle('collapsed');
		});

		// Add active class
		if(this.active)
			shadowRoot.getElementById(this.active).classList.add('active');
		
		let style = document.createElement("style");
		style.textContent = `
			nav {
				margin: 0;
				padding: 15px;
				position: -webkit-sticky;
				position: sticky;
				top: 0;
				background-color: var(--main-bg-color);
				border-top: 1px solid var(--border-color);
				border-bottom: 1px solid var(--border-color);
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
				overflow: hidden;
				z-index: 1000;
			}
				nav .bi.bi-search, nav .bi.bi-list, nav .bi.bi-x {
					display: inline-block;
					position: absolute;
					top: 50%;
					right: 0;
					width: 1em;
					height: 1em;
					font-size: 2em;
					color: var(--text-color);
					transform: translate(-50%, -50%);
					cursor: pointer;
				}
				nav .translate-widget {
					display: flex;
				}
					nav .translate-widget .bi.bi-globe2 {
						font-size: 2em;
						width: 0.8em;
						height: 0.8em;
					}
					nav .translate-widget select {
						background-color: transparent;
						border: none;
					}
				nav .nav-collapsed {
					display: none;
				}
				nav .nav-content, nav-content.collapsed {
					display: flex;
					align-items: center;
					justify-content: center;
					list-style-type: none;
					transition: display 0.3s;
				}
					nav .nav-content li.active {
						text-decoration: underline;
					}
						nav .nav-content li a {
							padding: 1em;
							text-decoration: none;
							font-size: max(1.5vw, 15px);
							color: var(--text-color);
							transition: ease-in-out 0.3s;
						}
						nav .nav-content li a:hover {
							text-decoration: underline;
							transition: ease-in-out 0.3s;
						}

			@media (max-width: 800px) {
				nav {
					min-height: 40px;
					transition: height 0.3s;
				}
					nav b {
						font-size: 2em;
						text-align: center;
					}
					nav .nav-collapsed {
						display: block;
						position: relative;
					}
						nav .nav-collapsed button {
							border: transparent;
							background-color: transparent;
						}
							nav .nav-collapsed .collapse-button .bi-list {
								display: block;
							}
							nav .nav-collapsed .collapse-button .bi-x {
								display: none;
							}
						
							nav .nav-collapsed .collapse-button.expanded .bi-list {
								display: none;
							}
							nav .nav-collapsed .collapse-button.expanded .bi-x {
								display: block;
							}
					nav .nav-content.collapsed {
						display: none;
					}
					nav .nav-content {
						display: block;
						padding: 10px;
					}
						nav .nav-content li {
							margin: 30px;
						}
						nav .nav-content li a {
							font-size: 1.5em;
							margin: 10px;
						}
						nav .nav-content .bi-search {
							display: none;
						}
			}`;

		shadowRoot.appendChild(style);
	}

	openGoogleTranslate(event) {
		let langCode = event.target.value;
		console.log('clicked: ', langCode);
		let currLang = 'en';
		let currPage = window.location.href;

		let googleTranslateLink = (langCode === 'en') 
			? currPage 
			: `https://translate.google.com/translate?sl=${currLang}&tl=${langCode}&u=${currPage}?${langCode}`;

		window.open(googleTranslateLink);
	}
}

customElements.define('nav-bar', NavBar);
export default NavBar;