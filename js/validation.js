'use strict';

(function () {
  var setupForm = document.querySelector('.setup-wizard-form');
  var userNameInput = setupForm.querySelector('.setup-user-name');

  // Валидация поля ввода имени
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // Фикс для Edge (не поддерживает атрибут minlength)
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    // Удаляем старое сообщение об ошибке
    var existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    window.backend.save(new FormData(setupForm), window.closeDialog, function (errorMessage) {
      window.globalError(errorMessage);
    });
  });
})();
