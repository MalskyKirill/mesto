import './index.css';

import { initialCards, validationConfig, URL, AUTHORIZATION_KEY } from '../utils/consts.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import ApiService from '../components/ApiService.js';

const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');

const btnOpenPopupProfileElement = document.querySelector(
  '.profile__edit-button'
);
const btnOpenPopupNewPlaceElement = document.querySelector(
  '.profile__add-button'
);

const popupUserNameElement = document.querySelector('.popup__field_next_name');
const popupUserJobElement = document.querySelector('.popup__field_next_job');

const userNameElement = document.querySelector('.profile__name');
const userJobElement = document.querySelector('.profile__job');
const userAvatarElement = document.querySelector('.profile__avatar');

//экземпляр секции карточек
const cardList = new Section(
  {
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

//экземпляр апи
const apiService = new ApiService(
  URL,
  AUTHORIZATION_KEY
);

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
function handleFormProfileSubmit(evt, inputValues) {
  evt.preventDefault();

  user.setUserInfo(inputValues);
  popupProfile.close();
}

// открываем попап с картинкой
function handleCardClick(cardName, cardPhoto) {
  popupBigPicture.open(cardName, cardPhoto);
}

// форма добавления карточки
function handleAddPlaceFormSubmit(evt, inputValues) {
  evt.preventDefault();

  const item = inputValues;

  const cardItem = createCard(item);
  cardList.setPrependCard(cardItem);

  popupNewPlase.close();
}

//получили данные о пользователе с сервера и подставили их в разметку
apiService.getUser().then((data) => {
  userNameElement.textContent = data.name;
  userJobElement.textContent = data.about;
  userAvatarElement.src = data.avatar;
});




//отрисовка элементов и запуск валидации форм
cardList.renderedItems(initialCards);

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

  //заполнение формы при открытии попапа
  popupUserNameElement.value = user.getUserInfo().name;
  popupUserJobElement.value = user.getUserInfo().job;

  profileFormValidation.resetValidation();
});

btnOpenPopupNewPlaceElement.addEventListener('click', () => {
  popupNewPlase.open();
  newPlaseFormValidator.resetValidation();
});
