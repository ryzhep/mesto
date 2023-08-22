//принимает в конструктор объект настроек с селекторами и классами формы;
//принимает вторым параметром элемент той формы, которая валидируется;
export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._inputErrorClass = this._validationConfig.inputErrorClass;
    this._errorClass = this._validationConfig.errorClass;
    this._submitButtonSelector = formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._inactiveButton = formElement.querySelector(
      this._validationConfig.inactiveButtonClass
    );
  }

  //включение проверки. берет форму и начинает навешивать слушатели
  enableValidation() {
    this._formElement.addEventListener(
      "submit",
      (event) => event.preventDefault() //чтобы никуда ничего не отправлялось
    );
    this._setEventListeners();
    this._resetValidation();
  }

  // показывать ошибку (красные поля) - отображение сообщения об ошибке для указанного inputElement
  _showInputError(inputElement, errorClass) {
    inputElement.classList.add(this._validationConfig.inputErrorClass); //эта строка добавляет класс
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage; // эта строка задает текст для errorElement. inputElement.validationMessage содержит сообщение об ошибке
    errorElement.classList.add(errorClass); //эта строка добавляет класс errorClass к errorElement. errorClass - это аргумент метода _showInputError, который принимается для дополнительной настройки стилей или отображения сообщений об ошибках для конкретного элемента ввода.
  }

  //убирание класса и убирание ошибки
  _hideInputError(inputElement, errorClass, inputErrorClass) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass); // эта строка удаляет кдасс
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  //проверяет на валидность. Идет вызов функций
  _checkInputValidity(inputElement, errorClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorClass);
    } else {
      this._hideInputError(inputElement, errorClass, inputErrorClass);
    }
  }

  //масштабируемость
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          inputElement,
          this._errorClass,
          this._inputErrorClass
        );
        this._inactiveButtonClass();
      });
    });
  }
  
  _inactiveButtonClass() {
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._submitButtonSelector.classList.add(
        this._validationConfig.inactiveButtonClass
      );
      this._submitButtonSelector.setAttribute("disabled", "true");
    } else {
      // иначе сделай кнопку активной
      this._submitButtonSelector.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._submitButtonSelector.removeAttribute("disabled");
    }
  }

  //убрать валидацию
  _resetValidation() {
    this._submitButtonSelector.setAttribute('disabled', 'true');
    this._inputList.forEach((inputElement) => {
      this._hideInputError(
        inputElement,
        this._errorClass,
        this._inputErrorClass
      );
    });
    this._inactiveButtonClass();
  }
}