export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    //для привязки контекста выполнения метода _handleEscClose к экземпляру класса Popup
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //обработчик события привязан к кнопке закрытия 
    this._popup.addEventListener("click", () => {
      this.close();
    });
    //обработчик события по оверлею.Проверяет event.target (цель события) самим попапом. 
    this._popup.addEventListener('click', (event) => {
      if (event.target === this._popup) {
        const openedPopup = document.querySelector(".popup_opened");
        this.close(openedPopup);
      }
    });
  }
}
