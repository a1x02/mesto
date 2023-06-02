export default class UserInfo {
    constructor({profileName, profileDescription, profileImage}) {
        this._profileName = profileName
        this._profileDescription = profileDescription
        this._profileImage = profileImage
    }

    getUserInfo() {
        this._profileInfo = {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent,
            image: this._profileImage.src
        }

        return this._profileInfo
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name
        this._profileDescription.textContent = data.about
        this._userData = data
    }

    setUserProfileImage(profileImage) {
        this._profileImage.src = profileImage
    }

    getUserId() {
        return this._userData._id
    }
}