import util from '../../customize/util';

var $validator = $('#changePwdForm').validate();

$('#adminName').html((GV.userNick || GV.username) + '&nbsp;' + GV.roleName);

$('#changePwdDialog').bsDialog({
    title: "修改密码",
    backdrop: "static",
    bodyMaxHeight: '550px',
    autoOpen: false,
    buttons: [
        {
            text: '保存',
            'class': "btn-success",
            click: function () {
                $('#changePwdForm').bsForm('submit', {
                    url: util.getInterface('admin/update_admin_password'),
                    onSubmit: function (param) {
                        $validator.form();
                        if (!$validator.valid()) {
                            return false;
                        }
                        param.old_login_pwd = md5(param.old_login_pwd);
                        param.new_login_pwd = md5(param.new_login_pwd);
                        return param;
                    },
                    success: function (result) {
                        if (result.ret == 1) {
                            $.layer.message('提示：','修改成功！', 'success');
                            setTimeout(function(){logout();},1000)
                        } else {
                            $.layer.message('提示：',result.desc, 'danger');
                        }
                    },
                    error: function (err) {
                        $.layer.message('提示：','服务器错误！', 'danger');
                    }
                });
            }
        },
        {
            text: "关闭",
            'class': "btn-default",
            click: function () {
                $(this).bsDialog("close");
            }
        }
    ]
});

$('#changePwd').on('click',function() {
    var $dialog = $('#changePwdDialog');
    var $form = $('#changePwdForm');
    $form.bsForm('clear');
    $validator.resetForm();
    $dialog.bsDialog('open');
    $('#userId').val(GV.userId);
});

$('#logout').on('click',function() {
    logout();
});

function logout() {
    $.ajax({
        type: "post",
        url: util.getInterface('admin/logout'),
        dataType: 'json',
        data: {user_id:GV.userId},
        success: function (result) {
            if (result.ret == 1) {
                $.removeCookie('amjInfos', {path: '/'});
                window.location.href = "login.html"
            } else {
                $.layer.message('提示：',result.desc, 'danger');
            }
        },
        error: function (err) {
            console.log(err);
            $.layer.message('提示：','服务器错误！', 'danger');
        }
    });
}