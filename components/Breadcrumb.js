// Expects to receive a series of anchor elements, followed by a final <span>
// Inserts ">" in between each element
// Considering that this is mainly only applying CSS styling, does this need to be a web component?

class Breadcrumb extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const { shadowRoot } = this;
		shadowRoot.innerHTML = 
			`<nav aria-label="Breadcrumb" class="breadcrumb">
				<small>
					<slot></slot>
				</small>
			</nav>`;

		let style = document.createElement("style");
		style.textContent = `
			.breadcrumb {
				margin: 10px;
		  	}
			small {
				font-size: var(--small-font-size);
			}
			small > ::slotted(*) {
				font-size: var(--small-font-size) !important;
			}
			small > ::slotted(*:not(:last-child)):after {
				content: " › ";
				color: var(--text-color);
			}`;

		shadowRoot.appendChild(style);
	}
}

customElements.define('bread-crumb', Breadcrumb);