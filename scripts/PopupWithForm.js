import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);

    this._handleSubmitForm = handleSubmitForm;

    this._element = document.querySelector(popupSelector);
    this._form = this._element.querySelector('.popup__form');
    // this._name = this._form.querySelector(
    //   '.popup__field_next_name'
    // );
    // this._job = this._form.querySelector(
    //   '.popup__field_next_job'
    // );
    // this._title = this._form.querySelector(
    //   '.popup__field_next_title'
    // );
    // this._link = this._form.querySelector(
    //   '.popup__field_next_link'
    // );

    // console.log(this._name)
    // console.log(this._job)
    // console.log(this._title)
    // console.log(this._link)
    this._formInputs = this._form.querySelectorAll('.popup__field');
    console.log(this._formInputs);
  }

  _getInputValues() {
    const item = {};
    // item.name = titleFormFieldElement.value;
    // item.link = linkFormFieldElement.value;
    this._formInputs.forEach((input) => {
      // console.log(input.value);
      item[`${input.id}`] = input.value;
    });
    console.log(item);
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    // this._getInputValues();
    super.setEventListeners();
  }
}

export default PopupWithForm;
