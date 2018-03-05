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
    var mainId = 'goodsAttrs';

    that.getListAction = util.getInterface('admin/goods_attrs'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_attrsy'); //增改action
    that.deleteAction = util.getInterface('admin/del_attrs'); //删除action
    that.id = "attr_id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'attr_id',
                title: 'ID',
                width: 20
            }, {
                field: 'goods_id',
                title: '商品ID',
                width: 20
            }, {
                field: 'goods_name',
                title: '商品名称',
                width: 20
            },{
                field: 'goods_sn',
                title: '商品编号',
                width: 20
            }, {
                field: 'amount',
                title: '数量',
                width: 20
            }, {
                field: 'unit',
                title: '商品基本单位',
                width: 20
            }, {
                field: 'weight',
                title: '重量',
                width: 20
            }, {
                field: 'weight_units',
                title: '重量单位',
                width: 20
            },{
                field: 'unit_price',
                title: '单价',
                width: 20
            },{
                field: 'market_unit_price',
                title: '市场单价',
                width: 20
            },{
                field: 'unit_price_unit',
                title: '单价单位',
                width: 20
            },{
                field: 'total_prices',
                title: '总价',
                width: 20
            },{
                field: 'type',
                title: '类型',
                width: 20,
                formatter: function (value, row, index)  {
                    var type_arr = ['普通规格', '促销规格', '新品规格'];
                    return type_arr[row.type];
                }
            }, {
                field: 'status',
                title: '状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var status_arr = ['未审核', '已审核', '删除'];
                    return status_arr[row.status];
                }
            }, {
                field: 'sales_status',
                title: '销售状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var sales_status_arr = ['普通', '特价', '折扣', '热卖'];
                    return sales_status_arr[row.sales_status];
                }
            }, {
                field: 'recommend',
                title: '是否推荐',
                width: 20,
                formatter: function (value, row, index)  {
                    var recommend_arr = ['不推荐', '推荐'];
                    return srecommend_arr[row.recommend];
                }
            }, {
                field: 'rank',
                title: '排序',
                width: 20
            }, {
                field: 'create_time',
                title: '创建时间',
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
    that.initGridDialog(mainId);
    uploadTool.init(mainId);
    form.init(mainId);

};


ViewModel.prototype.afterShowForm = function (mode, row) {
    uploadTool.reset();
};

module.exports = new ViewModel;
