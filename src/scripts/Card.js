import { PopupDeleteCard } from "../scripts/PopupDeleteCard.js";
import {buttonDeletePopup} from "../utils/constants.js";
const popupWithComfirm = new PopupDeleteCard("#deletecard-popup",);
buttonDeletePopup.addEventListener("click", function () {
  popupWithComfirm.close();
});

export class Card {
  constructor({name, link, likes}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes.length;//получить количество лайков

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
    this._usersLikesElement = this._element.querySelector('.element__likes-counter');
    this._usersLikesElement.textContent = this._likes;
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

      this._deleteCard();
    });

    //ставит лайки при клике
    this._cardLike.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardImage.addEventListener('click', () => { 
      this._handleImageClick() 
    });
  }

  //удаление карточки
  _deleteCard() {
    popupWithComfirm.open();
    this._element.remove(); //удаление из разметки
    this._element = null; // удаление из памяти
  }


    //cтавить лайки
    _handleLikeIcon() {
      this._cardLike.classList.toggle("element__like_active"); // обращаемся к свойству toggle
    }   
}

