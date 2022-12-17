class NavBar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const { shadowRoot } = this;
		shadowRoot.innerHTML = 
			`<nav>
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
					<li><a href="./pages/Introduction/TowerBells.html">Introduction</a></li>
					<li><a href="./data/Data_Top.html">Find Carillons</a></li>
					<li><a href="./pages/BellBooks/BellBooks.html">Books</a></li>
					<li><a href="./pages/WebsiteMap.html">What's New</a></li>
					<li><a href="./pages/Subscribe.html">Subscribe</a></li>
					<li><a href="./pages/WebsiteHistory.html">Website History</a></li>

					<!-- Search Icon -->
					<a href="pages/SearchTowerBells.html">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
						</svg>
					</a>
				</div>
			</nav>`;

		const collapseButton = shadowRoot.querySelector('nav button');
		const navContent = shadowRoot.querySelector('.nav-content');

		collapseButton.addEventListener('click', (evt) => {
			collapseButton.classList.toggle('expanded');
			navContent.dispatchEvent(new CustomEvent('collapseToggle'));
		});

		navContent.addEventListener('collapseToggle', (evt) => {
			navContent.classList.toggle('collapsed');
		});
		
		let style = document.createElement("style");
		style.textContent = `
			nav {
				margin: 0;
				padding: 15px;
				position: -webkit-sticky;
				position: sticky;
				top: 0;
				background-color: white;
				border-top: 1px solid lightgrey;
				border-bottom: 1px solid lightgrey;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
				overflow: hidden;
			}
				nav .bi {
					display: inline-block;
					position: absolute;
					top: 50%;
					right: 0;
					width: 1em;
					height: 1em;
					font-size: 2em;
					color: black;
					transform: translate(-50%, -50%);
					cursor: pointer;
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
					nav .nav-content li a {
						padding: 1em;
						text-decoration: none;
						font-size: max(1.5vw, 15px);
						color: black;
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
}

customElements.define('nav-bar', NavBar);