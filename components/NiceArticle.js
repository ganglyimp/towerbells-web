class NiceArticle extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		this.articleTitle = this.getAttribute('articleTitle');
		this.navSections = [];

		this.scrollTimeout = null;
		this.resizeTimeout = null;

		this.onWindowScroll = this.onWindowScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		window.addEventListener('scroll', this.onWindowScroll);
		window.addEventListener('resize', this.onWindowResize);
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = 
			`<article class='nice-article'>
				<header>
					<slot name='article-header'>
						<h1>${this.articleTitle}</h1>
					</slot>
				</header>

				<div class='article-main'>
					<aside class='side-nav'>
						<nav id="sideNav"></nav>
					</aside>

					<div class='article-body'>
						<slot name='article-body'></slot>
					</div>
				</div>
			</article>`;

		let slot = this.shadowRoot.querySelector('slot[name="article-body"]');
		slot.addEventListener('slotchange', (e) => this.onSlotChange(e, slot));

		let style = document.createElement('style');
		style.textContent = `
			h1, h2, h3, h4, h5, h6 {
				font-family: var(--header-font);
			}

			article header {
				border-bottom: 1px solid var(--border-color);
				font-size: clamp(40px, 5vw, 70px);
				text-align: center;
				margin: 0 1rem;
			}

			article .article-main {
				display: flex;
			}

				article .article-main .side-nav {
					flex: 30%;
					padding: 15px;
				}

					article .article-main .side-nav > nav {
						position: sticky;
						top: 100px;
						overflow: scroll;
						max-height: calc(100vh - 100px);
						mask-image: linear-gradient(to bottom, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%);
					}

					article .article-main .side-nav ul {
						list-style: none;
					}

					article .article-main .side-nav li button {
						color: rgba(0, 0, 0, 0.50);
					}

					article .article-main .side-nav li:hover button {
						color: var(--text-color);
					}

					article .article-main .side-nav li.active {
						border-left: 3px solid var(--accent-color);
					}

						article .article-main .side-nav li.active button {
							color: var(--accent-color);
							font-weight: bold;
						}

					article .article-main .side-nav button {
						margin: 5px 0;
						border: none;
						background-color: transparent;
						text-align: left;
						font-size: 25px;
						font-family: var(--body-font);
						cursor: pointer;
					}

					article .article-main .side-nav button:hover {
						text-decoration: underline;
					}

				article .article-main .article-body {
					flex: 70%;
					margin: 0 10%;
				}
				
			@media (max-width: 800px) {
				article .article-main .side-nav {
					display: none;
				}

				article .article-main .article-body {
					margin: 0 1rem;
				}
			}`;

		this.shadowRoot.appendChild(style);
	}

	disconnectedCallback() {
		window.removeEventListener('scroll', this.onWindowScroll);
		window.removeEventListener('resize', this.onWindowResize);
	}

	onSlotChange(e, slot) {
		const { shadowRoot } = this;

		let assignedNodes = slot.assignedNodes();
		if (assignedNodes.length < 1) return;

		let headers = assignedNodes[0].querySelectorAll('h1, h2, h3, h4, h5, h6');

		let navElem = shadowRoot.getElementById('sideNav');
		if (!navElem) return;

		let outerList = document.createElement('ul');
		
		this.navSections = [];
		let currParent = outerList;
		let currLevel = 1;

		headers.forEach(h => {
			// If the header wasn't assigned an ID, skip
			if (!h.id) return;

			let currHead = {
				id: h.id,
				level: Number(h.tagName.substring(1)),
				offsetTop: h.offsetTop - 100,
				isActive: false
			};
			this.navSections.push(currHead);
			
			let innerButton = document.createElement('button');
			innerButton.innerText = h.innerText;
			innerButton.onclick = () => { 
				if (currHead.id)
					window.location.hash = currHead.id;
			
				window.scroll({ top: currHead.offsetTop, behavior: 'smooth' });
			};
		
			let listItem = document.createElement('li');
			listItem.id = `sidebar-${currHead.id}`;
			listItem.appendChild(innerButton);

			if (currHead.level === currLevel) {
				currParent.appendChild(listItem);
			}
			else if (currHead.level > currLevel) {
				// Item is part of a nested list
				let nestedList = document.createElement('ul');
				nestedList.appendChild(listItem);

				currParent.appendChild(nestedList);
				currParent = nestedList;
			}
			else {
				// Level is less than current, go back to parent
				currParent = currParent.parentElement;
				currParent.appendChild(listItem);
			}

			currLevel = currHead.level;
		});

		navElem.appendChild(outerList);
	}

	onWindowScroll(e) {
		if (this.navSections.length < 1) return;

		clearTimeout(this.scrollTimeout);

		this.scrollTimeout = setTimeout(() => {
			clearTimeout(this.scrollTimeout);

			let activeItem = this.getActiveSidebarItem();
			if (activeItem) {
				this.navSections.find(s => s.id === activeItem.id).isActive = false;

				let activeElem = this.shadowRoot.getElementById(`sidebar-${activeItem.id}`);
				activeElem.classList.toggle('active');
			}

			let visibleItem = this.getVisibleSidebarItem(window.scrollY);
			this.navSections.find(s => s.id === visibleItem.id).isActive = true;

			let visibleElem = this.shadowRoot.getElementById(`sidebar-${visibleItem.id}`);
			visibleElem.classList.toggle('active');
		}, 50);
	}

	onWindowResize(e) {
		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(() => {
			this.navSections.forEach(n => {
				let headerElem = document.getElementById(n.id);
				
				if (headerElem)
					n.offsetTop = headerElem.offsetTop - 100;
			});
		}, 100);
	}

	getActiveSidebarItem() {
		return this.navSections.find(s => s.isActive);
	}

	getVisibleSidebarItem(scrollY) {
		for (let i = this.navSections.length - 1; i >= 0; i--) {
			if (this.navSections[i].offsetTop < scrollY)
				return this.navSections[i];
		}

		return this.navSections[0];
	}
}

customElements.define('nice-article', NiceArticle);