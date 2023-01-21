let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close')
let form = popup.querySelector('.popup__form')
let profileName = profile.querySelector('.profile__name')
let profileDescription = profile.querySelector('.profile__description')
let saveButton = form.querySelector('.popup__save-button')
let name = "Жак-Ив Кусто"
let description = "Исследователь океана"

function openPopUp() {
    let formName = form.querySelector('.popup__name')
    let formDescription = form.querySelector('.popup__description')

    formName.value = profileName.textContent
    formDescription.value = profileDescription.textContent

    popup.classList.add('popup_show', true)

    // console.log(profileName.textContent)
}

function closePopUp() {
    popup.classList.remove('popup_show')
}

function saveProfile() {
    let formName = form.querySelector('.popup__name')
    let formDescription = form.querySelector('.popup__description')

    name = formName.value
    description = formDescription.value

    formName.value = ''
    formDescription.value = ''
}

editButton.addEventListener('click', openPopUp)
closeButton.addEventListener('click', closePopUp)
saveButton.addEventListener('click', saveProfile)