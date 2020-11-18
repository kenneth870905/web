<template>
    <div>
        <van-nav-bar title="资金流水" left-arrow :fixed="true" @click-left="$back()"/>
        <div class="content">
            <ul class="list header">
                <li>
                    <div class="时间">时间</div>
                    <div class="类型">类型</div>
                    <div class="金额">操作金额</div>
                    <div class="金额">账户余额</div>
                    <!-- <div class="金额">赠送余额</div> -->
                </li>
            </ul>
            <ul class="list">
                <van-list v-model="loading" :finished="!loading && list.length>=total" :finished-text="total==0 ? '暂无相关数据' : '没有更多了'" @load="xiayiye" >
                    <li v-for="(item, index) in list" :key="index">
                        <div class="时间">{{item.time | 时间格式化}}</div>
                        <div class="类型">{{item.type}}</div>
                        <div class="金额 绿">{{item.amount}}</div>
                        <div class="金额 红">{{item.after}}</div>
                        <!-- <div class="金额">+50.00</div> -->
                    </li>
                </van-list>
            </ul>
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/assets/js/时间.js";
import { api_资金流水 } from "@/api/资金接口.js";
export default {
    name:"",
    data() {
        return {
            query:{
                "pageIndex": 0,
                "pageSize": 20
            },
            list:[],
            total:0,
            loading:true
        }
    },
    filters:{
        时间格式化(time){
            if(time){
                return formatDate('yyyy.MM.dd hh:mm'  , time)
            }else{
                return ''
            }
        }
    },
    methods: {
        xiayiye(){
            this.pageIndex++;
            this.获取数据();
        },
        获取数据(){
            this.loading=true;
            api_资金流水(this.query).then(x=>{
                this.list=[...x.data.data , ...this.list];
                this.total = x.data.total;
                this.loading=false
            }).catch(err=>{
                this.loading=false
            })
        }
    },
    mounted() {
        this.获取数据();
        
    },
}
</script>

<style lang="scss" scoped>
.content{
    padding: _vw(46) 0px 0px;
}

.list{
    &.header{
        position: sticky;
        top: _vw(46);
        z-index: 1;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    li{
        display: flex;
        font-size: _vw(12);
        background: #ffffff;
        text-align: center;
        min-height: _vw(35);
        &:nth-child(2n){
            background: #f1f1f1;
        }
        >div{
            box-sizing: border-box;
            padding: _vw(2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .绿{
        color: green;
        font-weight: bold;
    }
    .红{
        font-weight: bold;
        color: red;
    }
    .时间{
        white-space: nowrap;
        width: 25%;
        flex-shrink: 0;
    }
    .金额{
        width: 25%;
        flex-shrink: 0;
    }
    .类型{
        width: 25%;
        flex-grow: 1;
    }
}
</style>
