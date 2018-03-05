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
        var mainId = 'adminUserList';

        that.getListAction = _util2.default.getInterface('admin/get_admin_users'); //查询action
        that.addOrEditAction = _util2.default.getInterface('admin/add_or_save_admin_user'); //增改action
        that.deleteAction = _util2.default.getInterface('admin/del_admin_user'); //删除action
        that.forbiddenAction = _util2.default.getInterface(''); //禁用
        that.id = "id"; //主键

        var datagridConfig = {
            url: that.getListAction,
            columns: [[{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'user_login',
                title: '帐号',
                width: 20
            }, {
                field: 'user_nicename',
                title: '用户名称',
                width: 20
            }, {
                field: 'role_name',
                title: '角色身份',
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
                    return (0, _formatter3.default)('edit', mainId, index);
                }
            }]]
        };

        that._init(mainId, datagridConfig);
        that.initGridDialog(mainId);
    };

    ViewModel.prototype.beforeSubmit = function (param) {
        param.password = !!param.password ? md5(param.password) : '';
        return param;
    };

    module.exports = new ViewModel();
});