const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopupBtnElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closePopupBtnElement = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameFormFieldElement = formElement.querySelector('.popup__field_next_name');
const jobFormFieldElement = formElement.querySelector('.popup__field_next_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardTemplateElement = document.querySelector('.card_template').content;
const cardsListElement = document.querySelector('.cards');


// открытие-закрытие попапа
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameFormFieldElement.value = profileName.textContent;
  jobFormFieldElement.value = profileJob.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
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
openPopupBtnElement.addEventListener('click', openPopup);
closePopupBtnElement.addEventListener('click', closePopup);
// popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);
