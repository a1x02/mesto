let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close')
let form = popup.querySelector('.popup__form')
let profileName = profile.querySelector('.profile__name')
let profileDescription = profile.querySelector('.profile__description')

let formName = form.querySelector('.popup__form_input_name')
let formDescription = form.querySelector('.popup__form_input_description')

function openPopUp() {
    formName.value = profileName.textContent
    formDescription.value = profileDescription.textContent

    popup.classList.add('popup_opened', true)

    // console.log(profileName.textContent)
    // console.log(formName.value)
}

function closePopUp() {
    popup.classList.remove('popup_opened')
}

function saveProfile() {
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

// form.addEventListener('keypress', (eventSaveOnEnter) => {
//     if (eventSaveOnEnter.key === "Enter") {
//         eventSaveOnEnter.preventDefault()
//         saveButton.click()
//     }
// })