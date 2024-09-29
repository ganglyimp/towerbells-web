import { TableData } from './classes/TableData.js';

class NiceTable extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		// Attributes
		this.tableDataPath = this.getAttribute('tableDataPath');
		this.tableCaption = this.getAttribute('tableCaption');

		// Internal data
		this.tableData = null;

		// Internal Methods
		this.fetchTableData = this.fetchTableData.bind(this);
		this.generateTableHeaders = this.generateTableHeaders.bind(this);
		this.generateAutoFilterMenu = this.generateAutoFilterMenu.bind(this);
		this.generateRows = this.generateRows.bind(this);
		this.rerenderTable = this.rerenderTable.bind(this);
		this.toggleSortBy = this.toggleSortBy.bind(this);
		this.toggleAutoFilter = this.toggleAutoFilter.bind(this);
		this.applyAutoFiltersToTable = this.applyAutoFiltersToTable.bind(this);
	}

	async connectedCallback() {
		const { shadowRoot } = this;

		await this.fetchTableData();

		const tableElem = document.createElement('table');
		const tableHeadElem = document.createElement('thead');
		const tableBodyElem = document.createElement('tbody');

		if (this.tableCaption) {
			let captionElem = document.createElement('caption');
			captionElem.innerHTML = `<h1>${this.tableCaption}</h1>`;

			tableElem.appendChild(captionElem);
		}

		this.generateTableHeaders().forEach(h => tableHeadElem.appendChild(h));
		this.generateRows().forEach(r => tableBodyElem.appendChild(r));

		tableElem.appendChild(tableHeadElem);
		tableElem.appendChild(tableBodyElem);
		shadowRoot.appendChild(tableElem);
		
		let style = document.createElement('style');
		style.textContent = this.getStyles();
		shadowRoot.appendChild(style);
	}

	/** Loads in the table data from the given file path and initializes it to this.tableData */
	async fetchTableData() {
		let jsonResponse = await fetch(this.tableDataPath);
		jsonResponse = await jsonResponse.json();

		this.tableData = new TableData(jsonResponse);
	}

	/** Generates the <thead> from all the headers from the table data */
	generateTableHeaders() {
		return this.tableData.headers.map(header => {
			const headerName = header.display ?? header.key;
			const headerKey = header.key;

			const headerElem = document.createElement('th');
			headerElem.scope = 'col';

			headerElem.innerHTML = `
				<div class="header-content">
					<span>${headerName ?? headerKey}</span>
					<div class="header-actions"></div>
					${(header.autoFilters) ? `<dialog id="auto-filter-${headerKey}"></dialog>` : ''}
				</div>
			`;

			const headerActionsElem = headerElem.querySelector('.header-actions');
			if (header.sortable) {	
				const sortButton = document.createElement('button');
				sortButton.classList.add('btn-sort-by');
				sortButton.addEventListener('click', (e) => this.toggleSortBy(e, headerKey));

				headerActionsElem.appendChild(sortButton);
			}

			if (header.autoFilters) {
				const dialogElem = headerElem.querySelector('dialog');
				this.generateAutoFilterMenu(headerKey, headerActionsElem, dialogElem);
			}

			return headerElem;
		});
	}

	/** Generates the auto-filter <dialog> menu for a given header. */
	generateAutoFilterMenu(headerKey, headerActionsElem, dialogElem) {
		// Create the button that opens the auto-filter menu
		const autoFilterButton = document.createElement('button');
		autoFilterButton.classList.add('btn-auto-filters');
		autoFilterButton.innerHTML = `
			<!-- Three Dots Vertical Icon -->
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
				  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
			</svg>
		`;

		headerActionsElem.appendChild(autoFilterButton);
		
		autoFilterButton.addEventListener('click', () => dialogElem.showModal());

		dialogElem.addEventListener('close', () => this.applyAutoFiltersToTable());
		dialogElem.addEventListener('click', (event) => this.closeDialogOnClick(event, dialogElem));

		const modalBodyElem = document.createElement('div');
		modalBodyElem.className = 'modal-body';

		// Create check-all checkbox
		const checkAll = document.createElement('label');
		checkAll.id = 'autofilter-select-all';
		checkAll.innerText = 'Select All';

		const innerCheckbox = document.createElement('input');
		innerCheckbox.type = 'checkbox';
		innerCheckbox.addEventListener('change', () => this.toggleAutoFilter(dialogElem, headerKey, 'ALL'));
		checkAll.prepend(innerCheckbox);
		modalBodyElem.appendChild(checkAll);

		// Create other check boxes
		this.tableData.autoFilters.get(headerKey).forEach(a => {
			const labelElem = document.createElement('label');
			labelElem.innerText = a.display ?? a.value;

			const checkElem = document.createElement('input');
			checkElem.type = 'checkbox';
			checkElem.value = a.value;
			checkElem.addEventListener('change', () => this.toggleAutoFilter(dialogElem, headerKey, a.value));

			labelElem.prepend(checkElem);
			modalBodyElem.appendChild(labelElem);
		});

		dialogElem.appendChild(modalBodyElem);
	}

	/** Takes the table data and generates them into HTML table rows */
	generateRows() {
		const tableRows = [];

		this.tableData.filteredData.forEach(row => {
			const rowElem = document.createElement('tr');
			rowElem.id = row.id;

			Object.keys(row.data).forEach(key => {
				const dataElem = document.createElement('td');
				dataElem.setAttribute('data-label', key);

				const data = row.data[key];
				if (typeof data !== 'object') {
					dataElem.innerHTML = data;
				}
				else {
					if (data.href) {
						// Create link element
						const linkElem = document.createElement('a');
						linkElem.href = data.href;
						linkElem.innerHTML = data.text;

						dataElem.appendChild(linkElem);
					}
					else {
						// Default to text content
						dataElem.innerHTML = data.text;
					}
				}
				rowElem.appendChild(dataElem);
			});

			if (row.hideRow)
				rowElem.style.display = 'none';

			tableRows.push(rowElem);
		});

		return tableRows;
	}

	/** Replaces the current content in the <tbody> with a re-generated table. */
	rerenderTable() {
		const tableBodyElem = this.shadowRoot.querySelector('tbody');
		tableBodyElem.replaceChildren(...this.generateRows());
	}

	/** When a "sort" button is clicked, sorts that column and rerenders the table.  */
	toggleSortBy(e, key) {
		const isDescending = e.target.classList.contains('desc');

		const activeHeaders = this.shadowRoot.querySelectorAll('table thead th .desc, table thead th .asc');
		activeHeaders?.forEach(a => a.classList.remove('desc', 'asc'));

		e.target.classList.add(isDescending ? 'asc' : 'desc');

		this.tableData.sortByColumn(key, !isDescending);
		this.rerenderTable();
	}

	/** 
	 * For a given header, will toggle a given auto-filter value. If the value is set to "ALL", 
	 * will select/deselect all items in the auto-filter list. 
	 */
	toggleAutoFilter(dialogElem, headerKey, autoFilterValue) {
		const autoFilterList = this.tableData.toggleAutoFilter(headerKey, autoFilterValue);

		const isAllSelected = autoFilterList.every(v => v.isSelected);
		const isSomeSelected = autoFilterList.some(v => v.isSelected);
		if (autoFilterValue === 'ALL') {
			dialogElem.querySelectorAll('.modal-body input[type="checkbox"]').forEach(checkbox => {
				checkbox.checked = isAllSelected;
			});
		}
		else {
			const checkAllCheckbox = dialogElem.querySelector('#autofilter-select-all input');
			if (!isAllSelected && isSomeSelected) {
				checkAllCheckbox.checked = false;
				checkAllCheckbox.indeterminate = true;
			}
			else {
				checkAllCheckbox.checked = isAllSelected;
				checkAllCheckbox.indeterminate = false;
			}
		}
	}

	/** Will close a dialog if a click happens anywhere outside of the modal. */
	closeDialogOnClick(event, dialogElem) {
		let rect = dialogElem.getBoundingClientRect();
		let withinY = rect.top <= event.clientY && event.clientY <= (rect.top + rect.height);
		let withinX = rect.left <= event.clientX && event.clientX <= (rect.left + rect.width);
		if (!withinY || !withinX) dialogElem.close();
	}

	/** Goes through all auto-filters to determine which rows need to be hidden. */
	applyAutoFiltersToTable() {
		this.tableData.filteredData.forEach(row => {
			let hasSelectedFilters = false;
			let hideRow = false;

			this.tableData.autoFilters.forEach((filterValues, key) => {
				const selectedValues = filterValues.filter(v => v.isSelected);

				if (selectedValues.length < 1)
					return;
			
				hasSelectedFilters = true;

				let hasNoMatches = selectedValues?.every(selected => {
					const cellValue = TableData.getCellValue(row.data, key).toLowerCase();
					return cellValue?.indexOf(selected.value.toLowerCase()) === -1;
				});

				if (hasNoMatches) 
					hideRow = true;
			});

			row.hideRow = hideRow;
			const rowElem = this.shadowRoot.getElementById(row.id);
			rowElem.style.display = (!hideRow || !hasSelectedFilters) ? 'table-row' : 'none';
		});
	}

	getStyles() {
		return `
			table {
				margin: 1rem auto;
				width: 100%;
  				max-width: 100%;
				border-collapse: collapse;
			}

				table th, td {
    				padding: 8px;
    				text-align: left;
    				border-bottom: 1px solid var(--border-color);
  				}

				table tr a {
        			border-radius: 10px;
					color: var(--accent-color);
        			transition: all 0.3s ease-in-out;
      			}

        			table tr:hover a {
        			  padding: 3px;
        			  color: var(--text-color-inverse);
        			  background-color: var(--text-color);
        			}


				table tbody tr:hover {
					color: var(--text-color-inverse);
					background-color: var(--accent-color);
				}

				table thead {
					position: sticky; 
					top: var(--nav-bar-height);
					background-color: var(--secondary-bg-color);
				}

					table thead th {
						padding: 1rem;
						min-width: 100px;
					}

						table thead th .header-content {
							display: flex;
							justify-content: space-between;
							align-items: center;
							gap: 1rem;
							text-transform: capitalize;
						}

							table thead th .header-content .header-actions {
								display: flex;
								align-items: center;
								gap: 10px;
								color: var(--text-color);
							}

								table thead th .header-content .header-actions button {
									all: unset;
									width: 25px;
									height: 25px;
									position: relative;
									border-radius: 100%;
									text-align: center;
									cursor: pointer;
								}

									table thead th .header-actions button:hover {
										background-color: var(--accent-color);
										color: var(--text-color-inverse);
									}

									table thead .header-actions .btn-sort-by::before,
									table thead .header-actions .btn-sort-by::after {
										content: "";
										height: 0;
										width: 0;
										display: block;
										position: absolute;
										left: 50%;
										transform: translateX(-50%);
										border: 5px solid transparent;
									}

										table thead .header-actions .btn-sort-by::before {
											margin-top: -11px;
											border-bottom-color: var(--text-color)
										}

											table thead .header-actions .btn-sort-by:hover::before {
												border-bottom-color: var(--text-color-inverse);
											}

										table thead .header-actions .btn-sort-by.desc::before {
											border-bottom-color: var(--accent-color);
										}

											table thead .header-actions .btn-sort-by.desc:hover::before {
												border-bottom-color: var(--text-color);
											}

										table thead .header-actions .btn-sort-by::after {
											margin-top: 1px;
											border-top-color: var(--text-color);
										}

											table thead .header-actions .btn-sort-by:hover::after {
												border-top-color: var(--text-color-inverse);
											}

										table thead .header-actions .btn-sort-by.asc::after {
											border-top-color: var(--accent-color);
										}

											table thead .header-actions .btn-sort-by.asc:hover::after {
												border-top-color: var(--text-color);
											}
							
							table thead .header-content dialog {
								height: 50%;
								border-radius: var(--bevel-radius);
								border: none;
							}

							table thead .header-content dialog .modal-body {
								display: flex;
								flex-direction: column;
								gap: 1rem;
							}

			dialog {
				background-color: var(--main-bg-color);
				color: var(--text-color);
			}

				dialog .modal-body #autofilter-select-all {
					padding-bottom: 1rem;
					border-bottom: 1px solid var(--border-color);
				}
		`;
	}
}

customElements.define('nice-table', NiceTable);
export default NiceTable;