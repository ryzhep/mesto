import { Card } from "./Card.js";
import {validationConfig, FormValidator } from "./FormValidator.js";


const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__open-popup"
);
export const buttonOpenAddCardPopup = document.querySelector(".profile__add");

const buttonCloseEditProfilePopup = document.querySelector("#close-edit-form");
export const buttonCloseAddCardPopup = document.querySelector(
  "#close-newcard-form"
);
const buttonCloseImagePopup = document.querySelector("#close-image-form");

export const popupEditProfile = document.querySelector("#edit-popup");
const popupAddCard = document.querySelector("#newcard-popup");
export const popupViewImage = document.querySelector("#image-popup");

const pageTitleEl = document.querySelector(".profile__name");

const pageProfessionEl = document.querySelector(".profile__profession");
export const nameInputEl = document.querySelector("#name-input");
export const namePopupInput = document.querySelector("#popup-name");
export const popupImage = document.querySelector("#pupup__image");

const professionInputEl = document.querySelector("#profession-input");

const formEditProfile = document.querySelector("#edit-form");
export const formAddCard = document.querySelector("#newcard-form");

//константа куда мы будем добавлять
const elementsCards = document.querySelector(".elements");

//Валидация
const formProfileValid = new FormValidator(validationConfig, popupEditProfile);
formProfileValid.enableValidation();
console.log(formProfileValid);
const formAddNewCardValid = new FormValidator(validationConfig, popupAddCard);
formAddNewCardValid.enableValidation();
console.log(formAddNewCardValid);

//Открытие попапа добавления карточки
buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupAddCard);
});

//Закрытие попапа добавления карточки
buttonCloseAddCardPopup.addEventListener("click", function () {
  closePopup(popupAddCard); // закрываем второй попап
  
});

//Открытие попапа изменения карточки
buttonOpenEditProfilePopup.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInputEl.value = pageTitleEl.textContent;
  professionInputEl.value = pageProfessionEl.textContent;
});

//Закрытие попапа изменения карточки
buttonCloseEditProfilePopup.addEventListener("click", function () {
  closePopup(popupEditProfile);
  form.reset();
});

//Закрытие изображения
buttonCloseImagePopup.addEventListener("click", function () {
  closePopup(popupViewImage);
});

// Слушатель на форму редактирования карточки
formEditProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  pageTitleEl.textContent = nameInputEl.value;
  pageProfessionEl.textContent = professionInputEl.value;
  closePopup(popupEditProfile);
});

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault(); //чтобы никуда ничего не отправлялось
  const form = event.target; // элемент на котором сработало нажатие кнопки - это форма
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  renderTodoCard(values);
  form.reset();
  closePopup(popupAddCard);
});

// Рендер карточки
const renderTodoCard = (item) => {
  const card = new Card(item.name, item.link, "#template-element");
  elementsCards.prepend(card.getView());
};

initialCards.forEach((todoData) => {
  renderTodoCard(todoData);
});

//закрытие попапов

export function openPopup(popupEl) {
  popupEl.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popupEl.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(popupEl) {
  popupEl.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popupEl.removeEventListener("mousedown", closePopupOverlay);
}

//закрытие через escape
export const closePopupEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//закрытие через overlay
export const closePopupOverlay = (event) => {
  if (event.currentTarget === event.target) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};


