export default class Section {
    constructor({renderer}, containerSelector) {
        // this._renderedItems = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    prependItem(element) {
        this._container.prepend(element)
    }

    renderItems(items) {
        items.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._container.append(element)
    }
}