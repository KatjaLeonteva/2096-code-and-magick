'use strict';

(function () {
  // Элемент, в который мы будем вставлять похожих волшебников
  var WIZARDS_LIST_ELEMENT = document.querySelector('.setup-similar-list');

  // Шаблон, который будем копировать
  var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  /**
   * Вставляет элементы волшебников в DOM
   *
   * @param {array} wizardsArr Массив объектов, описывающих волшебников.
   * @param {Node} wizardsListElement Элемент для вставки.
   * @param {Node} wizardTemplate Шаблон элемента волшебника.
   */
  var renderWizards = function (wizardsArr, wizardsListElement, wizardTemplate) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsArr.length; i++) {
      fragment.appendChild(renderWizard(wizardsArr[i], wizardTemplate));
    }

    wizardsListElement.appendChild(fragment);
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
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

    return wizardElement;
  };

  // Отрисовываем волшебников
  renderWizards(window.wizards, WIZARDS_LIST_ELEMENT, WIZARD_TEMPLATE);

  // Показываем блок с похожими персонажами
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
