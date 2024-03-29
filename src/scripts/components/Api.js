import {profileDescription, profileName} from "../utils/constants";

export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _getResponseInfo(response) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }

    getPromiseInfo() {
        return Promise.all([this._getUserInfo(), this._getInitialCards()])
    }

    _getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    _getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    patchUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
    }

    addNewCard(formItems) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formItems.name,
                link: formItems.description
            })
        })
            .then(this._getResponseInfo)
    }

    deleteCard(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    putCardLike(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    deleteCardLike(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    patchProfileImage(profileImage) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: profileImage
            })
        })
            .then(this._getResponseInfo)
    }
}