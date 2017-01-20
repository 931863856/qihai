(function($,pageNum){
    //通过浏览器判断是否firefox browser
    var browser = window.navigator.userAgent.toLowerCase().indexOf('firefox');
    var ie_browser = window.navigator.userAgent.indexOf('MSIE') ;
    //li_idx为点击事件所产生的，当有点击事件的时候，他才有值，其值对应的是当前页面的索引值
    //wheel_id为滚轮事件所产生的，默认是0，即初始位置为第0页，对应为当前页面的索引值；
    //page_idx的作用是：无论是滚轮事件还是点击事件索产生的索引值，皆要赋值给page_idx,因为所有下一步将要进行的滚动页面操作将根据其索引值来进行定位；
    var li_idx,page_idx,wheel_id=0;
    var is_finished = true;

// 页面滚动方法
    var scrollFunc = function(event){
        var e = event || window.event; 
        e.preventDefault();
        if(is_finished){
            if(e.wheelDelta<0 || e.detail > 0){
                //直接是滚动事件开始的
                if(typeof(li_idx) == "undefined"){
                    if(wheel_id<pageNum){
                        page_idx = wheel_id;
                        scroll_nextP();
                    }
                }else{
                    //滚动前一次事件是点击事件
                    if(li_idx!=pageNum){
                        //滚动事件引用点击事件的上次点击li索引
                        page_idx = li_idx;
                        li_idx++;
                        scroll_nextP();
                    }                 
                }
            }else if(e.wheelDelta>0 || e.detail < 0){
                if(typeof(li_idx) == "undefined"){
                    if(wheel_id>0){
                        page_idx = wheel_id;
                        scroll_lastP();
                    }
                }else{
                    //滚动前一次事件是点击事件
                    if(li_idx!=0){
                        //滚动事件引用点击事件的上次点击li索引
                        page_idx = li_idx;
                        li_idx--;
                        scroll_lastP();
                    }                 
                }
            }
        }
    }

//滚动触发的事件函数 
    function scroll_nextP(){
        is_finished = false;
        page_idx++;
        wheel_id++;
        var page_offset_top = $('.index').eq(page_idx).offset().top;
        if (browser != -1 || ie_browser != -1) {
            $('body,html').animate({
                scrollTop:page_offset_top
            },1000)
        }else{
            $(document.body).animate({
                scrollTop:page_offset_top
            },1000)
        }
        setTimeout(function(){
            is_finished = true;
        },1000)
    }
    function scroll_lastP(){
        is_finished = false;
        page_idx--;
        wheel_id--;
        var page_offset_top = $('.index').eq(page_idx).offset().top;

        if (browser != -1 || ie_browser != -1) {
            $('body,html').animate({
                scrollTop:page_offset_top
            },1000)
        }else{
            $(document.body).animate({
                scrollTop:page_offset_top
            },1000)
        }
        
        setTimeout(function(){
            is_finished = true;
        },1000)
    }

// 注册滚轮事件方法
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

// 注销滚轮事件方法
    function concel_mousewheel(){
       //非IE 
        if(document.addEventListener && !document.attachEvent) { 
            if (browser != -1) {
                //FF绑定滚动事件 
                document.removeEventListener('DOMMouseScroll', scrollFunc);
            } else {
                //其他浏览器
               document.removeEventListener('mousewheel',scrollFunc); 
            }
        } 
        //IE
        else if(document.detachEvent && !document.removeEventListener){ 
            document.detachEvent('onmousewheel',scrollFunc); 
        }else{ 
            window.onmousewheel = ""; 
        }
    }

// 页面初始化注册绑定滚轮事件
    regist_mousewheel();

//页面刷新置顶
    if(browser != -1 || ie_browser != -1){
        $('body,html').animate({
            scrollTop:0
        },500)
    }else{
        $(document.body).animate({
            scrollTop:0
        },500)
    }



// // // // // // // // // // // // //  以下是点击事件，调用滚动事件和赋值参数（可以自行添加不同点击事件或者修改效果）// // // // // // // // // // // //  

//点击dotlist滑动页面 
    $('.dotList li').click(function(){
        li_idx = $(this).index();
        var index = $(this).index();
        var this_offset_top = $('.index').eq(index).offset().top;
        if(browser != -1 || ie_browser != -1){
             $('body,html').animate({
                scrollTop:this_offset_top
            },1000)
        }else{
            $(document.body).animate({
                scrollTop:this_offset_top
            },1000)
        }
    
    })

// 弹出详情遮罩层
    $('.home .container .row_detail .detail').click(function(){
        concel_mousewheel();
    })

// 退出详情遮罩层
    $('#mask .close').click(function(){
        regist_mousewheel();
    })
    $('#mask .modal-footer .btn').click(function(){
        regist_mousewheel();
    })

//点击进入视频遮罩
    $('.p1 .container .row .ct_block, .gy_block, .wlw_block, .cyl_block').on('click',function(){
        $('#videoembed').html($(this).children('div').eq(0).text());
        $('#huise').show();
        $('.p1 .title').css({
            opacity:'0'
        })
        $('.p1 .container .row .ct_block').css({
            opacity:'0'
        })
        concel_mousewheel();
    })

//点击退出视频遮罩
    $('.btn_close a').click(function(){
        $('#huise').fadeOut(200);
        $('.p1 .title').css({
            opacity:'1'
        })
        $('.p1 .container .row .ct_block').css({
            opacity:'1'
        })
        regist_mousewheel();
    })

//点击导航栏滚动
    $('.p1 .row.nav li').click(function(){
        li_idx = $(this).index() + 1;
        var _thisIdx = $(this).index() + 1;
        var this_offset_top = $('.index').eq(_thisIdx).offset().top;
        if(browser != -1 || ie_browser != -1){
            
            $('body,html').animate({
                scrollTop:this_offset_top
            },1000)
        }else{
            $(document.body).animate({
                scrollTop:this_offset_top
            },1000)
        }
    }) 

})(jQuery,4);
// pageNum是从0开始的，如果有多少页就传入n-1的值
//li_idx为点击事件所产生的，当有点击事件的时候，他才有值，其值对应的是当前页面的索引值
//wheel_id为滚轮事件所产生的，默认是0，即初始位置为第0页，对应为当前页面的索引值；
//page_idx的作用是：无论是滚轮事件还是点击事件索产生的索引值，皆要赋值给page_idx,因为所有下一步将要进行的滚动页面操作将根据其索引值来进行定位；
// 使用方法
// 点击事件所触发的滚动，事件结束后必须将点击对应的索引赋值给li_idx，这样才能同步所有的li_idx,本滚轮事件才不会乱而出错；