class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
  }

  // показать сообщение об ошибке
  _showInputFieldError(
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

  //скрыть сообщение об ошибке
  _hideInputFieldError(
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
  _hideValidationErrors(formElement, { inputSelector, ...rest }) {
    const inputElements = formElement.querySelectorAll(inputSelector);

    inputElements.forEach((input) =>
      this._hideInputFieldError(formElement, input, rest)
    );
  }

  // проверка на валидность
  _checkFormValidity(formElement, inputElement, rest) {
    if (!inputElement.validity.valid) {
      this._showInputFieldError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        rest
      );
    } else {
      this._hideInputFieldError(formElement, inputElement, rest);
    }
  }

  // установка слушателей на события формы
  _setFormEventListeners(
    formElement,
    { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    this._hideValidationErrors(this._form, this._validationConfig);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkFormValidity(formElement, inputElement, rest);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  // проверка есть ли хоть одно невалидное поле
  _hasInvalidInput(inputList) {
    // console.log(inputList)
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // переключение состояния кнопки формы
  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // блокировка кнопки формы при невалидных полях
  _validationToggleButtonState(
    formElement,
    { inputSelector, submitButtonSelector, inactiveButtonClass }
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  }

  // запуск валидации формы
  enableValidation() {
    this._setFormEventListeners(this._form, this._validationConfig);
  }
}

export default FormValidator;
