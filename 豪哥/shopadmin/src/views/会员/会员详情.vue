<template>
    <div>
        <el-page-header  @back="goBack" content="会员详情"></el-page-header>
        <div class="box_1">
            <div class="item">
                <jibenziliao />
            </div>
            <div class="item">
                <jifenbianhua />
            </div>
            <div class="item">
                <huiyuandingdan />
            </div>
            <div class="item">
                <xiajihuiyuan />
            </div>


        </div>
    </div>
</template>

<script>
import jibenziliao  from "./会员详情/基本资料.vue";
import jifenbianhua  from "./会员详情/积分变化.vue";
import huiyuandingdan  from "./会员详情/会员订单.vue";
import xiajihuiyuan  from "./会员详情/下级会员.vue";
export default {
    name:"",
    components:{
        jibenziliao,
        jifenbianhua,
        huiyuandingdan,
        xiajihuiyuan
    },
    data() {
        return {
          
        }
    },
    computed: {
    },
    methods: {
        goBack(){
            history.back()
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    margin: 0px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.box_1{
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px;
    .item{
        width: calc(50% - 8px) ;
        flex-shrink: 0;
        box-sizing: border-box;
        margin: 0px 0px 10px 0px;
        display: flex;
        >div{
            width: 100%;
            box-sizing: border-box;
        }
    }
    .item:nth-child(2n-1){
        // padding-right: 10px;
        margin-right: 5px;
    }
    .item:nth-child(2n){
        margin-left: 5px;
        // padding-left: 10px;
    }
}

</style>

