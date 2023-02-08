const profile = document.querySelector('.profile')
const editButton = profile.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeButton = popup.querySelector('.popup__close')
const form = popup.querySelector('.popup__form')
const profileName = profile.querySelector('.profile__name')
const profileDescription = profile.querySelector('.profile__description')
const formName = form.querySelector('.popup__input_subject_name')
const formDescription = form.querySelector('.popup__input_subject_description')
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

const openPopUp = function () {
    formName.value = profileName.textContent
    formDescription.value = profileDescription.textContent

    popup.classList.add('popup_opened', true)
}

const closePopUp = function () {
    popup.classList.remove('popup_opened')
}

const saveProfile = function () {
    profileName.textContent = formName.value
    profileDescription.textContent = formDescription.value

    formName.value = ''
    formDescription.value = ''
    closePopUp()
}

editButton.addEventListener('click', openPopUp)

closeButton.addEventListener('click', (eventClose) => {
    eventClose.preventDefault()
    closePopUp()
})

form.addEventListener('submit', (eventSave) => {
    eventSave.preventDefault()
    saveProfile()
})

initialCards.forEach(function (item) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true)
    elementCard.querySelector('.element__image').src = item.link
    elementCard.querySelector('.element__image').alt = item.name
    elementCard.querySelector('.element__title').textContent = item.name
    console.log(item.name)

    sectionElements.append(elementCard)
})