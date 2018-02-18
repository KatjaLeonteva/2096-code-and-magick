'use strict';

(function () {
  // Количество похожих волшебников
  var WIZARDS_NUM = 4;

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
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  var successHandler = function (response) {
    // Берем 4 произвольных записи из полученных данных
    var wizards = [];
    var allWizards = response.slice();
    for (var i = 0; i < WIZARDS_NUM; i++) {
      wizards.push(getRandomElementUnique(allWizards));
    }

    // Отрисовываем волшебников
    renderWizards(wizards, WIZARDS_LIST_ELEMENT, WIZARD_TEMPLATE);

    // Показываем блок с похожими персонажами
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.appendChild(node);
  };

  /**
   * Возвращает случайный элемент и удаляет его из исходного массива
   *
   * @param {array} arr Массив для поиска элемента.
   * @return {string} Случайный элемент массива.
   */
  function getRandomElementUnique(arr) {
    var removedEl = arr.splice(Math.random() * arr.length, 1);
    return removedEl[0];
  }

  window.backend.load(successHandler, errorHandler);
})();
