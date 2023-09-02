export class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }
  
//возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
  }

  setUserInfo({ name, info }) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
