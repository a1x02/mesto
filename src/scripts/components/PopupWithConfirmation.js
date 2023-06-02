import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._formElement = this._popupElement.querySelector('.popup__container_delete-card')
        this._saveButton = this._formElement.querySelector('.popup__save-button_delete-card')
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleSubmit()
        })
    }

    setCloseCallback(cb) {
        this._handleSubmit = cb
    }

    open() {
        super.open()
        this._saveButton.focus()
    }
}