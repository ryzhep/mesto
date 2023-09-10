import "../pages/index.css";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__open-popup"
);
export const buttonOpenAddCardPopup = document.querySelector(".profile__add");
const buttonCloseEditProfilePopup = document.querySelector("#close-edit-form");
const buttonCloseImagePopup = document.querySelector("#close-image-form");
const popupEditProfile = document.querySelector("#edit-popup");
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
  const nameInput = values['name'];;
  const urlInput = values['link'];
  const cardElement = createCard(nameInput, urlInput);
  section.addItem(cardElement);
  popupWithFormAdd.close();
});


buttonOpenAddCardPopup.addEventListener("click", function () {
  formAddNewCardValid.disableSubmitButton(); 
  popupWithFormAdd.open();
});



popupWithFormAdd.close(); // закрываем второй попап


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

//+
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
});
//+

function editProfilePopupSubmit(inputValues) {
  const name = inputValues["#name-input"];
  const info = inputValues["#profession-input"];
  userInfo.setUserInfo({ name, info });
    popupWithFormEdit.close();
}
const inputName = document.querySelector('input[name="name"]');
const inputDescription = document.querySelector('input[name="description"]');

function editProfilePopupOpen() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.info;
  popupWithFormEdit.open();
}

popupWithFormEdit.setEventListeners();

//Рендер карточки при добавлении
const renderTodoCard = () => {
  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    section.addItem(cardElement);
  });
  section.renderItems();
};

//Рендер карточки при добавлении
const createCard = (name, link) => {
  const card = new Card(
    {
      name: name,
      link: link
    },
    "#template-element",
    openPopupImage
  );
  return card.getView();
};

//+
// все карточки
const section = new Section(
  {
    items: initialCards,
    renderer: createCard
  },
  ".elements"
);

section.renderItems();
renderTodoCard();