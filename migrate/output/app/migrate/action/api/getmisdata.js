/**
 * @file   [file]
 * @author [author]
 */

'use strict';

var yog = require('yog2-kernel');
var GetmisdataModel = yog.require('migrate/model/api/getmisdata.js');

/**
 * /api/getmisdata 处理器
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]}
 */
module.exports = function (req, res, next) {
    // 实例化API请求数据层
    var getmisdataModel = new GetmisdataModel(yog.ralPromise);
    getmisdataModel.query({
        data: {}
    }).then(function (data) {
        // 添加数据额外处理
        return data;
    }).then(res.json.bind(res)).catch(next); // 请求成功则以JSON形式返回数据，失败则调用next返回500错误
};
