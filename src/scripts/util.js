// открытие-закрытие попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPushEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPushEsc);
}

// закрытые попапов по нажантию на Esc
function closePopupByPushEsc(evt) {
  if (evt.key !== 'Escape') return;
  closePopup(document.querySelector('.popup_opened'));
}
