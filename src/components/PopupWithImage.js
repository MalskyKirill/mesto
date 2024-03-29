import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._bigPictureImg = this._element.querySelector('.popup__photo');
    this._bigPictureName = this._element.querySelector('.popup__photo-name');
  }
  // открытие попапа с картинкой
  open(cardName, cardPhoto) {
    this._bigPictureImg.src = cardPhoto;
    this._bigPictureImg.alt = cardName;
    this._bigPictureName.textContent = cardName;

    super.open();
  }
}

export default PopupWithImage;
