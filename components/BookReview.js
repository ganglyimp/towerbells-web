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

		shadowRoot.innerHTML = 
			`<article class="book-review">
				<div class="book-toggle">
					<button class="book-cover-preview" id="bookModalToggle"></button>
					<h3>${this.bookTitle}</h3>
				</div>

				<dialog id="bookModal">
					<form method="dialog">
						<button>
							<!--X Icon-->
							<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
							</svg>
						</button>
					</form>

					<header>
						<div class="book-cover-preview"></div>

						<div>
							<h3 class="book-review-title"></h3>
							<p>${bookCredits}</p>

							<br/>

							<p>${this.publisherInfo}</p>
							<p>ISBN: ${this.isbn}</p>
							<p>${this.materialInfo}</p>
						</div>
					</header>

					<blockquote class="book-review-content">
						<slot name="review-text">
							No review was provided for this book.
						</slot>
					</blockquote>
				</dialog>
			</article>`;
		
		// GENERATING BOOK TITLE
		const bookTitle = shadowRoot.querySelector(".book-review dialog header .book-review-title");
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
		bookTitle.appendChild(bookTitleElement);

		// GENERATING BOOK COVERS
		const bookCoverList = shadowRoot.querySelectorAll(".book-cover-preview");
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
			bookCoverList.forEach(elem => elem.classList.add("cover-missing"));
		}

		bookCoverList.forEach(elem => elem.appendChild(coverImage.cloneNode(true)));
		
		const bookModalButton = shadowRoot.getElementById("bookModalToggle");
		const bookDialog = shadowRoot.getElementById("bookModal");

		bookModalButton.addEventListener('click', () => { bookDialog.showModal(); });

		let style = document.createElement("style");
		style.textContent = `
			article.book-review {
				width: 100%;
				min-width: 250px;
				display: table;
				border-spacing: 1em;
				font-size: var(--body-font-size);
			}

				.book-review .book-toggle {
					text-align: center;
					display: flex;
					flex-direction: column;
					justify-content: center;
					position: relative;
				}

					#bookModalToggle {
						width: 50%;
						margin: auto;
						padding: 0;
						background-color: transparent;
						border: 3px solid var(--text-color);
						border-radius: 10px;
						overflow: hidden;
						cursor: pointer;
						transition: all 0.1s;
					}
					#bookModalToggle:hover {
						border: 5px solid var(--accent-secondary);
					}
					#bookModalToggle.cover-missing {
						min-height: 350px;
					}

						#bookModalToggle img {
							width: 100%;
							height: 100%;
						}

						#bookModalToggle div.book-cover {
							font-size: 2em;
						}

				#bookModal {
					height: 90%;
					width: 90%;
					border-radius: 10px;
					overscroll-behavior: none;
				}
				
					#bookModal button {
						position: absolute;
						top: 15px;
						right: 15px;
						border-radius: 50%;
						border: 3px solid var(--text-color);
						background-color: var(--main-bg-color);
						cursor: pointer;
						transition: all 0.3s ease-in-out;
					}
					#bookModal button:hover {
						color: var(--accent-secondary);
						border-color: var(--accent-secondary);
					}

						#bookModal button .bi {
							transition: all 0.3s ease-in-out;
						}
						#bookModal button .bi:hover {
							transform: rotate(90deg);
						}

					#bookModal header {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						align-items: center;
					}

						#bookModal header > * {
							flex: 1;
							min-width: 350px
						}

						#bookModal header .book-cover-preview {
							text-align: center;
						}

							#bookModal header .book-cover-preview img {
								width: 50%;
								border-radius: 10px;
							}
					
					#bookModal blockquote {
						position: relative;
						padding: 10px;
						border: 3px solid var(--text-color);
						border-radius: 10px;
					}
					#bookModal blockquote:before {
						content: "Review, by CSZ";
						position: absolute;
						top: -20px;
						left: 20px;
						padding: 5px;
						background-color: var(--main-bg-color);
						text-align: center;
						font-weight: bold;
					}

		`;

		shadowRoot.appendChild(style);
	}
}

customElements.define('book-review', BookReview);