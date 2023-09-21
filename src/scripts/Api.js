export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Что-то пошло не так...");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Все карточки
  getAllCards() {
    return this._sendRequest(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //Загрузка информации о пользователе с сервера
  getInfoUser() {
    return this._sendRequest(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //Редактирование профиля
  editProfile(name, about) {
    return this._sendRequest(`${this._url}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  //Редактирование аватара
  newAvatar(avatar) {
    return this._sendRequest(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  //Добавление новой карточки
  apiAddNewCard(name, link) {
    return this._sendRequest(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  // удаление карточки
  deleteCard(cardId) {
    return this._sendRequest(`${this._url}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //лайкнуть карточку
  likeCard(cardId) {
    return this._sendRequest(`${this._url}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  //убрать лайк
  likeDelete(cardId) {
    return this._sendRequest(`${this._url}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
