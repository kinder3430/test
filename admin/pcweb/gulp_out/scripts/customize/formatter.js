define(['module'], function (module) {
    'use strict';

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var Method = {
        edit: function edit(_ref) {
            var _ref2 = _slicedToArray(_ref, 3),
                mainId = _ref2[0],
                index = _ref2[1],
                _ref2$ = _ref2[2],
                txt = _ref2$ === undefined ? '编辑' : _ref2$;

            return '<a class="btn btn-info btn-xs" onclick="vmRun(\'' + mainId + '\',\'showForm\',\'Edit\',' + index + ')">' + txt + '</a> ';
        },

        look: function look(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 3),
                mainId = _ref4[0],
                index = _ref4[1],
                _ref4$ = _ref4[2],
                txt = _ref4$ === undefined ? '查看' : _ref4$;

            return '<a class="btn btn-warning btn-xs" onclick="vmRun(\'' + mainId + '\',\'showForm\',\'Look\',' + index + ')">' + txt + '</a> ';
        },

        delete: function _delete(_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                mainId = _ref6[0],
                index = _ref6[1];

            return '<a class="btn btn-danger btn-xs" onclick="vmRun(\'' + mainId + '\',\'deleteItem\',' + index + ')">\u5220\u9664</a> ';
        },

        date: function date(_ref7) {
            var _ref8 = _slicedToArray(_ref7, 1),
                data = _ref8[0];

            return !!data ? moment(data, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD') : '';
        },

        dateTime: function dateTime(_ref9) {
            var _ref10 = _slicedToArray(_ref9, 1),
                data = _ref10[0];

            return !!data ? moment(data, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD<br/>HH:mm:ss') : '';
        },

        image: function image(_ref11) {
            var _ref12 = _slicedToArray(_ref11, 1),
                data = _ref12[0];

            return !!data ? '<p style="line-height: 120px;"><img src="' + data + '" class="j-imgDetail" style="max-width: 120px;max-height: 120px;" /></p>' : '<p style="text-align: center;">无图片</p>';
        },

        status: function status(_ref13) {
            var _ref14 = _slicedToArray(_ref13, 1),
                data = _ref14[0];

            return {
                '0': '<span class="badge badge-important">禁用</span>',
                '1': '<span class="badge badge-success">启用</span>'
            }[data] || '--';
        },

        substring: function substring(_ref15) {
            var _ref16 = _slicedToArray(_ref15, 2),
                data = _ref16[0],
                _ref16$ = _ref16[1],
                num = _ref16$ === undefined ? 20 : _ref16$;

            return 'string' == typeof data ? data.length > num ? data.substring(0, num) + '......' : data : '';
        },

        noReturn: function noReturn() {
            return '<span style="color: red;">未返回字段</span>';
        },

        /*---------------------------残忍的分割线---------------------------*/

        link: function link(_ref17) {
            var _ref18 = _slicedToArray(_ref17, 1),
                _link = _ref18[0];

            return '<a href="' + _link + '" target="_blank">' + _link + '</a>';
        },

        proUpOrDown: function proUpOrDown(_ref19) {
            var _ref20 = _slicedToArray(_ref19, 1),
                data = _ref20[0];

            return {
                '0': '<span class="badge">未审核</span>',
                '1': '<span class="badge badge-success">已上架</span>',
                '2': '<span class="badge badge-important">已下架</span>'
            }[data] || data;
        },

        copyCode: function copyCode(_ref21) {
            var _ref22 = _slicedToArray(_ref21, 1),
                data = _ref22[0];

            return {
                'register': '注册协议',
                'aboutus': '关于我们',
                'vipdetails': 'vip描述'
            }[data] || '--';
        },

        isVip: function isVip(_ref23) {
            var _ref24 = _slicedToArray(_ref23, 1),
                data = _ref24[0];

            return {
                '0': '<span class="badge badge-important">否</span>',
                '1': '<span class="badge badge-success">是</span>'
            }[data] || '--';
        },

        appointmentStatus: function appointmentStatus(_ref25) {
            var _ref26 = _slicedToArray(_ref25, 1),
                data = _ref26[0];

            return {
                '0': '<span class="badge badge-important">待接单</span>',
                '1': '<span class="badge badge-warning">已接单</span>',
                '2': '<span class="badge badge-success">已收货(未评价)</span>',
                '3': '<span class="badge badge-success">已收货(已评价)</span>',
                '4': '<span class="badge">已取消</span>'
            }[data] || '';
        },

        applyVipHandleStatus: function applyVipHandleStatus(_ref27) {
            var _ref28 = _slicedToArray(_ref27, 1),
                data = _ref28[0];

            return {
                '0': '<span class="badge badge-important">未处理</span>',
                '1': '<span class="badge badge-success">已处理</span>'
            }[data] || '';
        },

        platform: function platform(_ref29) {
            var _ref30 = _slicedToArray(_ref29, 1),
                data = _ref30[0];

            return {
                '1': '支付宝',
                '0': '微信',
                '2': '银行卡'
            }[data] || '';
        },

        handleFlag: function handleFlag(_ref31) {
            var _ref32 = _slicedToArray(_ref31, 1),
                data = _ref32[0];

            return {
                '1': '<span class="badge badge-success">已处理</span>',
                '0': '<span class="badge badge-important">未处理</span>'
            }[data] || '';
        },

        systemType: function systemType(_ref33) {
            var _ref34 = _slicedToArray(_ref33, 1),
                data = _ref34[0];

            return {
                '1': 'android',
                '2': 'ios'
            }[data] || '';
        },

        appType: function appType(_ref35) {
            var _ref36 = _slicedToArray(_ref35, 1),
                data = _ref36[0];

            return {
                '1': '平板端',
                '2': '上门端'
            }[data] || '';
        },

        logType: function logType(_ref37) {
            var _ref38 = _slicedToArray(_ref37, 1),
                data = _ref38[0];

            return {
                '5': '登录',
                '6': '退出'
            }[data] || '';
        },

        opinionStatus: function opinionStatus(_ref39) {
            var _ref40 = _slicedToArray(_ref39, 1),
                data = _ref40[0];

            return {
                '0': '<span class="badge badge-important">未处理</span>',
                '1': '<span class="badge badge-success">已处理</span>'
            }[data] || '';
        },

        isZuke: function isZuke(_ref41) {
            var _ref42 = _slicedToArray(_ref41, 1),
                data = _ref42[0];

            return {
                '0': '<span class="badge badge-important">否</span>',
                '1': '<span class="badge badge-success">是</span>'
            }[data] || '--';
        }
    };

    module.exports = function (method) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return Method[method](args);
    };
});