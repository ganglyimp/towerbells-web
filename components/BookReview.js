class BookReview extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		this.bookTitle = this.getAttribute('bookTitle');
		this.author = this.getAttribute('author');
		this.illustrator = this.getAttribute('illustrator');
		this.publisherInfo = this.getAttribute('publisherInfo');
		this.isbn = this.getAttribute('isbn') ?? 'N/A';
		this.materialInfo = this.getAttribute('materialInfo');
		this.coverImageSrc = this.getAttribute('coverImageSrc') ?? null;
		this.bookLink = this.getAttribute('bookLink') ?? null;
	}

	connectedCallback() {
		const { shadowRoot } = this;

		let bookCredits = `by ${this.author}`;
		bookCredits += (this.illustrator) ? `, illustrated by ${this.illustrator}` : '';

		/* TODO:
			New Design:
			Default display only book cover & title
			When you click on the book cover, it'll open up a modal with the full details.
		*/

		shadowRoot.innerHTML = 
			`<article class="book-review">
				<header></header>

				<div class="book-review-content">
					<b class="book-review-title"></b>, 
					<span>${bookCredits}</span>
		
					<p>
						${this.publisherInfo} <br />
						ISBN: ${this.isbn} <br />
						${this.materialInfo} <br />
					</p>
		
					<blockquote>
						<h4>Review, by CSZ</h4>
						<slot name="review-text">
							No review was provided for this book.
						</slot>
					</blockquote>
				</div>
			</article>`;
		
		let bookTitleElement;
		if(this.bookLink) {
			bookTitleElement = document.createElement("a");
			bookTitleElement.href = this.bookLink;
			bookTitleElement.innerText = this.bookTitle;
		}
		else {
			bookTitleElement = document.createElement("span");
			bookTitleElement.innerText = this.bookTitle;
		}
		shadowRoot.querySelector(".book-review .book-review-content b.book-review-title").appendChild(bookTitleElement);

		let coverImage;
		if(this.coverImageSrc) {
			coverImage = document.createElement("img");
			coverImage.className = "book-cover";
			coverImage.src = this.coverImageSrc;
			coverImage.alt = `Cover image of book "${this.bookTitle}"`;
		}
		else {
			coverImage = document.createElement("div");
			coverImage.className = "book-cover";
			coverImage.innerText = this.bookTitle;
			shadowRoot.querySelector(".book-review header").classList.add("cover-missing");
		}
		shadowRoot.querySelector(".book-review header").appendChild(coverImage);

		let style = document.createElement("style");
		style.textContent = `
			article.book-review {
				width: 100%;
				display: table;
				border-spacing: 1em;
				font-size: var(--body-font-size);
			}

				.book-review header {
					display: table-cell;
					height: 100%;
					width: 20%;
					text-align: center;
					vertical-align: middle;
					font-size: 2em;
				}
				.book-review header.cover-missing {
					border: 5px solid var(--accent-color);
				}

					.book-review header > img {
						height: 100%;
						width: 100%;
					}
				
				.book-review .book-review-content {
					display: table-cell;
					height: 100%;
					width: 80%;
				}
					.book-review .book-review-content a {
						color: var(--accent-color);
						text-decoration: none;
					  }
					.book-review .book-review-content a:hover {
						text-decoration: underline;
					}

					.book-review .book-review-content blockquote {
						margin: 0;
						padding: 1em;
						height: 150px;
						overflow-y: scroll;
						border-left: 5px solid var(--accent-color);
						background-color: lightblue;
					}

					.book-review .book-review-content blockquote h4 {
						margin: 0;
					}

		`;

		shadowRoot.appendChild(style);
	}
}

customElements.define('book-review', BookReview);