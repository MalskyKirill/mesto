import { initialCards, validationConfig } from './consts.js';
import Card from './Card.js';
//import CardList from './CardList.js';
import Section from './Section.js';
import FormValidator from './FormValidation.js';
import { openPopup, closePopup } from './util.js';
//import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import Popup from './Popup.js';

const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');
const popupBigPictureElement = document.querySelector('#popupBigPhoto');

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

const bigPictureImg = document.querySelector('.popup__photo');
const bigPictureName = document.querySelector('.popup__photo-name');

// // создаем контейнер для карточек
// const cardList = new CardList('.cards');

// // первоночальная отрисовка карточек в контейнер
// const renderElements = () => {
//   initialCards.forEach((item) => {
//     const cardItem = createCard(item);
//     cardList.addAppendCard(cardItem);
//   });
// };

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardItem = createCard(item);
      cardList.setAppendCard(cardItem);
    },
  },
  '.cards'
);

const popupBigPicture = new PopupWithImage('#popupBigPhoto');
const popupForm = new Popup('#popupProfile');

//экземпляр валидации формы профайла
const profileFormValidation = new FormValidator(
  validationConfig,
  popupProfileElement
);

//экземпляр валидации формы новой карточки
const newPlaseFormValidator = new FormValidator(
  validationConfig,
  popupNewPlaceElement
);

//создание карточки
function createCard(item) {
  const cardItem = new Card(item, '.card_template', handleCardClick);
  const cardElemtnt = cardItem.getCard();
  return cardElemtnt;
}

//открыие попапов
function openPopupProfile() {
  //openPopup(popupProfileElement);
  nameFormFieldElement.value = profileName.textContent;
  jobFormFieldElement.value = profileJob.textContent;

  profileFormValidation.resetValidation();
}

function openPopupNewPlace() {
  openPopup(popupNewPlaceElement);
  formNewPlaceElement.reset();

  newPlaseFormValidator.resetValidation();
}

// редактирование формы профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameFormFieldElement.value;
  profileJob.textContent = jobFormFieldElement.value;
  closePopup(popupProfileElement);
}

// открываем попап с картинкой
function handleCardClick(cardName, cardPhoto) {
  popupBigPicture.open(cardName, cardPhoto)
}

// форма добавления карточки
function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const item = {};
  item.name = titleFormFieldElement.value;
  item.link = linkFormFieldElement.value;

  const cardItem = createCard(item);
  cardList.addPrependCard(cardItem);

  closePopup(popupNewPlaceElement);
}

//отрисовка элементов и запуск валидации форм
cardList.renderedItems();

//запуск валидации форм
profileFormValidation.enableValidation();
newPlaseFormValidator.enableValidation();

//установка слушителей на попап
popupBigPicture.setEventListeners();

// слушатели событий
// btnOpenPopupProfileElement.addEventListener('click', openPopupProfile);
btnOpenPopupProfileElement.addEventListener('click', popupForm.open);
btnOpenPopupNewPlaceElement.addEventListener('click', openPopupNewPlace);

// btnClosePopupElements.forEach((btn) =>
//   btn.addEventListener('click', () => closePopup(btn.closest('.popup')))
// );


formProfileElement.addEventListener('submit', handleFormProfileSubmit);
formNewPlaceElement.addEventListener('submit', handleAddPlaceFormSubmit);
