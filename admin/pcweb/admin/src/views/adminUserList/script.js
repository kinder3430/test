import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'adminUserList';

    that.getListAction = util.getInterface('admin/get_admin_users'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_or_save_admin_user'); //增改action
    that.deleteAction = util.getInterface('admin/del_admin_user'); //删除action
    that.forbiddenAction = util.getInterface(''); //禁用
    that.id = "id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
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
                formatter: (value, row, index) => formatter('status',row.status)
            }, {
                field: '操作',
                title: '操作',
                width: 20,
                formatter: (value, row, index) => formatter('edit', mainId, index)
            }]
        ]
    };

    that._init(mainId,datagridConfig);
    that.initGridDialog(mainId);
};

ViewModel.prototype.beforeSubmit = function(param) {
    param.password = !!param.password? md5(param.password) : '';
    return param;
};

module.exports = new ViewModel;