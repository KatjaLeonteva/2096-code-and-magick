'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e848d5'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Нажатие на escape
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Открытие окна настроек
  var openPopup = function () {
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна настроек
  var closePopup = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Окно настроек пользователя
  var setupDialog = document.querySelector('.setup');

  // Окно настроек открывается по нажатию на блок с иконкой пользователя
  var setupOpen = document.querySelector('.setup-open');
  setupOpen.addEventListener('click', openPopup);

  // Окно настроек открывается по нажатию на enter, если фокус на иконке пользователя
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  // Крестик в окне настроек пользователя
  var setupClose = setupDialog.querySelector('.setup-close');

  // Окно настроек закрывается по нажатию на крестик
  setupClose.addEventListener('click', closePopup);

  // Окно настроек закрывается по нажатию на enter, если фокус на крестике
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  // Поле ввода имени в окне настроек
  var userNameInput = setupDialog.querySelector('.setup-user-name');

  // Если фокус находится на поле ввода имени, то окно не закрывается по нажатию на esc
  userNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  // Если фокус находится на поле ввода имени, то форма не отправляется по нажатию на enter
  userNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });

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

  // Изменение цвета мантии персонажа
  setupDialog.querySelector('.wizard-coat').addEventListener('click', function (evt) {
    var newCoatColor = window.utils.getRandomElement(WIZARD_COAT_COLOR);
    evt.target.style.fill = newCoatColor;
    setupDialog.querySelector('[name=coat-color]').value = newCoatColor;
  });

  // Изменение цвета глаз персонажа
  setupDialog.querySelector('.wizard-eyes').addEventListener('click', function (evt) {
    var newEyesColor = window.utils.getRandomElement(WIZARD_EYES_COLOR);
    evt.target.style.fill = newEyesColor;
    setupDialog.querySelector('[name=eyes-color]').value = newEyesColor;
  });

  // Изменение цвета фаербола персонажа
  setupDialog.querySelector('.setup-fireball-wrap').addEventListener('click', function (evt) {
    var newFireballColor = window.utils.getRandomElement(FIREBALL_COLOR);
    evt.target.style.backgroundColor = newFireballColor;
    setupDialog.querySelector('[name=fireball-color]').value = newFireballColor;
  });
})();
