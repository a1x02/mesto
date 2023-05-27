export default class Card {
    constructor(data, cardTemplate, handleCardClick) {
        this._cardLink = data.link
        this._cardName = data.name
        this._cardTemplate = cardTemplate
        this._handleCardClick = handleCardClick
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

        this._buttonDelete.addEventListener('click', () => {
            this._handleButtonDeleteClick()
        })

        this._buttonLike.addEventListener('click', () => {
            this._handleButtonLikeClick()
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._cardLink, this._cardName)
        })
    }

    _handleButtonLikeClick() {
        this._buttonLike.classList.toggle('element__like-button_active')
    }

    _handleButtonDeleteClick() {
        this._cardElement.remove()
        this._cardElement = null
    }
}