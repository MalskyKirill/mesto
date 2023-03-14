const openPopupBtnElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closePopupBtnElement = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameFormFieldElement = formElement.querySelector('.popup__field_next_name');
const jobFormFieldElement = formElement.querySelector('.popup__field_next_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

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

openPopupBtnElement.addEventListener('click', openPopup);
closePopupBtnElement.addEventListener('click', closePopup);
// popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);
