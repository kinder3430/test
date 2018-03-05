import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'articleManagement';

    that.getListAction = util.getInterface('admin/get_articles'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_articles'); //增改action
    that.deleteAction = util.getInterface('admin/del_articles'); //删除action
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
                field: 'title',
                title: '文章标题',
                width: 20
            }, {
                field: 'cat_name',
                title: '文章分类',
                width: 20
            }, {
                field: 'address',
                title: '文章地址',
                width: 20
            }, {
                field: 'url',
                title: 'URL链接',
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
                field: 'create_date',
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


ViewModel.prototype.beforeSubmit = function(param) {
    return param;
};

module.exports = new ViewModel;