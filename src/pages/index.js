import "../pages/index.css";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { initialCards,validationConfig} from "../utils/constants.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

 const buttonOpenEditProfilePopup = document.querySelector(".profile__open-popup");
 const buttonOpenAddCardPopup = document.querySelector(".profile__add");
 const buttonCloseEditProfilePopup = document.querySelector("#close-edit-form");
 const buttonCloseImagePopup = document.querySelector("#close-image-form");
 const popupEditProfile = document.querySelector("#edit-popup");
 const popupAddCard = document.querySelector("#newcard-popup");
 const inputName = document.querySelector('input[name="name"]');
 const inputDescription = document.querySelector('input[name="description"]');


 //Валидация
const formProfileValid = new FormValidator(validationConfig, popupEditProfile);
formProfileValid.enableValidation();

const formAddNewCardValid = new FormValidator(validationConfig, popupAddCard);
formAddNewCardValid.enableValidation();


//--ПОПАП СОЗДАНИЯ КАРТОЧКИ
const popupWithFormAdd = new PopupWithForm("#newcard-popup", (values) => {
  const nameInput = values["name"];
  const urlInput = values["link"];
  const cardElement = createCard(nameInput, urlInput);
  section.addItem(cardElement);
  popupWithFormAdd.close();
});

buttonOpenAddCardPopup.addEventListener("click", function () {
  formAddNewCardValid.disableSubmitButton();
  popupWithFormAdd.open();
});

//Рендер карточки при добавлении
const createCard = (name, link) => {
  const card = new Card(
    {
      name: name,
      link: link,
    },
    "#template-element",
    openPopupImage
  );
  return card.getView();
};

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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
});

function editProfilePopupOpen() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.info;
  popupWithFormEdit.open();
}

popupWithFormEdit.setEventListeners();

function editProfilePopupSubmit(inputValues) {
  const name = inputValues["name"];
  const info = inputValues["description"];
  userInfo.setUserInfo({ name, info });
  popupWithFormEdit.close();
}

//Рендер карточки при добавлении
const renderTodoCard = () => {
  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    section.addItem(cardElement);
  });
  section.renderItems();
};

// все карточки
const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".elements"
);

section.renderItems();
renderTodoCard();
