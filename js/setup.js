'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');
  var wizardElement = setupDialog.querySelector('.wizard');
  var fireballElement = setupDialog.querySelector('.setup-fireball-wrap');

  var coatInput = setupDialog.querySelector('[name=coat-color]');
  var eyesInput = setupDialog.querySelector('[name=eyes-color]');
  var fireballInput = setupDialog.querySelector('[name=fireball-color]');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  // Изменение цвета мантии персонажа
  wizardElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('wizard-coat')) {
      var coatColor = window.utils.colorizeElement(evt.target, 'coat');
      coatInput.value = coatColor;
      wizard.onCoatChange(coatColor);
    }

    if (evt.target.classList.contains('wizard-eyes')) {
      var eyesColor = window.utils.colorizeElement(evt.target, 'eyes');
      eyesInput.value = eyesColor;
      wizard.onEyesChange(eyesColor);
    }
  });

  // Изменение цвета фаербола
  fireballElement.addEventListener('click', function (evt) {
    var fireballColor = window.utils.colorizeElement(evt.target, 'fireball');
    fireballInput.value = fireballColor;
  });

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

  window.wizard = wizard;
})();
