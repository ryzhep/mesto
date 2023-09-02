
import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._cardName = this._popup.querySelector(".element__name");
        this._cardImage = this._popup.querySelector(".element__image");

      }

      open(image, name){
        this._cardImage.src = image;
        this._cardImage.alt = name;
        this._cardName.textContent = name;
        super.open();
      }
  }
  
  