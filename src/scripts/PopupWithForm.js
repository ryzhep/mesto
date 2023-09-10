import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

//собирает данные из всех полей формы в объект.
  _getInputValues() {
    //создаёт пустой объект inputValues, который будет использоваться для хранения значений 
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value //input.name представляет имя текущего поля, а input.value - его текущее значение;
    });
    return inputValues;
  }
//перезаписывает родительский метод и добавляет обработчик сабмита формы.
//Будет вызываться переданный колбэк submitButton, передавая в него собранные данные формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitCallback(inputValues);
    });
  }
  
  close() {
    this._form.reset();
    super.close();
  }

}
