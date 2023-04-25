import {initialCards} from './consts.js'

class CardList {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  // добавляем карточку в список
  addCard(card) {
    this._container.append(card);
  }
}

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

  // открываем попап
  _onOpenPopup(popup) {
    popup.classList.add('popup_opened');
    //document.addEventListener('keydown', this._closePopupByPushEsc);
  }

  _openPopupBigPicture(cardName, cardPhoto) {
    this._onOpenPopup(document.querySelector('#popupBigPhoto'));

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

const cardList = new CardList('.cards');
const cardItem = new Card(initialCards[0], '.card_template');
const card = cardItem.getCard();
cardList.addCard(card);

// const renderElements = () => {
//   initialCards.forEach((item) => {
//     const cardItem = new Card(item, '.card_template');
//     const card = cardItem.getCard();
//     cardList.addCard(card);
//   });
// };

// renderElements();


