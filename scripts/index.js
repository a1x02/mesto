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

const elementTemplate = document.querySelector('#element-template').content
const sectionElements = document.querySelector('.elements')

const itemImage = popupImage.querySelector('.popup__image')
const itemDescription = popupImage.querySelector('.popup__description')

const buttonEscapeCode = 'Escape'

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

    if (evt.key === buttonEscapeCode) {
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
    document.addEventListener('mousedown', closeOnOverlay)
}

const disableButtonSubmit = (popupName) => {
    const buttonSubmitElement = popupName.querySelector('.popup__save-button')
    buttonSubmitElement.disabled = true
    buttonSubmitElement.classList.add('popup__save-button_inactive')
}

const createCard = function (cardLink, cardName) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true)
    const cardImage = elementCard.querySelector('.element__image')
    cardImage.src = cardLink
    cardImage.alt = cardName
    elementCard.querySelector('.element__title').textContent = cardName

    const deleteButton = elementCard.querySelector('.delete-button')
    const likeButton = elementCard.querySelector('.element__like-button')

    deleteButton.addEventListener('click', (eventDelete) => {
        eventDelete.preventDefault()
        const elementsItem = deleteButton.closest('.element')
        elementsItem.remove()
    })

    likeButton.addEventListener('click', (eventLike) => {
        eventLike.preventDefault()
        likeButton.classList.toggle('element__like-button_active')
    })

    cardImage.addEventListener('click', (eventOpen) => {
        eventOpen.preventDefault()
        itemImage.src = cardImage.src
        itemImage.alt = cardImage.alt
        itemDescription.textContent = cardImage.alt
        openPopUp(popupImage)
    })

    return elementCard
}

const closePopUp = function (popupName) {
    popupName.classList.remove('popup_opened')

    document.removeEventListener('keydown', closeOnEscape)
    document.removeEventListener('mousedown', closeOnOverlay)
}

const saveProfile = function () {
    profileName.textContent = formEditName.value
    profileDescription.textContent = formEditDescription.value

    formEditProfile.reset()
    closePopUp(popupEditProfile)
}

const saveElement = function () {
    sectionElements.prepend(createCard(formAddLink.value, formAddName.value))
    closePopUp(popupAddCard)
}

buttonOpenEditProfilePopup.addEventListener('click', (eventOpen) => {
    eventOpen.preventDefault()
    openPopUp(popupEditProfile)
    formEditName.value = profileName.textContent
    formEditDescription.value = profileDescription.textContent
    disableButtonSubmit(popupEditProfile)

})
buttonOpenAddCardPopup.addEventListener('click', (eventOpen) => {
    eventOpen.preventDefault()
    openPopUp(popupAddCard)
    disableButtonSubmit(popupAddCard)

})

buttonCloseEditProfilePopup.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    formEditProfile.reset()
    closePopUp(popupEditProfile)
})

buttonCloseAddCardPopup.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    formAddCard.reset()
    closePopUp(popupAddCard)
})

buttonCloseImagePopup.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
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
    sectionElements.append(createCard(item.link, item.name))
})