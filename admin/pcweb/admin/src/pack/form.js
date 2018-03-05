(function ($) {

    var Form = function (element, options) {
        this.options = $.extend({}, Form.DEFAULTS, options);
        this.$element = $(element);
    };

    Form.DEFAULTS = {};

    Form.prototype.clear = function () {
        var that = this;
        var $element = that.$element;

        $element[0].reset();
        $('input,textarea,select', $element).trigger('change');
        $('span[name]', $element).text('');
        $('img[name]', $element).attr("src", '');
    };

    Form.prototype.load = function (row) {
        var that = this;
        var $element = that.$element;

        for (var name in row) {
            var val = row[name];
            $element.find('input[name="' + name + '"]').not(':checkbox').val(val).trigger('change');
            $element.find('textarea[name="' + name + '"]').val(val).trigger('change');
            $element.find('select[name="' + name + '"]').val(val).trigger('change');
            $element.find('span[name="' + name + '"]').text(val);
            $element.find('img[name="' + name + '"]').attr("src", val);
        }
    };

    Form.prototype.submit = function (options) {
        var that = this;
        var $element = that.$element;
        var param = $element.serializeObject();
        var config = {
            onSubmit: function (param) {return param;}
        };

        $.extend(config, options);
        var rParam = config.onSubmit(param);

        if ('undefined' === typeof rParam) {
            ajaxSubmit(param, config);
        } else if (false !== rParam) {
            ajaxSubmit(rParam, config);
        }
    };

    function ajaxSubmit(param,options) {
        var url = options.url || '';
        var success = options.success || function(){};
        var error = options.error || function(){};

        $.ajax({
            type: "post",
            url: url,
            dataType: 'json',
            data: param,
            success: success,
            error: error
        });

    }


// Form PLUGIN DEFINITION
// =======================

    function Plugin(option) {
        var parameter = [].slice.call(arguments, 1);
        var reValue;
        var $this = $(this);

        var data = $this.data('Yu.Form');
        var options = typeof option == 'object' && option;

        if (!data) $this.data('Yu.Form', (data = new Form(this, options)));

        if (typeof option == 'string')
            reValue = data[option].apply(data, parameter);

        typeof reValue === 'undefined' && (reValue = $this);

        return reValue;
    }

    $.fn.bsForm = Plugin;
    $.fn.bsForm.Constructor = Form;

})(window.jQuery);
