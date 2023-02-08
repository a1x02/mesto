let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close')
let form = popup.querySelector('.popup__form')
let profileName = profile.querySelector('.profile__name')
let profileDescription = profile.querySelector('.profile__description')

let formName = form.querySelector('.popup__input_subject_name')
let formDescription = form.querySelector('.popup__input_subject_description')

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