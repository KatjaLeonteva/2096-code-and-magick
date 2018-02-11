'use strict';

(function () {
  // Тестовые данные
  var WIZARDS_NUM = 4;
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  /**
   * Создает массив, состоящий из случайно сгенерированных объектов,
   * которые описывают похожих персонажей
   *
   * @param {number} wizardsNum Количество волшебников.
   * @param {array} wizardFirstNames Возможные имена волшебников.
   * @param {array} wizardLastNames Возможные фамилии волшебников.
   * @return {array} wizardsData Массив объектов с данными волшебников.
   */
  var generateWizards = function (wizardsNum, wizardFirstNames, wizardLastNames) {
    var wizardsData = [];
    var usedWizardNames = [];

    for (var i = 0; i < wizardsNum; i++) {
      var wizard = {};
      wizard.name = getUniqueWizardName(wizardFirstNames, wizardLastNames, usedWizardNames);
      wizard.coatColor = window.utils.getRandomColor('coat');
      wizard.eyesColor = window.utils.getRandomColor('eyes');
      wizardsData[i] = wizard;
    }

    return wizardsData;
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
    var newName = window.utils.getRandomElement(firstNames) + ' ' + window.utils.getRandomElement(lastNames);

    if (usedFullNames.indexOf(newName) > -1) {
      newName = getUniqueWizardName(firstNames, lastNames, usedFullNames);
    } else {
      usedFullNames.push(newName);
    }
    return newName;
  };

  // Генерируем волшебников случайным образом
  var wizards = generateWizards(WIZARDS_NUM, WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES);

  window.wizards = wizards;
})();
