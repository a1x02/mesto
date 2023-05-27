import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._elementImage = this._popupElement.querySelector('.popup__image')
        this._elementDescription = this._popupElement.querySelector('.popup__description')
    }

    open(imageLink, imageName) {
        super.open()
        console.log(this._elementImage)
        this._elementImage.src = imageLink
        this._elementImage.alt = imageName
        this._elementDescription.textContent = imageName
    }
}