'use strict';

// Тестовые данные
var WIZARDS_NUM = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

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
 * Возвращает уникальное сочетание имени и фамилии
 *
 * @param {array} firstNames Массив имен.
 * @param {array} lastNames Массив фамилий.
 * @param {array} usedFullNames Массив существующих имен + фамилий для сравнения.
 * @return {string} newName Новое уникальное имя + фамилия.
 */
var getUniqueWizardName = function (firstNames, lastNames, usedFullNames) {
  var newName = getRandomElement(firstNames) + ' ' + getRandomElement(lastNames);

  if (usedFullNames.indexOf(newName) > -1) {
    newName = getUniqueWizardName(firstNames, lastNames, usedFullNames);
  } else {
    usedFullNames.push(newName);
  }
  return newName;
};

/**
 * Создает массив, состоящий из случайно сгенерированных объектов,
 * которые описывают похожих персонажей
 *
 * @param {number} wizardsNum Количество волшебников.
 * @param {array} wizardFirstNames Возможные имена волшебников.
 * @param {array} wizardLastNames Возможные фамилии волшебников.
 * @param {array} wizardEyesColors Возможные цвета глаз волшебников.
 * @param {array} wizardCoatColors Возможные цвета мантии волшебников.
 * @return {array} wizardsData Массив объектов с данными волшебников.
 */
var generateWizards = function (wizardsNum, wizardFirstNames, wizardLastNames, wizardEyesColors, wizardCoatColors) {
  var wizardsData = [];
  var usedWizardNames = [];

  for (var i = 0; i < wizardsNum; i++) {
    var wizard = {};
    wizard.name = getUniqueWizardName(wizardFirstNames, wizardLastNames, usedWizardNames);
    wizard.coatColor = getRandomElement(wizardCoatColors);
    wizard.eyesColor = getRandomElement(wizardEyesColors);
    wizardsData[i] = wizard;
  }

  return wizardsData;
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

// Показываем окно настроек пользователя
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Генерируем волшебников случайным образом
var wizards = generateWizards(WIZARDS_NUM, WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES, WIZARD_EYES_COLOR, WIZARD_COAT_COLOR);

// Отрисовываем волшебников
renderWizards(wizards, WIZARDS_LIST_ELEMENT, WIZARD_TEMPLATE);

// Показываем блок с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');
