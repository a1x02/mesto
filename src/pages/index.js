import Card from '../scripts/components/Card.js'
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js"
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

import './index.css'

import * as constants from '../scripts/utils/constants.js'

const popupWithImage = new PopupWithImage('#popup-image')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('#popup-confirmation')
popupWithConfirmation.setEventListeners()

const handleCardClick = function (imageLink, imageName) {
    popupWithImage.open(imageLink, imageName)
}

const saveElement = function (data) {
    itemList.prependItem(createCard(data))
}

const userInfo = new UserInfo({
    profileName: constants.profileName,
    profileDescription: constants.profileDescription,
    profileImage: constants.profileImage
})

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '2305e905-bab3-4d55-ab85-4f77082b3877',
        'Content-Type': 'application/json'
    }
})
api.getPromiseInfo()
    .then((res) => {
        const [userInfoData, defaultCardsData] = res
        userInfo.setUserInfo(userInfoData)
        userInfo.setUserProfileImage(userInfoData.avatar)
        const defaultCards = defaultCardsData // TODO: fix redundant
        itemList.renderItems(defaultCards)
    })
    .catch((err) => console.log(err))

const createCard = function (data) {
    const card = new Card({
        data: data,
        handleCardClick: () => {
            popupWithImage.open(data.link, data.name)
        },
        handleCardLike: (cardId) => {
            if (card._checkIdInLikes()) {
                api.deleteCardLike(cardId)
                    .then((res) => {
                        card.setLike(res.likes)
                    })
                    .catch((err) => console.log(err))
            } else {
                api.putCardLike(cardId)
                    .then((res) => {
                        card.setLike(res.likes)
                    })
                    .catch((err) => console.log(err))
            }
        },
        handleCardDelete: (cardId) => {
            popupWithConfirmation.open()
            popupWithConfirmation.setCloseCallback(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        popupWithConfirmation.close()
                        card.delete()
                    })
                    .catch((err) => console.log(err))
            })
        }
    }, '#element-template', userInfo.getUserId())
    return card.generateCard()
}

const itemList = new Section({
    renderer: (item) => {
        itemList.addItem(createCard(item))
    },
}, '.elements')

const popupProfileWithForm = new PopupWithForm('#popup-edit', (formItems) => {
    const data = {
        name: formItems["name"],
        about: formItems["description"]
    }
    popupProfileWithForm.changeSaveButtonText('Сохранение...')
    api.patchUserInfo(data)
        .then(() => {
            userInfo.setUserInfo(data)
            popupProfileWithForm.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupProfileWithForm.changeSaveButtonText('Сохранить')
        })
})
popupProfileWithForm.setEventListeners()

const popupAddCardWithForm = new PopupWithForm('#popup-add', (formItems) => {
    popupAddCardWithForm.changeSaveButtonText('Сохранение...')
    api.addNewCard(formItems)
        .then((res) => {
            itemList.prependItem(createCard(res))
            popupAddCardWithForm.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupAddCardWithForm.changeSaveButtonText('Создать')
        })
    popupAddCardWithForm.close()
    constants.formAddCard.reset()
})
popupAddCardWithForm.setEventListeners()

const popupEditAvatarWithForm = new PopupWithForm('#popup-avatar', (formItems) => {
    const image = formItems["input-avatar"]
    popupEditAvatarWithForm.changeSaveButtonText('Сохранение...')

    api.patchProfileImage(image)
        .then(() => {
            popupEditAvatarWithForm.close()
            userInfo.setUserProfileImage(image)
            console.log(image)
        })
        .catch((err) => {
            console.log(err)
            console.log(image)
        })
        .finally(() => {
            popupEditAvatarWithForm.changeSaveButtonText('Сохранить')
        })
})
popupEditAvatarWithForm.setEventListeners()

constants.buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupProfileWithForm.open()
    popupProfileWithForm.setInputValues(userInfo.getUserInfo())
})
constants.buttonOpenAddCardPopup.addEventListener('click', () => {
    popupAddCardWithForm.open()
    formAddCardValidation.disableButtonSubmit()
})
constants.profileImageOverlay.addEventListener('click', () => {
    popupEditAvatarWithForm.open()
    // constants.formEditAvatar.disableButtonSubmit()
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
const formEditAvatarValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}, constants.formEditAvatar)

formEditProfileValidation.enableValidation()
formAddCardValidation.enableValidation()
formEditAvatarValidation.enableValidation()
