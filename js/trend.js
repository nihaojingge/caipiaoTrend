
var rgb = new Array(16);
    rgb[0] = '#00FF00';
    rgb[2] = '#00EE00';
    rgb[3] = '#00CD00';
    rgb[4] = '#43CD80';
    rgb[5] = '#00FF7F';
    rgb[6] = '#54FF9F';
    rgb[7] = '#fe4343';
    rgb[8] = '#f83939';
    rgb[9] = '#fa2f2f';
    rgb[10] = '#fa2300';
    rgb[11] = '#f61919';
    rgb[12] = '#fa1414';
    rgb[13] = '#f60606';
    rgb[14] = '#f6055b';
    rgb[15] = '#cc18f6';

$(document).ready(function () {

    //读取url城市信息
    var cityid = GetQueryString('cityid');
    if (cityid==null) {
        cityid = 'sd11x5';
        window.location.href = "http://"+window.location.host+"/lottery/user/trend.do?cityid="+cityid;
    }

    //回显到尝试选项上面
    $('a[name="selectCity"]').each(function () {
        if ($(this).attr('tag') == cityid) {
            $('.city').removeClass('tag');
            $(this).addClass('tag');

            var index = $(this).index();
            $('#mc-nav-t-2').html('');
            $('#mc-nav-t-3').html('');
            //修改开奖城市的显示位置
            var selectCity = $('a[name="selectCity"]');
            for (var i=0; i<selectCity.length; i++) {
                if (i == index) {
                    $('#mc-nav-t-3').html(selectCity[i]);
                } else {
                    $('#mc-nav-t-2').append(selectCity[i]);
                }
            }
            $('#mc-nav-t-1').html($('#mc-nav-t-3').html()+$('#mc-nav-t-2').html());

            $('#mc-nav-t-2').html('');
            $('#mc-nav-t-3').html('');
        }
    })

    var title = '山<br>东<br>11<br>选<br>5';
    if (cityid == 'sd11x5') {
        $('.titleName').html('全彩科技  山东11选5');
        title = '山<br>东<br>11<br>选<br>5';
    } else if (cityid == 'gd11x5') {
        $('.titleName').html('全彩科技  广东11选5');
        title = '广<br>东<br>11<br>选<br>5';
    } else if (cityid == 'jx11x5') {
        $('.titleName').html('全彩科技  江西11选5');
        title = '江<br>西<br>11<br>选<br>5';
    } else if (cityid == 'sh11x5') {
        $('.titleName').html('全彩科技  上海11选5');
        title = '上<br>海<br>11<br>选<br>5';
    }
    $(".cz-title").html(title);

    var page = $('#Kj_qishu_n').val();

    if (page==null || page==undefined) {
        page = 20;
        $('#Kj_qishu_n').val(20);
    }

    var shuju = $('.shuju_xz').find('.tag').text(); //选择的排序方式
    localStorage.setItem('shuju', shuju);

    var selected = 0;
    if (shuju == '数据一') {
        selected = 1;
        $('.shuju').text('数据一');
    } else if (shuju == '数据二') {
        selected = 2;
        $('.shuju').text('数据二');
    } else if (shuju == '数据三') {
        selected = 3;
        $('.shuju').text('数据三');
    }
    var periods = $('#Latest_qihao').text();

    //是否自动开奖
    var auto = localStorage.getItem('autoKj');
    if (auto == 1) {
        $('#zidongkj').prop('checked', true);
        auto_kaijian();
    } else {
        $("#zidongkj_time").hide();
        $("#kjhm_zdy").show();
        $('#zidongkj_text').hide();
    }

    getInfo(cityid, page, selected, 0, periods, 0);
});


$('#s_gengxin').click(function () {
    gengxin();
});

$('#s_shuanx').click(function () {
    var shuju = localStorage.getItem('shuju');
    var selected = 0;
    if (shuju == '数据一') {
        selected = 1;
    } else if (shuju == '数据二') {
        selected = 2;
    } else if (shuju == '数据三') {
        selected = 3;
    }

    var page = $('#Kj_qishu').val();
    var cityid = GetQueryString('cityid');
    var periods = $('#Latest_qihao').text();
    getInfo(cityid, page, selected, 0, periods, 0);
});

function gengxin() {
    var shuju = localStorage.getItem('shuju');
    var selected = 0;
    if (shuju == '数据一') {
        selected = 1;
    } else if (shuju == '数据二') {
        selected = 2;
    } else if (shuju == '数据三') {
        selected = 3;
    }

    var page = $('#Kj_qishu').val();
    var cityid = GetQueryString('cityid');

    getInfo(cityid, page, selected, 0, "", 0);
}

//切换城市
$(document).on("click","a[name='selectCity']", function () {
    var cityid = $(this).attr('tag');

    $('.city').removeClass('tag');
    $(this).addClass('tag');

    window.location.href = "http://"+window.location.host+"/lottery/user/trend.do?cityid="+cityid;
});

$('#s_houtui').click(function () {
    var backnum = $('#Kj_htqs').val();
    if (backnum==null) {
        alert('请填写数字');
        return ;
    } else if (backnum > 1000) {
        alert('最大可后退1000期');
    }

    var shuju = localStorage.getItem('shuju');
    var selected = 0;
    if (shuju == '数据一') {
        selected = 1;
    } else if (shuju == '数据二') {
        selected = 2;
    } else if (shuju == '数据三') {
        selected = 3;
    }
    var page = $('#Kj_qishu_n').val();
    var cityid = GetQueryString('cityid');
    var periods = $('#Latest_qihao').text();

    if ($("#zidongkj").is(':checked')) {
        $('#zidongkj').removeAttr('checked');
        localStorage.setItem("autoKj", 0);
        $("#zidongkj_time").hide();
        $("#kjhm_zdy").show();
        $('#zidongkj_text').hide();
    }

    getInfo(cityid, page, selected, backnum, periods, 0);
});

$('#s_qianjin').click(function () {
    var backnum = $('#Kj_htqs').val();
    if (backnum==null) {
        alert('请填写数字');
        return ;
    } else if (backnum > 1000) {
        alert('最大可后退1000期')
    }
    backnum = -backnum;
    var shuju = localStorage.getItem('shuju');
    var selected = 0;
    if (shuju == '数据一') {
        selected = 1;
    } else if (shuju == '数据二') {
        selected = 2;
    } else if (shuju == '数据三') {
        selected = 3;
    }
    var page = $('#Kj_qishu_n').val();
    var cityid = GetQueryString('cityid');
    var periods = $('#Latest_qihao').text();

    if ($("#zidongkj").is(':checked')) {
        localStorage.setItem("autoKj", 0);
        $("#zidongkj_time").hide();
        $("#kjhm_zdy").show();
        $('#zidongkj_text').hide();
    }

    getInfo(cityid, page, selected, backnum, periods, 0);
});

