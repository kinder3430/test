import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'forumCategory';

    that.getListAction = util.getInterface('admin/keywords'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_keywords'); //增改action
    that.deleteAction = util.getInterface('admin/del_keyword'); //删除action
    that.id = "id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'id',
                title: 'ID',
                width: 20
            }, {
                field: 'word',
                title: '词条',
                width: 20
            },{
                field: '操作',
                title: '操作',
                width: 20,
                formatter: (value, row, index) => formatter('edit', mainId, index)
            }]
        ]
    };

    that._init(mainId,datagridConfig);
};

module.exports = new ViewModel;
