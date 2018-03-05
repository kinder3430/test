import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'purchase';

    that.getListAction = util.getInterface('admin/get_purchase'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_purchase'); //增改action
    that.deleteAction = util.getInterface('admin/dle_purchase'); //删除action
    that.export = util.getInterface('admin/export_xlsx'); //导出xlsx
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
                field: 'purchase_sn',
                title: '采购单号',
                width: 20
            }, {
                field: 'status',
                title: '类别',
                width: 20,
                formatter: function (value, row, index)  {
                    var status_arr = ['购货', '退货'];
                    return status_arr[row.status];
                }
            }, {
                field: 'supplier',
                title: '供应商',
                width: 20
            }, {
                field: 'goods_sn',
                title: '商品编号',
                width: 20
            }, {
                field: 'goods_name',
                title: '商品名称',
                width: 20
            }, {
                field: 'stock_unit',
                title: '规格',
                width: 20
            }, {
                field: 'unit',
                title: '单位',
                width: 20
            }, {
                field: 'amount',
                title: '数量',
                width: 20
            }, {
                field: 'unit_price',
                title: '单价',
                width: 20
            }, {
                field: 'total',
                title: '采购总金额',
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

    $('.j-export').on('click', function () {
        that.export_xlsx()
    });
};

ViewModel.prototype.export_xlsx = function (index) {
    var that = this;
    $.ajax({
        type: "post",
        url: that.export,
        dataType: 'json',
        data: '',
        success: function (data) {
            $.layer.message('提示：','导出成功！', 'success');
        },
        error: function (err) {
            console.log(err);
            $.layer.message('提示：','服务器错误！', 'danger');
        }
    });
}


module.exports = new ViewModel;
