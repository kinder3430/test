import util from '../customize/util';
import uiTool from '../customize/ui.tool';
import formatter from '../customize/formatter';


var dialog = {
    //菜单模块弹窗
    menuModel(pageId, $this, singleSelect) {

        var sift =
            `<div class="row">
                <div class="col-md-6">
                    <div class="input-group input-group-sm">
                        <span class="input-group-addon no-bg">名称：</span>
                        <input type="text" class="form-control" placeholder="" name="title"/>
                    </div>
                </div>
            </div>`;

        var options = {
            gridAction  : util.getInterface('admin/get_top_menus'),
            gValueField : 'id',
            gTextField  : 'title',
            valueField  : 'pid',
            textField   : 'ptitle',
            title       : '选择菜单模块',
            columns: [
                [{
                    field: 'title',
                    title: '名称',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: getSift(sift),
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },
    //角色弹窗
    roleModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/get_roles.mjback'),
            valueField : 'role_id',
            textField  : 'role_name',
            title      : '选择角色',
            columns    : [
                [{
                    field: 'role_name',
                    title: '名称',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'role_desc',
                    title: '描述',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },
    bigCatModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/get_bigcat'),
            gValueField : 'id',
            gTextField  : 'title',
            valueField  : 'big_cat',
            textField   : 'big_cat_name',
            title      : '大分类',
            columns    : [
                [{
                    field: 'title',
                    title: '栏目',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },
    //商品
    itemsModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/get_goods'),
            gValueField : 'id',
            gTextField  : 'name',
            valueField  : 'goods_id',
            textField   : 'goods_name',
            title      : '商品名称',
            columns    : [
                [{
                    field: 'name',
                    title: '商品名称',
                    width: 20,
                    align: 'center'
                },{
                    field: 'goods_sn',
                    title: '商品编号',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },
    //活动
    activitysModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/activity'),
            gValueField : 'id',
            gTextField  : 'title',
            valueField  : 'activity_id',
            textField   : 'activity_name',
            title      : '活动',
            columns    : [
                [{
                    field: 'title',
                    title: '活动名称',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'excerpt',
                    title: '摘要',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },
    //商品类型
    productCateModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/items_cat'),
            valueField : 'item_cat_id',
            textField  : 'item_cat_name',
            title      : '选择商品类型',
            columns    : [
                [{
                    field: 'item_cat_name',
                    title: '类别',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },

    //大分类
    itemsCatModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/get_cuisine'),
            valueField : 'cat_id',
            textField  : 'cat_name',
            title      : '选择商品一级分类',
            columns    : [
                [{
                    field: 'cat_name',
                    title: '分类名',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },

    //大分类
    CaiCatModel(pageId, $this, singleSelect) {
        var options = {
            gridAction : util.getInterface('admin/get_menu_cat'),
            valueField : 'cat_id',
            textField  : 'cat_name',
            title      : '菜式分类',
            columns    : [
                [{
                    field: 'cat_name',
                    title: '分类名',
                    width: 20,
                    align: 'center'
                }]
            ],
            sift: '',
            pageId      : pageId,
            $this       : $this,
            singleSelect: singleSelect
        };
        createGridDialog(options);
    },
};

var getArr = (str) => str != ""? str.split(',') :  [];

function getSift(str) {
    return  `<section class="bs-panel dialogSift">
                    <div class="bs-panel-body">
                        <form class="j-dialog-sift-form">
                            <div class="form-group-sm">
                                ${str}
                            </div>
                        </form>
                    </div>
                    <div class="bs-panel-footer">
                        <a class="btn btn-info btn-xs j-dialog-sift-search">查询</a>
                    </div>
                </section>`;
}

function createDialog(dialogOptions) {
    var options            = dialogOptions.options;
    var $this              = dialogOptions.$this;
    var gridID             = dialogOptions.gridID;
    var gValueField        = dialogOptions.gValueField;
    var gTextField         = dialogOptions.gTextField;
    //var valueField         = dialogOptions.valueField;
    //var textField          = dialogOptions.textField;
    var singleSelect       = dialogOptions.singleSelect;
    var valueFieldSelector = dialogOptions.valueFieldSelector;
    var textFieldSelector  = dialogOptions.textFieldSelector;
    var sift               = dialogOptions.sift;
    var gridAction         = dialogOptions.gridAction;
    var onDialogShow           = dialogOptions.onDialogShow;

    var settings = {
        title: '',
        width: 700,
        backdrop: false,
        autoOpen: true,
        buttons: [
            {
                text: '选择',
                'class': 'btn-success',
                click: function () {
                    var $gird = $('#' + gridID);
                    var rows = $gird.datagrid('getSelections');
                    var valueArr = $this.data('valueArr');
                    var textArr = $this.data('textArr');
                    if (singleSelect) {
                        valueArr[0] = rows[0][gValueField];
                        textArr[0] = rows[0][gTextField];
                    } else {
                        for (var i = 0; i < rows.length; i++) {
                            if (valueArr.indexOf(rows[i][gValueField]) == -1) {
                                valueArr.push(rows[i][gValueField]);
                            }
                            if (textArr.indexOf(rows[i][gTextField]) == -1) {
                                textArr.push(rows[i][gTextField]);
                            }
                        }
                    }
                    textFieldSelector.val(textArr.join(',')).trigger('blur');
                    valueFieldSelector.val(valueArr.join(',')).trigger('change');
                    $gird.datagrid('unselectAll');
                    $this.data('valueArr', []);
                    $this.data('textArr', []);
                    $(this).bsDialog('close');
                }
            },
            {
                text: '关闭',
                'class': 'btn-default',
                click: function () {
                    var $gird = $('#' + gridID);
                    $gird.datagrid('unselectAll');
                    $this.data('valueArr', []);
                    $this.data('textArr', []);
                    $(this).bsDialog('close');
                }
            },
            {
                text: '取消选择',
                'class': 'btn-success',
                click: function () {
                    var $gird = $('#' + gridID);
                    var rows = $gird.datagrid('getSelections');
                    $this.data('valueArr', []);
                    $this.data('textArr', []);
                    var valueArr = $this.data('valueArr');
                    var textArr = $this.data('textArr');
                    textFieldSelector.val(textArr.join(',')).trigger('blur');
                    valueFieldSelector.val(valueArr.join(',')).trigger('change');
                    $gird.datagrid('unselectAll');
                    $(this).bsDialog('close');
                }
            },
        ],
        onClose: function () {
            $('#' + gridID).parents('.dialog').remove();
        }
    };

    $.extend(settings, options);

    var $dialog = $('<div>');
    $('body').append($dialog);
    $dialog.html(sift+`<div style="height: 400px;width: 100%;"><div id="${gridID}"></div></div>`);

    uiTool.createDialog($dialog, settings);
    $('.j-dialog-sift-search', $dialog).off('click').on('click',function() {
        $('#'+gridID).datagrid('load', gridAction + "?" + $('.j-dialog-sift-form', $dialog).serialize());
    });
    onDialogShow && onDialogShow($dialog);
}

function createGrid(gridOptions) {
    var options    = gridOptions.options;
    var $this      = gridOptions.$this;
    var gridID     = gridOptions.gridID;
    var gValueField= gridOptions.gValueField;
    var gTextField = gridOptions.gTextField;
    //var valueField = gridOptions.valueField;
    //var textField  = gridOptions.textField;

    var $grid      = $('#' + gridID);

    var settings = {
        rownumbers: false,
        checkOnSelect: true,
        selectOnCheck: true,
        pageSize: 10,
        onLoadSuccess: function () {
            var rows = $(this).datagrid('getRows');
            var valueArr = $this.data('valueArr');
            var textArr = $this.data('textArr');
            for (var i = 0; i < rows.length; i++) {
                if (valueArr.indexOf(rows[i][gValueField]) > -1) {
                    $(this).datagrid('selectRow', i);
                }
            }
        },
        onClickRow: function (index, row) {
            var valueArr = $this.data('valueArr');
            var textArr = $this.data('textArr');
            valueArr.remove(row[gValueField]);
            textArr.remove(row[gTextField]);
            $this.data('valueArr', valueArr);
            $this.data('textArr', textArr);
        },
        onBeforeLoad: function () {
            var rows = $(this).datagrid('getSelections');
            var valueArr = $this.data('valueArr');
            var textArr = $this.data('textArr');

            for (var i = 0; i < rows.length; i++) {
                if (valueArr.indexOf(rows[i][gValueField]) == -1) {
                    valueArr.push(rows[i][gValueField]);
                }
                if (textArr.indexOf(rows[i][gTextField]) == -1) {
                    textArr.push(rows[i][gTextField]);
                }
            }

            $this.data('valueArr', valueArr);
            $this.data('textArr', textArr);
        }
    };

    $.extend(settings, options);

    uiTool.createDatagrid($grid, settings);
}

function createGridDialog(options) {
    var pageId       = options.pageId;
    var $this        = options.$this;
    var singleSelect = options.singleSelect;
    var gridAction   = options.gridAction;
    var gValueField  = options.gValueField || options.valueField;
    var gTextField   = options.gTextField || options.textField;
    var valueField   = options.valueField;
    var textField    = options.textField;
    var title        = options.title;
    var columns      = options.columns;
    var sift         = options.sift || '';
    var onDialogShow     = 'function' == typeof options.onDialogShow? options.onDialogShow : false;

    var valueFieldSelector = $this.siblings("input[name='"+valueField+"']");
    var textFieldSelector  = $this.siblings("input[name='"+textField+"']");
    var valueArr           = getArr(valueFieldSelector.val());
    var textArr            = getArr(textFieldSelector.val());

    var gridID   = pageId + '-dialog-menuModel-grid';
    var isSingle = singleSelect || false;

    $this.data('valueArr', valueArr);
    $this.data('textArr', textArr);

    var gridOptions = {
        options: {
            singleSelect: isSingle,
            url: gridAction,
            columns: columns
        },
        gValueField: gValueField,
        gTextField: gTextField,
        //valueField: valueField,
        //textField: textField,
        $this: $this,
        gridID: gridID
    };
    var dialogOptions = {
        options: {
            title: title
        },
        //valueField: valueField,
        gValueField: gValueField,
        gTextField: gTextField,
        //textField: textField,
        singleSelect: isSingle,
        valueFieldSelector: valueFieldSelector,
        textFieldSelector: textFieldSelector,
        $this: $this,
        gridID: gridID,
        gridAction: gridAction,
        sift: sift,
        onDialogShow: onDialogShow
    };
    createDialog(dialogOptions);
    createGrid(gridOptions);
}

var gridDialog = function() {};

gridDialog.prototype.initGridDialog = function (mainId) {
    var that = this;
    $('.j-gridDialog', $('#' + mainId)).on('click', function () {
        var $this = $(this);
        var singleSelect = true;
        $this.data('single').toString() == 'false' && (singleSelect = false);
        !$this.children('.btn').hasClass('disabled') && that.openGridDialog($this.data('dialog-model'), mainId, $(this), singleSelect);
    });
};

gridDialog.prototype.setGridDialogSingleSelect = function (mainId, modelName, flag) {
    var that = this;
    $('.j-' + modelName, $('#' + mainId)).off('click').on('click', function () {
        that.openGridDialog(modelName, mainId, $(this), flag);
    });
};

gridDialog.prototype.openGridDialog = function (fnName, pageId, $this, singleSelect) {
    dialog[fnName](pageId, $this, singleSelect);
};

export default gridDialog;