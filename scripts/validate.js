
const ClassNames = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function enableValidation(ClassNames) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formSelector) => {
    formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
}
enableValidation();