//periods 此参数不传 直接查询最新的期数 is_auto 自动更新
function getInfo(city_id, pagenum, selected, back, periods, is_auto) {
    var loading = layer.load();
    //获取任二 还是任五
    var typename = $('#kj_wanfa').text();
    var type = '1';
    if (typename == "任选五") {
        type = '1';
    } else {
        type = '2';
    }

    $.ajax({
        url:'../lottery/lyInfo.do',
        data:{'cityid': city_id, 'page': pagenum,
            'selected': selected, 'numBack': back,
            'periods': periods, 'type': type},
        type: 'post',
        dataType: 'json',
        success: function (res) {
            // console.log(res);

            if (res.code == 1) {

                //走势图的解析  左边的数据
                var zjCount1 = 0;
                var zjCount2 = 0;
                var zjCount3 = 0;
                var zjCount4 = 0;
                var zjCount5 = 0;
                var zjCount6 = 0;
                var zjCount7 = 0;
                var zjCount8 = 0;
                var zjCount9 = 0;
                var zjCount10 = 0;
                var zjCount11 = 0;

                var lrCount1 = 0;
                var lrCount2 = 0;
                var lrCount3 = 0;
                var lrCount4 = 0;
                var lrCount5 = 0;
                var lrCount6 = 0;
                var lrCount7 = 0;
                var lrCount8 = 0;
                var lrCount9 = 0;
                var lrCount10 = 0;
                var lrCount11 = 0;

                var yilouConunt1 = 0;
                var yilou1 = 0;
                var yilouConunt2 = 0;
                var yilou2 = 0;
                var yilouConunt3 = 0;
                var yilou3 = 0;
                var yilouConunt4 = 0;
                var yilou4 = 0;
                var yilouConunt5 = 0;
                var yilou5 = 0;
                var yilouConunt6 = 0;
                var yilou6 = 0;
                var yilouConunt7 = 0;
                var yilou7 = 0;
                var yilouConunt8 = 0;
                var yilou8 = 0;
                var yilouConunt9 = 0;
                var yilou9 = 0;
                var yilouConunt10 = 0;
                var yilou10 = 0;
                var yilouConunt11 = 0;
                var yilou11 = 0;

                var lianjiCount1 = 0;
                var lianji1 = 0;
                var lianjiCount2 = 0;
                var lianji2 = 0;
                var lianjiCount3 = 0;
                var lianji3 = 0;
                var lianjiCount4 = 0;
                var lianji4 = 0;
                var lianjiCount5 = 0;
                var lianji5 = 0;
                var lianjiCount6 = 0;
                var lianji6 = 0;
                var lianjiCount7 = 0;
                var lianji7 = 0;
                var lianjiCount8 = 0;
                var lianji8 = 0;
                var lianjiCount9 = 0;
                var lianji9 = 0;
                var lianjiCount10 = 0;
                var lianji10 = 0;
                var lianjiCount11 = 0;
                var lianji11 = 0;

                var alltrend = '';

                var lottery = res.data.lottery;
                var titlenum = res.data.titlenum;
                var numList = res.data.numList;

                //左上角的期数
                var periods = lottery[lottery.length-1].periods.toString().substring(0, 9);
                $('#Latest_qihao').text(20+periods);

                //左上角的开奖号
                var last_kj = lottery[lottery.length-1].num.toString().split(",");

                var kaijian_num =
                    '<p class="kj-'+last_kj[0]+' pro_num" id="num1">'+last_kj[0]+'</p>' +
                    '<p class="kj-'+last_kj[1]+' pro_num" id="num2">'+last_kj[1]+'</p>' +
                    '<p class="kj-'+last_kj[2]+' pro_num" id="num3">'+last_kj[2]+'</p>' +
                    '<p class="kj-'+last_kj[3]+' pro_num" id="num4">'+last_kj[3]+'</p>' +
                    '<p class="kj-'+last_kj[4]+' pro_num" id="num5">'+last_kj[4]+'</p>';

                $('#Latest_kaijianghao').html(kaijian_num);

                //自动开奖 开过来的
                if (is_auto == 1) {
                    //3D 旋转
                    rotateYDIV(5);
                }

                var xsPage = parseInt($('#Kj_qishu_n').val());
                pagenum = parseInt(pagenum);

                for(var i=0; i<res.data.lottery.length; i++) {
                    var chongFlag = 0;
                    var trend = '';
                    if (xsPage+i >= pagenum) {
                        trend = '<ul class="list-left1">'+
                            '    <li class="li-t">'+ lottery[i].periods +
                            '        <font class="bold red">'+lottery[i].num +
                            '        </font>'+
                            '    </li>';
                    }
                    if (lottery[i].num.indexOf('01') != -1) {
                        zjCount1 ++;
                        if (pagenum-i <= 20) {
                            lrCount1 ++;
                        }
                        if (yilouConunt1 > yilou1) {
                            yilou1 = yilouConunt1;
                        }
                        yilouConunt1 = 0;
                        lianjiCount1 ++;
                        if (lianjiCount1 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('02') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">01</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">01</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">01</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">01</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt1++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt1+'</li>';
                        }
                        if (lianjiCount1 > lianji1) {
                            lianji1 = lianjiCount1;
                        }
                        lianjiCount1 = 0;
                    }
                    if (lottery[i].num.indexOf('02') != -1) {
                        zjCount2 ++;
                        if (pagenum-i <= 20) {
                            lrCount2 ++;
                        }
                        if (yilouConunt2 > yilou2) {
                            yilou2 = yilouConunt2;
                        }
                        yilouConunt2 = 0;
                        lianjiCount2 ++;
                        if (lianjiCount2 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('01') != -1 ||
                                lottery[i].num.indexOf('03') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">02</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">02</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">02</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">02</p></li>';
                                }
                            }
                        }
                    } else {
                        yilouConunt2 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt2+'</li>';
                        }
                        if (lianjiCount2 > lianji2) {
                            lianji2 = lianjiCount2;
                        }
                        lianjiCount2 = 0;
                    }
                    if (lottery[i].num.indexOf('03') != -1) {
                        zjCount3 ++;
                        if (pagenum-i <= 20) {
                            lrCount3 ++;
                        }
                        if (yilouConunt3 > yilou3) {
                            yilou3 = yilouConunt3;
                        }
                        yilouConunt3 = 0;
                        lianjiCount3 ++;
                        if (lianjiCount3 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('02') != -1 ||
                                lottery[i].num.indexOf('04') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">03</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">03</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">03</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj ">03</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt3 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt3+'</li>';
                        }

                        if (lianjiCount3 > lianji3) {
                            lianji3 = lianjiCount3;
                        }
                        lianjiCount3 = 0;
                    }
                    if (lottery[i].num.indexOf('04') != -1) {
                        zjCount4 ++;
                        if (pagenum-i <= 20) {
                            lrCount4 ++;
                        }
                        if (yilouConunt4 > yilou4) {
                            yilou4 = yilouConunt4;
                        }
                        yilouConunt4 = 0;

                        lianjiCount4 ++;
                        if (lianjiCount4 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('03') != -1 ||
                                lottery[i].num.indexOf('05') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">04</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">04</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">04</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">04</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt4 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt4+'</li>';
                        }
                        if (lianjiCount4 > lianji4) {
                            lianji4 = lianjiCount4;
                        }
                        lianjiCount4 = 0;
                    }
                    if (lottery[i].num.indexOf('05') != -1) {
                        // trend += '   <li><p class="zhong_num">05</p></li>';
                        zjCount5 ++;
                        if (pagenum-i <= 20) {
                            lrCount5 ++;
                        }
                        if (yilouConunt5 > yilou5) {
                            yilou5 = yilouConunt5;
                        }
                        yilouConunt5 = 0;
                        lianjiCount5 ++;
                        if (lianjiCount5 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('04') != -1 ||
                                lottery[i].num.indexOf('06') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">05</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">05</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">05</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">05</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt5 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt5+'</li>';
                        }
                        if (lianjiCount5 > lianji5) {
                            lianji5 = lianjiCount5;
                        }
                        lianjiCount5 = 0;
                    }
                    if (lottery[i].num.indexOf('06') != -1) {
                        // trend += '   <li><p class="zhong_num">06</p></li>';
                        zjCount6 ++;
                        if (pagenum-i <= 20) {
                            lrCount6 ++;
                        }
                        if (yilouConunt6 > yilou6) {
                            yilou6 = yilouConunt6;
                        }
                        yilouConunt6 = 0;
                        lianjiCount6 ++;
                        if (lianjiCount6 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('05') != -1 ||
                                lottery[i].num.indexOf('07') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">06</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">06</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">06</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">06</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt6 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt6+'</li>';
                        }
                        if (lianjiCount6 > lianji6) {
                            lianji6 = lianjiCount6;
                        }
                        lianjiCount6 = 0;
                    }
                    if (lottery[i].num.indexOf('07') != -1) {
                        // trend += '   <li><p class="zhong_num">07</p></li>';
                        zjCount7 ++;
                        if (pagenum-i <= 20) {
                            lrCount7 ++;
                        }
                        if (yilouConunt7 > yilou7) {
                            yilou7 = yilouConunt7;
                        }
                        yilouConunt7 = 0;
                        lianjiCount7 ++;
                        if (lianjiCount7 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('06') != -1 ||
                                lottery[i].num.indexOf('08') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">07</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">07</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">07</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">07</p></li>';
                                }
                            }
                        }
                    } else {
                        yilouConunt7 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt7+'</li>';
                        }
                        if (lianjiCount7 > lianji7) {
                            lianji7 = lianjiCount7;
                        }
                        lianjiCount7 = 0;
                    }
                    if (lottery[i].num.indexOf('08') != -1) {
                        // trend += '   <li><p class="zhong_num">08</p></li>';
                        zjCount8 ++;
                        if (pagenum-i <= 20) {
                            lrCount8 ++;
                        }
                        if (yilouConunt8 > yilou8) {
                            yilou8 = yilouConunt8;
                        }
                        yilouConunt8 = 0;
                        lianjiCount8 ++;
                        if (lianjiCount8 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }

                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('07') != -1 ||
                                lottery[i].num.indexOf('09') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">08</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">08</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">08</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">08</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt8 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt8+'</li>';
                        }
                        if (lianjiCount8 > lianji8) {
                            lianji8 = lianjiCount8;
                        }
                        lianjiCount8 = 0;
                    }
                    if (lottery[i].num.indexOf('09') != -1) {
                        // trend += '   <li><p class="zhong_num">09</p></li>';
                        zjCount9 ++;
                        if (pagenum-i <= 20) {
                            lrCount9 ++;
                        }
                        if (yilouConunt9 > yilou9) {
                            yilou9 = yilouConunt9;
                        }
                        yilouConunt9 = 0;
                        lianjiCount9 ++;
                        if (lianjiCount9 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('08') != -1 ||
                                lottery[i].num.indexOf('10') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">09</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">09</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">09</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj ">09</p></li>';
                                }
                            }
                        }
                    } else {
                        yilouConunt9 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt9+'</li>';
                        }

                        if (lianjiCount9 > lianji9) {
                            lianji9 = lianjiCount9;
                        }
                        lianjiCount9 = 0;
                    }
                    if (lottery[i].num.indexOf('10') != -1) {
                        // trend += '   <li><p class="zhong_num">10</p></li>';
                        zjCount10 ++;
                        if (pagenum-i <= 20) {
                            lrCount10 ++;
                        }
                        if (yilouConunt10 > yilou10) {
                            yilou10 = yilouConunt10;
                        }
                        yilouConunt10 = 0;
                        lianjiCount10 ++;
                        if (lianjiCount10 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('09') != -1 ||
                                lottery[i].num.indexOf('11') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong lian">10</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj lian">10</p></li>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="color"><p class="zj chong">10</p></li>';
                                } else {
                                    trend += '   <li class="color"><p class="zj">10</p></li>';
                                }
                            }
                        }

                    } else {
                        yilouConunt10 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt10+'</li>';
                        }
                        if (lianjiCount10 > lianji10) {
                            lianji10 = lianjiCount10;
                        }
                        lianjiCount10 = 0;
                    }
                    if (lottery[i].num.indexOf('11') != -1) {
                        // trend += '   <li><p class="zhong_num">11</p></li>' +
                        //     '</ul>';
                        zjCount11 ++;
                        if (pagenum-i <= 20) {
                            lrCount11 ++;
                        }
                        if (yilouConunt11 > yilou11) {
                            yilou11 = yilouConunt11;
                        }
                        yilouConunt11 = 0;
                        lianjiCount11 ++;
                        if (lianjiCount11 > 1) {
                            chongFlag = 1;
                        } else {
                            chongFlag = 0;
                        }
                        if (xsPage+i >= pagenum) {
                            if (lottery[i].num.indexOf('10') != -1) {
                                if (chongFlag == 1) {
                                    trend += '   <li class="li-l color"><p class="zj chong lian">11</p></li>'+
                                        '</ul>';
                                } else {
                                    trend += '   <li class="li-l color"><p class="zj lian">11</p></li>'+
                                        '</ul>';
                                }
                            } else {
                                if (chongFlag == 1) {
                                    trend += '   <li class="li-l color"><p class="zj chong">11</p></li>'+
                                        '</ul>';
                                } else {
                                    trend += '   <li class="li-l color"><p class="zj">11</p></li>'+
                                        '</ul>';
                                }
                            }
                        }

                    } else {
                        yilouConunt11 ++;
                        if (xsPage+i >= pagenum) {
                            trend += '   <li class="color">'+yilouConunt11+'</li>'+
                                '</ul>';
                        }

                        if (lianjiCount11 > lianji11) {
                            lianji11 = lianjiCount11;
                        }
                        lianjiCount11 = 0;
                    }
                    alltrend += trend;
                }
                $('#mc-list-left-cont').html(alltrend);



                //右边的数据解析
                //中间的数字
                var nums = '';
                console.log(numList);
                for (var m=pagenum-xsPage; m<numList.length; m++) {
                    if (m == numList.length -1) {
                        nums += '<ul class="r-last">';
                    } else {
                        nums += '<ul class=" ">';
                    }
                    for(var k=0; k<55; k++) {
                        if (numList[m][k] == 0) {
                            if (titlenum[k].titlenum.length == 3) {
                                nums +=
                                    '<li class="li-3">' +
                                    '   <p class="ok">' +
                                    '   </p> ' +
                                    '</li>';
                            } else if (titlenum[k].titlenum.length == 4) {
                                nums +=
                                    '<li class="li-4">' +
                                    '   <p class="ok">' +
                                    '   </p> ' +
                                    '</li>';
                            } else {
                                nums +=
                                    '<li class="li-5">' +
                                    '   <p class="ok">' +
                                    '   </p> ' +
                                    '</li>';
                            }

                        } else {
                            if (titlenum[k].titlenum.length == 3) {
                                nums += '<li class="li-3">' +
                                    numList[m][k]+
                                    '</li>';
                            } else if (titlenum[k].titlenum.length == 4) {
                                nums += '<li class="li-4">' +
                                    numList[m][k]+
                                    '</li>';
                            } else {
                                nums += '<li class="li-5">' +
                                    numList[m][k]+
                                    '</li>';
                            }

                        }
                    }
                    nums += '</ul>';
                }
                $('#mc-list-right-cont').html(nums);

                //上面的头 和下面的数据
                var title = '';
                var yl = '<ul>';
                var zj = '<ul>';
                var lj = '<ul>';
                var kong = '<ul>';
                for (var n=0; n<titlenum.length; n++) {
                    var ss = n+1;
                    if (titlenum[n].titlenum.length == 3) {
                        title += '<li class="li-3">'+
                            titlenum[n].titlenum+
                            '</li>';

                        yl += '<li class="li-3 l-m ">' +
                                titlenum[n].yilou+
                                '</li>';
                        zj += '<li class="li-3 l-m ">' +
                                titlenum[n].zj+
                            '</li>';
                        lj += '<li class="li-3 l-m l-kh">' +
                                ss+
                            '</li>';
                        kong += '<li class="li-3 l-m l-kh">' +
                            '</li>';
                    } else if (titlenum[n].titlenum.length == 4) {
                        title += '<li class="li-4">'+
                            titlenum[n].titlenum+
                            '</li>';
                        yl += '<li class="li-4 l-m ">' +
                            titlenum[n].yilou+
                            '</li>';
                        zj += '<li class="li-4 l-m ">' +
                            titlenum[n].zj+
                            '</li>';
                        lj += '<li class="li-4 l-m l-kh">' +
                                ss+
                            '</li>';
                        kong += '<li class="li-4 l-m l-kh">' +
                            '</li>';
                    } else {
                        title += '<li class="li-5">'+
                            titlenum[n].titlenum+
                            '</li>';
                        yl += '<li class="li-5 l-m ">' +
                            titlenum[n].yilou+
                            '</li>';
                        zj += '<li class="li-5 l-m ">' +
                            titlenum[n].zj+
                            '</li>';
                        lj += '<li class="li-5 l-m l-kh">' +
                                ss+
                            '</li>';
                        kong += '<li class="li-5 l-m l-kh">' +
                            '</li>';
                    }
                }
                $('#mc-list-right-t').html(title);
                $('#mc-list-right-cont').append(kong+yl+zj+lj);




                //冷热号
                $('.lr1').text(lrCount1);
                if (0<=lrCount1 && lrCount1<=6) {
                    $('.lr1').css('background-color', rgb[lrCount1]+'');
                } else if (11<=lrCount1 && lrCount1<=20) {
                    $('.lr1').css('background-color', ''+rgb[lrCount1-4]);
                } else {
                    $('.lr1').css('background-color', '#fff');
                }
                $('.lr2').text(lrCount2);
                if (0<=lrCount2 && lrCount2<=6) {
                    $('.lr2').css('background-color', rgb[lrCount2]+'');
                } else if (11<=lrCount2 && lrCount2<=20) {
                    $('.lr2').css('background-color', ''+rgb[lrCount2-4]);
                } else {
                    $('.lr2').css('background-color', '#fff');
                }
                $('.lr3').text(lrCount3);
                if (0<=lrCount3 && lrCount3<=6) {
                    $('.lr3').css('background-color', rgb[lrCount3]);
                } else if (11<=lrCount3 && lrCount3<=20) {
                    $('.lr3').css('background-color', rgb[lrCount3-4]);
                } else {
                    $('.lr3 ').css('background-color', '#fff');
                }
                $('.lr4').text(lrCount4);
                if (0<=lrCount5 && lrCount4<=6) {
                    $('.lr4').css('background-color', rgb[lrCount4]);
                } else if (11<=lrCount4 && lrCount4<=20) {
                    $('.lr4').css('background-color', rgb[lrCount4-4]);
                } else {
                    $('.lr4').css('background-color', '#fff');
                }
                $('.lr5').text(lrCount5);
                if (0<=lrCount5 && lrCount5<=6) {
                    $('.lr5').css('background-color', rgb[lrCount5]);
                } else if (11<=lrCount5 && lrCount5<=20) {
                    $('.lr5').css('background-color', rgb[lrCount5-4]);
                } else {
                    $('.lr5').css('background-color', '#fff');
                }
                $('.lr6').text(lrCount6);
                if (0<=lrCount6 && lrCount6<=6) {
                    $('.lr6').css('background-color', rgb[lrCount6]);
                } else if (11<=lrCount6 && lrCount6<=20) {
                    $('.lr6').css('background-color', rgb[lrCount6-4]);
                } else {
                    $('.lr6').css('background-color', '#fff');
                }
                $('.lr7').text(lrCount7);
                if (0<=lrCount7 && lrCount7<=6) {
                    $('.lr7').css('background-color', rgb[lrCount7]);
                } else if (11<=lrCount7 && lrCount7<=20) {
                    $('.lr7').css('background-color', rgb[lrCount7-4]);
                } else {
                    $('.lr7').css('background-color', '#fff');
                }
                $('.lr8').text(lrCount8);
                if (0<=lrCount8 && lrCount8<=6) {
                    $('.lr8').css('background-color', rgb[lrCount8]);
                } else if (11<=lrCount8 && lrCount8<=20) {
                    $('.lr8').css('background-color', rgb[lrCount8-4]);
                } else {
                    $('.lr8').css('background-color', '#fff');
                }
                $('.lr9').text(lrCount9);
                if (0<=lrCount9 && lrCount9<=6) {
                    $('.lr9').css('background-color', rgb[lrCount9]);
                } else if (11<=lrCount9 && lrCount9<=20) {
                    $('.lr9').css('background-color', rgb[lrCount9-4]);
                } else {
                    $('.lr9').css('background-color', '#fff');
                }
                $('.lr10').text(lrCount10);
                if (0<=lrCount10 && lrCount10<=6) {
                    $('.lr10').css('background-color', rgb[lrCount10]);
                } else if (11<=lrCount10 && lrCount10<=20) {
                    $('.lr10').css('background-color', rgb[lrCount10-4]);
                } else {
                    $('.lr10').css('background-color', '#fff');
                }
                $('.lr11').text(lrCount11);
                if (0<=lrCount11 && lrCount11<=6) {
                    $('.lr11').css('background-color', rgb[lrCount11]);
                } else if (11<=lrCount11 && lrCount11<=20) {
                    $('.lr11').css('background-color', rgb[lrCount11-4]);
                } else {
                    $('.lr11').css('background-color', '#fff');
                }

                var qishu = $('#Kj_qishu').val();
                $('#yilou').text(qishu+'期最大遗漏期数');
                $('#zhongjiang').text(qishu+'期中奖次数');
                $('#lianchu').text(qishu+'期最大连出次数');

                //中奖
                $('.zj1').text(zjCount1);
                $('.zj2').text(zjCount2);
                $('.zj3').text(zjCount3);
                $('.zj4').text(zjCount4);
                $('.zj5').text(zjCount5);
                $('.zj6').text(zjCount6);
                $('.zj7').text(zjCount7);
                $('.zj8').text(zjCount8);
                $('.zj9').text(zjCount9);
                $('.zj10').text(zjCount10);
                $('.zj11').text(zjCount11);

                //遗漏
                $('.yl1').text(yilou1);
                $('.yl2').text(yilou2);
                $('.yl3').text(yilou3);
                $('.yl4').text(yilou4);
                $('.yl5').text(yilou5);
                $('.yl6').text(yilou6);
                $('.yl7').text(yilou7);
                $('.yl8').text(yilou8);
                $('.yl9').text(yilou9);
                $('.yl10').text(yilou10);
                $('.yl11').text(yilou11);

                //连击
                $('.lj1').text(lianji1);
                $('.lj2').text(lianji2);
                $('.lj3').text(lianji3);
                $('.lj4').text(lianji4);
                $('.lj5').text(lianji5);
                $('.lj6').text(lianji6);
                $('.lj7').text(lianji7);
                $('.lj8').text(lianji8);
                $('.lj9').text(lianji9);
                $('.lj10').text(lianji10);
                $('.lj11').text(lianji11);

                layer.close(loading);
            }
        },
        error: function () {
            layer.close(loading);
        }
    })
}

