/**
 * @file FIS 配置
 * @author
 */

fis.config.set('namespace', 'migrate');

// chrome下可以安装插件实现livereload功能
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

// 插件存放位置
fis.match('plugins/(**)', {
    release: '/plugins/$1'
});
// 插件存放位置
fis.match('conf/(**)', {
    release: '/conf/$1'
});
fis.match('**.jes', {
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        stage: 3
    }),
    rExt: 'js'
});


fis.match('**.tmpl', {
    parser: fis.plugin('utc', {
        variable: 'data'
    }),
    isJsLike: true,
    release: false
});
fis.match('client/widget/{**.js,**.jes}', {
    isMod: true
});


