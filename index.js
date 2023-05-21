const openPopupButtonEl = document.querySelector('.profile__open-popup');
const closePopupButtonEl = document.querySelector('#close-popup-button');
const editPopupEl = document.querySelector('#edit-popup');
const pageTitleEl = document.querySelector('.profile__name');
const pageProfessionEl = document.querySelector('.profile__profession');
const nameInputEl = document.querySelector('#name-input');
const professionInputEl = document.querySelector('#profession-input');
const editFormEl = document.querySelector('#edit-form');

openPopupButtonEl.addEventListener('click', function () {
  openPopup(editPopupEl);
});

closePopupButtonEl.addEventListener('click', function () {
  closePopup(editPopupEl);
});

nameInputEl.value = pageTitleEl.textContent;

editFormEl.addEventListener('submit', function (event) {
  event.preventDefault();

  pageTitleEl.textContent = nameInputEl.value;

  closePopup(editPopupEl);
});

professionInputEl.value = pageProfessionEl.textContent;

editFormEl.addEventListener('submit', function (event) {
  event.preventDefault();

  pageProfessionEl.textContent = professionInputEl.value;

  closePopup(editPopupEl);
});


function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
}