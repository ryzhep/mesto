const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__open-popup"
);
const buttonOpenAddCardPopup = document.querySelector(".profile__add");

const buttonCloseEditProfilePopup = document.querySelector("#close-edit-form");
const buttonCloseAddCardPopup = document.querySelector("#close-newcard-form");
const buttonCloseImagePopup = document.querySelector("#close-image-form");

const popupEditProfile = document.querySelector("#edit-popup");
const popupAddCard = document.querySelector("#newcard-popup");
const popupViewImage = document.querySelector("#image-popup");

const pageTitleEl = document.querySelector(".profile__name");

const pageProfessionEl = document.querySelector(".profile__profession");
const nameInputEl = document.querySelector("#name-input");
const namePopupInput = document.querySelector("#popup-name");
const popupImage = document.querySelector("#pupup__image");

const professionInputEl = document.querySelector("#profession-input");

const formEditProfile = document.querySelector("#edit-form");
const formAddCard = document.querySelector("#newcard-form");

const templateElement = document.querySelector("#template-element");
const templateContent = templateElement.content;
const elementCard = templateContent.querySelector(".element");
//константа куда мы будем добавлять
const elementsCards = document.querySelector(".elements");
const cardLike = document.querySelector(".element__like");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    descr: "Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    descr: "Челябинская область",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    descr: "Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    descr: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    descr: "Холмогорский район",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    descr: "Байкал",
  },
];

initialCards.forEach(function (item) {
  const cloneElement = createElement(item); // получаем этот элемент и записываем в переменную
  elementsCards.prepend(cloneElement); //добавляем в раздел элементы
});

function createElement(values) {
  const cloneElement = elementCard.cloneNode(true);
  /* true -глубокое копирование, значит полнгостью новый элемент по шаблону */
  const name = cloneElement.querySelector(".element__name");
  const image = cloneElement.querySelector(".element__image");
  cloneElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

  const deleteButton = cloneElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", function () {
    elementsCards.removeChild(cloneElement);
  });

  image.addEventListener("click", function () {
    openPopup(popupViewImage);
    namePopupInput.textContent = values.name;
    popupImage.src = image.src;
    popupImage.alt = image.alt;
  });

  name.textContent = values.name; //здесь текст должен вставляться из значения name
  image.src = values.link; //здесь передаем линки для фото
  image.alt = values.descr; //прописываю альты по наименованию
  return cloneElement;
}

buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupAddCard);
});

buttonOpenEditProfilePopup.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInputEl.value = pageTitleEl.textContent;
  professionInputEl.value = pageProfessionEl.textContent;
});

buttonCloseEditProfilePopup.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

buttonCloseAddCardPopup.addEventListener("click", function () {
  closePopup(popupAddCard); // закрываем второй попап
});

buttonCloseImagePopup.addEventListener("click", function () {
  closePopup(popupViewImage);
});

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
  const value = values[("name", "link")];
  const cloneElement = createElement(values);
  elementsCards.prepend(cloneElement);
  closePopup(popupAddCard);
  form.reset();
});

function openPopup(popupEl) {
  popupEl.classList.add("popup_opened");
}

function closePopup(popupEl) {
  popupEl.classList.remove("popup_opened");
}

const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);

//добавление класса и показ ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

//убирание класса и убирание ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type-error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_disabled');
  }
};
//масштабируемость
function enableValidation() {
  
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
  
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 


//закрытие попапов
const popups = document.querySelectorAll(".popup");
//закрытие через escape
popups.forEach(function (popup) {
window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
      closePopup(popup);
  }

 //закрытие через overlay

  
});
popup.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popup)
  };
});

});