$(':checkbox').click(function () {
    var checked = $(this).val();

    if (checked == 1) {
        return ;
    }

    if ($(this).is(":checked", false)) {
        $(':checkbox').prop("checked", false);
        $(this).prop("checked", true);
    } else {
        checked = 0;
        $(':checkbox').prop("checked", false);
    }

    if (checked == 0) {
        //没有选择 退回到原来的颜色
        $('.chong').removeClass("ch");
        $('.lian').removeClass("lh");
        $('.chong').removeClass("l_h");
        $('.lian').removeClass("l_h");
    } else if (checked == 'lh') {
        //连号
        $('.chong').removeClass("l_h");
        $('.lian').removeClass("l_h");
        $('.chong').removeClass("ch");
        $('.lian').addClass("lh");
    } else if (checked == 'ch') {
        //重号
        $('.chong').removeClass("l_h");
        $('.lian').removeClass("l_h");
        $('.lian').removeClass("lh");
        $('.chong').addClass("ch");
    } else {
        //邻号
        $('.lian').removeClass("lh");
        $('.chong').removeClass("ch");
        $('.lian').addClass("l_h");
        $('.chong').addClass("l_h");
    }

});

//选中自动开奖
$("#zidongkj").on("click",function(){
    if($(this).is(":checked")){
        // 本地存储 点击了自动开奖
        localStorage.setItem("autoKj", 1);
        auto_kaijian();
    }else{
        localStorage.setItem("autoKj", 0);
        $("#zidongkj_time").hide();
        $("#kjhm_zdy").show();
        $('#zidongkj_text').hide();
    }
});

