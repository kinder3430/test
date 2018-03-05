import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'eventActivities';

    that.getListAction = util.getInterface('admin/get_activity'); //查询action
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
                field: 'match_name',
                title: '比赛名',
                width: 20
            }, {
                field: 'user_name',
                title: '发布者',
                width: 20
            }, {
                field: 'status',
                title: '状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var status_arr = ['报名中', '比赛中', '已结束', '抽签中'];
                    return status_arr[row.status];
                }
            }, {
                field: 'address',
                title: '位置',
                width: 20
            }, {
                field: 'type',
                title: '类型',
                width: 20
            }, {
                field: 'recommend',
                title: '推荐度',
                width: 20
            }, {
                field: 'hot',
                title: '热门度',
                width: 20
            }, {
                field: 'read_count',
                title: '阅读次数',
                width: 20
            }, {
                field: 'thumb_count',
                title: '点赞次数',
                width: 20
            }, {
                field: 'cai_count',
                title: '踩次数',
                width: 20
            }, {
                field: 'create_date',
                title: '添加时间',
                width: 20
            }, {
                field: 'joinend_date',
                title: '参加截止时间',
                width: 20
            }, {
                field: 'extra1',
                title: '比赛时间',
                width: 20
            }, {
                field: 'extra2',
                title: '联系人',
                width: 20
            }, {
                field: 'extra3',
                title: '联系/集合地址',
                width: 20
            }, {
                field: 'big_cat_name',
                title: '大分类',
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



ViewModel.prototype.afterShowForm = function(mode, row) {
    var that = this;

    var ue = UE.getEditor('container');

    ue.ready(function() {
        //设置编辑器的内容
        if (row != null)
            ue.setContent(row.content);
    });
};


module.exports = new ViewModel;
