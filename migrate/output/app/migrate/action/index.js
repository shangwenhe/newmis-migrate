'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _model = require('../model/');

var DB = _interopRequireWildcard(_model);

exports['default'] = function (req, res) {
    res.render('migrate/page/index.tpl', {});
};

;
module.exports = exports['default'];