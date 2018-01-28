'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_HEIGHT = 30;

/**
 * Отрисовывает прямоугольник с закругленными краями фиксированной ширины и высоты
 * заданного цвета в заданных координатах
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {number} x Координата по оси X.
 * @param {number} y Координата по оси Y.
 * @param {string} color Цвет облака.
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  var x1 = x + CLOUD_RADIUS;
  var x2 = x + CLOUD_WIDTH - CLOUD_RADIUS;
  var x3 = x + CLOUD_WIDTH;
  var x4 = x;

  var y1 = y;
  var y2 = y + CLOUD_RADIUS;
  var y3 = y + CLOUD_HEIGHT - CLOUD_RADIUS;
  var y4 = y + CLOUD_HEIGHT;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y1);
  ctx.quadraticCurveTo(x3, y1, x3, y2);
  ctx.lineTo(x3, y3);
  ctx.quadraticCurveTo(x3, y4, x2, y4);
  ctx.lineTo(x1, y4);
  ctx.quadraticCurveTo(x4, y4, x4, y3);
  ctx.lineTo(x4, y2);
  ctx.quadraticCurveTo(x4, y1, x1, y1);
  ctx.fill();
};

/**
 * Отрисовывает текст сообщения о победе
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {string} message Текст сообщения.
 */
var renderMessage = function (ctx, message) {
  // Координаты сообщения
  var messageX = CLOUD_X + CLOUD_WIDTH / 2; // Середина облака по горизонтали
  var messageY = CLOUD_Y + 10; // 10 - отступ от верхнего края облака

  // Стиль текста сообщения
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';

  // Canvas не поддерживает перенос, поэтому сообщение разбивается на строки.
  // Каждая строка отрисовывается отдельно.
  var lines = message.split('\n');
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], messageX, messageY + i * 16);
  }
};

/**
 * Отрисовывает подпись к графику
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {string} label Текст подписи.
 * @param {number} x Координата по оси X.
 * @param {number} y Координата по оси Y
 */
var renderLabel = function (ctx, label, x, y) {
  ctx.fillStyle = '#000000';
  ctx.font = '14px PT Mono';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(label, x, y);
};

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
function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Отрисовывает окно статистики при окончании игры
 * с сообщением и гистограммами.
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {array} names Имена игороков.
 * @param {array} times Соответствующее время прохождения игры.
 */
window.renderStatistics = function (ctx, names, times) {
  // Отрисовывает тень облака с отступами по горизонтали и вертикали
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  // Отрисовывает облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // Отрисовывает сообщение по центру
  renderMessage(ctx, 'Ура вы победили!\nСписок результатов:');

  // Отрисовывает статистику
  var maxTime = getMaxElement(times);
  var bottomY = CLOUD_Y + CLOUD_HEIGHT;

  for (var i = 0; i < times.length; i++) {
    var barHeight = (CHART_HEIGHT * times[i]) / maxTime;
    var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = bottomY - barHeight - TEXT_HEIGHT;
    var barOpacity = getRandomArbitary(0.05, 1); // Прозрачность минимум 5%, иначе график плохо видно

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    if (names[i] !== 'Вы') {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + barOpacity + ')';
    }
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    var textX = barX + BAR_WIDTH / 2;
    renderLabel(ctx, names[i], textX, bottomY - TEXT_HEIGHT / 2);
    renderLabel(ctx, Math.floor(times[i], 0), textX, bottomY - barHeight - TEXT_HEIGHT / 2 - TEXT_HEIGHT);
  }
};
