/**
 * Created by Administrator on 2016/12/20.
 */
$(function(){
    //搜索切换
    (function(){
        var aLi=$("#menu li");
        var oText=$('#search').find('.form .text');
        var arrText=[
            '例如：樱花日本料理',
            '例如：万达广场',
            '例如：大地影院',
            '例如：谁是凶手',
            '例如：天气好个秋'
        ];
        var iNow=0;
        oText.val(arrText[0]);
        //aLi.each(function(index){
        //    $(this).click(function(){
        //        aLi.attr('class','gradient');
        //        $(this).attr('class','active') ;
        //        iNow=index;
        //        oText.val(arrText[iNow]);
        //    })
        //});
        aLi.click(function(index){
            aLi.attr('class','gradient');
            $(this).addClass('active');
            iNow=$(this).index();
             oText.val(arrText[iNow]);
        })
        oText.focus(function(){
//                   console.log(arrText[iNow]);
            if($(this).val()==arrText[iNow]){
                $(this).val('');
            }
        });
        oText.blur(function(){
            if($(this).val()==''){
                oText.val(arrText[iNow]);
            }
        })
    })();
    //文字滚动
    (function(){
        var oDiv=$('.update');
        var oUl=oDiv.find('ul');
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' }
        ];
        var str='';
        var LiH=0;
        var oBtnUp=$('#updateUpBtn');
        var oBtnDown=$('#updateDownBtn');
        var iNow=0;
        var timer=null;
        for(var i=0;i<arrData.length;i++){
            str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span> 写了一篇新文章：'+arrData[i].title+'…</a></li>'
        }
        oUl.html(str);
        LiH=oUl.find('li').height();
        oBtnUp.click(function(){
            doMove(-1)
        });
        oBtnDown.click(function(){
            doMove(1)
        });
        oDiv.hover(function(){
            clearInterval(timer);
        }, autoPlay);
        function autoPlay(){
            timer=setInterval(function(){
                doMove(-1)
            },2000)
        }
        autoPlay();
        function doMove(num){
            iNow+=num;
            if(Math.abs(iNow)>arrData.length-1){
                iNow=0;
            }
            if(iNow>0){
                iNow=-(arrData.length-1);
            }
            oUl.stop().animate({'top':LiH*iNow},2200,'elasticOut')
        }
    })();
    //options选项卡切换
    (function(){
        fnTab($('.tabNav1'),$('.tabCon1'),'click');
        fnTab($('.tabNav2'),$('.tabCon2'),'click');
        fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
        fnTab($('.tabNav4'),$('.tabCon4'),'mouseover');

        function fnTab(oNav,aCon,sEvent){
            var aElem=oNav.children();
            aCon.hide().eq(0).show();
            aElem.each(function(index){
                $(this).on(sEvent,function(){
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class','triangle_down_gray');
                    $(this).find('a').attr('class','triangle_down_red');
                    aCon.hide().eq(index).show();
                })
            })
        }

    })();
    //焦点图切换
    (function(){
        var oDiv=$('#fade');
        var aUlLi=oDiv.find('ul li');
        var aOlLi=oDiv.find('ol li');
        var oP=oDiv.find('p');
        var arr=['爸爸去哪儿','摄影光影','美艳动人'];
        var iNow=0;
        var timer=null;
        fnFade();
        autoPlay();
        aOlLi.click(function(){
            iNow=$(this).index();
            fnFade()
        });
        oDiv.hover(function(){
            clearInterval(timer);
        },autoPlay);
        function autoPlay(){
            timer=setInterval(function(){
                iNow++;
                iNow%=arr.length;
                fnFade();
            },1000)
        }
        function fnFade(){
            aUlLi.each(function(i){
                if(i!=iNow){
                    aUlLi.eq(i).fadeOut().css('zIndex',1);
                    aOlLi.eq(i).removeClass('active');
                }else {
                    aUlLi.eq(i).fadeIn().css('zIndex',2);
                    aOlLi.eq(i).addClass('active');
                }
            })
            oP.text(arr[iNow]);
        }

    })();
    //日历提示说明
    (function(){
        var aSpan=$('.calendar h3 span');
        var aImg=$('.calendar .img');
        var oPrompt=$('.today_info');
        var oImg=oPrompt.find('img');
        var oStrong=oPrompt.find('strong');
        var oP=oPrompt.find('p');
        aImg.hover(function(){
            var iLeft=$(this).parent().position().left+55;
            var iTop=$(this).parent().position().top-30;
            var num=$(this).parent().index()%aSpan.size();
            oPrompt.show();
            oPrompt.css({'left':iLeft,'top': iTop});
            oP.text($(this).attr('info'));
            oImg.attr('src',$(this).attr('src'));
            oStrong.text(aSpan.eq(num).text());

        }, function(){
            oPrompt.hide();
        })
    })();
    //BBS高亮
    (function(){
        var oLi=$('.bbs ol li');
        oLi.mouseover(function(){
            oLi.removeClass('active');
            $(this).addClass('active');
        })
    })();
    //热点鼠标提示
    (function(){
        var arr=[
            '',
            '用户1<br/>人气11',
            '用户名：性感宝贝<br/>区域：朝阳<br/> 人气：123456',
            '用户3<br/>人气111',
            '用户4<br/>人气11111',
            '用户5<br/>人气111111',
            '用户6<br/>人气1111111',
            '用户7<br/>人气11111111',
            '用户8<br/>人气111111111',
            '用户9<br/>人气1111111111',
            '用户10<br/>人气1111111111'
        ];
        $('.hot_area li').mouseover(function(){
            if($(this).index()==0) return;
            $('.hot_area li p').remove();
            $(this).append('<p style="width:'+ ($(this).width()-12) +'px;height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');

        })
    })(
    );
});