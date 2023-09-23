export class Card {
  constructor(
    {
      name,
      link,
      likes,
      owner,
      id,
      removeButtonClick,
      handleLikeIcon,
      handleClickLike,
      userId,
    },
    templateSelector,
    handleCardClick
  ) {
    this._isLiked = false;
    likes.forEach((obj) => {
      if (obj._id === userId) {
        this._isLiked = true;
      }
    });

    this._name = name;
    this._link = link;
    this._owner = owner;
    this._id = id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._removeButtonClick = removeButtonClick;
    this._handleClickLike = handleClickLike;
    this._handleLikeIcon = handleLikeIcon;
    this._likes = likes.length; //получить количество лайков
  }

  //изменение статуса лайка
  changeStatus() {
    this._isLiked = !this._isLiked;
  }
  _handleImageClick() {
    this._handleCardClick(this._link, this._name, this._likes);
  }

  /* Приватный метод найдёт template-элемент с id template-element, извлечёт его содержимое, в содержимом найдёт элемент с классом element,
клонирует его, вернёт клонированный элемент.*/
  _getTemplate() {
    const cardTempate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTempate;
  }

  _setData() {
    this._cardName = this._element.querySelector(".element__name");
    this._cardName.textContent = this._name;
    this._cardImage = this._element.querySelector(".element__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDeleteButton = this._element.querySelector(".element__delete");
    this._cardLike = this._element.querySelector(".element__like");
    this._usersLikesElement = this._element.querySelector(
      ".element__likes-counter"
    );
    this._usersLikesElement.textContent = this._likes;
  }
  setLikes(sumLikes) {
    this._likes = sumLikes;
    this._usersLikesElement.textContent = this._likes;
  }
  getView(userId, likes) {
    this._element = this._getTemplate();
    this._setData();

    if (this._owner !== userId) {
      this._cardDeleteButton.remove();
    }
    this._likes = likes;
    if (this._isLiked) {
      this._cardLike.classList.add("element__like_active");
    }
    this._setEventListeners();
    return this._element;
  }

  //метод _setEventListeners добавляет все обработчики в одном месте. В нём события клика по двум элементам:
  _setEventListeners() {
    //ставит лайки при клике
    this._cardLike.addEventListener("click", () => {
      this._likeCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
    //удаляет при клике
    this._cardDeleteButton.addEventListener("click", () => {
      this._removeButtonClick(this);
      this._deleteCard();
    });
  }

  //удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //cтавить лайки
  _likeCard() {
    this._cardLike.classList.toggle("element__like_active"); // обращаемся к свойству toggle
    this._handleClickLike();
  }
}
