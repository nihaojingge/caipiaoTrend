$(function(){
	//main top 玩法
	$(".mc-select-wf .mc-s-0 dt i").on("click",function(){
		$(this).parent().next().show();
	});

	$(".mc-select-wf .mc-s-0 dd a").on("click",function(){
		var txt = $(this).text();
		$(this).addClass("tag").siblings().removeClass("tag");
		$(this).parent().prev().find("span").text(txt);//赋值
		$(this).parent().hide();

		//联动处理
		if ($(this).parent().attr('value') == 'Kj_OrderType' ) {
            localStorage.setItem('shuju', txt);
		} else if ($(this).parent().attr('value') == 'Kj_l_list') {
			//任五
			if ($(this).attr('value') == '1') {
				$('.cx_num').text('0个号码');
                $('.Kj_pipei_z a').removeClass("tag");
				$('.Kj_pipei_z a').each(function () {
					if ($(this).attr('value') == '0') {
						$(this).addClass('tag');
					}
                })
			} else { //任二
                $('.cx_num').text('2个号码');
                $('.Kj_pipei_z a').removeClass("tag");
                $('.Kj_pipei_z a').each(function () {
                    if ($(this).attr('value') == '2') {
                        $(this).addClass('tag');
                    }
                })
			}
		} else if ($(this).parent().attr('value') == 'Kj_pipei_z') {
			//任五
            if ($(this).attr('value') == '0') {
                $('#kj_wanfa').text('任选五');
                $('.Kj_l_list a').removeClass("tag");
                $('.Kj_l_list a').each(function () {
                    if ($(this).attr('value') == '1') {
                        $(this).addClass('tag');
                    }
                })
            } else { //任二
                $('#kj_wanfa').text('任选二');
                $('.Kj_l_list a').removeClass("tag");
                $('.Kj_l_list a').each(function () {
                    if ($(this).attr('value') == '2') {
                        $(this).addClass('tag');
                    }
                })
            }
		}
	});
});

//滚动条滚动到124时div固定在顶部
window.onscroll=function(){
	var scroTop=document.documentElement.scrollTop || document.body.scrollTop;
	if(scroTop>124){
		$("#mc-select-piao-box").show();
		$("#mc-select-cz").show();
		$("#mc-select-piao").addClass("mc-select-piao-bg");
	}else{
		$("#mc-select-cz").hide();
		$("#mc-select-piao-box").hide();
		$("#mc-select-piao").removeClass("mc-select-piao-bg");
	}
};

//data thead 固定在顶部 
$(window).scroll(function(){
	var offsetTop=$(window).scrollTop();
	//console.log(offsetTop);
	if(offsetTop>145){
		$("#mc-list-left .mc-list-t,#mc-list-right .mc-list-t").css("top",offsetTop-42);
	}else{
		$("#mc-list-left .mc-list-t ,#mc-list-right .mc-list-t").css("top",0);
	}
});

//二次验证 data 固定在顶部
$("#Yz-2-list").scroll(function(){
	var offsetTop=$("#Yz-2-list").scrollTop();
	$(".Yz-2-list .ul-t").css("top",offsetTop)
})

//开奖倒计时
var tt = null;

function GetRTime(seconds) {

	window.clearInterval(tt);
	tt = setInterval(function () {
		seconds --;
        var h = Math.floor(seconds/1000/60/60%24);
		var m = Math.floor(seconds/60%60);
		var s = Math.floor(seconds%60);

		if (h > 0) {
            h = h<10?("0"+h):h;
            document.getElementById("t_h").innerHTML = h + "时";
		}

		if (m < 10) {
			m = '0'+m;
		}

        if (s < 10) {
            s = '0'+s;
        }


		document.getElementById("t_m").innerHTML = m + "分";
		document.getElementById("t_s").innerHTML = s + "秒";

		if (seconds<=0) {
			var autoKj = localStorage.getItem("autoKj");
			if (autoKj == 1) {
                $('#zidongkj_time').hide();
                $('#kjhm_zdy').hide();
                $('#zidongkj_text').show();
                window.clearInterval(tt);
			}
		}
    }, 1000);
}



