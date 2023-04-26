class CardList {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  // добавляем карточку в конец списка
  addAppendCard(card) {
    this._container.append(card);
  }
  // добавляем карточку в начало списка
  addPrependCard(card) {
    this._container.prepend(card);
  }
}

export default CardList;
