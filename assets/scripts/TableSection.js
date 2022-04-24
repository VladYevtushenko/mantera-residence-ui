export class TableSection {
    constructor({ renderer }, containerSelector) {
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(table) {
        this.container.append(table);
    }
}