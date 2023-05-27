export default class UserInfo {
    constructor({profileName, profileDescription}) {
        this._profileName = profileName
        this._profileDescription = profileDescription
    }

    getUserInfo() {
        this._profileInfo = {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent}

        return this._profileInfo
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name
        this._profileDescription.textContent = data.description
    }
}