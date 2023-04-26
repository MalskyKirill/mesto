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

// поиск инпутов для скрытия сообщения об ошибки
function hideValidationErrors(formElement, { inputSelector, ...rest }) {
  const inputElements = formElement.querySelectorAll(inputSelector);

  inputElements.forEach((input) =>
    hideInputFieldError(formElement, input, rest)
  );
}

// проверка на валидность
function checkFormValidity(formElement, inputElement, rest) {
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
      checkFormValidity(formElement, inputElement, rest);
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
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function validationToggleButtonState(
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}


