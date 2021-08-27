<template>
    <div>
        <van-nav-bar title="代理佣金" left-arrow @click-left="onClickLeft" />
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
    </div>
</template>

<script>
import { api_获取下级交易明细 } from "@/api/代理接口.js";
export default {
    data() {
        return {
            value1: 0,
            value2: "a",
            option1: [
                { text: "全部类型", value: 0 },
                { text: "提款", value: 1 },
                { text: "存款", value: 2 },
                { text: "转出", value: 3 },
                { text: "转入", value: 4 },
                { text: "支出", value: 5 },
                { text: "派奖", value: 6 },
                { text: "优惠", value: 7 },
                { text: "反水", value: 8 },
                { text: "彩金", value: 9 },
                { text: "推荐", value: 10 },
                { text: "返点", value: 11 },
                { text: "返佣", value: 12 },
                { text: "撤单", value: 13 },
            ],
           
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        获取数据(){
            // this.loading=true
            // this.error_1=false
            api_获取下级交易明细(this.query).then(x=>{
                console.log(x);
                this.list=[...this.list,...x.data.rows] ;
                this.total=x.data.total;
                // this.loading=false
            }).catch(err=>{
                // this.error_1=true
                // this.loading=false;
            })
        }
    },
     
};
</script>

<style>
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
.van-dropdown-menu__item{
    background: #eeeeee;
}

</style>