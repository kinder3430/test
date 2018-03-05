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
    var mainId = 'activityitem';

    that.getListAction = util.getInterface('admin/activity_item'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_activity_item'); //增改action
    that.deleteAction = util.getInterface('admin/del_keyword'); //删除action
    that.id = "ag_id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'ag_id',
                title: 'ID',
                width: 20
            }, {
                field: 'activity_id',
                title: '活动ID',
                width: 20
            }, {
                field: 'activity_name',
                title: '活动名称',
                width: 20
            },{
                field: 'cat_id',
                title: '分类ID',
                width: 20
            },{
                field: 'goods_id',
                title: '商品ID',
                width: 20
            },{
                field: 'goods_name',
                title: '商品名称',
                width: 20
            },{
                field: 'goods_sn',
                title: '商品编号',
                width: 20
            },{
                field: 'attr_id',
                title: '规格属性ID',
                width: 20
            },{
                field: 'rank',
                title: '商品排序',
                width: 20
            }, {
                field: 'ag_start_time',
                title: '活动开始时间',
                width: 20,
                formatter: function (value, row, index)  {
                    var ag_start_time = row.ag_start_time;
                    ag_start_time = new Date(ag_start_time);
                    var year = ag_start_time.getFullYear();
                    var month = ag_start_time.getMonth()+1;
                    var date = ag_start_time.getDate();
                    return [year,month,date].join('-');
                }
            }, {
                field: 'ag_end_time',
                title: '活动结束时间',
                width: 20,
                formatter: function (value, row, index)  {
                    var ag_end_time = row.ag_end_time;
                    ag_end_time = new Date(ag_end_time);
                    var year = ag_end_time.getFullYear();
                    var month = ag_end_time.getMonth()+1;
                    var date = ag_end_time.getDate();
                    return [year,month,date].join('-');
                }
            },{
                field: 'type',
                title: '活动类型',
                width: 20,
                formatter: function (value, row, index)  {
                    var type_arr = ['头部广告banner', '活动专区', '限时抢购', '新品预定', '今日特价'];
                    return type_arr[row.type];
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
