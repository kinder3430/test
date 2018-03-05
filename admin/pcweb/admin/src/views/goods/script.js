import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';
import uploadTool from '../../scripts/customize/FileAPI.upload';
import form from '../../scripts/customize/form';


var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'goods';

    that.getListAction = util.getInterface('admin/get_goods'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_goods'); //增改action
    that.deleteAction = util.getInterface('admin/del_items'); //删除action
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
                field: 'name',
                title: '商品名称',
                width: 20
            }, {
                field: 'item_cat_name',
                title: '分类名称',
                width: 20
            },{
                field: 'goods_sn',
                title: '商品编号',
                width: 20
            }, {
                field: 'price',
                title: '商品价格',
                width: 20
            }, {
                field: 'depict',
                title: '商品描述',
                width: 20
            }, {
                field: 'unit',
                title: '单位规格',
                width: 20
            }, {
                field: 'stock_unit',
                title: '进货单位规格',
                width: 20
            }, {
                field: 'origin',
                title: '产地',
                width: 20
            }, {
                field: 'inventory',
                title: '库存',
                width: 20
            }, {
                field: 'type',
                title: '类型',
                width: 20,
                formatter: function (value, row, index)  {
                    var type_arr = ['自营商品', '代售商品'];
                    return type_arr[row.type];
                }
            }, {
                field: 'recommend',
                title: '推荐',
                width: 20,
                formatter: function (value, row, index)  {
                    var recommend_arr = ['普通商品', '推荐商品'];
                    return recommend_arr[row.recommend];
                }
            }, {
                field: 'status',
                title: '审核',
                width: 20,
                formatter: function (value, row, index)  {
                    var status_arr = ['未审核', '已审核', '删除'];
                    return status_arr[row.status];
                }
            }, {
                field: 'create_time',
                title: '创建时间',
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
    uploadTool.init(mainId);
    form.init(mainId);

};


ViewModel.prototype.afterShowForm = function (mode, row) {
    uploadTool.reset();
};

module.exports = new ViewModel;
