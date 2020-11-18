<template>
    <div class="开奖日历">

         <div class="投注" @click="$router.push('/buyLottery')">
            <img src="@/assets/img/bxtj/betting.6320e08.png" alt="">
        </div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
         </div>



        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">开奖日历报表</span>
            <span class="sqzj">&nbsp;</span>
        </div>
   
        <div class="content">
            <div ref="parent" class="parent">
                <ul class="header" >

                <!-- <ul class="header" :style="{backgroundImage: 'url('+皮肤区分.topimg+')'}"> -->
                    <li @click="切换(-1)"><span class="iconfont iconzuobian"></span></li>
                    <li class="zhong">{{月}}</li>
                    <li @click="切换(1)" class="iconfont iconyoubian"></li>
                </ul>
                <ul class="day 星期">
                    <li :style="style" v-for="(item, index) in 7" :key="index">星期{{item}}</li>
                </ul>
                <ul class="day">
                    <li :style="style" :class="item.本月 ? '当月':'上下月'" v-for="(item, index) in list" :key="index">{{item.day}}</li>
                </ul>
            </div>
            <!-- <input type="text" v-model="月">
            <button @click="确定()">确定</button> -->
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers';
export default {
    name: "",
    data() {
        return {
            QQID: "",
            message: "",
            上月天数: 0,
            当月天数: 0,
            上月最后星期: 0,
            list: [],
            月: "",
            style: {
            },
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
                // topimg:require('@/assets/img/kjrl/img_rlbg_top.b1c7c75.png')

            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
                // topimg:require('@/assets/img/kjrl/img_rlbg_top.b1c7c75.png')

            }
        }
    },
    components: { // 注册组件

    },
    created() {


    },
    mounted() {
        var date = new Date();
        this.月 = date.getFullYear() + '-' + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1));
        this.初始化(this.月);

        this.style = { height: this.$refs.parent.clientWidth / 7 + 'px' }
        console.log(this.$refs.parent.clientWidth)
        window.onresize = () => {
            this.style = { height: this.$refs.parent.clientWidth / 7 + 'px' }
        }
    },
    computed: {
        ...mapState({
            皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
    },

    methods: {
        返回() {//头部
            history.back()
        },
        确定() {
            this.初始化(this.月)
        },
        获取每月天数(time) {
            var date = new Date(time);
            //将当前月份加1，下移到下一个月
            date.setMonth(date.getMonth() + 1);
            //将当前的日期置为0，
            date.setDate(0);
            //再获取天数即取上个月的最后一天的天数
            var days = date.getDate();
            return days;
        },
        获取星期(time) {
            var date = new Date(time);
            return date.getDay()
        },
        初始化(time) {
            if (time) {
                var date = new Date(time)
            } else {
                var date = new Date();
            }
            this.当月天数 = this.获取每月天数(date);
            this.上月天数 = this.获取每月天数(this.月);
            var 星期 = this.获取星期(this.月 + '-01');
            this.第一天星期 = 星期 == 0 ? 7 : 星期
            var list = [];
            //假如上个月是最后一天 31 本月 第一天星期 1
            for (let i = this.第一天星期 - 1; i > 0; i--) {
                list.push({ '本月': false, day: this.上月天数 - i + 1 })
                // if(day){
                //     list.push({ '本月': false, day: this.上月天数 - i + 1 , 今天:true })
                // }else{
                //     list.push({ '本月': false, day: this.上月天数 - i + 1 , 今天:false})
                // }
            }
            for (let i = 1; i <= this.当月天数; i++) {
                list.push({ '本月': true, day: i });
            }
            let l = 42 - list.length;
            for (let i = 1; i <= l; i++) {
                list.push({ '本月': false, day: i })
            }
            this.list = list;
        },
        切换(t) {
            this.月 = this.getPreMonth(this.月, t)
            this.初始化(this.月);
        },
        getPreMonth(date, t) {
            // t表示上月下月
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            // var month2 = parseInt(month) - 1 ;
            var month2 = parseInt(month) + t;
            if (month2 == 0) {//如果是1月份，则取上一年的12月份
                year2 = parseInt(year2) - 1;
                month2 = 12;
            } else if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1
            }

            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;//月份填补成2位。
            }
            // var t2 = year2 + '-' + month2 + '-' + day2;
            var t2 = year2 + '-' + month2;
            return t2;
        }

    }

}


</script>
<style lang="scss" scoped>
.开奖日历 {
    background: #2f2f2f;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;

        .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(108);
        right: _vw(-2);
        z-index: 40;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .返回 {
        width: _vw(40);
        height: _vw(40);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        position: fixed;
        top: 50%;
        left: 0px;
        z-index: 30;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
        }
    }
    .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        line-height: _vw(35);
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(17);
        }

        .text {
            font-size: _vw(18);
        }
    }
    .content {
        padding-top: _vw(35);
        .parent {
            width: 90%;
            margin: 10px auto;
        }
        .day {
            background: #ffffff;
            display: flex;
            flex-wrap: wrap;
            // border-right: 1px solid #cccccc;
            // border-bottom: 1px solid #cccccc;
            
            > li {
                width: calc(100% / 7);
                line-height: _vw(30);
                box-sizing: border-box;
                border-left: 1px solid #cccccc;
                border-top: 1px solid #e4e1e1;
                text-align: center;
                &.当月 {
                    background: #ffffff;
                }
                &.上下月 {
                    background: #e6e6e6;
                    color:#cac8c8;
                }
            }
            li{
                 height: _vw(50) !important;
                 line-height: _vw(50);
                font-weight: 1000;
            }
        }
        .星期 {
            background: #2f2f2f;
            color: #ffffff;
            border-right:_vw(1) solid #5f5e5e;
            border-top:none;
            li {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                border-left-color: #4b4343;
            
            }
        }
        .header {
            display: flex;
            justify-content: space-between;
            background: url("~@/assets/img/kjrl/img_rlbg_top.b1c7c75.png")  no-repeat;
            background-size: 100% 100%;
            // width: 100%;
            height: _vw(50);
            color: #ffffff;
            padding:_vw(20) _vw(16) _vw(10) _vw(16);
            box-sizing: border-box;
             li{
                 line-height:_vw(20);
                 .iconfont{
                     font-size: _vw(14);
                     font-weight: 1000;
                     color:#ffffff;
                 }
             }
            .zhong{
                text-align: center;
                flex:1;
            }
        }
    }
}
</style>