$(function(){

    //图片轮播
    (function(){
        var $slideWin     = $('#slide_player'),
            $slideBox 	  = $('#slide_box'),
            $slideBtnBox  = $('#slide_btn'),
            $li           = $slideBox.find('li'),
            $slideBtn, page	 = 5, index  = 1,
            liLen         = $li.length,
            slideWinWidth =  $slideWin.outerWidth();
        $prev =  $('#slidePrev'),
            $next =  $('#slideNext'),
            scrollWidth = 910;
        slideBtnLen = Math.ceil(liLen/page);

        if (liLen > 0){
            for (i=0;i<slideBtnLen;i++){
                $slideBtnBox.append('<a class="b2" href="javascript:;"></a>');
            }
            $slideBtn = $slideBtnBox.find('a');
            $slideBtnBox.find('a:first').addClass('b1').removeClass('b2');
        }else{
            return false;
        }
        $prev.click(function(){
            var self = $(this);
            prev(self);
        });
        $next.click(function(){
            var self = $(this);
            next(self);
        });
        $slideBtn.click(function(){
            index = $(this).index();
            $slideBox.animate({'left':"-" + scrollWidth*index},600);
            btnStyle(index);
            index++
        });
        function prev(obj){
            index--;
            if(index == 1) {
                index = 1;
                btnStyle(index-1);
            }else if (index < 1){
                $slideBox.animate({'left':"-" + scrollWidth * (slideBtnLen-1)},-400);
                index = slideBtnLen;
                btnStyle(index)
            }
            btnStyle(index-1);
            if(!$slideBox.is(':animated')){
                $slideBox.animate({'left':"+=" + scrollWidth},600);
            }

        };
        function next(obj){
            if(index >= slideBtnLen) {
                $slideBox.animate({'left':0},0)
                index = 1;
                btnStyle(index-1);
                return false;
            }
            if(!$slideBox.is(':animated')){
                $slideBox.animate({'left':"-=" + scrollWidth},600,function(){
                    btnStyle(index);
                    index++
                });
            }

        };
        //自动播放
        var $pageBtn = $('.scroll_btn');
        clearEvent($slideBox);
        clearEvent($slideBtnBox);
        clearEvent($pageBtn);
        timer = setInterval(next,2000)
        function clearEvent(obj){
            var $obj = obj;
            $obj.hover(function(){
                clearInterval(timer)
            },function(){
                timer = setInterval(next,2000)
            })
        };
        function btnStyle(index){
            $slideBtn.eq(index).addClass('b1').removeClass('b2').siblings().removeClass('b1').addClass('b2');
        }
    })()

})