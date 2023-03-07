const enableValidation = (formElement) => {
    const formList = Array.from(document.querySelectorAll('.popup__form'))

    formList.forEach((formElement) => {
        setEventListeners(formElement)
    })
}

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__input_type_error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('popup__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__input-error_active')
    errorElement.textContent = ''
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save-button_inactive')
        buttonElement.disabled = true
    } else {
        buttonElement.classList.remove('popup__save-button_inactive')
        buttonElement.disabled = false
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
    const buttonElement = formElement.querySelector('.popup__save-button');
    buttonElement.disabled = true

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)

            toggleButtonState(inputList, buttonElement)
        })
    })
}

enableValidation()

