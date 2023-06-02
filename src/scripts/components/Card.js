export default class Card {
    constructor({data, handleCardClick, handleCardLike, handleCardDelete}, cardTemplate, userId) {
        this._cardLink = data.link
        this._cardName = data.name
        this._cardLikes = data.likes
        this._cardId = data._id
        this._ownerId = data.owner._id
        this._userId = userId
        this._handleCardLike = handleCardLike
        this._handleCardDelete = handleCardDelete
        this._cardTemplate = cardTemplate
        this._handleCardClick = handleCardClick
    }

    _getTemplate() {
        return  document
            .querySelector(this._cardTemplate)
            .content
            // .querySelector('.element')
            .cloneNode(true)
            .children[0]
    }

    generateCard() {
        this._cardElement = this._getTemplate()
        this._cardImage = this._cardElement.querySelector('.element__image')

        this._cardImage.src = this._cardLink
        this._cardImage.alt = this._cardName
        this._cardElement.querySelector('.element__title').textContent = this._cardName
        this._likesAmount = this._cardElement.querySelector('.element__like-counter')
        this._likesAmount.textContent = this._cardLikes.length

        this._setEventListeners()

        return this._cardElement
    }

    _setEventListeners() {
        this._buttonDelete = this._cardElement.querySelector('.delete-button')
        this._buttonLike = this._cardElement.querySelector('.element__like-button')

        if (this._ownerId === this._userId) {
            this._buttonDelete.addEventListener('click', () => {
                this._deleteCard(this._cardId)
            })
        } else {
            this._buttonDelete.remove()
            this._buttonDelete = null
        }

        this._buttonLike.addEventListener('click', () => {
            this._handleCardLike(this._cardId)
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._cardLink, this._cardName)
        })
    }

    _checkIdInLikes() {
        return this._cardLikes.some(data => data._id === this._userId)
    }

    setLike(likes) {
        this._cardLikes = likes
        this._likesAmount.textContent = likes.length
        if (this._checkIdInLikes()) {
            this._buttonLike.classList.add('element__like-button_active')
        } else {
            this._buttonLike.classList.remove('element__like-button_active')
        }
    }

    _deleteCard() {
        if (this._ownerId === this._userId) {
            this._handleCardDelete(this._cardId);
        } else {
            this._buttonDelete.closest('.element').remove()
        }

    }

    delete() {
        this._cardElement.remove()
        this._cardElement = null
    }
}