export class UserInfo {
  constructor({ nameSelector, infoSelector, profileAvatar}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._profileId = '';
    this.avatar = avatar;
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent,
      id: this._profileId,
      avatar: this._profileAvatar.src
    };
  }

  setUserInfo(name, info, id) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
 
    this._profileId = id;
  }
  setUserAvatar(avatar) {
    if (avatar !== undefined) {
      this._profileAvatar.style.backgroundImage = `url('${avatar}')`;
    }
  }
}
