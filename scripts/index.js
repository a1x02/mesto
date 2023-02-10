const profile = document.querySelector('.profile')
const editButton = profile.querySelector('.profile__edit-button')
const addButton = profile.querySelector('.profile__add-button')
const popup = document.querySelector('.popup')
const popupEdit = document.querySelector('#popup-edit')
const popupAdd = document.querySelector('#popup-add')
const closeButtonEdit = popupEdit.querySelector('.popup__close')
const closeButtonAdd = popupAdd.querySelector('.popup__close')
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

const openPopUpEdit = function () {
    formEditName.value = profileName.textContent
    formEditDescription.value = profileDescription.textContent

    popupEdit.classList.add('popup_opened', true)
}

const openPopUpAdd = function () {
    popupAdd.classList.add('popup_opened', true)
}

const closePopUp = function () {
    if (popupEdit.classList.contains('popup_opened')) {
        popupEdit.classList.remove('popup_opened')
    }
    if (popupAdd.classList.contains('popup_opened')) {
        popupAdd.classList.remove('popup_opened')
    }
}

const saveProfile = function () {
    profileName.textContent = formEditName.value
    profileDescription.textContent = formEditDescription.value

    formEditName.value = ''
    formEditDescription.value = ''
    closePopUp()
}

const saveElement = function () {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true)
    elementCard.querySelector('.element__image').src = formAddLink.value
    elementCard.querySelector('.element__image').alt = formAddName.value
    elementCard.querySelector('.element__title').textContent = formAddName.value

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

    sectionElements.prepend(elementCard)
    closePopUp()
}

editButton.addEventListener('click', openPopUpEdit)
addButton.addEventListener('click', openPopUpAdd)

closeButtonEdit.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    closePopUp()
})

closeButtonAdd.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    closePopUp()
})

formEdit.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveProfile()
})

formAdd.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveElement()
})

initialCards.forEach(function (item) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true)
    elementCard.querySelector('.element__image').src = item.link
    elementCard.querySelector('.element__image').alt = item.name
    elementCard.querySelector('.element__title').textContent = item.name

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

    sectionElements.append(elementCard)
})


