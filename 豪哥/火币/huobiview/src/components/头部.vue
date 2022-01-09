<template>
    <div>
        <ul class="价格">
            <li class="占位" v-if="list.length==0 || list[0].name=='USDT' "></li>
            <li class="item" v-if="item.name!='USDT'" v-for="item in list">
                <div>买入价格: <span>{{买入1(item)}}</span><span>{{买入2(item)}}</span></div>
                <div>{{item.name}}实时: <span>{{item.tick.close ? parseFloat(item.tick.close).toFixed(2) : '0000'}}</span></div>
                <!-- <div>{{item.name}}实时: <span>{{item.tick.close ? item.tick.close : '0000'}}</span></div> -->
                <div>卖出价格: <span>{{卖出1(item)}}</span><span>{{卖出2(item)}}</span></div>
            </li>
           
            <li class="input-box">
                <div>
                    <label for="">USTD买入汇率</label>
                    <el-input v-model="买入汇率" ></el-input>
                    <label for="">手续费</label>
                    <el-input v-model="手续费"></el-input> 
                </div>
                <div>
                    <label for="">USTD卖出汇率</label>
                    <el-input v-model="卖出汇率"></el-input>
                    <label for="">主号ID</label>
                    <el-input v-model="主号ID"></el-input> 
                </div>
                <div>
                    <label for="">副号ID</label>
                    <el-input v-model="副号ID"></el-input>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    inject:['setitem'],
    props:{
        list:{
            default:()=>([])
        }
    },
    data() {
        return {
            买入汇率:"",
            手续费:"",
            卖出汇率:"",
            主号ID:"",
            副号ID:""
        }
    },
    methods: {
        newClose(close){
            // let str = close.toString()
            return close.toFixed(2)
        },
        买入1(item){
            if(this.买入汇率){
                var n = item.tick.close * this.买入汇率
                return Number.isFinite(n) ? n.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        买入2(item){
            if(this.买入汇率 && this.手续费){
                var n = item.tick.close * this.买入汇率
                var n2 = n - n*this.手续费
                return Number.isFinite(n2) ? n2.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        卖出1(item){
            if(this.卖出汇率){
                var n = item.tick.close * this.卖出汇率
                return Number.isFinite(n) ? n.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        卖出2(item){
            if(this.卖出汇率 && this.手续费){
                var n = item.tick.close * this.卖出汇率
                var n2 = n + n*this.手续费
                return Number.isFinite(n2) ? n2.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
    },
    watch:{
        买入汇率(){
            this.setitem('买入汇率',this.买入汇率)
        },
        手续费(){
            this.setitem('手续费',this.手续费)
        },
        卖出汇率(){
            this.setitem('卖出汇率',this.卖出汇率)
        },
        主号ID(){
            this.setitem('主号ID',this.主号ID)
        },
        副号ID(){
            this.setitem('副号ID',this.副号ID)
        }
    }
}
</script>

<style lang="scss" scoped>
.价格{
    display: flex;
    
}
.占位{
    flex: 1;
    background: #d4d4d6;
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
    span{
        font-weight: bold;
        margin: 0px 5px;
    }
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