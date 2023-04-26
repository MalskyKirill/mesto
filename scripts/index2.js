import { initialCards, validationConfig } from './consts.js';
import { Card, CardList } from './card.js';
import { openPopup, closePopup } from './util.js';

const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');

const popupElements = document.querySelectorAll('.popup');

const btnOpenPopupProfileElement = document.querySelector(
  '.profile__edit-button'
);
const btnOpenPopupNewPlaceElement = document.querySelector(
  '.profile__add-button'
);

const btnClosePopupElements = document.querySelectorAll('.popup__close');

const formProfileElement = document.querySelector('#profileField');
const formNewPlaceElement = document.querySelector('#newPlaceField');

const nameFormFieldElement = formProfileElement.querySelector(
  '.popup__field_next_name'
);
const jobFormFieldElement = formProfileElement.querySelector(
  '.popup__field_next_job'
);
const titleFormFieldElement = formNewPlaceElement.querySelector(
  '.popup__field_next_title'
);
const linkFormFieldElement = formNewPlaceElement.querySelector(
  '.popup__field_next_link'
);

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function openPopupProfile() {
  openPopup(popupProfileElement);
  nameFormFieldElement.value = profileName.textContent;
  jobFormFieldElement.value = profileJob.textContent;

  hideValidationErrors(popupProfileElement, validationConfig);
  validationToggleButtonState(popupProfileElement, validationConfig);
}

function openPopupNewPlace() {
  openPopup(popupNewPlaceElement);
  formNewPlaceElement.reset();

  hideValidationErrors(popupNewPlaceElement, validationConfig);
  validationToggleButtonState(popupNewPlaceElement, validationConfig);
}

// закрытие попапов по клику на оверлей
function closePopupByClickOnOverlay(evt, popup) {
  if (evt.target !== evt.currentTarget) return;
  closePopup(popup);
}

// редактирование формы профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameFormFieldElement.value;
  profileJob.textContent = jobFormFieldElement.value;
  closePopup(popupProfileElement);
}

// форма добавления карточки
function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const item = {};
  item.name = titleFormFieldElement.value;
  item.link = linkFormFieldElement.value;

  const cardItem = new Card(item, '.card_template');
  const card = cardItem.getCard();
  cardList.addPrependCard(card);

  closePopup(popupNewPlaceElement);
}

// создаем контейнер для карточек
const cardList = new CardList('.cards');

// первоночальная отрисовка карточек в контейнер
const renderElements = () => {
  initialCards.forEach((item) => {
    const cardItem = new Card(item, '.card_template');
    const card = cardItem.getCard();
    cardList.addAppendCard(card);
  });
};

renderElements();

// слушатели событий
btnOpenPopupProfileElement.addEventListener('click', openPopupProfile);
btnOpenPopupNewPlaceElement.addEventListener('click', openPopupNewPlace);

btnClosePopupElements.forEach((btn) =>
  btn.addEventListener('click', () => closePopup(btn.closest('.popup')))
);
popupElements.forEach((popup) =>
  popup.addEventListener('click', (evt) =>
    closePopupByClickOnOverlay(evt, popup)
  )
);

formProfileElement.addEventListener('submit', handleFormProfileSubmit);
formNewPlaceElement.addEventListener('submit', handleAddPlaceFormSubmit);

enableValidation(validationConfig);
