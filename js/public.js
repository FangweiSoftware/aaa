/**
 * Created by Fairlady on 2017/08/24.
 */

var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }),
    view: new ol.View({
        center: [0, 0],
        zoom: 2
    })
});

document.getElementById('zoom-out').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
};



$('#creatCross').on('click',function (){
    addAccordion({
        title:'新建路口',
        href:'pages/createCross/createCross.html'
    })
})

$('#editCross').on('click',function (){
    addAccordion({
        title:'路口编辑',
        href:'pages/createCross/createCross.html'
    })
})

var currentTab=0;

function addAccordion(options){
    openWestLayout()
    options=options||{};
    var panel = $('#left_windows').accordion('getPanel',options.title);
    if(!panel){
        $('#left_windows').accordion('add', {
            title: options.title||'New Title',
            // content: 'New Content',
            href:options.href||'',
            selected: true,
            closable:true,
            tools:[{
                iconCls:'icon-drag',
                // handler:function(){alert('new')}
            }]
        });
    }else{
        if(panel)panel.panel('open');
        $('#left_windows').accordion('select',options.title);
        // $('#left_windows').accordion('remvove',options.title).accordion('add', {
        //     title: options.title||'New Title',
        //     // content: 'New Content',
        //     href:options.href||'',
        //     selected: true,
        //     closable:true
        // });
    }
}

$('#left_windows').on('dragend','.icon-drag',function (e){
    // var startX = e.pageX;
    // var startY = e.pageY;
    // 这里通过title判断拖动的是哪个窗口
    var title = $(this).parent().parent().find('.panel-title').html();
    var endX = e.pageX||e.screenX;
    var endY = e.pageY||e.screenY-100;
    dragWindow(title,endX,endY);
    if($('.layout-panel-west')[0].style.display!='none')
        $('#main_layout').layout('collapse','west')

})

function dragWindow(title,x,y){
    switch(title)
    {
       case '新建路口':
            openCreateCross(x,y);
           $('#left_windows').accordion('remove',title);
           break;
        case '路口编辑':
            openEditCross(x,y);
            $('#left_windows').accordion('remove',title);
            break;
        default:
            console.log('没有找到对应的窗口');
    }
}

// 打开新建路口
// 这里是封装的标题拖动后新打开的窗口
/* 参数
 openWindow({
 el:'#edit_tc'选择器,
 title:'标题',
 href:窗口内容的html链接地址,
 ------------以下可选----------------
 x:水平位置,
 y:垂直位置,
 w:宽度,
 h:高度,
 })
 */
function openCreateCross(x,y){
    openWindow({
        el:'#create_tc',
        title:'新建路口',
        href:'/traffic3-plan/pages/createCross/createCross.html',
        x:x,
        y:y,
        w:480,
        h:545
    })
}

// 打开编辑路口
function openEditCross(x,y){
    openWindow({
        el:'#edit_tc',
        title:'路口编辑',
        href:'/traffic3-plan/pages/createCross/createCross.html',
        x:x,
        y:y,
        w:480,
        h:545
    })
}


// 这里是封装的标题拖动后新打开的窗口
/* 参数
openWindow({
    el:'#edit_tc'选择器,
    title:'标题',
    href:窗口内容的html链接地址,
    ------------以下可选----------------
    x:水平位置,
    y:垂直位置,
    w:宽度,
    h:高度,

})
*/

function openWindow(o){
    $(o.el).window({
        href:o.href,
        left:o.x-200||100,
        top:o.y||100,
        title:o.title,
        shadow:false,
        width:o.w||400,
        height:o.h||500,
        minimizable:false,
        maximizable:false,
        resizable:false,
        onMove:function (x,y){
            var west_layout = $('.layout-panel-west')[0];
            if (west_layout){
                var val = window.getComputedStyle(west_layout,null).getPropertyValue("width");
            }
            var a = parseInt(val)-x;
            if(a>=300&&($('.layout-panel-west')[0].style.display!='none')){
                $(o.el).window('close');
                addAccordion({
                    title:o.title,
                    href:o.href
                })
            }else if(x<=-100&&($('.layout-panel-west')[0].style.display=='none')){
                $(o.el).window('close');
                addAccordion({
                    title:o.title,
                    href:o.href
                })
            }
        }
    }).window('open');
}







// 打开西部的layout
function openWestLayout(){
    if($('.layout-panel-west')[0].style.display=='none')
        $('#main_layout').layout('expand','west')
};

// 关闭南部的layout
function closeSouthLayout(){
    if($('.layout-panel-south')[0].style.display!='none')
        $('#main_layout').layout('collapse','south')
}


// $.fn.openWindow=function (options){
//     if(!options) options={};
//     $(this).window({
//         width:options.width||400,
//         height:options.height||450,
//         left:options.left||10,
//         top:options.top||80,
//         modal:false,
//         shadow:false,
//         title:options.title||'窗口',
//         href:options.href,
//         minimizable:false,
//         maximizable:false,
//         onLoad:options.onload||function (){}
//     });
// }


// layout拖拽分离
function dragLayout(e){
    var y = e.pageY||e.screenY-100;
    var x = e.pageX||e.screenX;
    $('#south_layout_window').window({
        href:'/traffic3-plan/pages/pubinfo.html',
        width:1300,
        height:400,
        top:y,
        left:x-650,
        modal:false,
        shadow:false,
        minimizable:false,
    });
    $('#south_layout_window').window('open');
}


$('#south_layout').on('dragend','.btn-drag-layout',function (e){
    $('#main_layout').layout('remove','south');
    dragLayout(e);
})


$('#mini_south_layout_window').on('click',function (){
    $('#south_layout_window').window('close');
    $('#main_layout').layout('add',{
        region: 'south',
        split: true,
        collapsed:true,
        height:200,
        href:'/traffic3-plan/pages/crossManage.html',
        onLoad:function (){
            $('.btn-drag-layout').on('dragend',function (e){
                $('#main_layout').layout('remove','south');
                dragLayout(e);
            })
        }
    });

})


$('#pubinfo_manage').on('click',function (){
    currentTab=1;
   openSouthLayout()
})

$('#tc_list').on('click',function (){
    currentTab=0;
    openSouthLayout();
})


function openSouthLayout(){
    $('#list_tabs').tabs('select',currentTab)
    var south_layout = $('.layout-panel-south')[0];
    if (south_layout){
        val = window.getComputedStyle($('.layout-panel-south')[0],null).getPropertyValue("display");
    }
    $('#main_layout').layout('add',{
        region: 'south',
        split: true,
        collapsed:true,
        height:200,
        href:'/traffic3-plan/pages/pubinfo.html',
        onLoad:function (){
            $('.btn-drag-layout').on('dragend',function (e){
                $('#main_layout').layout('remove','south');
                dragLayout(e);
            })
        }
    });
    if(val=='block'){
        $('#main_layout').layout('collapse','south');
    }else{
        $('#main_layout').layout('expand','south');
    }
}


