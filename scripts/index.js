const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');
const popupBigPhotoElement = document.querySelector('#popupBigPhoto');

const openProfileBtnElement = document.querySelector('.profile__edit-button');
const openNewPlaceBtnElement = document.querySelector('.profile__add-button');

const closeBtnPopupProfileElement =
  document.querySelector('#closePopupProfile');
const closeBtnPopupNewPlaceElement = document.querySelector(
  '#closePopupNewPlase'
);
const closeBtnPopupBigPhotoElement = document.querySelector(
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
}

function openPopupProfile() {
  openPopup(popupProfileElement);
  nameFormFieldElement.value = profileName.textContent;
  jobFormFieldElement.value = profileJob.textContent;
}

function openPopupNewPlace() {
  openPopup(popupNewPlaceElement);
}

function openPopupBigPicture(evt) {
  evt.preventDefault();
  openPopup(popupBigPhotoElement);
  popupImgElement.src = evt.target.src;
  popupImgElement.alt = evt.target.alt;
  popupNameElement.textContent = evt.target.alt;
}

function closePopupProfile() {
  closePopup(popupProfileElement);
}

function closePopupNewPlace() {
  closePopup(popupNewPlaceElement);
  formNewPlaceElement.reset();
}

function closePopupBigPicture() {
  closePopup(popupBigPhotoElement);
}

function handleFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameFormFieldElement.value;
  profileJob.textContent = jobFormFieldElement.value;
  closePopupProfile();
}

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
openProfileBtnElement.addEventListener('click', openPopupProfile);
openNewPlaceBtnElement.addEventListener('click', openPopupNewPlace);

closeBtnPopupProfileElement.addEventListener('click', closePopupProfile);
closeBtnPopupNewPlaceElement.addEventListener('click', closePopupNewPlace);
closeBtnPopupBigPhotoElement.addEventListener('click', closePopupBigPicture);

// popupElement.addEventListener('click', closePopupByClickOnOverlay);

formProfileElement.addEventListener('submit', handleFormProfile);
formNewPlaceElement.addEventListener('submit', handleFormNextPlase);

// валидация форм
function showInputFieldError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.popup__field-error-${inputElement.id}`
  );

  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_visible');
}

function hideInputFieldError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.popup__field-error-${inputElement.id}`
  );

  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__field-error_visible');
  errorElement.textContent = '';
}

function isValideForm(formElement, inputElement) {
  console.log();
  if (!inputElement.validity.valid) {
    showInputFieldError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputFieldError(formElement, inputElement);
  }
}

function setFormEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValideForm(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation({popupSelector}) {
  const popupList = Array.from(document.querySelectorAll(popupSelector));

  popupList.forEach((popupElement) => {
    setFormEventListeners(popupElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  //console.log();
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_disabled');
  } else {
    buttonElement.classList.remove('popup__save_disabled');
  }
}

enableValidation({
  popupSelector: '.popup__container',
  inactiveButtonClass: 'popup__button_disabled',
});
