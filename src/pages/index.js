import './index.css';

import { validationConfig, URL, AUTHORIZATION_KEY } from '../utils/consts.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import ApiService from '../components/ApiService.js';
import PopupConfurmDelite from '../components/PopupConfumeDelite';

const popupProfileElement = document.querySelector('#popupProfile');
const popupNewPlaceElement = document.querySelector('#popupNewPlace');
const popupNewAvatarelement = document.querySelector('#popupNewAvatar');

const btnOpenPopupProfileElement = document.querySelector(
  '.profile__edit-button'
);
const btnOpenPopupNewPlaceElement = document.querySelector(
  '.profile__add-button'
);
const btnOpenPopupNewAvatarElement = document.querySelector('.profile__avatar');

const popupUserNameElement = document.querySelector('.popup__field_next_name');
const popupUserJobElement = document.querySelector('.popup__field_next_job');

const userAvatarElement = document.querySelector('.profile__avatar');

//экземпляр секции карточек
const cardList = new Section(
  {
    renderer: (item) => {
      const cardItem = createCard(item, user);

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

const popupNewAvatar = new PopupWithForm(
  '#popupNewAvatar',
  handleNewAvatarFormSubmit
);

const popupConfurmDelite = new PopupConfurmDelite('#popupConfurmDelite');

// экземпляр юзеринфо
const user = new UserInfo({
  name: document.querySelector('.profile__name'),
  about: document.querySelector('.profile__job'),
  avatar: document.querySelector('.profile__avatar'),
});

//экземпляр апи
const apiService = new ApiService(URL, AUTHORIZATION_KEY);

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

//экземпляр валидации формы смены аватара
const newAvatarFormValidator = new FormValidator(
  validationConfig,
  popupNewAvatarelement
);

//создание карточки
function createCard(item, user) {
  const cardItem = new Card(item, user, '.card_template', handleCardClick, {
    handleDeliteCard: (cardId) => {
      popupConfurmDelite.open({ cardId });
      popupConfurmDelite.handleButton(() => {
        apiService
          .deleteCard(cardId)
          .then(() => {
            cardItem.deleteElement();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupConfurmDelite.close();
          });
      });
    },
    // лайк карточки
    handleLikeCard: (cardId) => {
      if (!cardItem.isLiked()) {
        apiService
          .likeCard(cardId)
          .then((data) => cardItem.setCardLikes(data))
          .catch((err) => console.log(err));
      } else {
        apiService
          .deliteLikeCard(cardId)
          .then((data) => cardItem.setCardLikes(data))
          .catch((err) => console.log(err));
      }
    },
  });
  const cardElemtnt = cardItem.getCard();

  return cardElemtnt;
}

// редактирование формы профиля
function handleFormProfileSubmit(inputValues) {
  popupProfile.loading(true);

  apiService
    .edingProfile(inputValues)
    .then((data) => {
      user.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfile.loading(false);
      popupProfileElement.querySelector('.popup__save').textContent =
        'Сохранить';
    });
}

// форма добавления карточки
function handleAddPlaceFormSubmit(inputValues) {
  popupNewPlase.loading(true);

  apiService
    .addCard(inputValues)
    .then((item) => {
      const cardItem = createCard(item, user.getUserInfo());
      cardList.setPrependCard(cardItem);

      popupNewPlase.loading(false);
      popupNewPlase.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewPlase.loading(false);
      popupNewPlaceElement.querySelector('.popup__save').textContent =
        'Создать';
    });
}

//форма редактирования аватарки
function handleNewAvatarFormSubmit(inputValues) {
  popupNewAvatar.loading(true);

  apiService
    .changeAvatar(inputValues.link)
    .then((data) => {
      userAvatarElement.src = data.avatar;
      popupNewAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewAvatar.loading(false);
      popupNewAvatarelement.querySelector('.popup__save').textContent =
        'Сохранить';
    });
}

// открываем попап с картинкой
function handleCardClick(cardName, cardPhoto) {
  popupBigPicture.open(cardName, cardPhoto);
}

//получение данных  с сервера и отрисовка
Promise.all([apiService.getCards(), apiService.getUser()]).then(
  ([resCardData, resUserData]) => {
    user.setUserInfo(resUserData);
    cardList.renderedItems(resCardData);
  }
);

//запуск валидации форм
profileFormValidation.enableValidation();
newPlaseFormValidator.enableValidation();
newAvatarFormValidator.enableValidation();

//установка слушителей на попап
popupBigPicture.setEventListeners();
popupProfile.setEventListeners();
popupNewPlase.setEventListeners();
popupConfurmDelite.setEventListeners();
popupNewAvatar.setEventListeners();

// слушатели событий
btnOpenPopupProfileElement.addEventListener('click', () => {
  popupProfile.open();

  //заполнение формы при открытии попапа
  const { name, about } = user.getUserInfo();
  popupUserNameElement.value = name;
  popupUserJobElement.value = about;

  profileFormValidation.resetValidation();
});

btnOpenPopupNewPlaceElement.addEventListener('click', () => {
  popupNewPlase.open();

  newPlaseFormValidator.resetValidation();
});

btnOpenPopupNewAvatarElement.addEventListener('click', () => {
  popupNewAvatar.open();

  newAvatarFormValidator.resetValidation();
});
