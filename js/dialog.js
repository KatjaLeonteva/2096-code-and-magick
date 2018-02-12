'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = setupDialog.querySelector('.setup-close');
  var userNameInput = setupDialog.querySelector('.setup-user-name');


  // Нажатие на escape
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
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

  // Окно настроек открывается по нажатию на блок с иконкой пользователя
  setupOpen.addEventListener('click', openPopup);

  // Окно настроек открывается по нажатию на enter, если фокус на иконке пользователя
  setupOpenIcon.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  // Окно настроек закрывается по нажатию на крестик
  setupClose.addEventListener('click', closePopup);

  // Окно настроек закрывается по нажатию на enter, если фокус на крестике
  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  // Если фокус находится на поле ввода имени, то окно не закрывается по нажатию на esc
  userNameInput.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });

  // Если фокус находится на поле ввода имени, то форма не отправляется по нажатию на enter
  userNameInput.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, function () {
      evt.preventDefault();
    });
  });
})();
