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

const openProfileBtnElement = document.querySelector('.profile__edit-button');
const openNewPlaceBtnElement = document.querySelector('.profile__add-button');

const closeBtnElements = document.querySelectorAll('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameFormFieldElement = formElement.querySelector('.popup__field_next_name');
const jobFormFieldElement = formElement.querySelector('.popup__field_next_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardTemplateElement = document.querySelector('.card_template').content;
const cardsListElement = document.querySelector('.cards');

// открытие-закрытие попапов
function openPopup(evt) {
  evt.preventDefault();
  const target = evt.target;

  if (target === openProfileBtnElement) {
    popupProfileElement.classList.add('popup_opened');
    nameFormFieldElement.value = profileName.textContent;
    jobFormFieldElement.value = profileJob.textContent;
  }

  if (target === openNewPlaceBtnElement) {
    popupNewPlaceElement.classList.add('popup_opened');
  }
}

function closePopup() {
  popupProfileElement.classList.remove('popup_opened');
  popupNewPlaceElement.classList.remove('popup_opened');
}

// function closePopupByClickOnOverlay(evt) {
//   if (evt.target !== evt.currentTarget) return;
//   closePopup();
// }

// редактирование формы при сохранении
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameFormFieldElement.value;
  profileJob.textContent = jobFormFieldElement.value;
  closePopup();
}

//добавление карточек на страницу
initialCards.forEach(renderCards);

function renderCards(card) {
  const htmlCardElement = cardTemplateElement.cloneNode(true);
  htmlCardElement.querySelector('.card__name').textContent = card.name;
  htmlCardElement.querySelector('.card__photo').src = card.link;
  cardsListElement.append(htmlCardElement);
}

// слушатели событий
openProfileBtnElement.addEventListener('click', openPopup);
openNewPlaceBtnElement.addEventListener('click', openPopup);

closeBtnElements.forEach(btn => btn.addEventListener('click', closePopup));
// popupElement.addEventListener('click', closePopupByClickOnOverlay);

formElement.addEventListener('submit', handleFormSubmit);
