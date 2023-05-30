import Popup from './Popup.js';

class PopupConfurmDelite extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._element.querySelector('.popup__form');
  }

  handleButton(evt) {
    this._handleSubmit = evt;
  }

  setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit();
    });
    super.setEventListeners();
  }
}

export default PopupConfurmDelite;
