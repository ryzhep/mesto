export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
    //для привязки контекста выполнения метода _handleEscClose к экземпляру класса Popup
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._closePopupOverlay);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._closePopupOverlay);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closePopupOverlay(event) {
    if (event.currentTarget === event.target) {
      this.close(); 
    } 
  }; 

  setEventListeners() {
//закрытие по оверлею
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')||(evt.target.classList.contains('popup__close-button'))) {
        this.close();
      }
    });
  }
}
