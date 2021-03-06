import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';




var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'goodsclassify';

    that.getListAction = util.getInterface('admin/items_cat'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_items_cat'); //增改action
    that.deleteAction = util.getInterface('admin/del_keyword'); //删除action
    that.id = "item_cat_id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'item_cat_id',
                title: 'ID',
                width: 20
            }, {
                field: 'item_cat_name',
                title: '商品分类',
                width: 20
            }, {
                field: 'cat_id',
                title: '父级分类',
                width: 20
            }, {
                field: 'cat_name',
                title: '父分类名称',
                width: 20
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

module.exports = new ViewModel;
