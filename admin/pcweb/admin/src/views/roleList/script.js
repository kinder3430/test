import util from '../../scripts/customize/util';
import VmClass from '../../scripts/superClass/VmClass';
import mixin from '../../scripts/superClass/mixin';
import formatter from '../../scripts/customize/formatter';
import uiTool from '../../scripts/customize/ui.tool';
import updateMenu from '../../scripts/components/sidebar/sidebar';

var ViewModel = function () {};
ViewModel.extend(VmClass);
ViewModel.mixin(mixin);

ViewModel.prototype.init = function () {
    var that = this;
    var mainId = 'roleList';

    that.getListAction = util.getInterface('admin/get_roles'); //查询action
    that.addOrEditAction = util.getInterface('admin/add_or_save_role'); //增改action
    that.deleteAction = util.getInterface('admin/del_role'); //删除action
    that.id = "role_id"; //主键

    var datagridConfig = {
        url: that.getListAction,
        columns: [
            [{
                field: 'checkbox',
                checkbox: 'true'
            }, {
                field: 'role_name',
                title: '角色名称',
                width: 20
            }, {
                field: 'role_desc',
                title: '描述',
                width: 20
            }, {
                field: 'create_date',
                title: '创建时间',
                width: 20,
                formatter: function(value, row, index) {
                    return formatter('date', row.create_date);
                }
            }, {
                field: '操作',
                title: '操作',
                width: 20,
                formatter: function (value, row, index) {
                    return formatter('edit', mainId, index) +
                    `<a class="btn btn-warning btn-xs" onclick="vmRun('${mainId}','showRoleDialog',${index})">修改权限</a>` +
                    (row.edit_mode == 0? formatter('delete', mainId, index) : '')
                }
            }]
        ]
    };

    that._init(mainId,datagridConfig);
};

ViewModel.prototype.showRoleDialog = function(index) {
    var that = this;
    var roleId = that.getRowByIndex(index).role_id;

    $.ajax({
        type: "post",
        url: util.getInterface('admin/get_role_menu_tree.mjback'),
        dataType: 'json',
        data: {role_id:roleId},
        success: function (result) {
            if (!!result.treestore) {
                _showRoleDialog(result, roleId);
            }
        },
        error: function (err) {
            console.log(err);
            $.layer.message('提示：','服务器错误！', 'danger');
        }
    });
};

var _showRoleDialog = function(result, roleId) {
    var store = result.treestore;
    var roleTree1 = store.children;
    var roleTree1_len = roleTree1.length;
    var roleTreeStr = '';

    for (var i = 0;i < roleTree1_len;i++) {
        var roleTree2 = roleTree1[i].children;
        if('undefined' == typeof roleTree2) {
            continue;
        }

        var rT1Checked = roleTree1[i].checked;
        var rT1Flag = rT1Checked == 'true' || rT1Checked == true;

        roleTreeStr += '' +
            '<li class="roleTree_1">' +
            '<label>' +
            '<input class="roleCheck_1" type="checkbox" ' +
            (rT1Flag? 'checked' : '') +
            '/>&emsp;' +
            roleTree1[i].text +
            '</label>' +
            '<p class="roleTree_2">';

        var roleTree2_len = roleTree2.length;
        for (var j = 0;j < roleTree2_len;j++) {

            var rT2Checked = roleTree2[j].checked;
            var rT2Flag = rT2Checked == 'true' || rT2Checked == true;

            roleTreeStr += '' +
                '<label>' +
                '<input class="roleCheck_2" type="checkbox" ' +
                'value="' + roleTree2[j].id.split('#')[1] + '" ' +
                (rT2Flag? 'checked' : '') +
                '/>&emsp;' +
                roleTree2[j].text +
                '</label>';
        }


        roleTreeStr += '</p></li>';
    }

    var $div = $('<div>');
    var $form = $('<form>');
    var $ul = $('<ul>');
    $('#roleList').append($div.append($form.append($ul.html(roleTreeStr))));

    var roleDialogConfig = {
        width: 1000,
        autoOpen: true,
        buttons: [
            {
                text: '保存',
                'class': "btn-success j-save",
                click: function () {
                    var arr = [];
                    var $checkbox = $('.roleCheck_2:checked');
                    var len = $checkbox.length;

                    for (var i = 0;i < len;i++) {
                        arr.push($checkbox[i].value);
                    }

                    var ids = arr.join(',');

                    $.ajax({
                        type: "post",
                        url: util.getInterface('admin/batch_set_role_menu'),
                        dataType: 'json',
                        data: {role_id:roleId,menu_ids:ids},
                        success: function (result) {
                            if (result.ret == 1) {
                                $.layer.message('提示：','权限保存成功！', 'success');
                                $div.bsDialog('destroy', function() {
                                    $div.remove();
                                    updateMenu();
                                });
                            } else {
                                $.layer.message('提示：', result.info , 'warning');
                            }
                        },
                        error: function (err) {
                            console.log(err);
                            $.layer.message('提示：','服务器错误！', 'danger');
                        }
                    });


                }
            },
            {
                text: "关闭",
                'class': "btn-default",
                click: function () {
                    $(this).bsDialog('destroy', function(){
                        $div.remove();
                    });
                }
            }
        ]
    };

    uiTool.createDialog($div, roleDialogConfig);

    $ul.on('change', '.roleCheck_1', function() {
        $(this).parents('.roleTree_1').find('.roleCheck_2').prop('checked', this.checked);
    });

    $ul.on('change', '.roleCheck_2', function() {
        var $thisRoleTree_1 = $(this).parents('.roleTree_1');
        var $notCheckedLen = $thisRoleTree_1.find('.roleCheck_2').not(':checked').length;
        var flag = $notCheckedLen > 0? 0 : 1;
        $thisRoleTree_1.find('.roleCheck_1').prop('checked', !!flag);
    });

    $('.roleCheck_2').trigger('change');
};


module.exports = new ViewModel;