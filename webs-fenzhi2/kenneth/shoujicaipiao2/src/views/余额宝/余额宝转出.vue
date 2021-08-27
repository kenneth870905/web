<template>
    <div>
         <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">转出</h1>
            <!-- <a class="mui-btn mui-btn-link mui-pull-right">明细</a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @click="type=0" :class="{'active':type==0}">转出到余额</li>
                <li @click="type=1" :class="{'active':type==1}">转出银行卡</li>
            </ul>

            <div  v-if="type==1" class="提示2">尊敬的用户，您目前的投注是<span>0.00</span>元,不足以提现，不便之处敬请原谅！(提现还需投注<span>50.00</span>元)</div>
            <div v-if="type==1" class="添加银行卡" @click="$router.push('/yeb/bdk')">
                <i class="mui-icon mui-icon-plus"></i>
                <span>添加银行卡</span>
            </div>

            <div class="转出金额">
                <div class="title">转出金额</div>
                <ul>
                    <li class="钱">￥</li>
                    <input type="text" placeholder="本次最多可转出0.00元">
                    <li class="text">全部</li>
                </ul>
            </div>
            <div class="btn_1">
                <van-button disabled type="danger">确认转出</van-button>
                <div class="提示">
                    余额宝转出到账户余额将享受银行卡入款同等优惠(1.0%)
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            type:0
        }
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    display: flex;
    background: #ffffff;
    justify-content: space-around;
    font-size: _vw(14);
    line-height: _vw(35);
    .active{
        color: $color;
        border-bottom: 2px solid $color;
    }
}

.提示2{
    padding: _vw(5) _vw(10);
    font-size: _vw(14);
    span{
        color: $color;
    }
}
.添加银行卡{
    height: _vw(85);
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    i{
        font-size: _vw(20);
        color: $color;
        margin: 0px _vw(5) 0px 0px;
    }
}


.转出金额{
    background: #ffffff;
    margin: _vw(5) 0px 0px;
    padding: 0px _vw(10);
    .title{
        font-size: _vw(14);
        padding: _vw(10) 0px;
    }
    ul{
        display: flex;
        align-items: center;
        padding: _vw(10) 0px _vw(10);
        border-bottom: 1px solid #e6e6e6;
        .钱{
            font-size: _vw(24);
        }
        input{
            flex-grow: 1;
            padding: 0px;
            margin: 0px;
            border: none;
            &::-webkit-input-placeholder {
                color: #d6d6d6; 
            } 
            &:-moz-placeholder { 
                color:#d6d6d6; 
            } 
            &::-moz-placeholder {
                color: #d6d6d6; 
            } 
            &::-ms-input-placeholder {
                color: #d6d6d6; 
            }
        }
        .text{
            color:$color;
            font-size: _vw(16);
            white-space: nowrap;
            flex-shrink: 0;
        }
    }
}
.btn_1{
    margin: _vw(20) _vw(10) 0px;
    button{
        width: 100%;
    }
    .提示{
        margin: _vw(5);
        font-size: _vw(12);
        color: #757575;
    }
}
</style>
