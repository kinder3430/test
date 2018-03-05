import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';
import form from '../../scripts/customize/form';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'order_cancel';

    that.getListAction = util.getInterface('admin/cancel_order'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_purchase'); //增改action
    that.deleteAction = util.getInterface('admin/dle_purchase'); //删除action
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
                field: 'order_sn',
                title: '订单编号',
                width: 20
            }, {
                field: 'order_status',
                title: '订单状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var order_status = ['未确认', '已确认', '已取消', '无效订单', '退货'];
                    return order_status[row.order_status];
                }
            }, {
                field: 'shipping_status',
                title: '发货状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var shipping_status = ['未发货', '已发货', '已取消', '备货中'];
                    return shipping_status[row.shipping_status];
                }
            }, {
                field: 'pay_status',
                title: '支付状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var pay_status = ['未付款', '已付款', '已退款'];
                    return pay_status[row.pay_status];
                }
            }, {
                field: 'action_note',
                title: '操作备注',
                width: 20
            }, {
                field: 'log_time',
                title: '操作时间',
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
    form.init(mainId);

    $('.j-export').on('click',function () {
        that.export_xlsx()
    });
};



module.exports = new ViewModel;
