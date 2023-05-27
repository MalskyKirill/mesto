class Card {
  constructor(
    { name, link, title, _id, likes },
    user,
    templateSelector,
    handleCardClick,
    handleDeliteCard,
    { handleLikeCard }
  ) {
    this._title = name ? name : title;
    this._image = link;
    this._id = _id;
    this._likes = likes;

    this._user = user;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeliteCard = handleDeliteCard;
    this._handleLikeCard = handleLikeCard;
  }

  // клонируем элемент из разметки
  _getTemalate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true).children[0];
    return cardElement;
  }

  // создаем карточку
  _createCard() {
    this._card = this._getTemalate();

    this._setCardEventListeners();

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    this.setCardLikes({likes: this._likes})
  }

  _setCardEventListeners() {
    this._cardImage = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__name');

    this._card.querySelector('.card__trash').addEventListener('click', () => {
      this._handleDeliteCard(this._card, this._id);
    });

    this._card
      .querySelector('.card__photo')
      .addEventListener('click', () =>
        this._handleCardClick(this._title, this._image)
      );

    this._card.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeCard(this._id);
    });
  }

  // проверка на залайканость
  isLiked() {
    const findUserId = (item) => item._id === this._user._id;

    const isLiked = this._likes.some(findUserId);

    return isLiked;
  }

  //получить количество лайков
  setCardLikes(data) {
    this._likes = data.likes;
    this._card.querySelector('.card__like-count').textContent =
      this._likes.length;

    if (this.isLiked()) {
      this._card
        .querySelector('.card__like')
        .classList.add('card__like_active');
    } else {
      this._card
        .querySelector('.card__like')
        .classList.remove('card__like_active');
    }
  }

  // возвращаем карточку
  getCard() {
    this._createCard();
    return this._card;
  }
}

export default Card;
