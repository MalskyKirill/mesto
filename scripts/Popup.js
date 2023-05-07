class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  //закрытие попапа по эскейпу
  _handleEscClose = (evt) => {
    console.log(evt);
    if (evt.key !== 'Escape') return;
    this.close();
  };

  //установка обработчиков
  setEventListeners() {
    this._element
      .querySelector('.popup__close')
      .addEventListener('click', this.close.bind(this));
  }

  //открытие попапа
  open () {
    console.log(this);
    console.log(this._element);
    console.log(this._bigPictureImg)
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  //закрытие попапа
  close () {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
}

export default Popup;
