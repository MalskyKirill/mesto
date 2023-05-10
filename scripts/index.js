import { initialCards, validationConfig } from './consts.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidation.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');

const btnOpenPopupProfileElement = document.querySelector(
  '.profile__edit-button'
);
const btnOpenPopupNewPlaceElement = document.querySelector(
  '.profile__add-button'
);

//экземпляр секции карточек
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

//экземпляры попапов
const popupBigPicture = new PopupWithImage('#popupBigPhoto');
const popupProfile = new PopupWithForm(
  '#popupProfile',
  handleFormProfileSubmit
);
const popupNewPlase = new PopupWithForm(
  '#popupNewPlace',
  handleAddPlaceFormSubmit
);

// экземпляр юзеринфо
const user = new UserInfo({
  name: '.popup__field_next_name',
  job: '.popup__field_next_job',
});

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

// редактирование формы профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  user.setUserInfo();
  popupProfile.close();
}

// открываем попап с картинкой
function handleCardClick(cardName, cardPhoto) {
  popupBigPicture.open(cardName, cardPhoto);
}

// форма добавления карточки
function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const item = popupNewPlase.getInputValues();

  const cardItem = createCard(item);
  cardList.setPrependCard(cardItem);

  popupNewPlase.close();
}

//отрисовка элементов и запуск валидации форм
cardList.renderedItems();

//запуск валидации форм
profileFormValidation.enableValidation();
newPlaseFormValidator.enableValidation();

//установка слушителей на попап
popupBigPicture.setEventListeners();
popupProfile.setEventListeners();
popupNewPlase.setEventListeners();

// слушатели событий
btnOpenPopupProfileElement.addEventListener('click', () => {
  popupProfile.open();
  user.getUserInfo();
  profileFormValidation.resetValidation();
});

btnOpenPopupNewPlaceElement.addEventListener('click', () => {
  popupNewPlase.open();
  popupNewPlase.reset();
  newPlaseFormValidator.resetValidation();
});

