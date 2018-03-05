var Method = {
    edit: ([mainId, index, txt = '编辑']) =>
        `<a class="btn btn-info btn-xs" onclick="vmRun('${mainId}','showForm','Edit',${index})">${txt}</a> `,

    look: ([mainId, index, txt = '查看']) =>
        `<a class="btn btn-warning btn-xs" onclick="vmRun('${mainId}','showForm','Look',${index})">${txt}</a> `,

    delete: ([mainId, index]) =>
        `<a class="btn btn-danger btn-xs" onclick="vmRun('${mainId}','deleteItem',${index})">删除</a> `,

    date: ([data]) => !!data ?
        moment(data, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD') : '',

    dateTime: ([data]) => !!data ?
        moment(data, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD<br/>HH:mm:ss') : '',

    image: ([data]) => !!data ?
        `<p style="line-height: 120px;"><img src="${data}" class="j-imgDetail" style="max-width: 120px;max-height: 120px;" /></p>` :
        '<p style="text-align: center;">无图片</p>',

    status: ([data]) => ({
        '0': '<span class="badge badge-important">禁用</span>',
        '1': '<span class="badge badge-success">启用</span>'
    }[data] || '--'),

    substring: ([data, num = 20]) =>
        'string' == typeof data ? data.length > num? data.substring(0, num) + '......' : data : '',

    noReturn: () => '<span style="color: red;">未返回字段</span>',

    /*---------------------------残忍的分割线---------------------------*/

    link: ([link]) => `<a href="${link}" target="_blank">${link}</a>`,










    proUpOrDown: ([data]) => ({
        '0': '<span class="badge">未审核</span>',
        '1': '<span class="badge badge-success">已上架</span>',
        '2': '<span class="badge badge-important">已下架</span>'
    }[data] || data),

    copyCode: ([data]) => ({
        'register': '注册协议',
        'aboutus': '关于我们',
        'vipdetails': 'vip描述'
    }[data] || '--'),

    isVip: ([data]) => ({
        '0': '<span class="badge badge-important">否</span>',
        '1': '<span class="badge badge-success">是</span>'
    }[data] || '--'),

    appointmentStatus: ([data]) => ({
        '0': '<span class="badge badge-important">待接单</span>',
        '1': '<span class="badge badge-warning">已接单</span>',
        '2': '<span class="badge badge-success">已收货(未评价)</span>',
        '3': '<span class="badge badge-success">已收货(已评价)</span>',
        '4': '<span class="badge">已取消</span>'
    }[data] || ''),

    applyVipHandleStatus: ([data]) => ({
        '0': '<span class="badge badge-important">未处理</span>',
        '1': '<span class="badge badge-success">已处理</span>'
    }[data] || ''),

    platform: ([data]) => ({
        '1': '支付宝',
        '0': '微信',
        '2': '银行卡'
    }[data] || ''),

    handleFlag: ([data]) => ({
        '1': '<span class="badge badge-success">已处理</span>',
        '0': '<span class="badge badge-important">未处理</span>'
    }[data] || ''),

    systemType: ([data]) => ({
        '1': 'android',
        '2': 'ios'
    }[data] || ''),

    appType: ([data]) => ({
        '1': '平板端',
        '2': '上门端'
    }[data] || ''),

    logType: ([data]) => ({
        '5': '登录',
        '6': '退出'
    }[data] || ''),

    opinionStatus: ([data]) => ({
        '0': '<span class="badge badge-important">未处理</span>',
        '1': '<span class="badge badge-success">已处理</span>'
    }[data] || ''),

    isZuke: ([data]) => ({
        '0': '<span class="badge badge-important">否</span>',
        '1': '<span class="badge badge-success">是</span>'
    }[data] || '--'),
};

module.exports = (method, ...args) => Method[method](args);