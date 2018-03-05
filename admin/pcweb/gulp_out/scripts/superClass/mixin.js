define(['exports', '../customize/util', '../customize/ui.tool', '../customize/formatter'], function (exports, _util, _ui, _formatter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _util2 = _interopRequireDefault(_util);

    var _ui2 = _interopRequireDefault(_ui);

    var _formatter2 = _interopRequireDefault(_formatter);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var dialog = {
        menuModel: function menuModel(pageId, $this, singleSelect) {

            var sift = '<div class="row">\n                <div class="col-md-6">\n                    <div class="input-group input-group-sm">\n                        <span class="input-group-addon no-bg">\u540D\u79F0\uFF1A</span>\n                        <input type="text" class="form-control" placeholder="" name="title"/>\n                    </div>\n                </div>\n            </div>';

            var options = {
                gridAction: _util2.default.getInterface('admin/get_top_menus'),
                gValueField: 'id',
                gTextField: 'title',
                valueField: 'pid',
                textField: 'ptitle',
                title: '选择菜单模块',
                columns: [[{
                    field: 'title',
                    title: '名称',
                    width: 20,
                    align: 'center'
                }]],
                sift: getSift(sift),
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect
            };
            createGridDialog(options);
        },
        roleModel: function roleModel(pageId, $this, singleSelect) {
            var options = {
                gridAction: _util2.default.getInterface('admin/get_roles.mjback'),
                valueField: 'role_id',
                textField: 'role_name',
                title: '选择角色',
                columns: [[{
                    field: 'role_name',
                    title: '名称',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'role_desc',
                    title: '描述',
                    width: 20,
                    align: 'center'
                }]],
                sift: '',
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect
            };
            createGridDialog(options);
        },
        wasteCateModel: function wasteCateModel(pageId, $this, singleSelect) {
            var options = {
                gridAction: _util2.default.getInterface('category_getListGarbageByweb.mjback'),
                valueField: 'cate_id',
                textField: 'cate_name',
                title: '选择废品类型',
                columns: [[{
                    field: 'cate_name',
                    title: '名称',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'color',
                    title: '色值',
                    width: 20,
                    align: 'center',
                    formatter: function formatter(value, row, index) {
                        return '<p style="margin: 0;background: ' + row.color + '">' + row.color + '</p>';
                    }
                }]],
                sift: '',
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect
            };
            createGridDialog(options);
        },
        productCateModel: function productCateModel(pageId, $this, singleSelect) {
            var options = {
                gridAction: _util2.default.getInterface('category_getListProductByweb.mjback'),
                valueField: 'cate_id',
                textField: 'cate_name',
                title: '选择商品类型',
                columns: [[{
                    field: 'cate_name',
                    title: '类别',
                    width: 20,
                    align: 'center'
                }]],
                sift: '',
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect
            };
            createGridDialog(options);
        },
        couponModel: function couponModel(pageId, $this, singleSelect) {
            var options = {
                gridAction: _util2.default.getInterface('coupon_getListByAdmin.mjback'),
                valueField: 'coupon_id',
                textField: 'coupon_title',
                title: '选择优惠券',
                columns: [[{
                    field: 'coupon_title',
                    title: '优惠券名',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'coupon_price',
                    title: '优惠金额',
                    width: 20,
                    align: 'center'
                }]],
                sift: '',
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect
            };
            createGridDialog(options);
        },
        xiaoQuModel: function xiaoQuModel(pageId, $this, singleSelect) {

            var sift = '<div class="row">\n                <div class="col-md-8">\n                    <div class="input-group input-group-sm" data-toggle="distpicker">\n                        <span class="input-group-addon no-bg">\u7701\u5E02\u533A/\u53BF\uFF1A</span>\n                        <div class="row">\n                            <div class="col-md-4">\n                                <select class="form-control" title="" name="province"></select>\n                            </div>\n                            <div class="col-md-4">\n                                <select class="form-control" title="" name="city"></select>\n                            </div>\n                            <div class="col-md-4">\n                                <select class="form-control" title="" name="district"></select>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="col-md-4">\n                    <div class="input-group input-group-sm">\n                        <span class="input-group-addon no-bg">\u5C0F\u533A\uFF1A</span>\n                        <input type="text" class="form-control" placeholder="" name="address_xiaoqu"/>\n                    </div>\n                </div>\n            </div>';

            var options = {
                gridAction: _util2.default.getInterface('addressXiaoQu_getListByweb.mjback'),
                valueField: 'address_xiaoqu_id',
                textField: 'address_xiaoqu',
                title: '选择小区',
                columns: [[{
                    field: 'address_xiaoqu',
                    title: '小区名',
                    width: 20,
                    align: 'center'
                }, {
                    field: '地址',
                    title: '地址',
                    width: 20,
                    align: 'center',
                    formatter: function formatter(value, row, index) {
                        return row.province + ' ' + row.city + ' ' + row.district;
                    }
                }]],
                sift: getSift(sift),
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect,
                onDialogShow: function onDialogShow(_$dialog) {
                    $('[data-toggle="distpicker"]', _$dialog).distpicker({
                        autoSelect: false
                    });
                }
            };
            createGridDialog(options);
        },
        shopModel: function shopModel(pageId, $this, singleSelect) {

            var sift = '<div class="row">\n                <div class="col-md-8">\n                    <div class="input-group input-group-sm" data-toggle="distpicker">\n                        <span class="input-group-addon no-bg">\u7701\u5E02\u533A/\u53BF\uFF1A</span>\n                        <div class="row">\n                            <div class="col-md-4">\n                                <select class="form-control" title="" name="province"></select>\n                            </div>\n                            <div class="col-md-4">\n                                <select class="form-control" title="" name="city"></select>\n                            </div>\n                            <div class="col-md-4">\n                                <select class="form-control" title="" name="district"></select>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="col-md-4">\n                    <div class="input-group input-group-sm">\n                        <span class="input-group-addon no-bg">\u5546\u57CE\uFF1A</span>\n                        <input type="text" class="form-control" placeholder="" name="shop_name"/>\n                    </div>\n                </div>\n            </div>';

            var options = {
                gridAction: _util2.default.getInterface('shop_getList.mjback'),
                valueField: 'shop_id',
                textField: 'shop_name',
                title: '选择商城',
                columns: [[{
                    field: 'shop_name',
                    title: '商城名',
                    width: 20,
                    align: 'center'
                }, {
                    field: '地址',
                    title: '地址',
                    width: 20,
                    align: 'center',
                    formatter: function formatter(value, row, index) {
                        return row.province + ' ' + row.city + ' ' + row.district + ' ' + row.address_xiaoqu;
                    }
                }]],
                sift: getSift(sift),
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect,
                onDialogShow: function onDialogShow(_$dialog) {
                    $('[data-toggle="distpicker"]', _$dialog).distpicker({
                        autoSelect: false
                    });
                }
            };
            createGridDialog(options);
        },
        newsCatModel: function newsCatModel(pageId, $this, singleSelect) {
            var options = {
                gridAction: _util2.default.getInterface('newsCategory_getList.mjback'),
                valueField: 'category_id',
                textField: 'category_name',
                title: '选择文章分类',
                columns: [[{
                    title: '分类名',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'description',
                    title: '描述',
                    width: 20,
                    align: 'center'
                }]],
                sift: '',
                pageId: pageId,
                $this: $this,
                singleSelect: singleSelect
            };
            createGridDialog(options);
        }
    };

    var getArr = function getArr(str) {
        return str != "" ? str.split(',') : [];
    };

    function getSift(str) {
        return '<section class="bs-panel dialogSift">\n                    <div class="bs-panel-body">\n                        <form class="j-dialog-sift-form">\n                            <div class="form-group-sm">\n                                ' + str + '\n                            </div>\n                        </form>\n                    </div>\n                    <div class="bs-panel-footer">\n                        <a class="btn btn-info btn-xs j-dialog-sift-search">\u67E5\u8BE2</a>\n                    </div>\n                </section>';
    }

    function createDialog(dialogOptions) {
        var options = dialogOptions.options;
        var $this = dialogOptions.$this;
        var gridID = dialogOptions.gridID;
        var gValueField = dialogOptions.gValueField;
        var gTextField = dialogOptions.gTextField;
        //var valueField         = dialogOptions.valueField;
        //var textField          = dialogOptions.textField;
        var singleSelect = dialogOptions.singleSelect;
        var valueFieldSelector = dialogOptions.valueFieldSelector;
        var textFieldSelector = dialogOptions.textFieldSelector;
        var sift = dialogOptions.sift;
        var gridAction = dialogOptions.gridAction;
        var onDialogShow = dialogOptions.onDialogShow;

        var settings = {
            title: '',
            width: 700,
            backdrop: false,
            autoOpen: true,
            buttons: [{
                text: '选择',
                'class': 'btn-success',
                click: function click() {
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
            }, {
                text: '关闭',
                'class': 'btn-default',
                click: function click() {
                    var $gird = $('#' + gridID);
                    $gird.datagrid('unselectAll');
                    $this.data('valueArr', []);
                    $this.data('textArr', []);
                    $(this).bsDialog('close');
                }
            }, {
                text: '取消选择',
                'class': 'btn-success',
                click: function click() {
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
            }],
            onClose: function onClose() {
                $('#' + gridID).parents('.dialog').remove();
            }
        };

        $.extend(settings, options);

        var $dialog = $('<div>');
        $('body').append($dialog);
        $dialog.html(sift + ('<div style="height: 400px;width: 100%;"><div id="' + gridID + '"></div></div>'));

        _ui2.default.createDialog($dialog, settings);
        $('.j-dialog-sift-search', $dialog).off('click').on('click', function () {
            $('#' + gridID).datagrid('load', gridAction + "?" + $('.j-dialog-sift-form', $dialog).serialize());
        });
        onDialogShow && onDialogShow($dialog);
    }

    function createGrid(gridOptions) {
        var options = gridOptions.options;
        var $this = gridOptions.$this;
        var gridID = gridOptions.gridID;
        var gValueField = gridOptions.gValueField;
        var gTextField = gridOptions.gTextField;
        //var valueField = gridOptions.valueField;
        //var textField  = gridOptions.textField;

        var $grid = $('#' + gridID);

        var settings = {
            rownumbers: false,
            checkOnSelect: true,
            selectOnCheck: true,
            pageSize: 10,
            onLoadSuccess: function onLoadSuccess() {
                var rows = $(this).datagrid('getRows');
                var valueArr = $this.data('valueArr');
                var textArr = $this.data('textArr');
                for (var i = 0; i < rows.length; i++) {
                    if (valueArr.indexOf(rows[i][gValueField]) > -1) {
                        $(this).datagrid('selectRow', i);
                    }
                }
            },
            onClickRow: function onClickRow(index, row) {
                var valueArr = $this.data('valueArr');
                var textArr = $this.data('textArr');
                valueArr.remove(row[gValueField]);
                textArr.remove(row[gTextField]);
                $this.data('valueArr', valueArr);
                $this.data('textArr', textArr);
            },
            onBeforeLoad: function onBeforeLoad() {
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

        _ui2.default.createDatagrid($grid, settings);
    }

    function createGridDialog(options) {
        var pageId = options.pageId;
        var $this = options.$this;
        var singleSelect = options.singleSelect;
        var gridAction = options.gridAction;
        var gValueField = options.gValueField || options.valueField;
        var gTextField = options.gTextField || options.textField;
        var valueField = options.valueField;
        var textField = options.textField;
        var title = options.title;
        var columns = options.columns;
        var sift = options.sift || '';
        var onDialogShow = 'function' == typeof options.onDialogShow ? options.onDialogShow : false;

        var valueFieldSelector = $this.siblings("input[name='" + valueField + "']");
        var textFieldSelector = $this.siblings("input[name='" + textField + "']");
        var valueArr = getArr(valueFieldSelector.val());
        var textArr = getArr(textFieldSelector.val());

        var gridID = pageId + '-dialog-menuModel-grid';
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

    var gridDialog = function gridDialog() {};

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

    exports.default = gridDialog;
});