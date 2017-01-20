var click_nav;
var wheel_index = 1;
$(function(){
    //nav点滑动距离
    var temp=62;
    // 右侧内容li上滑多少个100%；
    var _top = -100;
    var is_finished = true;
    var page_index = 1;
    var browser = window.navigator.userAgent.toLowerCase().indexOf('firefox');
    var ie_browser = window.navigator.userAgent.indexOf('MSIE') ;

// 滚轮监听判断并触发点击事件
    var scrollFunc = function(e){
        if (is_finished){
            e = e || window.event;
            if(e.wheelDelta<0 || e.detail>0){
                if (wheel_index<7){
                    wheel_index++;
                }else{
                    wheel_index = 1;
                }
                click_nav(wheel_index);
            }else if(e.wheelDelta>0 || e.detail<0){
                if (wheel_index>1){
                    wheel_index--;
                }else{
                    wheel_index = 7;
                }
                click_nav(wheel_index);
            }
        }
    };
    // 注册滚轮事件
    function regist_mousewheel(){
        //非IE 
        if(document.addEventListener && !document.attachEvent) { 
            if (browser != -1) {
                //FF绑定滚动事件 
                document.addEventListener('DOMMouseScroll', scrollFunc);
            } else {
                //其他浏览器
               document.addEventListener('mousewheel',scrollFunc); 
            }
        } 
        //IE
        else if(document.attachEvent && !document.addEventListener){ 
            document.attachEvent('onmousewheel',scrollFunc); 
        }else{ 
            window.onmousewheel = scrollFunc; 
        }
    }
    regist_mousewheel();

    click_nav = function click_nav(pid){
        is_finished = false;
        if(typeof(pid) == "undefined"){
            pid = 1;
        }
        // 设置当峰会时，切换中英文按钮及中间标题颜色为黑
        if(pid==5){
            $('.index_title').addClass('add_color');
            $('.container .right .switch_en').addClass('add_color');
            $('.arrow_next .spread_layer').addClass('add_color');
            $('.indexAll .right .switch_en .bg_hover').addClass('add_color');
            $('.arrow_next').css({
                'background-image':'url('+img_path+'/jiantouxia_1.png)'
            })
        }else{
            $('.index_title').removeClass('add_color');
            $('.container .right .switch_en').removeClass('add_color');
            $('.arrow_next .spread_layer').removeClass('add_color');
            $('.indexAll .right .switch_en .bg_hover').removeClass('add_color');
            $('.arrow_next').css({
                'background-image':'url('+img_path+'/jiantouxia.png)'
            })
        }
        // 设置左侧透明块滑动
        $('.mask').addClass("mask_go");
        setTimeout(function(){
            $('.mask').removeClass('mask_go');
        },800)

        //改变左侧透明块的颜色
        var bg_arr_opblock = ['#008ED0','#266EA9','#643ADD','#2079B6','#ECECEC','#EE7A30','#0095DA'];
        $('.container .left .mask').css({
            'background-color':bg_arr_opblock[pid-1]
        })
        // 更改首页背景图
        var bg_index = 2*(pid-1)+1;
        // console.log('bg_index:'+bg_index)
        var Url='url('+img_path+'/qihai'+bg_index+'.jpg)';
        $('.container').css({
            'background-image':Url,
            'background-size':'cover'
        })
        // 点滑动
        $('.point_at').stop().animate({
            'top':temp*(pid-1)+'px'
        })

        // 尾巴滑动
        $('.container .left .nav li').removeClass('op1').eq(pid-1).addClass('op1');
        $('.container .left .line_list .dot span').removeClass('dot_tail');
        $('.container .left .line_list .dot span').eq(pid-2).addClass('dot_tail');
        //改变当前下一页按钮颜色
        var bg_arr_btn = ['#008ED0','#266EA9','#643ADD','#2079B6','#ECECEC','#EE7A30','#0095DA'];
        $('.arrow_next').stop().css({
            'background-color':bg_arr_btn[pid-1]
        })
        //右侧滑动
        $('.right ul').stop().animate({
            'top':_top*(pid-1)+'%'
        },600) 
        var idx = _top*(pid-1)/(-100);
        if(_top==-700){
            _top=0;
        }
        $('.right ul .inner_box').removeClass('right_nowpage');
        $('.right ul .inner_box').eq(idx).addClass('right_nowpage');
        $('.right_nowpage span').each(function(i){
            var _this = $(this);
            _this.addClass('fade_text'+i);
        })
        setTimeout(function(){
            is_finished = true;
        },1000)

        page_index = pid;
    }

    $('.arrow_next').click(function(){
        wheel_index = page_index;
        if(wheel_index<7){
            wheel_index++;
            click_nav(wheel_index);
        }else{
            wheel_index = 1;
            click_nav(wheel_index);
        }
    })

    $('.container .left .nav li').click(function(){
        page_index = $(this).index()+1;
        click_nav(page_index);
        wheel_index = page_index;
    })

})
