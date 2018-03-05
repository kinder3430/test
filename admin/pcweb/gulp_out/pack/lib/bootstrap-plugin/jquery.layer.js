(function ($) {

    $.layer = (function () {

        var alert = function (title, message) {
            var model = $.layer.model;

            if (arguments.length < 2) {
                message = title || "";
                title = "&nbsp;"
            }

            var $div = $("<div>");
            $div.html(message);
            $('body').append($div);

            $div.bsDialog({
                title: title,
                backdrop: "static",
                onClose: function(){
                    this.remove();
                },
                buttons: [{
                    text: model.ok.text,
                    'class': model.ok.classed,
                    click: function () {
                        $(this).bsDialog("close");
                    }
                }]
            });
        };

        var confirm = function (title, message, callback) {
            var model = $.layer.model;
            var $div = $("<div>");
            $div.html(message);
            $('body').append($div);

            $div.bsDialog({
                title: title,
                backdrop: "static",
                onClose: function(){
                    this.remove();
                },
                buttons: [
                    {
                        text: model.ok.text,
                        'class': model.ok.classed,
                        click: function () {
                            var flag = true;
                            callback && (flag = callback());
                            flag = typeof flag == 'undefined'? true : flag;
                            flag && $(this).bsDialog("close");
                        }
                    },
                    {
                        text: model.cancel.text,
                        'class': model.cancel.classed,
                        click: function () {
                            $(this).bsDialog("close");
                        }
                    }
                ]
            });
        };

        /*
         * popup message
         */
        var msghtml
                = ''
                + '<div class="dialog modal fade msg-popup">'
                + '<div class="modal-dialog modal-sm">'
                + '<div class="modal-content">'
                + '<div class="modal-body text-center"></div>'
                + '</div>'
                + '</div>'
                + '</div>'
            ;

        var $msgbox;

        var popup = function (message) {
            if (!$msgbox) {
                $msgbox = $(msghtml);
                $('body').append($msgbox);
            }

            $msgbox.find(".modal-body").html(message);
            $msgbox.modal({show: true, backdrop: false});

            setTimeout(function () {
                $msgbox.modal('hide');
            }, 1500);
        };

        var message = function (title, content, type) {
            $('#layer-message').remove();
            var $div = $('<div>');
            $div.attr('id','layer-message').css({
                'position': 'fixed',
                'top': '0',
                'z-index': '9999',
                'width': '100%',
                'text-align': 'center',
                'display': 'none'
            });

            type = type || 'warning';

            var str = '<div class="alert alert-'+ type +'" role="alert" ' +
                'style="display: inline-block;min-width:500px;max-width:800px;">' +
                '<strong>'+title+'</strong> ' + content +
                '</div>';


            $('body').append($div.append(str));

            $div.fadeIn(200);

            setTimeout(function () {
                $div.fadeOut(1500);
                setTimeout(function(){
                    $div.remove();
                },1500)
            }, 3000);
        };

        return {
            alert: alert
            , popup: popup
            , confirm: confirm
            , message: message
        };

    })();


    $.layer.model = {
        ok: {text: "确定", classed: 'btn-success'},
        cancel: {text: "取消", classed: 'btn-default'}
    };

})(window.jQuery);
