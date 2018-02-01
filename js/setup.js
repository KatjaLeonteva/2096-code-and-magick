'use strict';

// Тестовые данные
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUM = 4;

// Показываем окно настроек пользователя
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

/**
 * Создает массив, состоящий из случайно сгенерированных объектов,
 * которые описывают похожих персонажей
 *
 * @return {array} Массив объектов.
 */
var generateWizards = function () {
  var wizardsArr = [];
  for (var i = 0; i < NUM; i++) {
    var wizard = {};
    wizard.name = WIZARD_FIRST_NAMES[getRandomInt(0, WIZARD_FIRST_NAMES.length)] + ' ' + WIZARD_LAST_NAMES[getRandomInt(0, WIZARD_LAST_NAMES.length)];
    wizard.coatColor = WIZARD_COAT_COLOR[getRandomInt(0, WIZARD_COAT_COLOR.length)];
    wizard.eyesColor = WIZARD_EYES_COLOR[getRandomInt(0, WIZARD_EYES_COLOR.length)];
    wizardsArr[i] = wizard;
  }
  return wizardsArr;
};

// Генерируем волшебников случайным образом
var wizards = generateWizards();
console.log(wizards);

// Элемент, в который мы будем вставлять похожих волшебников
var similarListElement = document.querySelector('.setup-similar-list');

// Шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Отрисовываем волшебников
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  fragment.appendChild(wizardElement);
}
similarListElement.appendChild(fragment);

// Показываем блок с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');

/**
 * Возвращает случайное целое число между min (включительно) и max (не включая max)
 *
 * @param {number} min Минимальное значение.
 * @param {number} max Максимальное значение.
 * @return {number} Случайное число.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

