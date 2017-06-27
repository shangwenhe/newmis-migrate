'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (router) {

    router.route('/book')
    // PUT /migrate/book
    .put(router.action('book').put)
    // GET /migrate/book
    .get(router.action('book'));
    router.get('/channeldb', router.action('db').channelDB);
    router.get('/metadata', router.action('db').metaData);
    router.get('/topchannel', router.action('db').topChannel);
    router.get('/privilege', router.action('db').privilege);

    router.use(function (req, res, next) {
        if (req.session.username !== 'shangwenhe') {
            res.json({
                msg: 'No access permissions'
            });
            return;
        }
        next();
    });
};

module.exports = exports['default'];