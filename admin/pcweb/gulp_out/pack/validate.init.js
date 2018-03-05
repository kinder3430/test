(function($) {

    $.validator.setDefaults({
        ignore: ".ignore",
        onsubmit: false,//提交时验证。设置为 false 就用其他方法去验证。
        onfocusout: false,
        //     function( element ) {
        //     if ( !this.checkable( element ) ) {
        //         this.element( element );
        //     }
        // },//失去焦点时验证（不包括复选框/单选按钮）。
        onkeyup: false,//在 keyup 时验证。
//      onclick: true,//在点击复选框和单选按钮时验证。
        focusInvalid: false,//提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）会获得焦点。
        focusCleanup:true,//如果是 true 那么当未通过验证的元素获得焦点时，移除错误提示。避免和 focusInvalid 一起用。
        errorPlacement: function(error, element) {
            error.appendTo(element.parents('.validatebox'));
        }
    });

    $.validator.addMethod('isphone', function (value, element) {
        return /^0?(13|14|15|17|18)[0-9]{9}$/.test(value);
    }, '请输入正确格式的手机号');

    $.validator.addMethod('iscost', function (value, element) {
        return /^(-?)([1-9]\d*.\d{1,2}|0.\d*[1-9]\d{0,1}|[1-9]\d*)$/.test(value); ///^[1-9]\d*.\d{1,2}$|^0.\d*[1-9]\d{0,1}$|^[1-9]\d*$/
    }, '请输入最多2位小数的浮点数');
    $.validator.addMethod('ispwd', function (value, element) {
        return /^[a-zA-Z0-9]*$/.test(value);
    }, '请输入字母或数字');
    $.validator.addMethod('ispwn', function (value, element) {
        return /^[1-9]\d*$/.test(value) && value <= 100;
    }, '请输入小于或等于100的正整数');
    $.validator.addMethod('enddate', function (value, element, param) {
        return new Date(value).getTime() > new Date($(param).val()).getTime();
    }, '结束时间必须大于开始时间');

})(window.jQuery);
