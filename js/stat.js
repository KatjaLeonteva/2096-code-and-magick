'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;

/**
 * Отрисовывает прямоугольник с закругленными краями фиксированной ширины и высоты
 * заданного цвета в заданных координатах
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {number} x Координата по оси X от левого верхнего края.
 * @param {number} y Координата по оси Y от левого верхнего края.
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
 * Отрисовывает текст сообщения
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {string} message Текст сообщения.
 * @param {number} x Координата по оси X от левого верхнего края.
 * @param {number} y Координата по оси Y от левого верхнего края.
 */
var renderMessage = function (ctx, message) {
  // Координаты сообщения
  var messageX = CLOUD_X + CLOUD_WIDTH / 2;
  var messageY = CLOUD_Y + 10; // 10 - отступ от верхнего края облака

  // Стиль текста сообщения
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';

  // Canvas не поддерживает перенос, поэтому сообщение разбивается на строки.
  // Каждая строка отрисовывается отдельно.
  var lines = message.split('\n');
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], messageX, messageY + i * 16); // 16 - размер шрифта
  }
};

/**
 * Отрисовывает окно статистики при окончании игры
 * с сообщением и гистограммами.
 *
 * @param {object} ctx Контекст отрисовки.
 * @param {array} names Имена игороков.
 * @param {attay} times Соответствующее время прохождения игры.
 */

window.renderStatistics = function (ctx, names, times) {
  // Отрисовывает тень облака с отступами по горизонтали и вертикали
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  // Отрисовывает облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // Отрисовывает сообщение по центру
  renderMessage(ctx, 'Ура вы победили!\nСписок результатов:');
};
