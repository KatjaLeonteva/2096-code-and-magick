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
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
