class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;

    this._inputSelector = this._validationConfig.inputSelector;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    );

    this._inputErrorClass = this._validationConfig.inputErrorClass;
    this._popupErrorClass = this._validationConfig.popupErrorClass;
    this._errorClass = this._validationConfig.errorClass;
    this._inactiveButtonClass = this._validationConfig.inactiveButtonClass;
  }

  // показать сообщение об ошибке
  _showInputFieldError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `.${this._inputErrorClass}-${inputElement.id}`
    );

    inputElement.classList.add(this._popupErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //скрыть сообщение об ошибке
  _hideInputFieldError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${this._inputErrorClass}-${inputElement.id}`
    );

    inputElement.classList.remove(this._popupErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // поиск инпутов для скрытия сообщения об ошибки
  _hideValidationErrors() {
    this._inputList.forEach((input) => this._hideInputFieldError(input));
  }

  // проверка на валидность
  _checkFormValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputFieldError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputFieldError(inputElement);
    }
  }

  // установка слушателей на события формы
  _setFormEventListeners() {
    this._toggleButtonState();
    this._hideValidationErrors();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkFormValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // проверка есть ли хоть одно невалидное поле
  _hasInvalidInput() {
    // console.log(inputList)
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // переключение состояния кнопки формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // очистка ошибок и управление состоянием кнопки
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => this._hideInputFieldError(input));
  }

  // запуск валидации формы
  enableValidation() {
    this._setFormEventListeners();
  }
}

export default FormValidator;
