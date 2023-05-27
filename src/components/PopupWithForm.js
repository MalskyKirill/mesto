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
      item[`${input.name}`] = input.value;
    });
    console.log(item)
    return item;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => this._handleSubmitForm(evt, this._getInputValues()));

    super.setEventListeners();
  }
}

export default PopupWithForm;
