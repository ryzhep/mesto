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
  popupNewAvatar,
  buttonCloseAvatarPopup,
  buttonOpenProfileAvatar,
  buttonOpenAvatarPopup,
} from "../utils/constants.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Api } from "../scripts/Api.js";
import { PopupDeleteCard } from "../scripts/PopupDeleteCard.js";

//Валидация
const formProfileValid = new FormValidator(validationConfig, popupEditProfile);
formProfileValid.enableValidation();

const formAddNewCardValid = new FormValidator(validationConfig, popupAddCard);
formAddNewCardValid.enableValidation();

const formEditAvatarValid = new FormValidator(validationConfig, popupNewAvatar);
formEditAvatarValid.enableValidation();


//--ПОПАП СОЗДАНИЯ КАРТОЧКИ
const popupWithFormAdd = new PopupWithForm("#newcard-popup", (values) => {
  const nameInput = values["name"];
  const urlInput = values["link"];

  //апи пост на добавление карточки
  api
    .apiAddNewCard(nameInput, urlInput)
    .then((data) => {
      const cardElement = createCard(
        data.name,
        data.link,
        data.likes.length,
        data.owner._id
      );
      cardsContainer.addItem(cardElement);
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
      removeButtonClick: (card) => {
        popupWithComfirm.open(card);
      },
      handleClickLike: () => {
        if (!card._isLiked) {
          api
            .likeCard(card._id)
            .then((res) => {
              card.setLikes(res.likes.length);
              card.changeStatus();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeDelete(card._id)
            .then((res) => {
              card.setLikes(res.likes.length);
              card.changeStatus();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    "#template-element",
    openPopupImage
  );
  console.log(card);
  return card.getView(myId);
};
console.log(createCard);

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
  profileAvatar: ".profile__avatar",
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
  api
    .editProfile(name, info)
    .then(() => {
      userInfo.setUserInfo(name, info);
      popupWithFormEdit.close();
    })
    .catch((error) => {
      console.log(error);
    });
}

// все карточки
const cardsContainer = new Section(
  {
    items: [],
    renderer: createCard,
  },
  ".elements"
);

//Подключение  к АПИы

// Загрузка карточек с сервера
const cardsApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-75",
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
      const cardElement = createCard(
        card.name,
        card.link,
        card.likes,
        card.owner._id,
        card._id
      );
      cardsContainer.addItem(cardElement);
    });
    cardsContainer.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });


api
  .getInfoUser()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((error) => {
    console.log(error);
  });

//Редактирование профиля

buttonOpenAvatarPopup.addEventListener("click", editAvatarPopupOpen);

function editAvatarPopupOpen() {
  formEditAvatarValid.disableSubmitButton();
  userInfo.getUserInfo();
  popupEditAvatar.open();
}
const popupEditAvatar = new PopupWithForm(
  "#avatar-popup",
  editAvatarPopupSubmit
);
function editAvatarPopupSubmit(inputValue) {
  const avatar = inputValue["link"];

  popupEditAvatar.close();
  api
    .newAvatar(avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    });
}

buttonCloseAvatarPopup.addEventListener("click", function () {
  popupEditAvatar.close();
});

popupEditAvatar.setEventListeners();

//удаление карточки
const popupWithComfirm = new PopupDeleteCard(
  "#deletecard-popup",
  (evt, card) => {
    evt.preventDefault();
    api
      .deleteCard(card._id)
      .then(() => {
        popupWithComfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupWithComfirm.setEventListeners();

// Редакктирование аватара
function openPopupAvatar() {
  //formAvatarValid.disableSubmitButton();
  popupEditAvatar.open();
}
buttonOpenProfileAvatar.addEventListener("click", openPopupAvatar);
