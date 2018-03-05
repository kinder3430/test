(function ($) {

    'use strict';

    var Dialog = function (element, options) {
        this.options = $.extend({}, Dialog.DEFAULTS, options);
        this.$element = $(element);
        this.$msgbox = this.$element.closest('.dialog');
        this.parentDataName = 'dialog-parent';
        init(this);
    };

    Dialog.DEFAULTS = {
        title: '',
        dialogClass: '',
        'class': '',
        autoOpen: true,
        width: null,
        bodyMaxHeight: null,
        bodyHeight: null,
        buttons: {},
        onClose: function() {}
    };

    var init = function(object) {
        var options = object.options;
        var $element = object.$element;
        var $msgbox = object.$msgbox;
        var parentDataName = object.parentDataName;

        !$element.data(parentDataName) && $element.data(parentDataName, $element.parent());

        if ($msgbox.size() < 1) {
            $msgbox = object.$msgbox = create($element,$msgbox);
        }

        createButton(object);
        Dialog.prototype.setTitle.call(object,options.title);
        var $modalDialog = $(".modal-dialog", $msgbox).addClass(options.dialogClass);

        $(".modal-header .close", $msgbox).click(function () {
            Dialog.prototype.close.call(object);
        });
        options['class'] && $msgbox.addClass(options['class']);
        /*
         Passing the options, etc: backdrop, keyboard
         */
        options.autoOpen === false && (options.show = false);
        options.width && $modalDialog.width(options.width);
        options.bodyMaxHeight && $('.modal-body',$modalDialog).css({'max-height':options.bodyMaxHeight,'overflow-y':'auto'});
        options.bodyHeight && $('.modal-body', $modalDialog).height(options.bodyHeight);
        $msgbox.modal(options);
    };

    var create = function ($element,$msgbox) {
        var msghtml
                = ''
                + '<div class="dialog modal">'//fade
                + '<div class="modal-dialog">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<button type="button" class="close">&times;</button>'
                + '<h4 class="modal-title"></h4>'
                + '</div>'
                + '<div class="modal-body"></div>'
                + '<div class="modal-footer"></div>'
                + '</div>'
                + '</div>'
                + '</div>'
            ;


        $msgbox = $(msghtml);
        //$(document.body).append($msgbox);
        $element.parent().removeClass('sr-only').append($msgbox);
        $msgbox.find(".modal-body").append($element);

        return $msgbox;
    };

    var createButton = function (object,_options) {
        //var that = this;
        var buttons = (_options || object.options || {}).buttons || {}
            , $btnrow = object.$msgbox.find(".modal-footer");

        //clear old buttons
        $btnrow.empty();

        var isButtonArr = buttons.constructor == Array;

        for (var button in buttons) {
            var btnObj = buttons[button]
                , id = ""
                , text = ""
                , classed = "btn-default"
                , click = "";

            if (btnObj.constructor == Object) {
                id = btnObj.id;
                text = btnObj.text;
                classed = btnObj['class'] || classed;
                click = btnObj.click;
            }

            //Buttons should be an object, etc: { 'close': function { } }
            else if (!isButtonArr && btnObj.constructor == Function) {
                text = button;
                click = btnObj;
            }

            else {
                continue;
            }

            //<button data-bb-handler="danger" type="button" class="btn btn-danger">Danger!</button>
            var $button = $('<button type="button" class="btn">').addClass(classed).html(text);

            id && $button.attr("id", id);
            if (click) {
                (function (click) {
                    $button.click(function () {
                        click.call(object.$element[0]);
                    });
                })(click);
            }

            $btnrow.append($button);
        }

        $btnrow.data('buttons', buttons);
    };

    Dialog.prototype.open = function () {
        this.$element.closest('.dialog').modal('show');
    };

    Dialog.prototype.close = function (destroy, callback) {
        var that = this;
        // call the bootstrap modal to handle the hide events and remove msgbox after the modal is hidden
        that.$msgbox.one('hidden.bs.modal', function () {
            if (destroy) {
                that.$element.data(that.parentDataName).append(that.$element);
                that.$msgbox.remove();
                callback();
            }
            else {
                that.options.onClose.call(that.$msgbox);
            }
        }).modal('hide');
    };

    Dialog.prototype.destroy = function(callback) {
        callback = callback || function() {};
        this.close(true,callback);
    };

    Dialog.prototype.setTitle = function(title) {
        $(".modal-title", this.$msgbox).html(title);
    };

// Dialog PLUGIN DEFINITION
// =======================

    function Plugin(option) {
        var parameter = [].slice.call(arguments, 1);
        var reValue;
        var $this = $(this);

        var data = $this.data('Yu.Dialog');
        var options = typeof option == 'object' && option;

        if (!data) $this.data('Yu.Dialog', (data = new Dialog(this, options)));
        if (typeof option == 'string') reValue = data[option].apply(data, parameter);

        typeof reValue === 'undefined' && (reValue = $this);

        return reValue;
    }

    $.fn.bsDialog = Plugin;
    $.fn.bsDialog.Constructor = Dialog;

})(window.jQuery);
