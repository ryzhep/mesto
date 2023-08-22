import {
  namePopupInput,
  openPopup,
  popupViewImage,
  popupImage,
} from "./index.js";

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector=templateSelector;
  }

  /* Приватный метод найдёт template-элемент с id template-element, извлечёт его содержимое, в содержимом найдёт элемент с классом element,
клонирует его, вернёт клонированный элемент.*/
  _getTemplate() {
    const cardTempate= document.querySelector(this._templateSelector)
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
  }

  getView() {
    this._element = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._element;
  }

  //метод _setEventListeners добавляет все обработчики в одном месте. В нём события клика по двум элементам:
  _setEventListeners() {
    //удаляет при клике
    this._cardDeleteButton.addEventListener("click", () => {
      this._DeleteCard();
    });

    //ставит лайки при клике
    this._cardLike.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    //открывается картинка при клике
    this._cardImage.addEventListener("click", () => {
      this._clickImage();
    });
  }

  //открыть картинку
  _clickImage() {
    openPopup(popupViewImage);
    namePopupInput.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
  }

  //удаление карточки
  _DeleteCard() {
    this._element.remove(); //удаление из разметки
    this._element = null; // удаление из памяти
  }

  //cтавить лайки
  _handleLikeIcon() {
    this._cardLike.classList.toggle("element__like_active"); // обращаемся к свойству toggle
  }
}
