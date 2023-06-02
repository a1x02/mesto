export const profile = document.querySelector('.profile')
export const buttonOpenEditProfilePopup = profile.querySelector('.profile__edit-button')
export const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button')

export const popupEditProfile = document.querySelector('#popup-edit')
export const popupAddCard = document.querySelector('#popup-add')

export const formEditProfile = popupEditProfile.querySelector('#form-edit')
export const formAddCard = popupAddCard.querySelector('#form-add')

export const profileName = profile.querySelector('.profile__name')
export const profileDescription = profile.querySelector('.profile__description')
export const profileImage = document.querySelector('.profile__avatar')
export const profileImageOverlay = document.querySelector('.profile__avatar_edit')
export const formEditAvatar = document.querySelector('#form-avatar')

export const initialCards = [
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