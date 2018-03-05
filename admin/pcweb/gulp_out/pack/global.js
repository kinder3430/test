function vmRun(domId,fn) {
    var vm = $('#' + domId).data('vm');
    vm[fn].apply(vm, [].slice.call(arguments, 2));
}

function resizeDialog($dialog) {
    var top = Math.round(($dialog.height() - $dialog.find('.modal-content').height()) / 2);
    top = top > 0 ? top : 0;
    $dialog.find('.modal-content').css("margin-top", top);
}