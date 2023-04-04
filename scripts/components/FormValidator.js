class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement
        this._inputSelector = data.inputSelector
        this._submitButtonSelector = data.submitButtonSelector
        this._inactiveButtonClass = data.inactiveButtonClass
        this._inputErrorClass = data.inputErrorClass
        this._errorClass = data.errorClass
    }

    enableValidation() {
        this._setEventListeners()
    }

    disableButtonSubmit() {
        this._buttonElement.disabled = true
        this._buttonElement.classList.add(this._inactiveButtonClass)
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.disabled = true
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.disabled = false
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._buttonElement.disabled = true

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)

                this._toggleButtonState()
            })
        })
    }
}

export {FormValidator}