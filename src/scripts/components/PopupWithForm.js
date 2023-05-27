import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._popupForm = this._popupElement.querySelector('.popup__form')
        this._inputList = this._popupForm.querySelectorAll('.popup__input')
    }

    _getInputValues() {
        this._inputItems = {}
        this._inputList.forEach((item) => {
            this._inputItems[item.name] = item.value
        })

        return this._inputItems
    }

    setInputValues(data) {
        this._inputList.forEach((item) => {
            item.value = data[item.name]
        })
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitCallback(this._getInputValues())
            this.close()
        })
    }

    close() {
        super.close();
        this._popupForm.reset()
    }
}