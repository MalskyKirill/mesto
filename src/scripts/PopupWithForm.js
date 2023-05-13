import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);

    this._handleSubmitForm = handleSubmitForm;

    this._form = this._element.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__field');
  }

  // собирает данные формы
  _getInputValues() {
    const item = {};
    this._formInputs.forEach((input) => {
      item[`${input.id}`] = input.value;
    });

    return item;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => this._handleSubmitForm(evt, this._getInputValues()));

    super.setEventListeners();
  }
}

export default PopupWithForm;
