import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = document.querySelector(".popup__form");
    this._inputList = document.querySelector(".popup__input");
    this._submitButton = this._form.querySelector('.popup__button')
  }

//собирает данные из всех полей формы в объект.
  _getInputValues() {
    //создаёт пустой объект inputValues, который будет использоваться для хранения значений 
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value//input.name представляет имя текущего поля, а input.value - его текущее значение;
    });
    return inputValues;

  }
//перезаписывает родительский метод и добавляет обработчик сабмита формы.
//Будет вызываться переданный колбэк submitCallback, передавая в него собранные данные формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
