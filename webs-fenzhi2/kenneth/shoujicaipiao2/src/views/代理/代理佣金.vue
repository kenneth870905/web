<template>
    <div class="agencyCommission">
        <!-- 头部标题 -->
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">代理佣金</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <!-- 点击今天弹出层 -->
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker :columns="columns" @cancel="onCancel" @confirm="onConfirm" show-toolbar />
            </van-popup>
            <!-- 选择时间弹出层 -->
            <van-popup v-model="showTime" position="bottom" :overlay="true">
                <van-datetime-picker v-model="currentDate" type="date" @cancel="onCancel" :max-date="maxDate" :min-date="minDate" @confirm="onConfirm" @change="Change" />
            </van-popup>

            <div class="时间选择栏">
                <div class="时间" @click="选择时间前()">{{timeFront}}</div>
                <span>至</span>
                <div  class="时间" @click="选择时间后()">{{timeQueen}}</div>
                <div class="time_date" @click="time()">
                    {{dateTime}}<span class="iconfont icon-icon-arrow-bottom2"></span>
                </div>
            </div>
            
            <div class="内容">
                <table class="table_1">
                    <thead class="header">
                        <tr>
                            <td>代理</td>
                            <td>投注金额</td>
                            <td>佣金</td>
                        </tr>
                    </thead>
                </table>
                <table>
                    <tbody class="tbody">
                        <tr v-for="(item, index) in 30" :key="index">
                            <td>佣金</td>
                            <td>佣金</td>
                            <td>佣金</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="底部">
                <span>佣金：0.00</span>
                <span>投注金额：0.00</span>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            num: 0,
            showTime: false,
            show: false,
            currentDate: new Date(),
            columns: ['今天', '昨天', '本周', '上周', '本月', '上月'],
            dateTime: "今天",
            timeFront: "",//前
            timeQueen: "",//后
            maxDate: new Date(),//时间选择最大时间
            minDate: new Date(2019, 1, 1),//时间选择最小时间
            ggg: "",
        }
    },
    created() {
        var timeAll = this.dataAll()
        var nowYear = timeAll.nowYear
        var nowMonth = timeAll.nowMonth
        var nowDay = timeAll.nowDay
        var strdate = nowYear + "-" + nowMonth + "-" + nowDay
        this.timeFront = strdate
        this.timeQueen = strdate

    },
    methods: {
        dataAll(nowYear, nowMonth, nowDay, nowDayOfWeek) {
            var now = new Date() //当前时间
            var nowDay = now.getDate(); //当前日
            if (nowDay < 10) {
                nowDay = "0" + nowDay;
            }
            var nowMonth = now.getMonth() + 1; //当前月
            if (nowMonth < 10) {
                nowMonth = "0" + nowMonth;
            }
            var nowYear = now.getYear(); //当前年  
            nowYear += (nowYear < 2000) ? 1900 : 0;
            var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天

            var lastMonthDate = new Date(); //上月日期
            lastMonthDate.setDate(1);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            var lastYear = lastMonthDate.getYear();
            var lastMonth = lastMonthDate.getMonth();


            return {
                nowYear: nowYear,
                nowMonth: nowMonth,
                nowDay: nowDay,
                nowDayOfWeek: nowDayOfWeek,

                lastMonth: lastMonth,
                lastYear: lastYear,
                lastMonthDate: lastMonthDate,
            }
        },



        formatDate(date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return (myyear + "-" + mymonth + "-" + myweekday);
        },
        getMonthDays(myMonth) {
            var timeAll = this.dataAll()
            var nowYear = timeAll.nowYear
            //  var nowMonth= timeAll.nowMonth
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        time() {//点击今天促发的函数
            this.ggg = 1;
            this.show = true;
        },

        // 确认触发得函数
        onConfirm(value, index) {
            if (this.ggg == 1) {// 判断底部弹出框的确认按钮onConfirm
                this.dateTime = value;
                if (value == "昨天") {
                    var today = new Date();
                    var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
                    var yesterday = new Date();
                    yesterday.setTime(yesterday_milliseconds);
                    var strYear = yesterday.getFullYear();
                    var strDay = yesterday.getDate();
                    var strMonth = yesterday.getMonth() + 1;
                    if (strMonth < 10) { strMonth = "0" + strMonth; }
                    if (strDay < 10) { strDay = "0" + strDay; }
                    var strYesterday = strYear + "-" + strMonth + "-" + strDay;
                    this.timeFront = strYesterday
                    this.timeQueen = strYesterday
                } else if (value == "上月") {
                    // 前框时间
                    var timeAll = this.dataAll()
                    var nowYear = timeAll.nowYear;
                    var lastMonth = timeAll.lastMonth;
                    var nowMonth = timeAll.nowMonth;
                    if (lastMonth == 11) {
                        var lastMonthStartDate = new Date(nowYear - 1, lastMonth, 1);
                    } else {
                        var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
                    }
                    var add = this.formatDate(lastMonthStartDate);
                    this.timeFront = add;

                    // 后框时间                
                    var nowYear1 = timeAll.nowYear;
                    if (lastMonth == 11) {
                        var lastMonthEndDate = new Date(nowYear1 - 1, lastMonth, this.getMonthDays(lastMonth));
                    } else {
                        var lastMonthEndDate = new Date(nowYear1, lastMonth, this.getMonthDays(lastMonth));
                    }
                    var bdd = this.formatDate(lastMonthEndDate);
                    this.timeQueen = bdd

                } else if (value == "本月") {
                    var timeAll = this.dataAll()
                    var nowYear = timeAll.nowYear;
                    var nowMonth = timeAll.nowMonth;
                    var monthStartDate = new Date(nowYear, nowMonth, 1);
                    var add = this.formatDate(monthStartDate);
                    this.timeFront = add;

                    var nowDay1 = timeAll.nowDay
                    var strdate = nowYear + "-" + nowMonth + "-" + nowDay1
                    this.timeQueen = strdate

                } else if (value == "本周") {
                    var timeAll = this.dataAll()
                    var nowYear = timeAll.nowYear
                    var nowMonth = timeAll.nowMonth
                    var nowDay = timeAll.nowDay
                    var nowDayOfWeek = timeAll.nowDayOfWeek
                    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
                    var add = this.formatDate(weekStartDate);
                    this.timeFront = add;

                    var strdate = nowYear + "-" + nowMonth + "-" + nowDay
                    this.timeQueen = strdate
                } else if (value == "上周") {
                    var timeAll = this.dataAll()
                    var nowYear = timeAll.nowYear
                    var nowMonth = timeAll.nowMonth
                    var nowDay = timeAll.nowDay
                    var nowDayOfWeek = timeAll.nowDayOfWeek
                    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
                    var add = this.formatDate(weekStartDate);
                    this.timeFront = add;

                    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
                    var bdd = this.formatDate(weekEndDate);
                    this.timeQueen = bdd;
                } else {
                    var timeAll = this.dataAll()
                    var nowYear = timeAll.nowYear
                    var nowMonth = timeAll.nowMonth
                    var nowDay = timeAll.nowDay
                    var strdate = nowYear + "-" + nowMonth + "-" + nowDay
                    this.timeFront = strdate
                    this.timeQueen = strdate
                }
                this.show = false;
            } else if (this.ggg == 2) { // 判断底部弹出框的确认按钮onConfirm
                this.showTime = false;
                var bb = this.Change()
                this.timeFront = bb
            } else if (this.ggg == 3) { // 判断底部弹出框的确认按钮onConfirm
                this.showTime = false;
                var bb = this.Change()
                this.timeQueen = bb
            }

        },
        onCancel() {//点击取消按钮触发得事件
            this.show = false;
            this.showTime = false;
        },
        选择时间前() {
            this.showTime = true;
            this.ggg = 2;
        },
        选择时间后() {
            this.showTime = true;
            this.ggg = 3;
        },
        Change() { //处理时间得格式得函数
            var date = this.currentDate;
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            return this.currentdate
        }
    },
}
</script>


