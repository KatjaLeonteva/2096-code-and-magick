'use strict';

// Тестовые данные
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUM = 4;

// Элемент, в который мы будем вставлять похожих волшебников
var WIZARDS_LIST_ELEMENT = document.querySelector('.setup-similar-list');

// Шаблон, который будем копировать
var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * Возвращает случайное целое число между min (включая) и max (не включая)
 *
 * @param {number} min Минимальное значение.
 * @param {number} max Максимальное значение.
 * @return {number} Случайное число.
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Возвращает случайный элемент из массива
 *
 * @param {array} arr Массив для поиска элемента.
 * @return {string} Случайный элемент массива.
 */
var getRandomElement = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

/**
 * Возвращает случайный элемент из массива
 * Удаляет элемент, чтобы исключить повторения
 *
 * @param {array} arr Массив для поиска элемента.
 * @return {string} Случайный элемент массива.
 */
var getRandomElementUnique = function (arr) {
  var removedElements = arr.splice(getRandomInt(0, arr.length), 1);
  return removedElements[0];
};

/**
 * Создает массив, состоящий из случайно сгенерированных объектов,
 * которые описывают похожих персонажей
 *
 * @return {array} wizardsData Массив объектов с данными волшебников.
 */
var generateWizards = function () {
  var wizardsData = [];

  var wizardsFirstNamesCopy = WIZARD_FIRST_NAMES.slice();
  var wizardsLastNamesCopy = WIZARD_LAST_NAMES.slice();

  for (var i = 0; i < NUM; i++) {
    var wizard = {};
    wizard.name = getRandomElementUnique(wizardsFirstNamesCopy) + ' ' + getRandomElementUnique(wizardsLastNamesCopy);
    wizard.coatColor = getRandomElement(WIZARD_COAT_COLOR);
    wizard.eyesColor = getRandomElement(WIZARD_EYES_COLOR);
    wizardsData[i] = wizard;
  }

  return wizardsData;
};

/**
 * Создает элемент с данными волшебника по шаблону
 *
 * @param {object} wizardData Данные волшебника.
 * @return {Node} wizardElement DOM элемент.
 */
var renderWizard = function (wizardData) {
  var wizardElement = WIZARD_TEMPLATE.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizardElement;
};

/**
 * Вставляет элементы волшебников в DOM
 *
 * @param {array} wizardsArr Массив объектов, описывающих волшебников.
 * @param {Node} wizardsListElement Элемент для вставки.
 */
var renderWizards = function (wizardsArr, wizardsListElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsArr.length; i++) {
    fragment.appendChild(renderWizard(wizardsArr[i]));
  }

  wizardsListElement.appendChild(fragment);
};

// Показываем окно настроек пользователя
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Генерируем волшебников случайным образом
var wizards = generateWizards();

// Отрисовываем волшебников
renderWizards(wizards, WIZARDS_LIST_ELEMENT);

// Показываем блок с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');
