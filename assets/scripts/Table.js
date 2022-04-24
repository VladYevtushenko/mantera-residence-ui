export class Table {
    constructor (table, tableSelector) {
        this.table = table;
        this.tableSelector = tableSelector;
        
    }

    getTemplate() {
        const tableElement = document
            .querySelector(this.tableSelector)
            .content
            .querySelector('.table-row')
            .cloneNode(true);
        return tableElement;
    }

    generateTableRow() {
    }
}