//开启自动开奖
function auto_kaijian() {
    var cityid = GetQueryString('cityid');

    if (cityid == 'sd11x5') {
        var cityname = '山东';
    } else if (cityid == 'jx11x5') {
        var cityname = '江西';
    } else if (cityid == 'gd11x5') {
        var cityname = '广东';
    } else if (cityid == 'sh11x5') {
        var cityname = '上海';
    }

    $.ajax({
        url: STATIC_HW_URL+'lottery/otime.do',
        data: {'cityname': cityname, 'type': 1},
        dataType: 'json',
        type: 'post',
        success: function (res) {
            if (res.code == 1) {
                var sec = res.data;
                $("#kjhm_zdy").hide();
                $('#zidongkj_text').hide();
                $("#zidongkj_time").show();//显示开奖倒计时
                gengxin();
                GetRTime(sec);
            } else {
                layer.alert('未能获取时间，请重新点击', {
                    skin: 'layui-layer-molv' //样式类名
                    ,closeBtn: 0
                });
            }
        }
    });
}

//3D 旋转
function rotateYDIV(count){
    var y,ny=0,tt;
    tt=setInterval(function (){
        ny=ny+1;
        for(var i=1;i<=count;i++){
            y=document.getElementById('num'+i);
            y.style.transform="rotateY(" + ny + "deg)"
        }
        if (ny>=360){
            clearInterval(tt);
            ny=0;
            $('.pro_num').find('p').css('transform','rotateY(0deg)');
            return false;
        }
    },5)
}

