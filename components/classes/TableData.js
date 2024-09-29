export class TableData {
    /** A list of column headers of type TableHeader. If not provided, will be automatically generated. */
    headers = [];

    /** The original list of data rows for this table. */
    data = [];

    /** A copy of the original data, with applied filters and sorting operations. */
    filteredData = [];

    /** A map (Map<string, TableAutoFilterValues[]>) of auto filter values for each column header. */
    autoFilters = new Map();

    constructor(jsonData) {
        if (Array.isArray(jsonData)) {
            this.data = jsonData.map(d => new TableRow(d));
            this.generateHeaders(this.data[0].data);
        }
        else {
            this.headers = jsonData.headers.map(h => new TableHeader(h));
            this.data = jsonData.data.map(d => new TableRow(d));
        }
        
        this.filteredData = JSON.parse(JSON.stringify(this.data));
        this.generateAutoFilters();
    }

    /** 
     *  Used when initialized with a simple list of data. 
     *  Generates table headers based off of the keys of the first row. 
     */
    generateHeaders(sampleRow) {
        this.headers = Object.keys(sampleRow).map(k => new TableHeader({ key: k }));
    }

    /** Initializes the map of auto-filters. Will auto-generate filter values if needed. */
    generateAutoFilters() {
		if (this.headers.length < 1) return;

		const keysToAutoGenerate = [];
		for (let header of this.headers) {
			if (!header.autoFilters) continue;

			this.autoFilters.set(header.key, header.autoFilterValues);

			if (header.autoFilterValues.length < 1)
				keysToAutoGenerate.push(header.key);
		}

		if (keysToAutoGenerate.length < 1) return;

		// Auto-generate filter values
		this.data.forEach(row => {
			keysToAutoGenerate.forEach(key => {
				const colValues = this.autoFilters.get(key);

				if (colValues.every(v => v?.value !== TableData.getCellValue(row.data, key))) {
                    const autoFilterValue = new TableHeaderAutoFilterValue({ value: TableData.getCellValue(row.data, key) });
					colValues.push(autoFilterValue);
                }
			});
		});
	}

    /** Will sort the table by the given column name. */
    sortByColumn(columnName, sortAscending = true) {
		const collator = new Intl.Collator('en', { numeric: true });

		this.filteredData.sort((a, b) => {
			const valueA = TableData.getCellValue(a.data, columnName, true);
			const valueB = TableData.getCellValue(b.data, columnName, true);

			const result = collator.compare(valueA, valueB);
			return (sortAscending) ? result : result * -1;
		});
	}

    /** 
     * Will toggle a given auto-filter value. If the value is set to 'ALL', will toggle whether all 
     * values are selected. Returns the current auto-filter list. 
     */
    toggleAutoFilter(headerKey, autoFilterValue) {
		const autoFilterList = this.autoFilters.get(headerKey);
		if (!autoFilterList) throw new Error('Could not find auto-filters for key: ', headerKey);

		if (autoFilterValue === 'ALL') {
            const isAllSelected = autoFilterList.every(v => v.isSelected);
			autoFilterList.forEach(f => f.isSelected = !isAllSelected);
		}
		else {	
			let filterValue = autoFilterList.find(f => f.value === autoFilterValue);
			if (!filterValue) throw new Error('Could not find auto-filter value: ', autoFilterValue);
			filterValue.isSelected = !filterValue.isSelected;
		}

        return autoFilterList;
	}

    /** Will get a column value for a given row, stripping any HTML content contained in the row data. */
    static getCellValue(row, columnName, tryParseInt = false) {
		let rowText = row[columnName]?.text ?? row[columnName];
		rowText = rowText.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '');

		if (tryParseInt && !isNaN(Number.parseInt(rowText)))
			return Number.parseInt(rowText);

		return rowText;
	}
}

export class TableRow {
    constructor(rowData) {
        /** A unique ID to identify this row by. */
        this.id = crypto.randomUUID();

        /** Whether or not this row should be hidden (due to auto-filter filtering) */
        this.hideRow = false;

        /** The row data */
        this.data = rowData;
    }
}

export class TableHeader {
    constructor(init) {
        /** The object key associated with this header */
        this.key = init?.key;

        /** How this header's name should be displayed. Defaults to the name of the key if not provided. */
        this.display = init?.display;

        /** When true, allows this column to be sorted */
        this.sortable = init?.sortable ?? false;

        /** When true, allows this column to be filtered by value */
        this.autoFilters = init?.autoFilters ?? false;

        /** A list of values to filter this column by. If not provided, a list of unique values will be automatically generated. */
        this.autoFilterValues = init?.autoFilterValues?.map(v => new TableHeaderAutoFilterValue(v)) ?? [];
    }
}

export class TableHeaderAutoFilterValue {
    constructor(init) {
        /** How the auto-filter should be shown on the auto-filter menu */
        this.display = init?.display;

        /** The actual value of the auto-filter */
        this.value = init?.value;

        /** Whether or not this auto-filter has been selected. */
        this.isSelected = false;
    }
}