define(['module', '../../scripts/customize/util', '../../scripts/superClass/VmClass', '../../scripts/superClass/mixin', '../../scripts/customize/formatter', '../../scripts/customize/ui.tool', '../../scripts/components/sidebar/sidebar'], function (module, _util, _VmClass, _mixin, _formatter2, _ui, _sidebar) {
    'use strict';

    var _util2 = _interopRequireDefault(_util);

    var _VmClass2 = _interopRequireDefault(_VmClass);

    var _mixin2 = _interopRequireDefault(_mixin);

    var _formatter3 = _interopRequireDefault(_formatter2);

    var _ui2 = _interopRequireDefault(_ui);

    var _sidebar2 = _interopRequireDefault(_sidebar);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ViewModel = function ViewModel() {};
    ViewModel.extend(_VmClass2.default);
    ViewModel.mixin(_mixin2.default);

    ViewModel.prototype.init = function () {
        var that = this;
        var mainId = 'roleList';

        that.getListAction = _util2.default.getInterface('admin/get_roles'); //查询action
        that.addOrEditAction = _util2.default.getInterface('admin/add_or_save_role'); //增改action
        that.deleteAction = _util2.default.getInterface('admin/del_role'); //删除action
        that.id = "role_id"; //主键

        var datagridConfig = {
            url: that.getListAction,
            columns: [[{
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
                formatter: function formatter(value, row, index) {
                    return (0, _formatter3.default)('date', row.create_date);
                }
            }, {
                field: '操作',
                title: '操作',
                width: 20,
                formatter: function formatter(value, row, index) {
                    return (0, _formatter3.default)('edit', mainId, index) + ('<a class="btn btn-warning btn-xs" onclick="vmRun(\'' + mainId + '\',\'showRoleDialog\',' + index + ')">\u4FEE\u6539\u6743\u9650</a>') + (row.edit_mode == 0 ? (0, _formatter3.default)('delete', mainId, index) : '');
                }
            }]]
        };

        that._init(mainId, datagridConfig);
    };

    ViewModel.prototype.showRoleDialog = function (index) {
        var that = this;
        var roleId = that.getRowByIndex(index).role_id;

        $.ajax({
            type: "post",
            url: _util2.default.getInterface('admin/get_role_menu_tree.mjback'),
            dataType: 'json',
            data: { role_id: roleId },
            success: function success(result) {
                if (!!result.treestore) {
                    _showRoleDialog(result, roleId);
                }
            },
            error: function error(err) {
                console.log(err);
                $.layer.message('提示：', '服务器错误！', 'danger');
            }
        });
    };

    var _showRoleDialog = function _showRoleDialog(result, roleId) {
        var store = result.treestore;
        var roleTree1 = store.children;
        var roleTree1_len = roleTree1.length;
        var roleTreeStr = '';

        for (var i = 0; i < roleTree1_len; i++) {
            var roleTree2 = roleTree1[i].children;
            if ('undefined' == typeof roleTree2) {
                continue;
            }

            var rT1Checked = roleTree1[i].checked;
            var rT1Flag = rT1Checked == 'true' || rT1Checked == true;

            roleTreeStr += '' + '<li class="roleTree_1">' + '<label>' + '<input class="roleCheck_1" type="checkbox" ' + (rT1Flag ? 'checked' : '') + '/>&emsp;' + roleTree1[i].text + '</label>' + '<p class="roleTree_2">';

            var roleTree2_len = roleTree2.length;
            for (var j = 0; j < roleTree2_len; j++) {

                var rT2Checked = roleTree2[j].checked;
                var rT2Flag = rT2Checked == 'true' || rT2Checked == true;

                roleTreeStr += '' + '<label>' + '<input class="roleCheck_2" type="checkbox" ' + 'value="' + roleTree2[j].id.split('#')[1] + '" ' + (rT2Flag ? 'checked' : '') + '/>&emsp;' + roleTree2[j].text + '</label>';
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
            buttons: [{
                text: '保存',
                'class': "btn-success j-save",
                click: function click() {
                    var arr = [];
                    var $checkbox = $('.roleCheck_2:checked');
                    var len = $checkbox.length;

                    for (var i = 0; i < len; i++) {
                        arr.push($checkbox[i].value);
                    }

                    var ids = arr.join(',');

                    $.ajax({
                        type: "post",
                        url: _util2.default.getInterface('admin/batch_set_role_menu'),
                        dataType: 'json',
                        data: { role_id: roleId, menu_ids: ids },
                        success: function success(result) {
                            if (result.ret == 1) {
                                $.layer.message('提示：', '权限保存成功！', 'success');
                                $div.bsDialog('destroy', function () {
                                    $div.remove();
                                    (0, _sidebar2.default)();
                                });
                            } else {
                                $.layer.message('提示：', result.info, 'warning');
                            }
                        },
                        error: function error(err) {
                            console.log(err);
                            $.layer.message('提示：', '服务器错误！', 'danger');
                        }
                    });
                }
            }, {
                text: "关闭",
                'class': "btn-default",
                click: function click() {
                    $(this).bsDialog('destroy', function () {
                        $div.remove();
                    });
                }
            }]
        };

        _ui2.default.createDialog($div, roleDialogConfig);

        $ul.on('change', '.roleCheck_1', function () {
            $(this).parents('.roleTree_1').find('.roleCheck_2').prop('checked', this.checked);
        });

        $ul.on('change', '.roleCheck_2', function () {
            var $thisRoleTree_1 = $(this).parents('.roleTree_1');
            var $notCheckedLen = $thisRoleTree_1.find('.roleCheck_2').not(':checked').length;
            var flag = $notCheckedLen > 0 ? 0 : 1;
            $thisRoleTree_1.find('.roleCheck_1').prop('checked', !!flag);
        });

        $('.roleCheck_2').trigger('change');
    };

    module.exports = new ViewModel();
});