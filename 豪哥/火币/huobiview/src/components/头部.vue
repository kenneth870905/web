<template>
    <div>
        <ul class="价格">
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>BTC实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>ETH实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>HT实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>XRP实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>LTC实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>EOS实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="item">
                <div>买入价格:0000 0000</div>
                <div>USDT实时:0000 0000</div>
                <div>卖出价格:0000 0000</div>
            </li>
            <li class="input-box">
                <div>
                    <label for="">USTD买入汇率</label>
                    <el-input v-model="input1"></el-input>
                    <label for="">手续费</label>
                    <el-input v-model="input1"></el-input> 
                </div>
                <div>
                    <label for="">USTD卖出汇率</label>
                    <el-input v-model="input1"></el-input>
                    <label for="">主号ID</label>
                    <el-input v-model="input1"></el-input> 
                </div>
                <div>
                    <label for="">副号ID</label>
                    <el-input v-model="input1"></el-input>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input1:""
        }
    },
}
</script>

<style lang="scss" scoped>
.价格{
    display: flex;
    
}
.input-box{
    width: 400px;
    font-size: 12px;
    flex-shrink: 0;
    white-space: nowrap;
    label{
        background: #eee;
        line-height: 40px;
        padding: 0px 5px;
    }
    >div{
        align-items: center;
        display: flex;
        border-bottom: 1px solid #fff;
    }
}
.item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: #d4d4d6;
    border-right: 1px solid #fff;
    padding: 10px 0px;
    font-size: 14px;
    >div:nth-child(1){
        color: #28a745;
    }
    >div:nth-child(2){
        color: #007bff;
    }
    >div:nth-child(3){
        color: #dc3545;
    }
}
</style>