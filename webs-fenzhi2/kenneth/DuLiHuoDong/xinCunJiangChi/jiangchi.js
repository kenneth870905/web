$(function () {
    $('.popup .close').bind('click', closeDraw);
    $(document).on('click', '#draw_once', function(e) {
        var isOk = $(this).attr('data-isOk'),
            that = this;
        if(isOk=='false') return;
        $(this).attr('data-isOk','false');
        startDraw().then(function(res){
            var timer = setTimeout(function(){
                $(that).attr('data-isOk','true');
                clearTimeout(timer);
            },1000);
            drawAnimate(res);
        });
    });
    $(document).on('click', '#draw_multi', function(e) {
        var isOk = $(this).attr('data-isOk'),
            that = this;
        if(isOk=='false') return;
        $(this).attr('data-isOk','false');
        var num = this.getAttribute('data-number');
        num && startDraw(num).then(function (res) {
            var timer = setTimeout(function(){
                $(that).attr('data-isOk','true');
                clearTimeout(timer);
            },1000);
            drawAnimate(res);
        });
    });
    // 重置抽奖界面
    $(document).on('click', '#reset', resetDraw);

    // 重置抽奖界面
    function resetDraw(e){
        $('.choujiang .result_money').fadeOut(300, function () {
            $('.choujiang .foot').fadeIn(300);
        });
        $('.drawing').removeClass('done');
        $('.draw_result').fadeOut(300);
        $('.drawing .disc')[0].style.cssText = '';
    }

    //关闭抽奖层
    function closeDraw(){
        $(this).closest('.popup').hide();
        resetDraw();
        getPoolInfo();
        anime({
            targets: '#popup_draw .popup-content',
            scale: [
                { value: 1, duration: 100, easing: 'easeOutExpo' },
            ]
        });
        anime({
            targets: '#popup_history .popup-content',
            scale: [{ value: 1, duration: 100, easing: 'easeOutExpo' }]
        });
    }

    var refreshPoolTimer = null;
    var SECOND = 1000;
    var MINUTE = SECOND * 60;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var START_DAY = '2020-01-16 00:00:00'; 
    var END_DAY = '2020-02-06 00:00:00';
    function getPoolInfo() {
        $.invoke_api({GetGQPrizePoolInfo:{}})
            .then(function (res) {
                 //res = {"Status":1,"row":{
                 //    "PoolAmount":2000000.0, //总奖池剩余金,
                 //    "CashAmount": 54872,
                 //    "Amount":8.0, //礼金,
                 //    "overCount":1,//已领次数,
                 //    "Count":2 //可领次数
                 //},"serverTime":"2019-10-02T15:59:00.6574298Z"};
                var time = res.serverTime;
                //time = "2019-10-09T05:25:58.6574298Z"
                howToCounting(time);
                var row = res.row;
                if (row) {
                    var ordered = [row.CashAmount, row.overCount + row.Count, row.overCount, row.Amount];
                    $('#tr_numbers b').each(function (i, b) {
                        b.innerText = ordered[i];
                    });
                    $('#btn_draw').attr('data-number', row.Count).find('span').text(row.Count);
                    $('#btn_draw').prop('disabled', (row.Count > 0 && row.PoolAmount > 0) ? false : true);
                    $('#show_history').prop('disabled', (row.overCount > 0 ) ? false : true);
                }

            });
    }
    // 有接口了注释这句，并启用后3行
     //howToCounting();
    getPoolInfo();
    refreshPool();
    announce();
    function howToCounting(time) {
        time = time || getServerDate();
        var _START_DAY = moment(START_DAY),
            _END_DAY = moment(END_DAY);
        if (moment(time).isBefore(_START_DAY)) {
            $('#time_tip').html('距离活动开始时间还有');
            startCounting(getFormatData(START_DAY) - getFormatData(time));
        } else if (moment(time).isBefore(_END_DAY)) {
            startCounting(getFormatData(END_DAY) - getFormatData(time));
        } else if (moment(time).isAfter(_END_DAY)) {
            clearTimeout(refreshPoolTimer);
            $('#time_tip').html('已结束');
            $('#time').hide();
            //$('.info .djs').css({'background':'none'});
        }
    }

    function getFormatData(time) {
        if (!!time)
            return parseInt(moment(time).format('X'))*1000;
    }
    // 金额对应的奖牌
    var PRIZE_MAP = {
        1: 'gray',
        8: 'yellow',
        18: 'red',
        28: 'red',
        38: 'red',
        68: 'red',
        88: 'red',
        128: 'green',
        188: 'green',
        268: 'green',
        388: 'green',
        888: 'green',
        1288: 'blue',
        1888: 'blue',
        2888: 'blue',
        small: 'purplered',
        large: 'purple'
    };
    $('#show_history').on('click', showHistory);
    $('#btn_draw').on('click', showDraw);

    function showDraw() {
        $('#popup_draw').show().css({
            "position":"fixed",
        });
        var alternate = anime({
            targets: '#popup_draw .popup-content',
            scale: [
                { value: 0.75, duration: 800, easing: 'easeOutExpo' },
            ]
        });

        countCanDraw(this.getAttribute('data-number'));
    }

    function showHistory() {
        $('#popup_history').show().css({ 'position': 'fixed' });
        var alternate = anime({
            targets: '#popup_history .popup-content',
            scale: [{
                value:   0.75,
                duration: 800,
                easing: 'easeOutExpo',
            }]
        });
        $.invoke_api({GQPrizePoolAcceptLog:{}})
            .then(function (res) {
                // res =  {"Status":1,"row":[{"Amount":18.000 //礼金
                //  ,"ACTime":"2018-09-20T05:44:31.4Z"},{"Amount":18.000,"ACTime":"2018-09-20T05:44:31.4Z"}
                //  ],"serverTime":"2018-09-20T05:40:28.0721575Z"};
                var html = res.row.reduce(function (acc, r) {
                    acc += '<tr><td width="50%">' + moment(r.ACTime).format('MM/DD HH:mm')
                        + '</td><td>' + r.Amount + '</td></tr>';
                    return acc;
                }, '');
                if (!html) {
                    html = '<tr><td colspan="2">-没有抽奖历史-</td></tr>'
                }
                $('#tbody_history').html(html);
            })
    }

    var poolAnimation = function () {
            var realtime = { Amount: 2000000 };
        var $amount = $('#remain_amount');
        // $amount.text(nowMoney);
        return function (nowMoney) {
            $amount.text(nowMoney);
            // anime({
            //     targets: realtime,
            //     Amount: nowMoney,
            //     // round: 1,
            //     duration: 2000,
            //     easing: 'easeOutQuad',
            //     update: function() {
            //         $amount.text(realtime.Amount.toLocaleString())
            //     }
            // });
        }
    }();
    function refreshPool() {
        $.invoke_api({GQPrizePoolAmt:{}})
            .then(function (res) {
                // res = {"Status":1,"row":1999974.0,"serverTime":"2018-09-20T05:40:16.1894778Z"};
                // res.row -= Math.floor(Math.random() * 1000000);
                res.row = kbNumformat(res.row);
                poolAnimation(res.row);
                if (res.row <= 0) {
                    $('#btn_draw,#btn_once,#btn_multi').prop('disabled', true);
                }
                clearTimeout(refreshPoolTimer);
                refreshPoolTimer = setTimeout(refreshPool, 10000);
            })
    }
    function announce() {
        $.invoke_api({GetGQPrizePoolWinList:{}})
            .then(function (res) {
                // res = {"Status":1,"row":[{"UserACNT":"tb*e*"//账号
                //     ,"Amount":188.000 //礼金
                //     ,"ACTime":"2018-09-20T05:44:31.4Z"},{"UserACNT":"tb*abce*","Amount":18.000,"ACTime":"2018-09-20T03:21:31.4Z"}],
                //     "serverTime":"2018-09-20T05:40:28.0721575Z"
                // };
                var row = res.row;
                if (!row.length) return;
                var html = row.reduce(function (acc, li) {
                    acc += '<li>' + moment(li.ACTime).format('MM-DD HH:mm')
                        + '  恭喜会员 ' +li.UserACNT +' 抽中 <b>' + li.Amount + '</b> 元</li>';
                    return acc;
                }, '');
                $('#ul_announce').html(html);
                setTimeout(announceScroll, 3000);
            })
    }

    function announceScroll() {
        $('#ul_announce').fadeOut(300, function () {
            $('#ul_announce').append($('#ul_announce li:first-child'));
            $('#ul_announce').fadeIn(300);
        });

        setTimeout(announceScroll, 3000);
    }
    // 开始抽奖
    function startDraw(num) {
        num = num || 1;
        $('.drawing').addClass('run');
        $('.choujiang .foot').fadeOut(300);
        $('.choujiang .result_money').hide();
        return $.invoke_api({AcceptGQPrizePool: {ActCount: num}});
    }
    var DrawAnimation = null;
    function drawAnimate(res) {
        // 类型 0现金,1幸运加,2小财,3大财
        //  res = {"Status":1,"row":{"List":[
        //      {"rType":0,"Amount":188},
        //      {"rType":0,"Amount":18},
        //      // {"rType":0,"Amount":128},
        //      // {"rType":0,"Amount":38},
        //      // {"rType":0,"Amount":1228},
        //      // {"rType":0,"Amount":888},
        //      // {"rType":0,"Amount":8},
        //      // {"rType":0,"Amount":188},
        //      // {"rType":0,"Amount":8},
        //      // {"rType":0,"Amount":188}
        //  ],"Count":2},"serverTime":"2018-09-20T07:41:11.4683813Z"};
        if (res.Status !== 1) {
            return $('body').Dialog({
                type: "Err",
                title: "操作失败",
                messageTitle: res.Status === 1602 ? "奖池已抽完或未达到条件" : getMsg(res.Status),
                // message: '存款历史记录删除失败，请稍后重试！',
                buttons: [{
                    name: "确定",
                    callback: function () {
                        closeDialog(0);
                        location.reload();
                    }
                }],
                closeHandler: function () { closeDialog(0);location.reload();  }
            });
        }
        $('.popup .close').unbind('click');
        var row = res.row;
        var List = row.List;
        countCanDraw(row.Count);
        $('#draw_result').html(createTokens(List)).show();
        // return;
        // $('#draw_result').show();
        var size = 112;
            $('#draw_result .item .medal').addClass('unknown');
        if (List.length === 1) {
            // $('#draw_result').addClass('single');
        }
        if (DrawAnimation) {
            DrawAnimation.reset();
        }
        var total = row.List.reduce(function (acc, li) {
            acc += li.Amount;
            return acc;
        }, 0);
        $('#gotten').text(total);
        var len = List.length;
        var domBall = '#draw_result .item';
        if (len === 1) {
            DrawAnimation = anime({
                targets: '#draw_result .item',
                scale: [{ value: 2.5, duration: 1500 }, { value: 1.8, delay: 200 }],
                translateY: [{ value: 20, duration: 1500, delay: 1800 }],
                rotateY: [
                  {
                    value: 360,
                    duration: 1000,
                    easing: "easeInOutSine",
                    delay: 2100
                  }
                ],
                update: function(anim) {
                  if (Math.round(anim.progress) > 30 && $('.drawing').hasClass('run')) {
                    // this.showResult = true;

                    $('.drawing').removeClass('run');
                    anime({
                        targets: ['.drawing .disc'],
                        scale: 0,
                        opacity: 0,
                        duration: 400,
                        easing: 'easeOutQuad',
                        complete: function() {
                            $('.drawing').addClass('done');
                        }
                    });
                  }
                  if (Math.round(anim.progress) > 80) {
                    $('.medal', domBall).removeClass('unknown');
                    // if
                  }
                },
                complete: function(){
                    $('.result_money').show();
                    $('.popup .close').bind('click', closeDraw);
                    anime({
                        targets: '.result_money',
                        scale: [0,1],
                        opacity: [0,1],
                        duration: 800
                    });
                    getPoolInfo();
                }
              });
        }
        else {
            DrawAnimation = anime({
                targets: '#draw_result .item',
                duration: 2000,
                scale: [0, 1],
                translateX: [function(el, i, len) {
                    // 根据序号，总长度，算出牌子的偏移量
                    // i
                    // 1: size * 2,
                    // 2: size * 1,
                    // 3: size * 0,
                    // 4: size * -1,
                    // 5: size * -2,
                    // 6: size * 2,
                    // len
                    // 1: 1 -> size * 0 (len - 0) /2 - 0.5
                    // 2: 1 -> size * 0.5; 2 -> size *-0.5
                    // 3: 1 -> size * 1; 2 -> 0; 3 -> size * -1
                    // 4: 1 -> size * 1.5; 2 -> size * 0.5 ; 3-> size * -0.5; 4 -> size* -1.5;
                    // 5: 1 -> size * 2; 2 -> size * 1 ; 3-> 0; 4 -> size* -1; 5 -> size *-2
                    var s = i + 1;
                    var l = len;
                    if (s > 5 && l > 5) {
                        s = s%5;
                        l = l%5;
                    }
                    else if (s <= 5) {
                        if (l > 5) {
                            l = 5;
                        }
                    }
                    // s = s > 5 ? (s % 5) : s;

                    // if (l > 5) {
                    //     l = l % 5;
                    // }
                    console.log('i',i,'s',s,'len',len, 'l', l, '(l / 2 - (s - 0.5))',(l / 2 - (s - 0.5)))
                    return (l / 2 - (s - 0.5)) * size;
                    return (len / 2 - (i + 0.5)) * size;
                }, 0],
                translateY: [function(el, i) {
                    return i > 4 ? -112 : 0;
                }, 0],
                rotateY: {
                    value: function(el, i) {
                        setTimeout(function() {
                            $('.medal', el).removeClass('unknown');
                            // el.style.transform = 'none';
                            // console.log(el.style.transform);
                        }, (i + 1) * 300);
                        return [0, 360];
                    },
                    duration: 1000,
                    delay: function(el, i) {
                        // 这个 300 和 value 里的 300 对应
                        return (i + 1) * 300
                    },
                    complete: function(anim) {
                        // alert(1);
                        console.log(1)
                    }
                },
                delay: function(el, i) {
                    return i * 200
                },
                begin: function(anim) {
                    console.log(anim);
                    // anim.pause();
                },
                complete: function(anim) {
                    console.log('ccccccccccccc');
                    $('.drawing').removeClass('run');
                    $('.popup .close').bind('click', closeDraw);
                    anime({
                        targets: ['.drawing .disc'],
                        scale: 0,
                        opacity: 0,
                        duration: 400,
                        easing: 'easeOutQuad',
                        complete: function() {
                            $('.drawing').addClass('done');
                        }
                    });
                    $('.result_money').show();
                    anime({
                        targets: '.result_money',
                        scale: [0,1],
                        opacity: [0,1],
                        duration: 800
                    });
                    getPoolInfo();
                }
            })
        }

    }
    function countCanDraw(Count) {
        Count -= 0;
        $('.rest b').text(Count);
        if (Count <= 0) {
            $('#draw_once').prop('disabled', true);
            $('#draw_multi').prop('disabled', true);
        } else if (Count === 1) {
            $('#draw_once').prop('disabled', false);
            $('#draw_multi').prop('disabled', true);
        } else if (Count > 1) {
            $('#draw_once').prop('disabled', false);
            $('#draw_multi').prop('disabled', false);
        }
        var nextDraw;
        if (Count > 10) {
            nextDraw = 10;
        } else {
            nextDraw = Count % 10 ? (Count % 10) : 10;
        }

        $('#draw_multi b').text(nextDraw);
        $('#draw_multi').attr('data-number', nextDraw);

    }
    function createTokens(list) {
        var html = list.reduce(function (acc, li,i) {
            var icon = li.rType === 0 ? PRIZE_MAP[li.Amount] :
                (li.rType === 2 ? PRIZE_MAP['small'] : (li.rType === 3 ? PRIZE_MAP['large'] : PRIZE_MAP['1']));
            icon = icon || 'gray';
            acc += "<div class=\"item\">\n<div class=\"va-m medal unknown " + icon + "\"><div class=\"text\">" + (li.Amount === 1 ? '幸运<br/>加持' : li.Amount) + "</div></div>\n</div>";
            return acc;
        }, '');
        // console.log(html);
        return html;

    }
    function startCounting(time) {
        var pad0 = Util.pad0;
        return $('#counting').countingFormat(time, function(elem) {
            // alert('end')
            //location.reload();
            setTimeout(function () {
                console.log('done...');
                //howToCounting();
                getPoolInfo();
            }, 500);
        }, function (time) {
            var mtime = moment(time);
            return ['<span class="ss">%d</span>\
                    <span class="ss">%h</span>\
                    <span class="ss">%m</span>\
                    <span class="ss">%s</span>',
                    {
                        d: pad0(Math.floor(time / DAY)),
                        h:pad0(Math.floor((time % DAY) / HOUR)),
                        m:pad0(mtime.minutes()),
                        s:pad0(mtime.seconds())
                    }]
        });
    }



})