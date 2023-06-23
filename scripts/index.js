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
  document.addEventListener("keydown", closePopupEsc);
  popupEl.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(popupEl) {
  popupEl.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popupEl.removeEventListener("mousedown", closePopupOverlay);
  
}

//закрытие попапов
//закрытие через escape
const closePopupEsc=(event)=>{
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//закрытие через overlay
const closePopupOverlay=(event)=>{
    if (event.currentTarget === event.target) {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    };
};