let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close')


function openPopUp() {
    popup.classList.add('popup_show', true)
}

function closePopUp() {
    popup.classList.remove('popup_show')
}

editButton.addEventListener('click', openPopUp)
closeButton.addEventListener('click', closePopUp)