// webSocket 远程连接
var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
       websocket = new WebSocket(STATIC_WS_URL+"websocket");
    // websocket = new WebSocket(LOCAL_WS_URL+"websocket");
} else {
    alert('当前浏览器 Not support websocket')
}

var t2 = null;

//连接发生错误的回调方法
websocket.onerror = function () {
    websocket = new WebSocket(STATIC_WS_URL+"websocket");
    window.clearInterval(t2);
};

//连接成功建立的回调方法
websocket.onopen = function () {
    setMessageInnerHTML("WebSocket连接成功");
    websocket.send('quancai');
    t2 = window.setInterval(function send() {
        var message = 'quancai:HeartBeat';
        websocket.send(message);
    }, 4000);
};

//接收到消息的回调方法
websocket.onmessage = function (event) {
    var res = JSON.parse(event.data);
    if (res.code == 0) {
        //判断是否开启了自动开奖
        var city = res.data.cityid;
        if ($('#zidongkj').is(':checked')) {
            auto_kaijian();
            var shuju = localStorage.getItem('shuju');
            var selected = 0;
            if (shuju == '数据一') {
                selected = 1;
            } else if (shuju == '数据二') {
                selected = 2;
            } else if (shuju == '数据三') {
                selected = 3;
            }
            var page = $('#Kj_qishu_n').val();
            var cityid = GetQueryString('cityid');
            if (city == cityid) {
                getInfo(cityid, page, selected, 0, "", 1);
                var audio = document.createElement("audio");
                audio.src = 'http://47.244.114.84:8080/file//595e687b-290c-4/video/original/9e478a16-ccfa-417a-8ef6-9c6ce37bb85c.mp3';
                audio.play();
            } else {
                getInfo(cityid, page, selected, 0, "", 0);
            }

        }
    }
};

//连接关闭的回调方法
websocket.onclose = function () {
    websocket = new WebSocket(STATIC_WS_URL+"websocket");
    window.clearInterval(t2);
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
    // document.getElementById('message').innerHTML += innerHTML + '<br/>';
}

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

//发送消息
function send() {
    var message = 'HeartBeat:session';
    websocket.send(message);
}




//二次验证
$("#Yz_2_but").on("click",function(){
    var type = $('#kj_wanfa').text();
    var danMa = $('#danma').text();
    var shuju = $('.shuju').text();
    var tjnum = $('#Kj_qishu').val();
    var xsnum = $('#Kj_qishu_n').val();


    $("#Yz-2-box").show();
    $(".play_type").text(type);
    $('.dan_ma').text(danMa);
    $('.yl_shuju').text(shuju);
    $('.yl_tjnum').text(tjnum);
    $('.yl_xsnum').text(xsnum);
    var yl_tj = $('#Yz_2_num2').val();
    var yl_xs = $('#pop_yz_num').val();

    if (parseInt(yl_tj) > parseInt(tjnum)) {
        $('#Yz_2_num2').val(tjnum);
    }

    if (parseInt(yl_xs) > parseInt(xsnum)) {
        $('#pop_yz_num').val(xsnum);
    }

    var periodsnum = $('#Latest_qihao').text();
    var cityid = GetQueryString("cityid");

    if (cityid == 'sd11x5') {
        $('.valid_city').text('山东11选5');
    } else if (cityid == 'jx11x5') {
        $('.valid_city').text('江西11选5');
    } else if (cityid == 'gd11x5') {
        $('.valid_city').text('广东11选5');
    } else if (cityid == 'sh11x5') {
        $('.valid_city').text('上海11选5');
    }

    var page = $('#Yz_2_num2').val();

    var selected = localStorage.getItem('yz_selected');
    if (selected==null || selected=='') {
        selected = 1;
        localStorage.setItem("yz_selected", selected);
    }
    $('[name="pop_yz_px"]').val(selected);

    if (shuju == '数据一') {
        var preselect = 1;
    } else if (shuju == '数据二') {
        var preselect = 2;
    } else if (shuju == '数据三') {
        var preselect = 3;
    } else {
        var preselect = 1;
    }

    //遗漏 号码显示
    $('input[name="pop_yz_radio"][value="1"]').prop('checked',true);

    getValidateInfo(cityid, page, preselect, periodsnum, selected);

    $("body").css({
        "height":"100%",
        "overflow":"hidden"
    });
});

//记忆选择的数据
$('#pop_yz_px').change(function () {
    var select = $('#pop_yz_px').val();
    localStorage.setItem("yz_selected", select);
})


//二次验证刷新
$('#validate_flush').click(function () {
    var selected = $('[name="pop_yz_px"]').val();
    var page = $('#Yz_2_num2').val();
    var xsnum = $('#pop_yz_num').val();
    var shuju = $('.shuju').text();

    if (shuju == '数据一') {
        var preselect = 1;
    } else if (shuju == '数据二') {
        var preselect = 2;
    } else if (shuju == '数据三') {
        var preselect = 3;
    } else {
        var preselect = 1;
    }

    var periodsnum = $('#Latest_qihao').text();
    var cityid = GetQueryString("cityid");

    //遗漏 号码显示
    $('input[name="pop_yz_radio"][value="1"]').prop('checked',true);

    getValidateInfo(cityid, page, preselect, periodsnum, selected);

});


//判断统计期数 和显示期数 比对信息
var xs = 0;
function pop_txt_box(obj, type) {
    if (type == 1) {
        var xsnum = $('#Kj_qishu_n').val();
    } else {
        var xsnum = $('#pop_yz_num').val();
    }
    xs = xsnum;
}

