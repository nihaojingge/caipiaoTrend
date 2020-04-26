//服务器
// var STATIC_HW_URL = "http://119.28.89.90:8080/hwlottery/";
// var STATIC_WS_URL = "ws://119.28.89.90:8080/lottery/";

//阿里服务器
var STATIC_HW_URL = "http://47.244.114.84:8080/hwlottery/";
var STATIC_WS_URL = "ws://47.244.114.84:8080/lottery/";

//本地
// var STATIC_HW_URL = "http://119.23.240.173:8080/hwlottery/";
// var STATIC_WS_URL = "ws://119.23.240.173:8080/lottery/";

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}