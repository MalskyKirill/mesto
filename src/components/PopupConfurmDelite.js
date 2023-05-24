import Popup from "./Popup";

class PopupConfurmDelite extends Popup {
  constructor(popupSelector, handleConfurmDelite) {
    super(popupSelector);

    this._form = this._element.querySelector('.popup__form');
    this._handleConfurmDelite = handleConfurmDelite;
  }

  open(data) {
    super.open();
    this._cardId = data;
    console.log(this._cardId)
  }


  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleConfurmDelite(this._cardId)
    })

    super.setEventListeners();
  }
}

export default PopupConfurmDelite;
