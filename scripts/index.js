const openPopupButtonEl = document.querySelector(".profile__open-popup");
const openPopupButtonAdd = document.querySelector(".profile__add");


const closePopupButtonEl = document.querySelector("#close-popup-button");
const closePopupButtonEl2 = document.querySelector("#close-popup-button2");
const closePopupButtonEl3 = document.querySelector("#close-popup-button3");

const editPopupEl = document.querySelector("#edit-popup");
const editPopupNewcard = document.querySelector("#newcard-popup");
const editPopupImage = document.querySelector("#image-popup");

const pageTitleEl = document.querySelector(".profile__name");

const pageProfessionEl = document.querySelector(".profile__profession");
const nameInputEl = document.querySelector("#name-input");
const nameInputEl2 = document.querySelector("#popup-name");
const popupImage = document.querySelector("#pupup__image");


const professionInputEl = document.querySelector("#profession-input");

const editFormEl = document.querySelector("#edit-form");
const editFormNewcard = document.querySelector("#newcard-form");
const editFormImage = document.querySelector("#image-form");


const template = document.querySelector("#template-element");
const templateContent = template.content;
const element = templateContent.querySelector(".element");
//константа куда мы будем добавлять
const elements = document.querySelector(".elements");
const cardLike = document.querySelector(".element__like");



console.log(element);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    descr: "Архыз"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    descr: "Челябинская область"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    descr: "Иваново"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    descr: "Камчатка"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    descr: "Холмогорский район"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    descr: "Байкал"
  },
];

initialCards.forEach(function (item) {
  const cloneElement = createElement(item); // получаем этот элемент и записываем в переменную
  console.log(cloneElement);
  elements.prepend(cloneElement); //добавляем в раздел элементы
});

function createElement(values) {
  const cloneElement = element.cloneNode(true);
  /* true -глубокое копирование, значит полнгостью новый элемент по шаблону */
  console.log("new todo", cloneElement);
  const name = cloneElement.querySelector(".element__name");
  const image = cloneElement.querySelector(".element__image");
  const descr = cloneElement.querySelector(".element__name");
  //const descr = cloneElement.querySelector(".element__image");
  cloneElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
   });

   const deleteButton = cloneElement.querySelector('.element__delete');
   deleteButton.addEventListener('click', function () {
    elements.removeChild(cloneElement);
   });

   image.addEventListener("click", function () {
    openPopup(editPopupImage); 
    nameInputEl2.textContent = values.name;
    popupImage.src=image.src;

    console.log(nameInputEl2);

  });
  
  name.textContent = values.name; //здесь текст должен вставляться из значения name
  image.src = values.link; //здесь передаем линки для фото
  image.alt = values.descr; //прописываю альты по наименованию
  console.log(values);
  return cloneElement;

  
}



openPopupButtonAdd.addEventListener("click", function () {
  openPopup(editPopupNewcard); 
  
});



openPopupButtonEl.addEventListener("click", function () {
  openPopup(editPopupEl);
  nameInputEl.value = pageTitleEl.textContent;
  professionInputEl.value = pageProfessionEl.textContent;
});



closePopupButtonEl.addEventListener("click", function () {
  closePopup(editPopupEl);
});

closePopupButtonEl2.addEventListener("click", function () {
  closePopup(editPopupNewcard); // закрываем второй попап
});

closePopupButtonEl3.addEventListener("click", function () {
  closePopup(editPopupImage); 
});


editFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  pageTitleEl.textContent = nameInputEl.value;
  pageProfessionEl.textContent = professionInputEl.value;
  closePopup(editPopupEl);
});


editFormImage.addEventListener("submit", function (event) {
  event.preventDefault();
  closePopup(editPopupEl);
});




editFormNewcard.addEventListener("submit", function (event) {
  event.preventDefault(); //чтобы никуда ничего не отправлялось
  const form = event.target; // элемент на котором сработало нажатие кнопки - это форма
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const value = values[('name','link')];
  const cloneElement = createElement(values) ;
  console.log(values);
  elements.prepend(cloneElement);
  closePopup(editPopupNewcard);

});

function openPopup(popupEl) {
  popupEl.classList.add("popup_opened");
}

function closePopup(popupEl) {
  popupEl.classList.remove("popup_opened");
}



