// var url = "http://10.10.27.150:3001/api/MApi/Activity/Post"
var url="/MApi/Activity/Post"
$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});
new Vue({
    el: "#vue",
    data() {
        return {
            // tkShow:'show',
            // tkClassName:"active",
            tkShow: '',
            tkClassName: "",
            type: 0,     //  0未开始 1 开始 2 已过时间
            typeText: ['距离抽奖开始时间还有', '距离抽奖结束时间还有', '本次活动已结束'],
            endTime: {
                d: "00",
                h: "00",
                m: "00",
                s: "00"
            },
            isback: false,
           
            正在开奖:false,
            抽中金额:0,
            init:false,
            //基本信息
            info:{
                Dml: 0,     //累计存款
                Count: 0,   //抽奖次数
                CountEnd: 0,    //已使用抽奖次数
                CountEndMoney: 0,   //已获得奖金
                TodayAccount: 0,    //今日可领取次数
                TotalAmount: 0, //奖池总金额    
            },
            // 文字轮播
            animateUp: false,
            listData: swiper,
            timer: null
        }
    },
    computed: {
        jiangChi2: function () {
            return new Intl.NumberFormat().format(this.info.TotalAmount)
        }
    },
    methods: {
        chouJiangTk: function () {
            var this2 = this
            $('body').addClass('noScroll');
            this.tkShow = 'show';
            setTimeout(function () {
                this2.tkClassName = 'active'
            }, 100);
        },
        close: function () {
            if(this.正在开奖){
                return
            }
            $('body').removeClass('noScroll');
            this.tkClassName = '';
            this.tkShow = false
        },
        choujiang2:function(index){

        },
        choujiang: function () {
            var this2 = this
            if(!this.init){
                Swal.fire({ title: "提示", width: 300, text: '正在初始化，请稍等！', confirmButtonText: "好的" })
                return
            }
            if (this.type == 0) {
                Swal.fire({ title: "提示", width: 300, text: '活动开始时间为2020/1/24，谢谢关注.您还可以关注本公司其他活动，感谢您的支持！', confirmButtonText: "好的" })
                return
            }
            if (this.type == 2) {
                Swal.fire({ title: "提示", width: 300, text: '活动已结束，谢谢关注.您还可以关注本公司其他活动，感谢您的支持！', confirmButtonText: "好的" })
                return
            }
            this.抽中金额=0
            this.正在开奖 = true
            $.post(url+'?id='+new Date().getTime(), {url:"/Activities/PrizePoolLog/OpenPrizePool"},function (data, textStatus, jqXHR) {
                console.log(data);
                var index = 0;
                var money = 0;
                if(data.code==0){
                    money = data.msg
                    this2.抽中金额 = data.msg
                }else {
                    this2.正在开奖 = false
                    Swal.fire({ icon: "warning", width: 320, text: data.msg, confirmButtonText: "好的" })
                    return
                }

                if(money==1){
                    index = 1
                }else if(money>=8 && money<=8){
                    index = 2
                }else if(money>=18 && money<=88){
                    index = 3
                }else if(money>=128 && money<=888){
                    index = 4
                }else if(money>=1288 && money<=2888){
                    index = 5
                }
                var ddHei = document.querySelector('.gundong li').clientHeight;
                var number = 8  //开奖列表
                var 开奖 = index
                var h = ddHei * number * 9
                $('.gundong>div:nth-child(1)').stop().animate({ 'margin-top': -(ddHei * number * 1) },{
                        duration: 1000 * 2,
                        easing: 'easeInQuad',
                        // easing: 'easeInCubic',
                    }
                ).animate({ 'margin-top': -(ddHei * number * 8) },{
                        duration: 1000 * 5,
                        easing: 'linear',
                    }
                ).animate({ 'margin-top': -(ddHei * number * 9 + 开奖 * ddHei) },{
                        duration: 1000 * 3,
                        // easing: 'easeOutCirc',
                        easing: 'easeOutCirc',
                        complete: function () {
                            console.log('结束了')
                            if(money!=0){
                                Swal.fire({ icon: "success", width: 320, text: '恭喜您抽中'+money+'元', confirmButtonText: "好的" })
                            }else{
                                Swal.fire({ icon: "warning", width: 320, text: '很遗憾没有中奖，感谢您的参与！', confirmButtonText: "好的" })
                            }

                            this2.正在开奖 = false
                            $(this).css('margin-top', -(开奖 * ddHei))
                            this2.基本信息()
                        }
                    }
                )
            });
            
        },
        daoJiShi: function () {
            var this2 = this
            // var d1 = '2020-02-04 00:00'
            // var d1 = t1.replace(/\-/g, "/");
            var date2 = new Date();
            //结束时间
            var date1 = new Date('2020/02/10 00:00');    //开始时间
            // 开始时间
            // var date4 = new Date('2020/01/24 24:00') //24:00在苹果手机上是NAN
            var date4 =  new Date('2020/01/24 00:00');
            // var date4 = new Date('2020/01/19 00:00');
            if (date4.getTime() > date2.getTime()) {
                this.type = 0
                var date3 = date4.getTime() - date2.getTime(); //时间差秒
            } else if (date4.getTime() < date2.getTime() && date1.getTime() > date2.getTime()) {
                this.type = 1
                var date3 = date1.getTime() - date2.getTime(); //时间差秒
            } else {
                this.type = 2
                this.endTime = {
                    d: "00",
                    h: "00",
                    m: "00",
                    s: "00"
                }
                setTimeout(function () {
                    this2.daoJiShi()
                }, 1000);
                return
            }

            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000));
            days = days > 9 ? days : '0' + days

            //计算出小时数
            var leave1 = date3 % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));
            hours = hours > 9 ? hours : '0' + hours

            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000));
            minutes = minutes > 9 ? minutes : '0' + minutes
            //计算相差秒数
            var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            seconds = seconds > 9 ? seconds : '0' + seconds
            this.endTime = {
                d: days,
                h: hours,
                m: minutes,
                s: seconds
            }

            setTimeout(function () {
                this2.daoJiShi()
            }, 1000);
            // ————————————————
            // 版权声明：本文为CSDN博主「Amanda_wmy」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
            // 原文链接：https://blog.csdn.net/Amanda_wmy/article/details/80105581
        },
        // 返回
        back: function () {
            window.history.go(-1)
        },
        lingQuCiShu: function () {
            var this2 = this
            $.post(url+'?id='+new Date().getTime(), { url: '/Activities/PrizePoolLog/GetHammer' }, function (data, textStatus, jqXHR) {
                console.log(data)
                if (data.code == 0) {
                    Swal.fire({ icon: "success", width: 320, text: '恭喜您领取成功！', confirmButtonText: "好的" })
                    this2.基本信息()
                }else{
                    Swal.fire({ icon: "error", width: 320, text: data.msg, confirmButtonText: "好的" })
                }
            });
        },
        //奖池基本信息 主要是用户抽奖信息
        基本信息:function(){
            var this2 = this
            $.post(url+'?id='+new Date().getTime(), {url:'/Activities/PrizePoolLog/GetPrizePoolInfo'},function (data, textStatus, jqXHR) {
                if(!data.code){
                    this2.info = data;
                }
            });
        },
        scrollAnimate: function () {
            var self = this
            self.animateUp = true
            setTimeout(function () {
                self.listData.push(self.listData[0])
                self.listData.shift()
                self.animateUp = false
            }, 1000)
        }
    },
    mounted: function () {
        var this2 = this
        this.daoJiShi()
        $.post(url+'?id='+new Date().getTime(), {url:'/Activities/PrizePoolLog/GetPrizePoolInfo'},function (data, textStatus, jqXHR) {
            this2.init = true
            if(data.code){
                Swal.fire({ icon: "warning", width: 320, text: data.msg, confirmButtonText: "好的" })
            }else{
                this2.info = data;
            }
        }).catch(function(){
            Swal.fire({ icon: "error", width: 320, text: '系统错误，请刷新再试！', confirmButtonText: "好的" })
        })
        // 
        // $.post(url+'?id=2', {url:"/Activities/PrizePoolLog/GetPrizePoolAmount"},function (data, textStatus, jqXHR) {
        //     console.log(data)
        // });
        // $.post(url+'?id=3', {url:"/Activities/PrizePoolLog/GetPrizePoolInfo"},function (data, textStatus, jqXHR) {
        //     console.log(data)      
        // });
        // $.post(url+'?id=4', {url:"/Activities/PrizePoolLog/GetHammer"},function (data, textStatus, jqXHR) {
        //     console.log(data)
        // });

  

        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        }
        this.isback = getQueryVariable('back')
        this2.timer = setInterval(this2.scrollAnimate, 5000)
    },
    destroyed: function () {
        this.timer = null
    }
})