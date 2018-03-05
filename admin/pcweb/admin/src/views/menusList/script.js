import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'menusList';

    that.getListAction = util.getInterface('admin/get_menus'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_or_save_menu'); //增改action
    that.deleteAction = util.getInterface('admin/del_menu'); //删除action
    that.forbiddenAction = util.getInterface(''); //禁用
    that.id = "id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
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
                formatter: (value, row, index) => formatter('status',row.status)
            }, {
                field: '操作',
                title: '操作',
                width: 20,
                formatter: (value, row, index) => formatter('edit', mainId, index) + formatter('delete', mainId, index)
            }]
        ]
    };

    that._init(mainId,datagridConfig);
    that.initGridDialog(mainId);
};

module.exports = new ViewModel;