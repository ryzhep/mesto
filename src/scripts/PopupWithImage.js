
import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._cardName = this._popup.querySelector("#popup-name");
        this._cardImage = this._popup.querySelector("#pupup__image");
      }

      open(srcImage, alt){
        this._cardImage.src = srcImage;
        this._cardImage.alt = alt;
        this._cardName.textContent = alt;
        super.open();
      }
  }
  
  