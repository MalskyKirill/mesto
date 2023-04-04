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

const cardTemplateElement = document.querySelector('.card_template').content;
const cardsListElement = document.querySelector('.cards');

const popupImgElement = popupBigPhotoElement.querySelector('.popup__photo');
const popupNameElement =
  popupBigPhotoElement.querySelector('.popup__photo-name');

// открытие-закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPushEsc);
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
}

function openPopupNewPlace() {
  openPopup(popupNewPlaceElement);
  formNewPlaceElement.reset();

  hideValidationErrors(popupNewPlaceElement, validationConfig);
  validationToggleButtonState(popupNewPlaceElement, validationConfig);
}

function openPopupBigPicture(cardName, cardPhoto) {
  openPopup(popupBigPhotoElement);

  popupImgElement.src = cardPhoto;
  popupImgElement.alt = cardName;
  popupNameElement.textContent = cardName;
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
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameFormFieldElement.value;
  profileJob.textContent = jobFormFieldElement.value;
  closePopup(popupProfileElement);
}

// форма доюавления карточки
function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const card = {};
  card.name = titleFormFieldElement.value;
  card.link = linkFormFieldElement.value;

  prependCard(card);
  closePopup(popupNewPlaceElement);
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
  const cardLikeElement = htmlCardElement.querySelector('.card__like');
  const cardTrashElement = htmlCardElement.querySelector('.card__trash');

  cardNameElement.textContent = card.name;
  cardPhotoElement.src = card.link;
  cardPhotoElement.alt = card.name;

  cardPhotoElement.addEventListener('click', () =>
    openPopupBigPicture(cardNameElement.textContent, cardPhotoElement.src)
  );
  cardLikeElement.addEventListener('click', () =>
    handleLikeCard(cardLikeElement)
  );
  cardTrashElement.addEventListener('click', () =>
    handleDelete(cardTrashElement)
  );

  // setHtmlEventListeners(htmlCardElement);
  return htmlCardElement;
}

// лайки
function handleLikeCard(likeElement) {
  likeElement.classList.toggle('card__like_active');
}

// удаление карточки
function handleDelete(cardElement) {
  cardElement.closest('.card').remove();
}

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
