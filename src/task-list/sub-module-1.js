/**
 * 子模块入口js，可以多层嵌套
 */

define(function (require, exports) {
    'use strict';

    // 事件管理器，页面内共享
    var eventEmitter = require('dep/eventEmitter');

    // 你可以通过init的参数获取在data-interceptor-path设置的js的返回值
    exports.init = function (id) {

        var moduleNode = this.element;

        var moduleData = this.data;

        var me = this;

        //模拟一个异步处理，由于异步后模块处理器并不能扫描到此节点下面的所有data-module-path，所以可以手动调用模块扫描方法，如下：
        setTimeout(function () {
            me.render('task-list-sub-module-1', {
                ip: moduleData.ip + '\nasdf\ndsdff',
                list: [
                    {
                        date: '2015-10-10',
                        natureFlow: 100,
                        scoreCost: 222,
                        tgFlow: 30
                    },
                    {
                        date: '2015-10-11',
                        natureFlow: 381,
                        scoreCost: 334,
                        tgFlow: 41
                    },
                    {
                        date: '2015-10-12',
                        natureFlow: 230,
                        scoreCost: 456,
                        tgFlow: 23
                    }
                ]
            });

            require('dep/moduleHandler').init(moduleNode.children(), exports);
        }, 1000);

        return;

        // 也可以返回一个Deferred来告诉模块管理器何时初始化下面的模块
        var deferred = $.Deferred();

        setTimeout(function () {
            moduleNode.html(Simplite.render('task-list-sub-module-1', {
                name: moduleData.userName,
                list: [
                    {
                        date: '2015-10-10',
                        natureFlow: 100,
                        scoreCost: 222,
                        tgFlow: 30
                    },
                    {
                        date: '2015-10-11',
                        natureFlow: 381,
                        scoreCost: 334,
                        tgFlow: 41
                    },
                    {
                        date: '2015-10-12',
                        natureFlow: 230,
                        scoreCost: 456,
                        tgFlow: 23
                    }
                ]
            }));
            deferred.resolve();
        }, 1000);

        return deferred.promise();
    };

    exports.methods = {
        test: function () {
            alert($(this).html());
        },
        test1: function () {
            alert(1);
        }
    }

    exports.dispose = function () {
        console.log('dispose task-list/sub-module-1');
    };
});