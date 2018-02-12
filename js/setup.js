'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');
  var wizard = setupDialog.querySelector('.wizard');

  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = setupDialog.querySelector('.setup-fireball-wrap');

  var coatInput = setupDialog.querySelector('[name=coat-color]');
  var eyesInput = setupDialog.querySelector('[name=eyes-color]');
  var fireballInput = setupDialog.querySelector('[name=fireball-color]');

  // Изменение цвета мантии персонажа
  window.utils.colorizeElement(wizardCoat, 'coat', coatInput);

  // Изменение цвета глаз персонажа
  window.utils.colorizeElement(wizardEyes, 'eyes', eyesInput);

  // Изменение цвета фаербола персонажа
  window.utils.colorizeElement(fireball, 'fireball', fireballInput);
})();
