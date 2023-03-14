const openPopupBtnElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closePopupBtnElement = document.querySelector('.popup__close');


// открытие-закрытие попапа
function togglePopupVisibility() {
  popupElement.classList.toggle('popup_active');
}

function openPopup() {
  popupElement.classList.add('popup_active');
}

function closePopup() {
  popupElement.classList.remove('popup_active');
}

function closePopupByClickOnOverlay(evt) {
  if (evt.target !== evt.currentTarget) return;
  closePopup();
}

openPopupBtnElement.addEventListener('click', openPopup);
closePopupBtnElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

// редактирование формы при сохранении
