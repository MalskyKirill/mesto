class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderedItems() {
    this._items.forEach(item => this._renderer(item));
  }

  // добавляем карточку в конец списка
  setAppendCard(card) {
    this._container.append(card);
  }
  // добавляем карточку в начало списка
  setPrependCard(card) {
    this._container.prepend(card);
  }
}

export default Section;
