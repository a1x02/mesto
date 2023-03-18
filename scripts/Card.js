import {openPopUp} from "./index.js";

class Card {
    constructor(cardLink, cardName, cardTemplate) {
        this._cardLink = cardLink
        this._cardName = cardName
        this._cardTemplate = cardTemplate
    }

    _getTemplate() {
        return  document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    generateCard() {
        this._cardElement = this._getTemplate()
        this._cardImage = this._cardElement.querySelector('.element__image')

        this._cardImage.src = this._cardLink
        this._cardImage.alt = this._cardName
        this._cardElement.querySelector('.element__title').textContent = this._cardName

        this._setEventListeners()

        return this._cardElement
    }

    _setEventListeners() {
        this._buttonDelete = this._cardElement.querySelector('.delete-button')
        this._buttonLike = this._cardElement.querySelector('.element__like-button')
        this._popupImage = document.querySelector('#popup-image')
        this._itemImage = this._popupImage.querySelector('.popup__image')

        this._buttonDelete.addEventListener('click', (eventDelete) => {
            eventDelete.preventDefault()
            this._handleButtonDeleteClick()
        })

        this._buttonLike.addEventListener('click', (eventLike) => {
            eventLike.preventDefault()
            this._handleButtonLikeClick()
        })

        this._cardImage.addEventListener('click', (eventOpen) => {
            eventOpen.preventDefault()
            this._itemImage.src = this._cardImage.src
            this._itemImage.alt = this._cardImage.alt
            this._popupImage.querySelector('.popup__description').textContent = this._cardImage.alt
            openPopUp(this._popupImage)
        })
    }

    _handleButtonLikeClick() {
        this._buttonLike.classList.toggle('element__like-button_active')
    }

    _handleButtonDeleteClick() {
        this._buttonDelete.closest('.element').remove()
    }
}

export {Card}