'use strict';

(function () {
  window.globalError = function (message) {
    var node = document.createElement('div');

    node.classList.add('error-message');
    node.textContent = message;

    node.addEventListener('click', function (evt) {
      evt.target.remove();
    });

    document.body.appendChild(node);
  };
})();