function pop_txt_box_close(obj, type, msg) {
    if (type == 1) {
        var xsnum = $('#Kj_qishu_n').val();
        var page = $('#Kj_qishu').val();
        if (parseInt(xsnum) > parseInt(page)) {
            alert(msg);
            $('#Kj_qishu_n').val(xs);
        }
    } else {
        var xsnum = $('#pop_yz_num').val();
        var page = $('#Yz_2_num2').val();
        if (parseInt(xsnum) > parseInt(page)) {
            alert(msg);
            $('#pop_yz_num').val(xs);
        }
    }
}

var tj = 0;
function beforeNum(obj, type) {
    if (type == 1) {
        tj = $('#Kj_qishu').val();
    } else {
        tj = $('#Yz_2_num2').val();
    }
}


function inputNumV(obj, type, msg) {
    if (type == 1) {
        var xsnum = $('#Kj_qishu_n').val();
        var page = $('#Kj_qishu').val();
        if (parseInt(xsnum) > parseInt(page)) {
            alert(msg);
            $('#Kj_qishu').val(tj);
        }
    } else {
        var tj_num = $('#Yz_2_num2').val();
        var xs_num = $('#pop_yz_num').val();
        if (parseInt(tj_num) < parseInt(xs_num)) {
            alert(msg);
            $('#Yz_2_num2').val(tj);
        }
    }
}

function limitInput(o){
    var value=o.value;
    var min=1;
    var max=1000;
    if(parseInt(value)<min||parseInt(value)>max){
        alert('不能超过1000，小于1');
        o.value = tj;
    }
}

function getValidateInfo(cityid, page, preselect, periodsnum, selected) {
    var loading = layer.load();
    if (selected == 3) {
        alert('走势验证方式未接入');
    }

    //获取任二 还是任五
    var type = '1';
    console.log($('.play_type').text());
    if ($('.play_type').text() == '任选五') {
        type = '1';
    } else if ($('.play_type').text() == '任选二') {
        type = '2';
    }

    $.ajax({
        url: '../lottery/validate.do',
        data: {'cityid': cityid, 'page': page, 'preselect': preselect,
            'selected': selected, 'periods': periodsnum, 'type': type},
        dataType: 'json',
        type: 'post',
        success: function (res) {
            if (res.code == 1) {
                var periodsList = res.data.periodsList;
                var validateList = res.data.validate;
                var result = '';
                var xsnum = parseInt($('#pop_yz_num').val());

                for (var i=page-xsnum; i<validateList.length-1; i++) {
                    var ul = ' <ul class="ul-tr">';
                    var index = parseInt(i)+parseInt(page);
                    var yldata1 =
                        '<li class="li-t"> '+periodsList[index].periods+
                        '    <font class="bold red"> '+periodsList[index].num+
                        '    </font> '+
                        '</li> ';
                    var yldata2 = '';
                    for (var j=0; j<validateList[i].length; j++) {
                        if (validateList[i][j].win == 0) {
                            yldata2 +=
                                ' <li class="li-2">' +
                                '   <P class="hm">'+validateList[i][j].titlenum+'</p>'+
                                '   <P class="yl">'+validateList[i][j].yl_count+'</p>'+
                                '</li> ';
                        } else {
                            yldata2 +=
                                ' <li class="li-2"> '+
                                '    <p class="ok hm" style="display: block"> '+
                                validateList[i][j].titlenum+
                                '    </p> '+
                                '    <p class="ok yl" style="display: none"> 中'+
                                '    </p> '+
                                '</li> ';
                        }
                    }
                    var yldata3 = '</ul>';
                    result += ul+yldata1+yldata2+yldata3;
                }
                $('.yl_data').html(result);


                var tuijian = validateList[validateList.length-2];
                var tj1 =
                    '   <ul class="ul-tr"> '+
                    '       <li class="li-t l-red"> '+
                    '           推荐号码 '+
                    '       </li> ';

                var yl1 =
                    '<ul class="ul-tr"> '+
                    '    <li class="li-t l-m"> '+ page+
                    '        期 [最大遗漏]'+
                    '    </li> ';

                var zj1 =
                    '<ul class="ul-tr"> '+
                    '    <li class="li-t l-m"> '+ page+
                    '        期 [中奖次数] '+
                    '    </li> ';

                var sort1 =
                    '<ul class="ul-tr rj_index"> '+
                    '    <li class="li-t l-m"> '+
                    '        [软件对应组数]'+
                    '    </li> ';

                var tj2 = '';
                var yl2 = '';
                var zj2 = '';
                var sort2 = '';

                for(var k=0; k<validateList[validateList.length-1].length; k++) {
                    tj2 +=
                        '<li class="li-2 l-red">'+validateList[validateList.length-1][k].titlenum+
                        '</li> ';
                }

                var end = '</ul>';
                for(k=0; k<tuijian.length; k++) {
                    yl2 +=
                        '<li class="li-2 l-m">'+tuijian[k].yl+
                        '</li>';

                    zj2 +=
                        '<li class="li-2 l-m">'+tuijian[k].winCount+
                        '</li>';

                    sort2 +=
                        '<li class="li-2 l-m red">'+tuijian[k].sort+
                        '</li>';
                }
                $('.yl_data').append(tj1+tj2+end +yl1+yl2+end +zj1+zj2+end +sort1+sort2+end);

                layer.close(loading);
            }
        },
        error: function () {
            layer.close(loading);
        }
    });
}


// 号码 遗漏切换
$('[name="pop_yz_radio"]').change(function () {
    var checked = $('[name="pop_yz_radio"]:checked').val();
    if (checked == 1) {
        $('.hm').show();
        $('.yl').hide();
    } else {
        $('.hm').hide();
        $('.yl').show();
    }
});


$(".guanb_2yz").on("click",function(){
    $('#Yz-2-box').hide();
//		$('body').removeClass('hidden');
    $("body").css({
        "height":"100%",
        "overflow":"auto"
    });
});


//倍投计算器
//鼠标拖动
var $dialog = $("#Jsq-box");
var isDraging = false;

//鼠标按下
$("#bt_title").mousedown(function(e){
    e = e || window.event;
    mx = e.pageX;     //点击时鼠标X坐标
    my = e.pageY;     //点击时鼠标Y坐标
    dx = $dialog.offset().left;
    dy = $dialog.offset().top;
    isDraging = true;      //标记对话框可拖动
});

//鼠标移动更新窗口位置
$(document).mousemove(function(e){
    var e = e || window.event;
    var x = e.pageX;      //移动时鼠标X坐标
    var y = e.pageY;      //移动时鼠标Y坐标
    if(isDraging){        //判断对话框能否拖动
        var moveX = dx + x - mx;      //移动后对话框新的left值
        var moveY = dy + y - my;      //移动后对话框新的top值
        //设置拖动范围
        var pageW = $(window).width();
        var pageH = $(window).height();
        var dialogW = $dialog.width();
        var dialogH = $dialog.height();
        var maxX = pageW - dialogW;       //X轴可拖动最大值
        var maxY = pageH - dialogH;       //Y轴可拖动最大值
        moveX = Math.min(Math.max(0,moveX),maxX);     //X轴可拖动范围
        moveY = Math.min(Math.max(0,moveY),maxY);     //Y轴可拖动范围
        //重新设置对话框的left、top
        $dialog.css({"left":moveX + 'px',"top":moveY + 'px'});
    };
});

//鼠标离开
$("#bt_title").mouseup(function(){
    isDraging = false;
});

