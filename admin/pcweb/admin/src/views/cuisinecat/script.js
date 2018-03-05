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
    var mainId = 'cuisinecat';

    that.getListAction = util.getInterface('admin/get_cuisine'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_cuisine'); //增改action
    that.deleteAction = util.getInterface('admin/dle_purchase'); //删除action
    that.export = util.getInterface('admin/order_xlsx'); //导出订单xls
    that.id = "cat_id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'cat_id',
                title: 'ID',
                width: 20
            }, {
                field: 'cat_name',
                title: '分类名称',
                width: 20
            }, {
                field: 'type',
                title: '分类类型',
                width: 20,
                formatter: function (value, row, index)  {
                    var type_arr = ['商品分类', '菜式分类'];
                    return type_arr[row.type];
                }
            },{
                field: 'cat_describe',
                title: '分类简介',
                width: 20
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
    form.init(mainId);

    $('.j-export').on('click',function () {
        that.order_xlsx()
    });
};

ViewModel.prototype.order_xlsx = function (index) {
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
