class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector
        this._inputSelector = data.inputSelector
        this._submitButtonSelector = data.submitButtonSelector
        this._inactiveButtonClass = data.inactiveButtonClass
        this._inputErrorClass = data.inputErrorClass
        this._errorClass = data.errorClass
    }

    enableValidation() {
        this._formElement = document.querySelector(this._formSelector)
        this._setEventListeners(this._formElement, this._inputSelector,
            this._submitButtonSelector,
            this._inactiveButtonClass,
            this._inputErrorClass,
            this._errorClass)
    }

    _isValid(formElement, inputElement, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
        } else {
            this._hideInputError(formElement, inputElement, inputErrorClass, errorClass)
        }
    }

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(errorClass)
    }

    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(inputErrorClass)
        errorElement.classList.remove(errorClass)
        errorElement.textContent = ''
    }

    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass)
            buttonElement.disabled = true
        } else {
            buttonElement.classList.remove(inactiveButtonClass)
            buttonElement.disabled = false
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass,
                       errorClass) {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector))
        const buttonElement = formElement.querySelector(submitButtonSelector);
        buttonElement.disabled = true

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement, inputErrorClass, errorClass)

                this._toggleButtonState(inputList, buttonElement, inactiveButtonClass)
            })
        })
    }
}

export {FormValidator}