<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
    .内容{
        flex-grow: 1;
        overflow: auto;
    }
}

.table_1{
    position: sticky;
    top:0px;
}
table {
    width: 100%;
    thead {
        width: 100%;
        position: sticky;
        top: 0px;
        tr {
            width: 100%;
            td {
                width: 33.33%;
                text-align: center;
                line-height: _vw(30);
                font-size: _vw(15);
                background: #bdbdbd;
                color: #fff;
                height: _vw(30);
            }
        }
    }
    .tbody {
        tr {
            width: 100%;
            td {
                width: 33.33%;
                text-align: center;
                line-height: _vw(26);
                font-size: _vw(13);
                color: #ccc;
                height: _vw(26);
            }
        }
        tr:nth-child(2n-1){
            background: #fff;
        }
    }
}

.时间选择栏 {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    background: #fff;
    height: _vw(40);
    align-items: center;
    padding:0px _vw(10);
    font-size: _vw(14);
    text-align: center;
    .时间{
        flex-grow: 1;
        border-bottom: 1px solid #cccccc;
    }
    .time_date {
        width: 70px;
    }
}

.底部{
    flex-shrink: 0;
    display: flex;
    line-height: _vw(44);
    background: $color;
    color: #fff;
    justify-content: space-around;
    font-size: _vw(12);
}


</style>
