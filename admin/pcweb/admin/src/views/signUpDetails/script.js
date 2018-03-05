import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'signUpDetails';

    that.getListAction = util.getInterface('admin/get_activity_joiners'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_activity_joiners'); //增改action
    that.deleteAction = util.getInterface('admin/del_menu'); //删除action
    that.forbiddenAction = util.getInterface(''); //禁用
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
                field: 'user_name',
                title: '报名用户',
                width: 20
            }, {
                field: 'mobile',
                title: '报名电话',
                width: 20
            }, {
                field: 'grp',
                title: '组别',
                width: 20,
            }, {
                field: 'grp_name',
                title: '组别名',
                width: 20,
            },  {
                field: 'car_team',
                title: '车队',
                width: 20
            }, {
                field: 'car',
                title: '车型',
                width: 20
            }, {
                field: 'volume',
                title: '排量',
                width: 20
            }, {
                field: 'color',
                title: '颜色',
                width: 20
            }, {
                field: 'start_index',
                title: '排位赛排位',
                width: 20
            }, {
                field: 'start_carno',
                title: '排位赛车道',
                width: 20
            }, {
                field: 'start_index2',
                title: '预赛排位',
                width: 20
            }, {
                field: 'start_carno2',
                title: '预赛车道',
                width: 20
            }, {
                field: 'start_index3',
                title: '决赛排位',
                width: 20
            }, {
                field: 'start_carno3',
                title: '决赛车道',
                width: 20
            }, {
                field: 'start_no',
                title: '车号',
                width: 20
            }, {
                field: 'match_score',
                title: '排位赛成绩',
                width: 20
            }, {
                field: 'match_score2',
                title: '预赛成绩',
                width: 20
            }, {
                field: 'match_score3',
                title: '总成绩',
                width: 20
            }, {
                field: 'rank',
                title: '排位赛名次',
                width: 20
            }, {
                field: 'rank2',
                title: '预赛名次',
                width: 20
            }, {
                field: 'rank3',
                title: '决赛名次',
                width: 20
            },{
                field: '操作',
                title: '操作',
                width: 20,
                formatter: (value, row, index) => formatter('edit', mainId, index) + formatter('delete', mainId, index)
            }]
        ]
    };

    that._init(mainId,datagridConfig);
    that.initGridDialog(mainId);
};

module.exports = new ViewModel;