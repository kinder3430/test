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
    var mainId = 'activity';

    that.getListAction = util.getInterface('admin/activity'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_activity'); //增改action
    that.deleteAction = util.getInterface('admin/del_activity'); //删除action
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
                field: 'title',
                title: '活动标题',
                width: 20
            }, {
                field: 'content',
                title: '内容',
                width: 20
            },{
                field: 'excerpt',
                title: '摘要',
                width: 20
            }, {
                field: 'url',
                title: '跳转URL',
                width: 20
            }, {
                field: 'activity_start_time',
                title: '活动开始时间',
                width: 20,
                formatter: function (value, row, index)  {
                    var activity_start_time = row.activity_start_time;
                    activity_start_time = new Date(activity_start_time);
                    var year = activity_start_time.getFullYear();
                    var month = activity_start_time.getMonth()+1;
                    var date = activity_start_time.getDate();
                    return [year,month,date].join('-');
                }
            }, {
                field: 'activity_end_time',
                title: '活动结束时间',
                width: 20,
                formatter: function (value, row, index)  {
                    var activity_end_time = row.activity_end_time;
                    activity_end_time = new Date(activity_end_time);
                    var year = activity_end_time.getFullYear();
                    var month = activity_end_time.getMonth()+1;
                    var date = activity_end_time.getDate();
                    return [year,month,date].join('-');
                }
            }, {
                field: 'user_name',
                title: '创建用户名',
                width: 20
            }, {
                field: 'type',
                title: '类型',
                width: 20,
                formatter: function (value, row, index)  {
                    var type_arr = ['头部广告banner', '活动专区', '限时抢购', '新品预定', '今日特价'];
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
                field: 'is_show',
                title: '是否显示',
                width: 20,
                formatter: function (value, row, index)  {
                    var is_show_arr = ['不显示', '显示', '普通活动专区首位显示'];
                    return is_show_arr[row.is_show];
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
