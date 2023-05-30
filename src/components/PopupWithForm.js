import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);

    this._handleSubmitForm = handleSubmitForm;

    this._form = this._element.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__field');
    this._saveBtn = this._element.querySelector('.popup__save');
  }

  // собирает данные формы
  _getInputValues() {
    const item = {};
    this._formInputs.forEach((input) => {
      item[`${input.name}`] = input.value;
    });
    return item;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._getInputValues());
    });

    super.setEventListeners();
  }

  loading(isLoading) {
    isLoading
      ? (this._saveBtn.textContent = 'Сохранение')
      : (this._saveBtn.textContent = 'Успешно');
  }
}

export default PopupWithForm;
