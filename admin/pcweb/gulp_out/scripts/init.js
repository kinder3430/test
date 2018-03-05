(function($) {

    $('body').on('click', '.j-imgDetail', function() {
        !!$(this).attr('src') && window.open($(this)[0].src);
    }).on('click', '.j-date-icon', function() {
        $(this).siblings('.j-date').focus();
    });

    var info = $.cookie('info');
    if (typeof info != 'undefined') {

        var l = JSON.parse("[" + Base64.decode(info) + "]");
        $.extend(GV, l[0]);

        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            //var reg = /oper_user=false/;
          var parameter = 'sessionid=' + GV.sessionId
                + '&oper_user_id=' + GV.userId
                + '&req_from=mj-backend';

            //parameter += reg.test(options.data)? '' : '&oper_user_id=' + GV.userId;
            options.data =  !!options.data? options.data + '&' + parameter : parameter;

            options.complete = function(res) {
                try {
                    var r = JSON.parse(res.responseText);
                    if (r.ret == 40401) {
                        $.layer.message('提示：', '登录过期', 'danger');
                        setTimeout(function() {
                            window.location.href = "login.html";
                        }, 4000);
                    } else if (r.ret == 40400) {
                        $.layer.message('提示：', r.info, 'danger');
                    }
                } catch (e) {}
            }
        });

    } else {
        window.location.href = "login.html"
    }

})(window.jQuery);