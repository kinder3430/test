import util from '../../customize/util';

function sidebarInit() {
    var initTabsData = $.cookie('tabs') || '{}';

    //浏览器尺寸变换时，改变主要panel的高度
    var $tabs = $('#tabs');
    $tabs.tabs({
        fit: true,
        onClose: function(title,index) {
            var tabsData = $.cookie('tabs') || '{}',
                tabsDataObj = JSON.parse(tabsData);
            tabsDataObj.data = tabsDataObj.data || [];
            tabsDataObj.data.splice(index-1, 1);
            tabsDataObj.index = tabsDataObj.index-1;
            tabsDataObj.index < 0 && (tabsDataObj.index = 0);
            tabsData = JSON.stringify(tabsDataObj);
            var pathArr = window.location.pathname.split('/');
            pathArr.pop();
            $.cookie('tabs', tabsData, {path: pathArr.join('/')});
            try {
                GV.vm[title].destroy();
            } catch (e) {
                console.log(e);
            }
            GV.vm[title] = null;
            delete GV.vm[title];
        },
        onSelect: function(title,index) {
            var tabsData = $.cookie('tabs') || '{}',
                tabsDataObj = JSON.parse(tabsData);
            tabsDataObj.index = index || 0;
            tabsData = JSON.stringify(tabsDataObj);
            var pathArr = window.location.pathname.split('/');
            pathArr.pop();
            $.cookie('tabs', tabsData, {path: pathArr.join('/')});
        }
    }).tabs('add',{
        title: '主页',
        href: 'views/public/welcome.html'
    });

    var $win = $(window);
    $win.on('resize', function () {
        var height = document.documentElement.clientHeight - $('#header').height();
        $tabs.css('height', height);
    }).trigger('resize');

    var $sidebar = $("#m-menu");//菜单
    $('.g-side').niceScroll({
        styler: "fb",
        cursorcolor: "#428bca",
        cursorwidth: '5',
        cursorborderradius: '0px',
        background: '#424f63',
        spacebarenabled: false,
        cursorborder: '0'
    });
    var $sideScroll = $sidebar.getNiceScroll();
    //侧边栏事件
    $sidebar.on('click', '.module', function () {
        var $this = $(this);
        if (!$this.hasClass('menu-active')) {
            $this.addClass('menu-active').children('ul').slideDown();
        } else {
            $this.removeClass('menu-active').children('ul').slideUp();
        }
        $sideScroll.resize();
        return false;
    }).on('click', '.menus-item', function (e) {
        var $this = $(this);
        var tabTitle = $this.data('title');
        var tabPanelHref = $this.data('href');
        var tabPanelScript = $this.data('script');
        if(!$tabs.tabs('exists',tabTitle)) {
            $tabs.tabs('add', {
                title: tabTitle,
                closable: true,
                href: tabPanelHref,
                onLoad: function() {
                    var tabsData = $.cookie('tabs') || '{}',
                        tabsDataObj = JSON.parse(tabsData);
                    tabsDataObj.data = tabsDataObj.data || [];
                    tabsDataObj.data.push({title:tabTitle,href:tabPanelHref,script:tabPanelScript});
                    tabsData = JSON.stringify(tabsDataObj);
                    var pathArr = window.location.pathname.split('/');
                    pathArr.pop();
                    $.cookie('tabs', tabsData, {path: pathArr.join('/')});

                    vmInit(tabTitle, tabPanelScript);
                }
            });
        }
        else {
            $tabs.tabs('getTab',tabTitle);
            $tabs.tabs('select',tabTitle);
        }

        return false;
    });

    initTabs(initTabsData);
}

function initTabs(tabsData) {
    var $tabs = $('#tabs');
    var tabsDataObj = JSON.parse(tabsData),
        data = tabsDataObj.data || [],
        index = tabsDataObj.index || 0;

    $.each(data, function(i, item) {
        $tabs.tabs('add', {
            title: item.title,
            closable: true,
            href: item.href,
            onLoad: function() {
                vmInit(item.title, item.script);
            }
        });
    });

    $tabs.tabs('select', index);
}

function vmInit(title, script) {
    require([script], function (vm) {
        try {
            vm.init();
            GV.vm[title] = vm;
        } catch (e) {
            console.log(e);
        }
    });
}

//创建侧边栏 sidebar
function updateMenu(flag) {
    $.ajax({
        type: "GET",
        url: util.getInterface(GV.menuAction),
        dataType: 'json',
        success: function (data) {
            if (data.ret == 1) {
                if (flag) {
                    require(['scripts/components/top/top']);
                    loading(false);
                    $('#main-warp').show();
                    sidebarInit();
                }
                var nav = data.rows;
                var $sidebar = $("#m-menu");//菜单
                $sidebar.html('');
                console.log(JSON.stringify(data));
                for (var i = 0, navLen = nav.length; i < navLen; i++) {
                    var module = nav[i];
                    var menus = module.childs;
                    var $module = $('<li>').addClass('module');
                    $module.append('<p><span>' + module.title + '</span></p>');
                    var $menus = $('<ul>');
                    for (var j = 0, menusLen = menus.length; j < menusLen; j++) {
                        var menusItem = menus[j];
                        var tamp = menusItem.link_url;
                        var path = 'views/'+tamp+'/'+tamp+'.html';
                        var script = 'views/'+tamp+'/script.js';
                        var title = menusItem.title;
                        $menus.append('<li><p class="menus-item" ' +
                            'data-href="' + path +'" ' +
                            'data-title="'+ title +'" ' +
                            'data-script="'+ script +'" ' +
                            'title="' + title + '"><span>' + title + '</span></p></li>');
                    }
                    $module.append($menus);
                    $sidebar.append($module);
                }
            }
            else {
                window.location.href = "login.html"
            }
        }
    });
}

module.exports = updateMenu;