import {Card} from './Card.js'
import {FormValidator} from "./FormValidator.js";

const profile = document.querySelector('.profile')
const buttonOpenEditProfilePopup = profile.querySelector('.profile__edit-button')
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button')

const popupEditProfile = document.querySelector('#popup-edit')
const popupAddCard = document.querySelector('#popup-add')
const popupImage = document.querySelector('#popup-image')

const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__close')
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__close')
const buttonCloseImagePopup = popupImage.querySelector('.popup__close')

const formEditProfile = popupEditProfile.querySelector('#form-edit')
const formAddCard = popupAddCard.querySelector('#form-add')
const formAddName = formAddCard.querySelector('.popup__input_subject_name')
const formAddLink = formAddCard.querySelector('.popup__input_subject_description')

const profileName = profile.querySelector('.profile__name')
const profileDescription = profile.querySelector('.profile__description')
const formEditName = formEditProfile.querySelector('.popup__input_subject_name')
const formEditDescription = formEditProfile.querySelector('.popup__input_subject_description')

const sectionElements = document.querySelector('.elements')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const closeOnEscape = (evt) => {
    if (evt.key === 'Escape') {
        evt.preventDefault()
        const popupOpened = document.querySelector('.popup_opened')
        closePopUp(popupOpened)
    }
}

const closeOnOverlay = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopUp(evt.target)
    }
}

const openPopUp = function (popupName) {
    popupName.classList.add('popup_opened')

    document.addEventListener('keydown', closeOnEscape)
}

const closePopUp = function (popupName) {
    popupName.classList.remove('popup_opened')

    document.removeEventListener('keydown', closeOnEscape)
}

const saveProfile = function () {
    profileName.textContent = formEditName.value
    profileDescription.textContent = formEditDescription.value

    formEditProfile.reset()
    closePopUp(popupEditProfile)
}

const saveElement = function () {
    sectionElements.prepend(createCard(formAddLink.value, formAddName.value, '#element-template'))
    closePopUp(popupAddCard)
}

const createCard = function (cardLink, cardName, cardTemplate) {
    const card = new Card(cardLink, cardName, cardTemplate)

    return card.generateCard()
}

popupEditProfile.addEventListener('mousedown', closeOnOverlay)

popupAddCard.addEventListener('mousedown', closeOnOverlay)

popupImage.addEventListener('mousedown', closeOnOverlay)

buttonOpenEditProfilePopup.addEventListener('click', () => {
    openPopUp(popupEditProfile)
    formEditName.value = profileName.textContent
    formEditDescription.value = profileDescription.textContent

})
buttonOpenAddCardPopup.addEventListener('click', () => {
    openPopUp(popupAddCard)
    formAddCard.reset()
    formAddCardValidation.disableButtonSubmit()
})

buttonCloseEditProfilePopup.addEventListener('click', () => {
    closePopUp(popupEditProfile)
})

buttonCloseAddCardPopup.addEventListener('click', () => {
    closePopUp(popupAddCard)
})

buttonCloseImagePopup.addEventListener('click', () => {
    closePopUp(popupImage)
})

formEditProfile.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveProfile()
    formEditProfile.reset()
})

formAddCard.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveElement()
    formAddCard.reset()
})

initialCards.forEach(function (item) {
    sectionElements.append(createCard(item.link, item.name, '#element-template'))
})

const formEditProfileValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}, formEditProfile)
const formAddCardValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}, formAddCard)

formEditProfileValidation.enableValidation()
formAddCardValidation.enableValidation()

export {openPopUp}