// 提交
function Jsq_load() {

    var single_jj = parseInt($('#Jsq_jj').val());

    var touru = parseInt($('#Jsq_yjtr').val());

    var zhushu = parseInt($('#Jsq_zs').val());

    var periods = parseInt($('#Jsq_qs').val());

    var beishu = parseInt($('#Jsq_bs').val());


    var radio = $('.lilv').find('input[name="radio"]:checked').val();
    if (radio == 1) {
        var totalrate = $('#win_percent').val();
        $.ajax({
            url: '../lottery/calculator.do',
            data: {'awards': single_jj, 'using': touru, 'num': zhushu, 'planPeriods': periods,
                'multiple': beishu, 'type': '1', 'totalrate':totalrate},
            dataType: 'json',
            type: 'post',
            success: function (res) {
                 if (res.code == 1) {
                     var Jsq_nums = '';
                     for(var i=0; i<res.data.length; i++) {
                         Jsq_nums +=
                             '<ul>' +
                             '    <li class="li-1">'+res.data[i].periods+''+
                             '    </li>' +
                             '    <li class="li-2">' +
                             '        <input type="text" name="jsq_bs_1" size="3" maxlength="8" value="6" class="hide">' +
                             '        <span>'+res.data[i].multiple+''+
                             '        </span>倍' +
                             '    </li>' +
                             '    <li class="li-3">' +
                             '        <span>'+res.data[i].thisPrice+'</span>元' +
                             '    </li>' +
                             '    <li class="li-4">' +
                             '        <span>'+res.data[i].allPrice+'</span>元' +
                             '    </li>' +
                             '    <li class="li-5">' +
                             '        <span>'+res.data[i].winAwards+'</span>元' +
                             '    </li>' +
                             '    <li class="li-6">' +
                             '        <span>'+res.data[i].allAwards+'</span>元' +
                             '    </li>' +
                             '    <li class="li-7">' +
                             '        <span>'+res.data[i].profit+'</span>%' +
                             '    </li>' +
                             '</ul>' ;
                     }
                     $('.Jsq_nums').html(Jsq_nums);

                     if (res.data.length < periods) {
                        alert(res.data.length+'期之后投注倍数过大，不建议投注');
                     }
                 } else {
                     alert(res.info);
                 }
            }
        })

    } else if (radio == 2) {
        var prePeriods = $('#win_percent_i').val();
        var preRate = $('#pre_win_percent').val();
        var nextRate = $('#next_win_percent').val();

        if (parseInt(prePeriods) <= 0) {
            prePeriods = 1;
            $('#win_percent_i').val(1);
        }

        $.ajax({
            url: '../lottery/calculator.do',
            data: {'awards': single_jj, 'using': touru, 'num': zhushu, 'planPeriods': periods,
                'multiple': beishu, 'type': '2', 'prePeriods':prePeriods, 'preRate': preRate, 'nextRate': nextRate},
            dataType: 'json',
            type: 'post',
            success: function (res) {
                if (res.code == 1) {
                    var Jsq_nums = '';
                    for(var i=0; i<res.data.length; i++) {
                        Jsq_nums +=
                            '<ul>' +
                            '    <li class="li-1">'+res.data[i].periods+''+
                            '    </li>' +
                            '    <li class="li-2">' +
                            '        <input type="text" name="jsq_bs_1" size="3" maxlength="8" value="6" class="hide">' +
                            '        <span>'+res.data[i].multiple+''+
                            '        </span>倍' +
                            '    </li>' +
                            '    <li class="li-3">' +
                            '        <span>'+res.data[i].thisPrice+'</span>元' +
                            '    </li>' +
                            '    <li class="li-4">' +
                            '        <span>'+res.data[i].allPrice+'</span>元' +
                            '    </li>' +
                            '    <li class="li-5">' +
                            '        <span>'+res.data[i].winAwards+'</span>元' +
                            '    </li>' +
                            '    <li class="li-6">' +
                            '        <span>'+res.data[i].allAwards+'</span>元' +
                            '    </li>' +
                            '    <li class="li-7">' +
                            '        <span>'+res.data[i].profit+'</span>%' +
                            '    </li>' +
                            '</ul>' ;
                    }
                    $('.Jsq_nums').html(Jsq_nums);

                    if (res.data.length < periods) {
                        alert(res.data.length+'期之后投注倍数过大，不建议投注');
                    }
                } else {
                    alert(res.info);
                }
            }
        })

    } else if (radio == 3) {
        var totalProfit = $('#win_pre').val();
        $.ajax({
            url: '../lottery/calculator.do',
            data: {'awards': single_jj, 'using': touru, 'num': zhushu, 'planPeriods': periods,
                'multiple': beishu, 'type': '3', 'totalrate':totalProfit},
            dataType: 'json',
            type: 'post',
            success: function (res) {
                if (res.code == 1) {
                    var Jsq_nums = '';
                    for(var i=0; i<res.data.length; i++) {
                        Jsq_nums +=
                            '<ul>' +
                            '    <li class="li-1">'+res.data[i].periods+''+
                            '    </li>' +
                            '    <li class="li-2">' +
                            '        <input type="text" name="jsq_bs_1" size="3" maxlength="8" value="6" class="hide">' +
                            '        <span>'+res.data[i].multiple+''+
                            '        </span>倍' +
                            '    </li>' +
                            '    <li class="li-3">' +
                            '        <span>'+res.data[i].thisPrice+'</span>元' +
                            '    </li>' +
                            '    <li class="li-4">' +
                            '        <span>'+res.data[i].allPrice+'</span>元' +
                            '    </li>' +
                            '    <li class="li-5">' +
                            '        <span>'+res.data[i].winAwards+'</span>元' +
                            '    </li>' +
                            '    <li class="li-6">' +
                            '        <span>'+res.data[i].allAwards+'</span>元' +
                            '    </li>' +
                            '    <li class="li-7">' +
                            '        <span>'+res.data[i].profit+'</span>%' +
                            '    </li>' +
                            '</ul>' ;
                    }
                    $('.Jsq_nums').html(Jsq_nums);

                    if (res.data.length < periods) {
                        alert(res.data.length+'期之后投注倍数过大，不建议投注');
                    }
                } else {
                    alert(res.info);
                }
            }
        })
    } else if (radio == 4) {
        var prePeriods = $('#win_pre_i').val();
        var preProfit = $('#pre_win_pre').val();
        var nextProfit = $('#next_win_pre').val();

        if (parseInt(prePeriods) <= 0) {
            prePeriods = 1;
            $('#win_pre_i').val(1);
        }

        $.ajax({
            url: '../lottery/calculator.do',
            data: {'awards': single_jj, 'using': touru, 'num': zhushu, 'planPeriods': periods,
                'multiple': beishu, 'type': '4', 'prePeriods':prePeriods, 'preRate': preProfit, 'nextRate': nextProfit},
            dataType: 'json',
            type: 'post',
            success: function (res) {
                if (res.code == 1) {
                    var Jsq_nums = '';
                    for(var i=0; i<res.data.length; i++) {
                        Jsq_nums +=
                            '<ul>' +
                            '    <li class="li-1">'+res.data[i].periods+''+
                            '    </li>' +
                            '    <li class="li-2">' +
                            '        <input type="text" name="jsq_bs_1" size="3" maxlength="8" value="6" class="hide">' +
                            '        <span>'+res.data[i].multiple+''+
                            '        </span>倍' +
                            '    </li>' +
                            '    <li class="li-3">' +
                            '        <span>'+res.data[i].thisPrice+'</span>元' +
                            '    </li>' +
                            '    <li class="li-4">' +
                            '        <span>'+res.data[i].allPrice+'</span>元' +
                            '    </li>' +
                            '    <li class="li-5">' +
                            '        <span>'+res.data[i].winAwards+'</span>元' +
                            '    </li>' +
                            '    <li class="li-6">' +
                            '        <span>'+res.data[i].allAwards+'</span>元' +
                            '    </li>' +
                            '    <li class="li-7">' +
                            '        <span>'+res.data[i].profit+'</span>%' +
                            '    </li>' +
                            '</ul>' ;
                    }
                    $('.Jsq_nums').html(Jsq_nums);

                    if (res.data.length < periods) {
                        alert(res.data.length+'期之后投注倍数过大，不建议投注');
                    }
                } else {
                    alert(res.info);
                }
            }
        })
    } else {
        alert('请选择计算方式');
    }
}


