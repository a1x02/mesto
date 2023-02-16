const profile = document.querySelector('.profile')
const editButton = profile.querySelector('.profile__edit-button')
const addButton = profile.querySelector('.profile__add-button')

const popupEdit = document.querySelector('#popup-edit')
const popupAdd = document.querySelector('#popup-add')
const popupImage = document.querySelector('#popup-image')

const closeButtonEdit = popupEdit.querySelector('.popup__close')
const closeButtonAdd = popupAdd.querySelector('.popup__close')
const closeButtonImage = popupImage.querySelector('.popup__close')

const formEdit = popupEdit.querySelector('#form-edit')
const formAdd = popupAdd.querySelector('#form-add')
const formAddName = formAdd.querySelector('.popup__input_subject_name')
const formAddLink = formAdd.querySelector('.popup__input_subject_description')

const profileName = profile.querySelector('.profile__name')
const profileDescription = profile.querySelector('.profile__description')
const formEditName = formEdit.querySelector('.popup__input_subject_name')
const formEditDescription = formEdit.querySelector('.popup__input_subject_description')

const elementTemplate = document.querySelector('#element-template').content
const sectionElements = document.querySelector('.elements')

const itemImage = popupImage.querySelector('.popup__image')
const itemDescription = popupImage.querySelector('.popup__description')

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

const openPopUp = function (popupName) {
    popupName.classList.add('popup_opened')
}

const createCard = function (elementCard, cardImage) {
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
}

const closePopUp = function (popupName) {
    popupName.classList.remove('popup_opened')
}

const saveProfile = function () {
    profileName.textContent = formEditName.value
    profileDescription.textContent = formEditDescription.value

    formEdit.reset()
    closePopUp(popupEdit)
}

const saveElement = function () {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true)
    const cardImage = elementCard.querySelector('.element__image')
    cardImage.src = formAddLink.value
    cardImage.alt = formAddName.value
    elementCard.querySelector('.element__title').textContent = formAddName.value

    createCard(elementCard, cardImage)
    sectionElements.prepend(elementCard)
    closePopUp(popupAdd)
}

editButton.addEventListener('click', (eventOpen) => {
    eventOpen.preventDefault()
    openPopUp(popupEdit)
})
addButton.addEventListener('click', (eventOpen) => {
    eventOpen.preventDefault()
    openPopUp(popupAdd)
})

closeButtonEdit.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    formEdit.reset()
    closePopUp(popupEdit)
})

closeButtonAdd.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    formAdd.reset()
    closePopUp(popupAdd)
})

closeButtonImage.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    closePopUp(popupImage)
})

formEdit.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveProfile()
    formEdit.reset()
})

formAdd.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveElement()
    formAdd.reset()
})

initialCards.forEach(function (item) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true)
    const cardImage = elementCard.querySelector('.element__image')
    cardImage.src = item.link
    cardImage.alt = item.name
    elementCard.querySelector('.element__title').textContent = item.name

    createCard(elementCard, cardImage)
    sectionElements.append(elementCard)
})


