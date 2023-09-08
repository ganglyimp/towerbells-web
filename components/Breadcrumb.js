class Breadcrumb extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.crumbData = JSON.parse(decodeURIComponent(this.getAttribute('crumbData'))).crumbs;
	}

	connectedCallback() {
		const { shadowRoot } = this;
		shadowRoot.innerHTML = 
			`<nav aria-label="Breadcrumb" class="breadcrumb">
				<small> </small>
			</nav>`;
		
		// Dynamically generate breadcrumbs
		this.crumbData.forEach(crumb => {
			// Should be last element in list
			if(crumb.path == null) {
				let crumbElement = document.createElement('span');
				crumbElement.textContent = crumb.name;
				shadowRoot.querySelector('small').appendChild(crumbElement);
			}
			else {
				let crumbElement = document.createElement('a');
				crumbElement.setAttribute('href', crumb.path);
				crumbElement.textContent = crumb.name;

				let separator = document.createElement('span');
				separator.innerHTML = '&nbsp; &#8250; &nbsp;';

				shadowRoot.querySelector('small').appendChild(crumbElement);
				shadowRoot.querySelector('small').appendChild(separator);
			}
		});

		let style = document.createElement("style");
		style.textContent = `
			.breadcrumb {
				margin: 10px;
		  	}
			small {
				font-size: 15px;
			}
			a {
				color: var(--accent-color);
				text-decoration: none;
			}
			a:hover {
				text-decoration: underline;
			}`;

		shadowRoot.appendChild(style);
	}
}

customElements.define('bread-crumb', Breadcrumb);