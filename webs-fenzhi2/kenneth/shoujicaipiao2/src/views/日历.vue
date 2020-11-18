<template>
    <div>
        <div ref="parent" class="parent">
            <ul class="header">
                <li @click="切换(-1)">上月</li>
                <li>{{月}}</li>
                <li  @click="切换(1)">下月</li>
            </ul>
            <ul class="day 星期">
                <li :style="style" v-for="(item, index) in 7" :key="index">星期{{item}}</li>
            </ul>
            <ul class="day">
                <li :style="style" :class="item.本月 ? '当月':'上下月'" v-for="(item, index) in list" :key="index">{{item.day}}</li>
            </ul>
        </div>
        
        <input type="text" v-model="月">
        <button @click="确定()">确定</button>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            上月天数:0,
            当月天数:0,
            上月最后星期:0,
            list:[],
            月:"",
            style:{
            }
        }
    },
    methods: {
        确定(){
            this.初始化(this.月)
        },
        获取每月天数(time){
            var date=new Date(time);
            //将当前月份加1，下移到下一个月
            date.setMonth(date.getMonth()+1);
            //将当前的日期置为0，
            date.setDate(0);
            //再获取天数即取上个月的最后一天的天数
            var days=date.getDate();
            return days;
        },
        获取星期(time){
            var date=new Date(time);
            return date.getDay()
        },
        初始化(time){
            if(time){
                var date=new Date(time)
            }else{
                var date=new Date();
            }
            this.当月天数=this.获取每月天数(date);
            this.上月天数=this.获取每月天数( this.月 );
            var 星期 = this.获取星期( this.月 +'-01' );
            this.第一天星期 = 星期==0 ? 7 : 星期
            var list =[];
            //假如上个月是最后一天 31 本月 第一天星期 1
            for (let i = this.第一天星期-1 ; i > 0; i--) {
                list.push({'本月':false,day:this.上月天数 - i +1})
            }
            for (let i = 1; i <= this.当月天数; i++) {
                list.push({'本月':true,day:i});
            }
            let l = 42 - list.length;
            for (let i = 1; i <= l; i++) {
                list.push({'本月':false,day:i})
            }
            this.list=list;
        },
        切换(t){
            this.月 = this.getPreMonth(this.月 , t)
            this.初始化(this.月);
        },
        getPreMonth(date , t) {
            // t表示上月下月
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            // var month2 = parseInt(month) - 1 ;
            var month2 = parseInt(month) + t ;
            if (month2 == 0) {//如果是1月份，则取上一年的12月份
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }else if(month2==13){
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
    },
    mounted() {
        var date=new Date();
        this.月=date.getFullYear()+'-'+(date.getMonth()+1>9 ? date.getMonth()+1 : '0'+(date.getMonth()+1) );
        this.初始化(this.月);

        this.style = {height : this.$refs.parent.clientWidth / 7+'px'}

        window.onresize=()=>{
            this.style = {height : this.$refs.parent.clientWidth / 7+'px'}
        }
        // document.querySelector('div').clientWidth
    },
}
</script>

<style lang="scss" scoped>
.parent{
    width: 90%;
    margin: 10px auto;
}
.day{
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    >li{
        width: calc(100% / 7);
        box-sizing: border-box;
        border-left: 1px solid #cccccc;
        border-top: 1px solid #cccccc;
        text-align: center;
        &.当月{
            background: #ffffff;
        }
    }
}
.星期{
    li{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
}
.header{
    display: flex;
    justify-content: space-around;
}
</style>