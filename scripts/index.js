const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');
const popupBigPhotoElement = document.querySelector('#popupBigPhoto');

const popupElements = document.querySelectorAll('.popup');

const btnOpenPopupProfileElement = document.querySelector(
  '.profile__edit-button'
);
const btnOpenPopupNewPlaceElement = document.querySelector(
  '.profile__add-button'
);

const btnClosePopupProfileElement =
  document.querySelector('#closePopupProfile');
const btnClosePopupNewPlaceElement = document.querySelector(
  '#closePopupNewPlase'
);
const btnClosePopupBigPhotoElement = document.querySelector(
  '.popup__close-big-photo'
);

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

const cardTemplateElement = document.querySelector('.card_template').content;
const cardsListElement = document.querySelector('.cards');

const popupImgElement = popupBigPhotoElement.querySelector('.popup__photo');
const popupNameElement =
  popupBigPhotoElement.querySelector('.popup__photo-name');

// открытие-закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPushEsc);
}

function openPopupProfile() {
  openPopup(popupProfileElement);
  nameFormFieldElement.value = profileName.textContent;
  jobFormFieldElement.value = profileJob.textContent;

  hideValidationErrors(popupProfileElement, validationConfig);
  validationToggleButtonState(popupProfileElement, validationConfig);
  document.addEventListener('keydown', closePopupByPushEsc);
}

function openPopupNewPlace() {
  openPopup(popupNewPlaceElement);
  formNewPlaceElement.reset();

  hideValidationErrors(popupNewPlaceElement, validationConfig);
  validationToggleButtonState(popupNewPlaceElement, validationConfig);
  document.addEventListener('keydown', closePopupByPushEsc);
}

function openPopupBigPicture(evt) {
  evt.preventDefault();
  openPopup(popupBigPhotoElement);
  popupImgElement.src = evt.target.src;
  popupImgElement.alt = evt.target.alt;
  popupNameElement.textContent = evt.target.alt;

  document.addEventListener('keydown', closePopupByPushEsc);
}

function closePopupProfile() {
  closePopup(popupProfileElement);
}

function closePopupNewPlace() {
  closePopup(popupNewPlaceElement);
}

function closePopupBigPicture() {
  closePopup(popupBigPhotoElement);
}

// закрытие попапов по клику на оверлей
function closePopupByClickOnOverlay(evt, popup) {
  if (evt.target !== evt.currentTarget) return;
  closePopup(popup);
}

// закрытые попапов по нажантию на Esc
function closePopupByPushEsc(evt) {
  if (evt.key !== 'Escape') return;
  closePopup(document.querySelector('.popup_opened'));
}

// редактирование формы профиля
function handleFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameFormFieldElement.value;
  profileJob.textContent = jobFormFieldElement.value;
  closePopupProfile();
}

// форма доюавления карточки
function handleFormNextPlase(evt) {
  evt.preventDefault();

  const card = {};
  card.name = titleFormFieldElement.value;
  card.link = linkFormFieldElement.value;

  prependCard(card);
  closePopupNewPlace();
}

//первое добавление карточек при загрузке на страницу
initialCards.forEach(appendCard);

function appendCard(card) {
  const htmlCard = createCard(card);
  cardsListElement.append(htmlCard);
}

// добавление последующих карточек через форму
function prependCard(card) {
  const htmlCard = createCard(card);
  cardsListElement.prepend(htmlCard);
}

// создание карточки
function createCard(card) {
  const htmlCardElement = cardTemplateElement.cloneNode(true);
  const cardNameElement = htmlCardElement.querySelector('.card__name');
  const cardPhotoElement = htmlCardElement.querySelector('.card__photo');

  cardNameElement.textContent = card.name;
  cardPhotoElement.src = card.link;
  cardPhotoElement.alt = card.name;

  setHtmlEventListeners(htmlCardElement);
  return htmlCardElement;
}

// лайки
function handleLikeCard(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__like_active');
}

// удаление карточки
function handleDelite(evt) {
  evt.preventDefault();
  evt.target.closest('.card').remove();
}

// ф-ция слушателей карточки
function setHtmlEventListeners(card) {
  card.querySelector('.card__like').addEventListener('click', handleLikeCard);
  card.querySelector('.card__trash').addEventListener('click', handleDelite);
  card
    .querySelector('.card__photo')
    .addEventListener('click', openPopupBigPicture);
}

// слушатели событий
btnOpenPopupProfileElement.addEventListener('click', openPopupProfile);
btnOpenPopupNewPlaceElement.addEventListener('click', openPopupNewPlace);

btnClosePopupProfileElement.addEventListener('click', closePopupProfile);
btnClosePopupNewPlaceElement.addEventListener('click', closePopupNewPlace);
btnClosePopupBigPhotoElement.addEventListener('click', closePopupBigPicture);

popupElements.forEach((popup) =>
  popup.addEventListener('click', (evt) =>
    closePopupByClickOnOverlay(evt, popup)
  )
);

formProfileElement.addEventListener('submit', handleFormProfile);
formNewPlaceElement.addEventListener('submit', handleFormNextPlase);

enableValidation(validationConfig);
