export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
    }

    open() {
        this._popupElement.classList.add('popup_opened')

        document.addEventListener('click', this._handleEscClose)
    }

    close() {
        this._popupElement.classList.remove('popup_opened')
        document.removeEventListener('click', this._handleEscClose)
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            evt.preventDefault()
            this.close() // or this.close() ?
        }
    }

    setEventListeners() {
        const buttonClose = this._popupElement.querySelector('.popup__close')

        buttonClose.addEventListener('click', () => {
            this.close()
        })

        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close()
            }
        })
    }
}