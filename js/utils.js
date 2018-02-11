'use strict';

(function () {
  /**
   * Возвращает наибольшее значение в массиве
   *
   * @param {array} arr Массив значений.
   * @return {number} maxElement Наибольшее значение.
   */
  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  /**
   * Возвращает случайное число между min (включительно) и max (не включая)
   *
   * @param {number} min Минимальное значение.
   * @param {number} max Максимальное значение.
   * @return {number} Случайное число.
   */
  var getRandomArbitary = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  /**
   * Возвращает случайное ЦЕЛОЕ число между min (включая) и max (не включая)
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

  var COLORS = {
    coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e848d5']
  };

  // var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  // var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  // var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e848d5'];

  /**
   * Возвращает случайный цвет фигуры
   *
   * @param {string} figure Фигура (глаза, мантия и т.п.).
   * @return {string} Случайный элемент из массива соответвующих цветов.
   */
  var getRandomColor = function (figure) {
    return getRandomElement(COLORS[figure]);
  };

  /**
   * Раскрашивает фигуру в DOM-элементе и сохраняет значение
   *
   * @param {Node} element Элемент, часть которого нужно раскрасить.
   * @param {string} figure Что нужно раскрасить (глаза, мантия и т.п.).
   * @param {Node} input Скрытое поле, куда записывается новый цвет.
   */
  var colorizeElement = function (element, figure, input) {
    element.addEventListener('click', function () {
      var color = getRandomColor(figure);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.value = color;
    });
  };

  /**
   * Проверка нажатия определенной клавиши
   * и вызов соответствующего действия
   */
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.utils = {
    getRandomArbitary: getRandomArbitary,
    getRandomElement: getRandomElement,
    getMaxElement: getMaxElement,
    getRandomColor: getRandomColor,
    colorizeElement: colorizeElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
