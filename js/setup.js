'use strict';

// Тестовые данные
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUM = 4;

// Элемент, в который мы будем вставлять похожих волшебников
var similarListElement = document.querySelector('.setup-similar-list');

// Шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * Создает массив, состоящий из случайно сгенерированных объектов,
 * которые описывают похожих персонажей
 *
 * @return {array} wizardsData Массив объектов с данными волшебников.
 */
var generateWizards = function () {
  var wizardsData = [];

  for (var i = 0; i < NUM; i++) {
    var wizard = {};
    wizard.name = WIZARD_FIRST_NAMES[getRandomInt(WIZARD_FIRST_NAMES.length)] + ' ' + WIZARD_LAST_NAMES[getRandomInt(WIZARD_LAST_NAMES.length)];
    wizard.coatColor = WIZARD_COAT_COLOR[getRandomInt(WIZARD_COAT_COLOR.length)];
    wizard.eyesColor = WIZARD_EYES_COLOR[getRandomInt(WIZARD_EYES_COLOR.length)];
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
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizardElement;
};

/**
 * Вставляет элементы волшебников в DOM
 *
 * @param {array} wizardsArr Массив объектов, описывающих волшебников.
 */
var renderWizards = function (wizardsArr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsArr.length; i++) {
    fragment.appendChild(renderWizard(wizardsArr[i]));
  }

  similarListElement.appendChild(fragment);
};

// Показываем окно настроек пользователя
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Генерируем волшебников случайным образом
var wizards = generateWizards();

// Отрисовываем волшебников
renderWizards(wizards);

// Показываем блок с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');

/**
 * Вспомогательная функция
 * Возвращает случайное целое число между 0 (включительно) и max (не включая max)
 *
 * @param {number} max Максимальное значение.
 * @return {number} Случайное число.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
