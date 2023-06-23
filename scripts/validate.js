const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


const showInputError = (validationConfig, inputElement, errorMessage) => {
  const errorClass = validationConfig.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorClass.textContent = errorMessage;
  errorClass.classList.add(validationConfig.errorClass);
};

//убирание класса и убирание ошибки
const hideInputError = (validationConfig, inputElement) => {
  const errorClass = validationConfig.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorClass.classList.remove(validationConfig.errorClass);
  errorClass.textContent = "";
};

const checkInputValidity = (validationConfig, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(validationConfig, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validationConfig, inputElement);
  }
};
const inactiveButtonClass = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
  }
};


//масштабируемость
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formSelector) => {
  
  const inputList = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector)
  );
  
  const submitButtonSelector = formSelector.querySelector(
    validationConfig.submitButtonSelector
  );
  inactiveButtonClass(inputList, submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formSelector, inputElement);
      inactiveButtonClass(inputList, submitButtonSelector);
    });
  });
};

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formSelector) => {
    formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
}
enableValidation(validationConfig);
