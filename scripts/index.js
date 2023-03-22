const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');
const popupBigPhotoElement = document.querySelector('#popupBigPhoto');

const openProfileBtnElement = document.querySelector('.profile__edit-button');
const openNewPlaceBtnElement = document.querySelector('.profile__add-button');

const closeBtnElements = document.querySelectorAll('.popup__close');
const closeBtnPopupProfileElement = document.querySelector('#closePopupProfile');
const closeBtnPopupNewPlaceElement = document.querySelector('#closePopupNewPlase');
const closeBtnPopupBigPhotoElement = document.querySelector('.popup__close-big-photo');


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
const cardImgElement = document.querySelector('.card__photo');

// открытие-закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupFormProfile() {
  openPopup(popupProfileElement);
  nameFormFieldElement.value = profileName.textContent;
  jobFormFieldElement.value = profileJob.textContent;
}

function openPopupFormNewPlace() {
  openPopup(popupNewPlaceElement);
}

function openPopupBigPicture(evt) {
  evt.preventDefault();
  openPopup(popupBigPhotoElement);
  document.querySelector('.popup__photo').src = evt.target.src;
  document.querySelector('.popup__photo').alt = evt.target.alt;
  document.querySelector('.popup__photo-name').textContent = evt.target.alt;
}

function closePopupFormProfile() {
  closePopup(popupProfileElement);
}

function closePopupFormNewPlace() {
  closePopup(popupNewPlaceElement);
}

function closePopupBigPicture() {
  closePopup(popupBigPhotoElement);
}

// редактирование формы при сохранении профиля и добавлении карточек
function handleFormSubmit(evt) {
  evt.preventDefault();
  const target = evt.target;

  if (target === formProfileElement) {
    profileName.textContent = nameFormFieldElement.value;
    profileJob.textContent = jobFormFieldElement.value;
  }

  if (target === formNewPlaceElement) {
    const card = {};
    card.name = titleFormFieldElement.value;
    card.link = linkFormFieldElement.value;
    renderNextCard(card);

    titleFormFieldElement.value = '';
    linkFormFieldElement.value = '';
  }

  closePopup();
}

//первое добавление карточек при загрузке на страницу
initialCards.forEach(renderFirstArrayCards);

function renderFirstArrayCards(card) {
  const htmlCard = createCard(card);
  cardsListElement.append(htmlCard);
}

// добавление последующих карточек через форму
function renderNextCard(card) {
  const htmlCard = createCard(card);
  cardsListElement.prepend(htmlCard);
}

// создание карточки
function createCard(card) {
  const htmlCardElement = cardTemplateElement.cloneNode(true);
  htmlCardElement.querySelector('.card__name').textContent = card.name;
  htmlCardElement.querySelector('.card__photo').src = card.link;
  htmlCardElement.querySelector('.card__photo').alt = card.name;
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
openProfileBtnElement.addEventListener('click', openPopupFormProfile);
openNewPlaceBtnElement.addEventListener('click', openPopupFormNewPlace);

closeBtnPopupProfileElement.addEventListener('click', closePopupFormProfile)
closeBtnPopupNewPlaceElement.addEventListener('click', closePopupFormNewPlace)
closeBtnPopupBigPhotoElement.addEventListener('click', closePopupBigPicture)

// popupElement.addEventListener('click', closePopupByClickOnOverlay);

formProfileElement.addEventListener('submit', handleFormSubmit);
formNewPlaceElement.addEventListener('submit', handleFormSubmit);
