'use strict';

(function () {
  window.globalError = function (message) {
    var node = document.createElement('div');

    node.classList.add('error-message');
    node.textContent = message;

    // Сообщение удаляется по клику на него
    node.addEventListener('click', function (evt) {
      evt.target.remove();
    });

    // Сообщение удаляется через 5 секунд
    setTimeout(function () {
      node.remove();
    }, 5000);

    document.body.insertBefore(node, document.body.firstChild);
  };
})();
