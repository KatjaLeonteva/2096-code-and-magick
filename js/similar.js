'use strict';

(function () {
  // Количество похожих волшебников
  var WIZARDS_NUM = 4;

  // Элемент, в который мы будем вставлять похожих волшебников
  var WIZARDS_LIST_ELEMENT = document.querySelector('.setup-similar-list');

  // Шаблон, который будем копировать
  var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var similarWizards = [];
  var coatColor;
  var eyesColor;

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    renderSimilarWizards();
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    renderSimilarWizards();
  };

  /**
   * Отрисовывает похожих волшебников
   *
   */
  var renderSimilarWizards = function () {

    WIZARDS_LIST_ELEMENT.innerHTML = '';

    var sortedWizards = similarWizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = similarWizards.indexOf(left) - similarWizards.indexOf(right);
      }
      return rankDiff;
    });

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_NUM; i++) {
      fragment.appendChild(renderWizard(sortedWizards[i], WIZARD_TEMPLATE));
    }

    WIZARDS_LIST_ELEMENT.appendChild(fragment);
  };

  /**
   * Сначала должны показываться волшебники, у которых совпадает цвет плаща и цвет глаз,
   * затем волшебники, у которых совпадает только цвет плаща,
   * затем волшебники с таким же цветом глаз, а после этого все остальные волшебники
   *
   * @param {object} wizard
   * @return {number} rank
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
   * Создает элемент с данными волшебника по шаблону
   *
   * @param {object} wizardData Данные волшебника.
   * @param {Node} wizardTemplate Шаблон элемента волшебника.
   * @return {Node} wizardElement DOM элемент.
   */
  var renderWizard = function (wizardData, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  var successHandler = function (response) {
    // Сохраняем полученные данные
    similarWizards = response;

    // Отрисовываем волшебников
    renderSimilarWizards();

    // Показываем блок с похожими персонажами
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(successHandler, function (errorMessage) {
    window.globalError(errorMessage);
  });
})();
