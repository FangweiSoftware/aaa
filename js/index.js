/**
 * Created by Fairlady on 2017/08/29.
 */
var WEBAPI_ADDRESS='http://192.168.200.219:8087';
$('#settings').on('click',function (){
    openWindow({
        el:'#settings_window',
        title:'设置',
        href:'/traffic3-plan/pages/options.html',
        x:500,
        y:200,
        w:480,
        h:250
    })
})

