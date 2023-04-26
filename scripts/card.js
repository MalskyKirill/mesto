import { openPopup } from './util.js';

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  // клонируем элемент из разметки
  _getTemalate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true).children[0];
    return cardElement;
  }

  //удаление карточки
  _onDelite() {
    this._card.remove();
  }

  //лайк карточки
  _onLike() {
    this.classList.toggle('card__like_active');
  }

  // открываем попап с картинкой
  _openPopupBigPicture(cardName, cardPhoto) {
    openPopup(document.querySelector('#popupBigPhoto'));

    document.querySelector('.popup__photo').src = cardPhoto;
    document.querySelector('.popup__photo').alt = cardName;
    document.querySelector('.popup__photo-name').textContent = cardName;
  }

  // создаем карточку
  _createCard() {
    this._card = this._getTemalate();

    this._card.querySelector('.card__name').textContent = this._title;
    this._card.querySelector('.card__photo').src = this._image;
    this._card.querySelector('.card__photo').alt = this._title;

    this._setCardEventListeners();
  }

  _setCardEventListeners() {
    this._card
      .querySelector('.card__trash')
      .addEventListener('click', this._onDelite.bind(this));

    this._card
      .querySelector('.card__photo')
      .addEventListener('click', () =>
        this._openPopupBigPicture(this._title, this._image)
      );

    this._card
      .querySelector('.card__like')
      .addEventListener('click', this._onLike);
  }

  // возвращаем карточку
  getCard() {
    this._createCard();
    return this._card;
  }
}

export default Card;
