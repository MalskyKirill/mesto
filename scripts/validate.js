// валидация форм

//показать сообщение об ошибки
function showInputFieldError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, popupErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(
    `.${inputErrorClass}-${inputElement.id}`
  );

  inputElement.classList.add(popupErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//скрыть сообщение об ошибки
function hideInputFieldError(
  formElement,
  inputElement,
  { inputErrorClass, popupErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(
    `.${inputErrorClass}-${inputElement.id}`
  );

  inputElement.classList.remove(popupErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// проверка на валидность
function isValideForm(formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputFieldError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputFieldError(formElement, inputElement, rest);
  }
}

// установка слушателей на события формы
function setFormEventListeners(
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValideForm(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

// ф-ция запуска валидации
function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setFormEventListeners(formElement, rest);
  });
}

// проверка есть ли хоть одно невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// блокировка кнопки формы при невалидных полях
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
