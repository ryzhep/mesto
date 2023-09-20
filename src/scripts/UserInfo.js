export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._profileId = '';
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent,
      id: this._profileId
    };
  }

  setUserInfo(name, info, id) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
    this._profileId = id;
  }
}
