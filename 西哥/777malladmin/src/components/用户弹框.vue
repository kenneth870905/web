<template>
    <div>
        <el-popover placement="right" trigger="click" ref="popover">
            <slot slot="reference"></slot>
            <div class="list">
                <el-button type size="mini" @click="setTk('user')">会员信息</el-button>
                <el-button type size="mini" @click="setTk('Details')">资金明细</el-button>
                <el-button type size="mini" @click="setTk('WithdrawRecords')">提现记录</el-button>
                <el-button type size="mini">访问统计</el-button>
                <el-button type size="mini">会员银行卡</el-button>
                <el-button type size="mini">新建消息</el-button>
                <el-button type size="mini">资金汇总</el-button>
                <el-button type size="mini">返回明细</el-button>
                <el-button type size="mini">登录日志</el-button>
                <el-button type size="mini">访问日志</el-button>
                <el-button type size="mini">余额查询</el-button>
                <el-button type size="mini">在线充值</el-button>
                <el-button type size="mini">代理域名</el-button>
                <el-button type size="mini">退水明细</el-button>
                <el-button type size="mini">存款历史</el-button>
                <el-button type size="mini">取款历史</el-button>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    props: {
        userId: ""
    },
    inject:['showTk'],
    data() {
        return {
            showUserDetails:false,
            user:{},
            state:{
                0:'注册异常',
                1:'正常',
                '-1':'冻结'
            }
        }
    },
    methods: {
        setTk(type) {
            this.$refs.popover.doClose()
            this.showTk(type,this.userId)
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    // width: 400px;
    // display: flex;
    // flex-direction: column;
    // flex-wrap: wrap;
    // height: 300px;
    height: auto;
    display: grid;
    // grid-template-columns: 100px 100px 100px;
    grid-template-rows: repeat(10, auto);
    grid-auto-flow: column;
    justify-content: flex-start;
    .el-button {
        margin: 3px 3px;
        width: 125px;
        height: 28px;
    }
}


.UserDetails{
    margin: -10px 0px;
    font-size: 12px;
    .el-col{
        margin: 5px 0px;
        color: #000;
        span:nth-child(1){
            color: rgba($color: #000000, $alpha: 0.6);
        }
    }
    .color-1{
        color: red;
    }
}
</style>