const openPopupButtonEl = document.querySelector('.profile__open-popup');
const closePopupButtonEl = document.querySelector('#close-popup-button');
const editPopupEl = document.querySelector('#edit-popup');
const pageTitleEl = document.querySelector('.profile__name');
const pageProfessionEl = document.querySelector('.profile__profession');
const nameInputEl = document.querySelector('#name-input');
const professionInputEl = document.querySelector('#profession-input');
const editFormEl = document.querySelector('#edit-form');


const template = document.querySelector('#template-element');
const templateContent = template.content;
const element =templateContent.querySelector('.element');
//константа куда мы будем добавлять
const elements = document.querySelector('.elements');

console.log(element);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

initialCards.forEach(function(item){
const cloneElement = createElement(item);// получаем этот элемент и записываем в переменную
console.log(cloneElement);
elements.prepend(cloneElement); //добавляем в раздел элементы 
});

function createElement(values){
  const cloneElement = element.cloneNode(true); 
    /* true -глубокое копирование, значит полнгостью новый элемент по шаблону */
    console.log('new todo', cloneElement);
  const image = cloneElement.querySelector ('.element__image');
  const name = cloneElement.querySelector ('.element__name');
  const descr = cloneElement.querySelector ('.element__image');
  name.textContent = values.name; //здесь текст должен вставляться из значения name 
  image.src = values.link; //здесь передаем линки для фото
  descr.alt = values.name;
return cloneElement;
}



openPopupButtonEl.addEventListener('click', function () {
  openPopup(editPopupEl);
  nameInputEl.value = pageTitleEl.textContent;
  professionInputEl.value = pageProfessionEl.textContent;
});


closePopupButtonEl.addEventListener('click', function () {
  closePopup(editPopupEl);
});



editFormEl.addEventListener('submit', function (event) {
  event.preventDefault();

  pageTitleEl.textContent = nameInputEl.value;
  pageProfessionEl.textContent = professionInputEl.value;



  closePopup(editPopupEl);
});



function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
}