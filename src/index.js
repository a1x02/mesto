import Card from './scripts/components/Card.js'
import FormValidator from "./scripts/components/FormValidator.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";

import './pages/index.css'

import * as constants from './scripts/utils/constants.js'

const popupWithImage = new PopupWithImage('#popup-image')
popupWithImage.setEventListeners()

const handleCardClick = function (imageLink, imageName) {
    popupWithImage.open(imageLink, imageName)
}

const saveElement = function (data) {
    itemList.prependItem(createCard(data))
}

const createCard = function (data) {
    const card = new Card(data, '#element-template', handleCardClick)
    return card.generateCard()
}

const itemList = new Section({
    items: constants.initialCards,
    renderer: (item) => {
        itemList.addItem(createCard(item))
    },
}, '.elements')

itemList.renderItems()

const userInfo = new UserInfo({
    profileName: constants.profileName,
    profileDescription: constants.profileDescription
})

const popupProfileWithForm = new PopupWithForm('#popup-edit', (formItems) => {
    const data = {
        name: formItems["name"],
        description: formItems["description"]
    }
    userInfo.setUserInfo(data)
    popupProfileWithForm.close()
})
popupProfileWithForm.setEventListeners()

const popupAddCardWithForm = new PopupWithForm('#popup-add', (formItems) => {
    const data = {
        name: formItems["popup-input-name"],
        link: formItems["popup-input-description"]
    }
    console.log(data)
    saveElement(data)
    popupAddCardWithForm.close()
    constants.formAddCard.reset()
})
popupAddCardWithForm.setEventListeners()

constants.buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupProfileWithForm.open()
    popupProfileWithForm.setInputValues(userInfo.getUserInfo())
})
constants.buttonOpenAddCardPopup.addEventListener('click', () => {
    popupAddCardWithForm.open()
    formAddCardValidation.disableButtonSubmit()
})

const formEditProfileValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}, constants.formEditProfile)
const formAddCardValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}, constants.formAddCard)

formEditProfileValidation.enableValidation()
formAddCardValidation.enableValidation()
