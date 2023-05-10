class Card {
  constructor({name, link, title}, templateSelector, handleCardClick) {
    this._title = name ? name : title;
    this._image = link;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  // создаем карточку
  _createCard() {
    this._card = this._getTemalate();

    this._setCardEventListeners();

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
  }

  _setCardEventListeners() {
    this._cardImage = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__name');

    this._card
      .querySelector('.card__trash')
      .addEventListener('click', this._onDelite.bind(this));

    this._card
      .querySelector('.card__photo')
      .addEventListener('click', () =>
        this._handleCardClick(this._title, this._image)
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
