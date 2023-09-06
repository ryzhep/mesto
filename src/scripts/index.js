import "../pages/index.css";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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
export const popupImage = document.querySelector("#popup__image");
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

//--ПОПАП СОЗДАНИЯ КАРТОЧКИ
const popupWithFormAdd = new PopupWithForm("#newcard-popup", (values) => {
  const nameInput = values["name-name"];
  const urlInput = values["image-link"];
  const cardElement = renderTodoCard(nameInput, urlInput);
  section.addItem(cardElement);
});
buttonOpenAddCardPopup.addEventListener("click", function () {
  popupWithFormAdd.open();
});

buttonCloseAddCardPopup.addEventListener("click", function () {
  popupWithFormAdd.close(); // закрываем второй попап
});

formAddCard.addEventListener("submit", formAddCardSubmit);
function formAddCardSubmit(event) {
  event.preventDefault(); //чтобы никуда ничего не отправлялось
  const form = event.target; // элемент на котором сработало нажатие кнопки - это форма
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  renderTodoCard(values);
  form.reset();
  popupWithFormAdd.close();
  formAddNewCardValid.disableSubmitButton();
}
popupWithFormAdd.setEventListeners();

//--ПОПАП ПРОСМОТРА ИЗОБРАЖЕНИЯ--
const popupWithImage = new PopupWithImage("#image-popup");
buttonCloseImagePopup.addEventListener("click", function () {
  popupWithImage.close();
});

//открыть изображение
function openPopupImage(image, name) {
  popupWithImage.open(image, name);
}

popupWithImage.setEventListeners();

//--ПОПАП ПРОФЕССИИ
const popupWithFormEdit = new PopupWithForm(
  "#edit-popup",
  editProfilePopupSubmit
);

buttonCloseEditProfilePopup.addEventListener("click", function () {
  popupWithFormEdit.close();
});

buttonOpenEditProfilePopup.addEventListener("click", editProfilePopupOpen);

formEditProfile.addEventListener("submit", editProfilePopupSubmit);
const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__profession",
});

function editProfilePopupSubmit(inputValues) {
  const name = inputValues["name-input"];
  const info = inputValues["profession-input"];
  userInfo.setUserInfo({ name, info });
  popupWithFormEdit.close();
}

function editProfilePopupOpen() {
  popupWithFormEdit.open();
  nameInputEl.value = pageTitleEl.textContent;
  professionInputEl.value = pageProfessionEl.textContent;
}

popupWithFormEdit.setEventListeners();

//Рендер карточки при добавлении
const renderTodoCard = (item) => {
  const card = new Card(
    item.name,
    item.link,
    "#template-element",
    openPopupImage
  );
  elementsCards.prepend(card.getView());
};

// все карточки
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#template-element",
        openPopupImage
      );
      section.addItem(card.getView());
    },
  },
  ".elements"
);

section.renderItems();
