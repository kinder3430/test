define(['module'], function (module) {
    'use strict';

    var uiTool = function uiTool() {};

    uiTool.prototype = {
        createDatagrid: function createDatagrid(dom, options) {
            var settings = {
                nowrap: false,
                fitColumns: true,
                rownumbers: true,
                //singleSelect: true,
                pagination: true,
                //checkOnSelect: false,
                //selectOnCheck: false,
                pageSize: 30,
                fit: true,
                method: 'get',
                url: '',
                columns: [],
                view: $.extend({}, $.fn.datagrid.defaults.view, {
                    onAfterRender: function onAfterRender(target) {
                        $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
                        var opts = $(target).datagrid('options');
                        var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
                        vc.children('div.datagrid-empty').remove();
                        if (!$(target).datagrid('getRows').length) {
                            var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || '没有记录').appendTo(vc);
                            d.css({
                                position: 'absolute',
                                left: 0,
                                top: 50,
                                width: '100%',
                                textAlign: 'center'
                            });
                        }
                    }
                }),
                emptyMsg: '没有记录'
            };

            $.extend(settings, options);

            dom.datagrid(settings);
        },
        createDialog: function createDialog(dom, options) {
            var settings = {
                title: "新窗口",
                backdrop: false,
                bodyMaxHeight: '550px',
                autoOpen: false,
                buttons: [{
                    text: "关闭",
                    'class': "btn-default",
                    click: function click() {
                        $(this).bsDialog("close");
                    }
                }]
            };

            $.extend(settings, options);

            dom.bsDialog(settings);

            return dom;
        },
        createGridDialog: function createGridDialog(dialogOptions, datagridOptions, gridID, sift) {
            var that = this;
            var $dialog = $('<div>');
            sift = sift || '';

            $('body').append($dialog);
            $dialog.html(sift + '<div style="height: 400px;width: 100%;"><div id="' + gridID + '"></div></div>');

            that.createDialog($dialog, dialogOptions);

            $dialog.closest('.dialog').on('shown.bs.modal', function () {
                that.createDatagrid($('#' + gridID), datagridOptions);
            });

            return $dialog;
        }
    };

    module.exports = new uiTool();
});