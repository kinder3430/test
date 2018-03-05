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
    var mainId = 'menu';

    that.getListAction = util.getInterface('admin/get_menu'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_menu'); //增改action
    that.deleteAction = util.getInterface('admin/del_keyword'); //删除action
    that.id = "menu_id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'menu_id',
                title: 'ID',
                width: 20
            }, {
                field: 'cat_id',
                title: '分类ID',
                width: 20
            }, {
                field: 'menu_name',
                title: '菜式名称',
                width: 20
            },{
                field: 'menu_content',
                title: '菜式内容',
                width: 20
            },{
                field: 'menu_author',
                title: '菜式上传者',
                width: 20
            },{
                field: 'menu_keywords',
                title: '关键字',
                width: 20
            },{
                field: 'synopsis',
                title: '简介',
                width: 20
            },{
                field: 'menu_sort',
                title: '菜式排序',
                width: 20
            },{
                field: 'menu_status',
                title: '状态',
                width: 20,
                formatter: function (value, row, index)  {
                    var menu_status_arr = ['未审核', '已审核', '已删除'];
                    return menu_status_arr[row.menu_status];
                }
            }, {
                field: 'is_show',
                title: '是否显示',
                width: 20,
                formatter: function (value, row, index)  {
                    var is_show_arr = ['显示', '隐藏'];
                    return is_show_arr[row.is_show];
                }
            }, {
                field: 'is_recommend',
                title: '推荐',
                width: 20,
                formatter: function (value, row, index)  {
                    var is_recommend_arr = ['不推荐', '推荐'];
                    return is_recommend_arr[row.is_recommend];
                }
            },{
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

ViewModel.prototype.afterShowForm = function(mode, row) {
    var that = this;

    var ue = UE.getEditor('container');

    ue.ready(function() {
        //设置编辑器的内容
        ue.setMenu_content(row.menu_content);
    });
};


ViewModel.prototype.beforeSubmit = function(param) {
    return param;
};



ViewModel.prototype.afterShowForm = function (mode, row) {
    uploadTool.reset();
};

module.exports = new ViewModel;
