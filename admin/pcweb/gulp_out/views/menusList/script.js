define(['module', '../../scripts/customize/util', '../../scripts/superClass/VmClass', '../../scripts/superClass/mixin', '../../scripts/customize/formatter'], function (module, _util, _VmClass, _mixin, _formatter2) {
    'use strict';

    var _util2 = _interopRequireDefault(_util);

    var _VmClass2 = _interopRequireDefault(_VmClass);

    var _mixin2 = _interopRequireDefault(_mixin);

    var _formatter3 = _interopRequireDefault(_formatter2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ViewModel = function ViewModel() {};
    ViewModel.extend(_VmClass2.default);
    ViewModel.mixin(_mixin2.default);

    ViewModel.prototype.init = function () {
        var that = this;
        var mainId = 'menusList';

        that.getListAction = _util2.default.getInterface('admin/get_menus'); //查询action
        that.addOrEditAction = _util2.default.getInterface('admin/add_or_save_menu'); //增改action
        that.deleteAction = _util2.default.getInterface('admin/del_menu'); //删除action
        that.forbiddenAction = _util2.default.getInterface(''); //禁用
        that.id = "id"; //主键

        var datagridConfig = {
            url: that.getListAction,
            columns: [[{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'title',
                title: '菜单名称',
                width: 20
            }, {
                field: 'link_url',
                title: '页面模块',
                width: 20
            }, {
                field: 'ptitle',
                title: '所属模块',
                width: 20
            }, {
                field: 'status',
                title: '状态',
                width: 20,
                formatter: function formatter(value, row, index) {
                    return (0, _formatter3.default)('status', row.status);
                }
            }, {
                field: '操作',
                title: '操作',
                width: 20,
                formatter: function formatter(value, row, index) {
                    return (0, _formatter3.default)('edit', mainId, index) + (0, _formatter3.default)('delete', mainId, index);
                }
            }]]
        };

        that._init(mainId, datagridConfig);
        that.initGridDialog(mainId);
    };

    module.exports = new ViewModel();
});