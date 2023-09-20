import "../pages/index.css";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import {
  validationConfig,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  buttonCloseEditProfilePopup,
  buttonCloseImagePopup,
  popupEditProfile,
  popupAddCard,
  inputName,
  inputDescription,
} from "../utils/constants.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Api } from "../scripts/Api.js";
import { PopupDeleteCard } from "../scripts/PopupDeleteCard.js";
import {buttonDeletePopup} from "../utils/constants.js";



//Валидация
const formProfileValid = new FormValidator(validationConfig, popupEditProfile);
formProfileValid.enableValidation();

const formAddNewCardValid = new FormValidator(validationConfig, popupAddCard);
formAddNewCardValid.enableValidation();

//--ПОПАП СОЗДАНИЯ КАРТОЧКИ
const popupWithFormAdd = new PopupWithForm("#newcard-popup", (values) => {
  const nameInput = values["name"];
  const urlInput = values["link"];


//апи пост на добавление карточки
  api.apiAddNewCard(nameInput, urlInput)
    .then((data) => {
      const cardElement = createCard(data.name, data.link, data.likes.length, data.owner._id);
      section.addItem(cardElement);
      popupWithFormAdd.close();
    })
    .catch((error) => {
      console.log(error);
    });
});

buttonOpenAddCardPopup.addEventListener("click", function () {
  formAddNewCardValid.disableSubmitButton();
  popupWithFormAdd.open();
});


//Рендер карточки при добавлении
const createCard = (name, link, likes, owner, id) => {
  const myId = userInfo.getUserInfo().id;
  const card = new Card(
    {
      name: name,
      link: link,
      likes: likes,
      owner: owner,
      id: id,
      removeButtonClick: card => {
        popupWithComfirm.open(card);
      }
    },
    "#template-element",
    openPopupImage,
      );
      console.log(card);
  return card.getView(myId);

};
console.log (createCard);


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
 
  popupWithFormEdit.close();

  editApiUser
    .editProfile(name, info)
    .then(() => {
      userInfo.setUserInfo(name, info);
      popupWithFormEdit.close();
    })
    .catch((error) => {
      console.log(error);
    });
}


/*
//Рендер карточки при добавлении
const renderTodoCard = () => {
  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    section.addItem(cardElement);
  });
  section.renderItems();
};
*/
// все карточки
const section = new Section(
  {
    items: [],
    renderer: createCard,
  },
  ".elements"
);

//section.renderItems();
//renderTodoCard();

//Подключение  к АПИы

// Загрузка карточек с сервера
const cardsApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-75/cards",
  headers: {
    authorization: "9e1ba490-d05f-4831-95ed-e11f8659a9e1",
    "Content-Type": "application/json",
  },
};

const api = new Api(cardsApi);

api
  .getAllCards()
  .then((cards) => {
    cards.forEach((card) => {
      const cardElement = createCard(card.name, card.link, card.likes, card.owner._id, card._id);  
      section.addItem(cardElement);
    });
    section.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });


const infoUser = {
  url: "https://nomoreparties.co/v1/cohort-75/users/me ",
  headers: {
    authorization: "9e1ba490-d05f-4831-95ed-e11f8659a9e1",
    "Content-Type": "application/json",
  },
};

const apiUser = new Api(infoUser);
apiUser
  .getInfoUser()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
  })
  .catch((error) => {
    console.log(error);
  });

//Редактирование профиля
const editApiUser = new Api(infoUser);

  //удаление карточки
const popupWithComfirm = new PopupDeleteCard("#deletecard-popup",(evt, card) => {
  evt.preventDefault();
  api
    .deleteCard(card._id)
    .then(() => {
      popupWithComfirm.close();
    })
    .catch(err => {
      console.log(err);
    });
});
popupWithComfirm.setEventListeners();