//生成
$(document).on('dblclick', '#mc-list-right-cont ul li', function () {
    var index = $(this).index();
    $('#mc-list-right-cont ul li').each(function () {
        if ($(this).index() == index) {
            if ($(this).hasClass('li_new')) {
                $(this).removeClass('li_new');
            } else {
                $(this).addClass('li_new');
            }
        }
    });
    $('#mc-list-right-t li').each(function () {
        if ($(this).index() == index) {
            if ($(this).hasClass('li_new')) {
                $(this).removeClass('li_new');
            } else {
                $(this).addClass('li_new');
            }
        }
    });
});

$(document).on('dblclick', '.yl_data ul li', function () {
    $('#mc-list-right-cont ul li').each(function () {
        if ($(this).hasClass('li_new')) {
            $(this).removeClass('li_new');
        }
    });

    $('#mc-list-right-t li').each(function () {
        if ($(this).hasClass('li_new')) {
            $(this).removeClass('li_new');
        }
    });

    var index = $(this).index();
    var rj_index = '';

    $('.yl_data ul li').each(function () {
        if ($(this).index() == index) {
            if ($(this).hasClass('li_new')) {
                $(this).removeClass('li_new');
            } else {
                $(this).addClass('li_new');
            }
            if ($(this).parent().hasClass('rj_index')) {
                rj_index = $(this).text();
            }
        }
    });

    if (rj_index != '') {
        $('#mc-list-right-cont ul li').each(function () {
            if ($(this).index() == parseInt(rj_index)-1) {
                if ($(this).hasClass('li_new')) {
                    $(this).removeClass('li_new');
                } else {
                    $(this).addClass('li_new');
                }
            }
        });
        $('#mc-list-right-t li').each(function () {
            if ($(this).index() == parseInt(rj_index)-1) {
                if ($(this).hasClass('li_new')) {
                    $(this).removeClass('li_new');
                } else {
                    $(this).addClass('li_new');
                }
            }
        });
    }
});

//鼠标拖动
var $SCdialog = $("#Sc-box");
var isSCDraging = false;

//鼠标按下
$("#sc_title").mousedown(function(e){
    e = e || window.event;
    mx = e.pageX;     //点击时鼠标X坐标
    my = e.pageY;     //点击时鼠标Y坐标
    dx = $SCdialog.offset().left;
    dy = $SCdialog.offset().top;
    isSCDraging = true;      //标记对话框可拖动
});

//鼠标移动更新窗口位置
$(document).mousemove(function(e){
    var e = e || window.event;
    var x = e.pageX;      //移动时鼠标X坐标
    var y = e.pageY;      //移动时鼠标Y坐标
    if(isSCDraging){        //判断对话框能否拖动
        var moveX = dx + x - mx;      //移动后对话框新的left值
        var moveY = dy + y - my;      //移动后对话框新的top值
        //设置拖动范围
        var pageW = $(window).width();
        var pageH = $(window).height();
        var dialogW = $SCdialog.width();
        var dialogH = $SCdialog.height();
        var maxX = pageW - dialogW;       //X轴可拖动最大值
        var maxY = pageH - dialogH;       //Y轴可拖动最大值
        moveX = Math.min(Math.max(0,moveX),maxX);     //X轴可拖动范围
        moveY = Math.min(Math.max(0,moveY),maxY);     //Y轴可拖动范围
        //重新设置对话框的left、top
        $SCdialog.css({"left":moveX + 'px',"top":moveY + 'px'});
    };
});

//鼠标离开
$("#sc_title").mouseup(function(){
    isSCDraging = false;
});

//进入生成页面

//点击步骤一
$(document).on('click', '#buzhou1', function () {
    var rep_num = $('#Sc-dmzh').text().replace('\n', ';').split(';');
    var rep_text = '';
    if ($('#Sc-dmzh').text() != '') {
        for (var i=0; i<rep_num.length; i++) {
            rep_text += ''+rep_num[i]+'=0 /胆码容错/ <br>';
        }
        $('#Sc-dmgs').html(rep_text+'区段容错：0-0');
    }
});

$(document).on('click', '#sc_hm', function () {
    getnum();
});

function getnum() {
    var rep_num = $('#Sc-dmzh').text().replace('\n', ';').split(';');
    var rep_text = '<p tag="1514371656149">条件<font>1</font>：<a href="javascript:" class="red">清除</a><br>';
    if ($('#Sc-dmzh').text() != '') {
        for (var i=0; i<rep_num.length; i++) {
            rep_text += ''+rep_num[i]+'=0 /胆码容错/ <br>';
        }
        $('#Sc-hztj').html(rep_text+'区段容错：0-0');
    }
    if ($('#Sc-dmzh').text().replace('\n', ',') == '') {
        alert('请先选择胆码组合');
        return ;
    }
    $.ajax({
        url: '../lottery/getnum.do',
        dataType: 'json',
        data: {'repnum': $('#Sc-dmzh').text().replace('\n', ',')},
        type: 'post',
        success: function (res) {
            if (res.code == 1) {
                var nums = '';
                for (var i=0; i<res.data.length; i++) {
                    nums += res.data[i]+'\n';
                }
                $('#Sc-jieguo').text(nums);
                $('#Sc-jieguo-num').text(res.data.length+'注');
            } else {
                alert(res.info);
            }
        }
    })
}

//点击步骤二
$(document).on('click', '#buzhou2', function () {
    if ($('#Sc-dmgs').html() == '') {
        alert('请先执行步骤一');
        return ;
    }
    getnum();
});

$(document).on('click', '#Sc-add-fa', function () {
    gethanging();
});

$(document).on('click', '#gd_yz', function () {
    gethanging();
});

$(document).on('click', '#clean_hanging', function () {
    $('#Sc-yz-list').html('');
    $('#Sc-yz-cont').text('');
});

$(document).on('click', '#clean_all', function () {
    $('#Sc-yz-list').html('');
    $('#Sc-yz-cont').text('');
    $('#Sc-dmgs').html('');
    $('#Sc-hztj').html('');
    $('#Sc-jieguo-num').text('');
    $('#Sc-jieguo').text('');
});



function gethanging() {
    var cityid = GetQueryString('cityid');
    var pagenum = $('#Yz_guoqu_n').val();
    $.ajax({
        url: '../lottery/gethanging.do',
        dataType: 'json',
        data: {'repnum': $('#Sc-dmzh').text().replace('\n', ','), 'pagenum': pagenum, 'cityid':cityid},
        type: 'post',
        success: function (res) {
            if (res.code == 1) {
                console.log(res);
                var nums = '';
                var lottery = res.data.lotteryList;
                for (var i=0; i<lottery.length; i++) {
                    var index = i+1;
                    if (lottery[i].hanging == 99) {
                        nums +=
                            '<p>('+index+')'+
                            '   <font color="#0088D0">'+lottery[i].preperiods+'</font>-'+lottery[i].nextperiods+'-<font class="red">'+lottery[i].num+'</font>' +
                            ' --- <span class="bold red">中</span>' +
                            '</p>';
                    } else {
                        nums +=
                            '<p>('+index+')'+
                            '   <font color="#0088D0">'+lottery[i].preperiods+'</font>-'+lottery[i].nextperiods+'-<font class="red">'+lottery[i].num+'</font>' +
                            ' --- <span class="bold">'+lottery[i].hanging+'</span>' +
                            '</p>';
                    }
                }
                var text =
                    '中：'+res.data.winCount+'\n' +
                    '挂：'+res.data.hangingCount+'\n' +
                    '最大连挂：'+res.data.maxhanging+'';
                $('#Sc-yz-list').html(nums);
                $('#Sc-yz-cont').text(text);
            } else {
                alert(res.info);
            }
        }
    })
}

