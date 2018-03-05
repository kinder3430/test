var uploadTool = function() {};

uploadTool.prototype.init = function(mainId) {
    var that = this;
    that.$main = $('#'+mainId);
    // file类型的input
    var $input = $('input[type="file"]', that.$main);
    var $close = $('.fileApi-close');
    var $txtIpt = $('.fileApi-valIpt');

    // 上传设置
    var uploadOpts = {
        url: GV.redir +  'admin/add_banner',  // 上传链接
        data: {}  // 上传参数
    };

    // 选择文件时触发
    var _onSelectFile = function (evt) {
        // 所选的文件
        var file = FileAPI.getFiles(evt)[0];

        if( file ){
            // 构建预览图像
            _createPreview($(this), file);

            // 上传图片
            _uploadFile($(this), file);
        }
    };

    // 创建一个预览图像
    var _createPreview = function ($this/**jquery object*/, file/**File*/) {

        FileAPI.readAsDataURL(file, function (evt/**Object*/) {
            if( evt.type == 'load' ){
                $this.parents('.fileApi-one-img').find('.fileApi-preview').children('img').attr('src', evt.result).show();
            } else if( evt.type =='progress' ){
//					var pr = evt.loaded/evt.total * 100;
            } else {
                // Error
            }
        });
    };

    // 上传函数
    var _uploadFile = function ($this/**jquery object*/, file/**File*/) {
        var $box = $this.parents('.fileApi-one-img');
        var $progress = $box.find('.fileApi-progress');
        var $btn = $box.find('.fileApi-btn');
        var $close = $box.find('.fileApi-close');
        var $txtIpt = $box.find('.fileApi-valIpt');

        // 上传配置
        var opts = FileAPI.extend(uploadOpts, {
            files: {},

            // 上传开始事件
            upload: function () {
                $progress.show();
                $btn.hide();
                $box[0].className = 'fileApi-one-img';
            },
            // 上传进度条
            progress: function (evt) {
                $progress.find('.fileApi-bar').css('width', evt.loaded/evt.total*100+'%');//进度条动画
            },
            // 上传结束事件
            complete: function (err, xhr) {
                $progress.hide();
                $close.show();
                if (err) {
                    $box.addClass('error');
                } else {
                    var result = JSON.parse(xhr.responseText);
                    if (result.status == '1') {
                        $box.addClass('success');
                        $txtIpt.val(result.resultMap.message).trigger('change');
                    } else {
                        $box.addClass('error');
                    }
                }
            }
        });

        // 添加文件
        opts.files[opts.name] = file;
        // 上传
        FileAPI.upload(opts);
        console.log(opts);
    };

    // 选择文件时触发
    $input.on('change',_onSelectFile);
    $('.fileApi-btn').on('mouseover',function() {
        $(this).css('opacity',1).addClass('a-fadein');
    }).on('mouseout',function() {
        $(this).css('opacity',0).removeClass('a-fadein');
    });

    $close.on('click',function(){
        $(this).hide()
            .siblings('.fileApi-btn').show()
            .siblings('.fileApi-preview').children('img').attr('src','').hide()
            .parents('.fileApi-one-img')[0].className = 'fileApi-one-img';
        $(this).siblings('.fileApi-valIpt').val('')

    });

    $txtIpt.on('change', function() {
        var $this = $(this);
        var val = $this.val();

        var $img = $this.siblings('.fileApi-preview').children('img').attr('src', val);

        if (!val) {
            $img.hide();
            $this.siblings('.fileApi-btn').show()
                .siblings('.fileApi-close').hide();
        } else {
            $img.show();
            $this.siblings('.fileApi-btn').hide()
                .siblings('.fileApi-close').show();
        }

    });
};

uploadTool.prototype.reset = function() {
    this.$main.find('.fileApi-one-img').each(function(index, item) {
        item.className = 'fileApi-one-img';
    })
};

module.exports = new uploadTool;