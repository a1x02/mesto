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
        itemList.renderItems(defaultCardsData)
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
                        card.delete()
                        popupWithConfirmation.close()
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
    constants.formAddCard.reset()
})
popupAddCardWithForm.setEventListeners()

const popupEditAvatarWithForm = new PopupWithForm('#popup-avatar', (formItems) => {
    const image = formItems["input-avatar"]
    popupEditAvatarWithForm.changeSaveButtonText('Сохранение...')

    api.patchProfileImage(image)
        .then(() => {
            userInfo.setUserProfileImage(image)
            popupEditAvatarWithForm.close()
        })
        .catch((err) => {
            console.log(err)
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
})

const formEditProfileValidation = new FormValidator(constants.validationConfig, constants.formEditProfile)
const formAddCardValidation = new FormValidator(constants.validationConfig, constants.formAddCard)
const formEditAvatarValidation = new FormValidator(constants.validationConfig, constants.formEditAvatar)

formEditProfileValidation.enableValidation()
formAddCardValidation.enableValidation()
formEditAvatarValidation.enableValidation()
