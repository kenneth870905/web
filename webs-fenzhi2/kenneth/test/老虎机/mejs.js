!function(N,M){function L(){var a=I.getBoundingClientRect().width;a/F>540&&(a=540*F);var d=a/10;I.style.fontSize=d+"px",D.rem=N.rem=d}var K,J=N.document,I=J.documentElement,H=J.querySelector('meta[name="viewport"]'),G=J.querySelector('meta[name="flexible"]'),F=0,E=0,D=M.flexible||(M.flexible={});if(H){var C=H.getAttribute("content").match(/initial\-scale=([\d\.]+)/);C&&(E=parseFloat(C[1]),F=parseInt(1/E))}else{if(G){var B=G.getAttribute("content");if(B){var A=B.match(/initial\-dpr=([\d\.]+)/),z=B.match(/maximum\-dpr=([\d\.]+)/);A&&(F=parseFloat(A[1]),E=parseFloat((1/F).toFixed(2))),z&&(F=parseFloat(z[1]),E=parseFloat((1/F).toFixed(2)))}}}if(!F&&!E){var y=N.navigator.userAgent,x=(!!y.match(/android/gi),!!y.match(/iphone/gi)),w=x&&!!y.match(/OS 9_3/),v=N.devicePixelRatio;F=x&&!w?v>=3&&(!F||F>=3)?3:v>=2&&(!F||F>=2)?2:1:1,E=1/F}if(I.setAttribute("data-dpr",F),!H){if(H=J.createElement("meta"),H.setAttribute("name","viewport"),H.setAttribute("content","initial-scale="+E+", maximum-scale="+E+", minimum-scale="+E+", user-scalable=no"),I.firstElementChild){I.firstElementChild.appendChild(H)}else{var u=J.createElement("div");u.appendChild(H),J.write(u.innerHTML)}}N.addEventListener("resize",function(){clearTimeout(K),K=setTimeout(L,300)},!1),N.addEventListener("pageshow",function(b){b.persisted&&(clearTimeout(K),K=setTimeout(L,300))},!1),"complete"===J.readyState?J.body.style.fontSize=12*F+"px":J.addEventListener("DOMContentLoaded",function(){J.body.style.fontSize=12*F+"px"},!1),L(),D.dpr=N.dpr=F,D.refreshRem=L,D.rem2px=function(d){var c=parseFloat(d)*this.rem;return"string"==typeof d&&d.match(/rem$/)&&(c+="px"),c},D.px2rem=function(d){var c=parseFloat(d)/this.rem;return"string"==typeof d&&d.match(/px$/)&&(c+="rem"),c}}(window,window.lib||(window.lib={}));


// 代码开始
$(function () {
    var prizeList = [
                        {"prizeid": "2001", "prizename": "3G流量兑换券"},
                        {"prizeid": "2002", "prizename": "1元话费兑换券"},
                        {"prizeid": "2003", "prizename": "3G流量兑换券"},
                        {"prizeid": "2004", "prizename": "1G流量兑换券"},
                        {"prizeid": "2005", "prizename": "1G流量兑换券"},
                        {"prizeid": "2006", "prizename": "2元话费满赠券"},
                        {"prizeid": "2007", "prizename": "1元话费兑换券"},
                        {"prizeid": "2008", "prizename": "0.5元话费兑换券"},
                        {"prizeid": "2009", "prizename": "2元话费满赠券"},
                        {"prizeid": "2010", "prizename": "1元话费兑换券"},
                        {"prizeid": "2011", "prizename": "2元话费满赠券"}
                    ];

    var the_hei = parseInt($('.rotate_btn').css('height'));
    var rotateDd = $('.rotate_box dd');
    var ddHei = rotateDd.height();
    rotateDd.css('backgroundSize', '100% ' + prizeList.length * ddHei + 'px');

    $('.rotate_btn').click(function () {
        var _this = $(this);
        if (!_this.hasClass('act')) {
            !_this.addClass('act');
            methods.star_animate.call(this);

            // 如果需要请求ajax  解注释ajax部分  并把PART1和PART2部分注释掉
            // $.ajax({
            //     url: '',
            //     data: {},
            //     type: '',
            //     success: function (data) {
            //         // data用来判断是否已经摇奖
            //         if (data) {
            //             if (true) {   // 中奖的情况
            //                 var prizeNum = methods.getDataIndex({prizename: '1元话费券', prizeid: 10001});      /*getDataIndex参数为后台传过来的中奖数据*/
            //                 $('.rotate_box dd').rotate(prizeNum);
            //             }else{      // 未中奖的情况
            //                 $('.rotate_box dd').rotate(methods.getRandom(3))
            //             }
            //         }
            //     }
            // })

            // PART1
            //  未中奖  本地测试
            $('.rotate_box dd').rotate(methods.getRandom(11), function () {
                $('.mask').show().click(function () {
                    $(this).hide();
                })
            })

            // PART2
            // 本地测试 模拟ajax传回数据
            // var prizeNum = methods.getDataIndex({"prizeid": "2008", "prizename": "0.5元话费兑换券"});/*getDataIndex参数为后台传过来的中奖数据*/
            // $('.rotate_box dd').rotate(prizeNum, function () {
            //     $('.mask').show().find('.guide').show().siblings().hide();
            // });

        }
    })

    $.fn.extend({
        rotate: function (num, callback) {
            var zjNum = num;
            console.log(zjNum);
            $(this).each(function (index) {
                var f = $(this);
                setTimeout(function () {
                    f.animate(
                        {backgroundPositionY: -(ddHei * prizeList.length * 5 + zjNum[index] * ddHei)},
                        {
                            duration: 6000 + index * 1000,
                            easing: 'easeInOutCirc',
                            complete: function () {
                                if (index === 2) {
                                    $('.rotate_btn').removeClass('act');
                                    if (callback) {
                                        setTimeout(function () {
                                            callback();
                                        }, 1000)
                                    }
                                }
                                f.css('backgroundPositionY', -(zjNum[index] * ddHei))
                            }
                        }
                    )
                }, index * 1000)
            })
        }
    })

    var methods = {
        star_animate: function () {
            var _this = $(this);

            _this.animate({
                height: the_hei / 2
            }, 100, 'linear');

            _this.animate({
                height: the_hei
            }, 1000, 'easeOutBounce');

        },
        getRandom: function (num) {
            var arr = [],
                _num = 3;
            do {
                var val = Math.floor(Math.random() * num);
                if (arr.indexOf(val) < 0) {
                    arr.push(val);
                    _num--
                }
            }
            while (_num > 0);
            return arr
        },
        getDataIndex: function (val) {
            var prizeMsg = val,
                _index,
                arr = [];
            for (var i = 0; i < prizeList.length; i++) {
                $.each(prizeList[i], function () {
                    if (prizeList[i]['prizeid'] === prizeMsg['prizeid']) {
                        _index = i;
                    }
                })
            }
            for (var y = 0; y < 3; y++) {
                arr.push(_index);
            }
            return arr;
        }
    }

})