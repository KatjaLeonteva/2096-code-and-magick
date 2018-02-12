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

  // Перетаскивание артефактов
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
    artifactsElement.style.outline = 'none';
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
