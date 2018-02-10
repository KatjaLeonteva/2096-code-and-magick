'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e848d5'];

  var setupDialog = document.querySelector('.setup');
  var wizard = setupDialog.querySelector('.wizard');

  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = setupDialog.querySelector('.setup-fireball-wrap');

  // Изменение цвета мантии персонажа
  wizardCoat.addEventListener('click', function (evt) {
    var newCoatColor = window.utils.getRandomElement(WIZARD_COAT_COLOR);
    evt.target.style.fill = newCoatColor;
    setupDialog.querySelector('[name=coat-color]').value = newCoatColor;
  });

  // Изменение цвета глаз персонажа
  wizardEyes.addEventListener('click', function (evt) {
    var newEyesColor = window.utils.getRandomElement(WIZARD_EYES_COLOR);
    evt.target.style.fill = newEyesColor;
    setupDialog.querySelector('[name=eyes-color]').value = newEyesColor;
  });

  // Изменение цвета фаербола персонажа
  fireball.addEventListener('click', function (evt) {
    var newFireballColor = window.utils.getRandomElement(FIREBALL_COLOR);
    evt.target.style.backgroundColor = newFireballColor;
    setupDialog.querySelector('[name=fireball-color]').value = newFireballColor;
  });
})();
