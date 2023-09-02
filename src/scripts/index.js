import '../pages/index.css';
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";
import { Section } from './Section.js';

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

const formAddNewCardValid = new FormValidator(validationConfig, popupAddCard);
formAddNewCardValid.enableValidation();


buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupAddCard);
});

buttonCloseAddCardPopup.addEventListener("click", function () {
  closePopup(popupAddCard); // закрываем второй попап
});

buttonOpenEditProfilePopup.addEventListener("click", editProfilePopupOpen);

buttonCloseEditProfilePopup.addEventListener("click", function () {
  closePopup(popupEditProfile);
  form.reset();
});

buttonCloseImagePopup.addEventListener("click", function () {
  closePopup(popupViewImage);
});

formEditProfile.addEventListener("submit", editProfilePopupSubmit);

formAddCard.addEventListener("submit", formAddCardSubmit);

function editProfilePopupOpen() {
  openPopup(popupEditProfile);
  nameInputEl.value = pageTitleEl.textContent;
  professionInputEl.value = pageProfessionEl.textContent;
}

function editProfilePopupSubmit(event) {
  event.preventDefault();
  pageTitleEl.textContent = nameInputEl.value;
  pageProfessionEl.textContent = professionInputEl.value;
  closePopup(popupEditProfile);
}

function formAddCardSubmit(event) {
  event.preventDefault(); //чтобы никуда ничего не отправлялось
  const form = event.target; // элемент на котором сработало нажатие кнопки - это форма
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  renderTodoCard(values);
  form.reset();
  closePopup(popupAddCard);
  formAddNewCardValid.disableSubmitButton();
}

//Рендер карточки
const renderTodoCard = () => { 
  const CardList = new Section({ 
    items: initialCards, 
    renderer: (item)=>{
      const card = new Card(item.name, item.link, "#template-element");
      return elementsCards.prepend(card.getView());}
    },
     '.elements');
     CardList.renderItems();
  }

 /*  // Рендер карточки
const renderTodoCard = (item) => {
  const card = new Card(item.name, item.link, "#template-element");
  elementsCards.prepend(card.getView());
};
*/

  renderTodoCard();


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




