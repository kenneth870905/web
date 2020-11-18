<template>
    <div class="资配记录">
        <van-nav-bar title="配资订单" :z-index="10" left-arrow :fixed="true" @click-left="$back()"/>
        <div class="定位">
            <ul class="header_1">
                <li @click="切换类型(1)" :class="{'active':query.contractType==1}"><span>按天配资</span></li>
                <li @click="切换类型(2)" :class="{'active':query.contractType==2}"><span>按周配资</span></li>
                <li @click="切换类型(3)" :class="{'active':query.contractType==3}"><span>按月配资</span></li>
                <li @click="切换类型(4)" :class="{'active':query.contractType==4}"><span>免息配资</span></li>
            </ul>
            <ul class="header_2">
                <li @click="切换有效(true)" :class="{'active':有效}">有效合约</li>
                <li @click="切换有效(false)" :class="{'active':!有效}">历史合约</li>
            </ul>
        </div>
        
        <ul class="list">
            <van-list v-model="loading" :finished="!loading && list.length>=total"  @load="xiayiye" :finished-text="list.length==0 ? '暂未数据' : '没有更多了'">
                <li class="item" @click="$router.push('/pzxq/'+item.contractCode)" v-for="(item, index) in list" :key="index">
                    <p class="title_1">操盘方案号：<span>{{item.title}}</span>
                        <small>
                            <!-- <span v-if="item.status==0">进行中</span>
                            <span v-if="item.status==1">已交易</span>
                            <span v-if="item.status==2">已终止</span> -->
                        </small>
                    </p>
                    <table class="table_1">
                        <tbody>
                            <tr>
                                <th>交易账号：</th>
                                <td><b class="orange">------</b></td>
                                <th>平仓线：</th>
                                <td>{{item.lossLiquidation}}</td>
                            </tr>
                            <tr>
                                <th>总操盘资金：</th>
                                <td>{{item.marketValue}}</td>
                                <th>申请时间：</th>
                                <td>{{item.createTime}}</td>
                            </tr>
                            <tr>
                                <th>预警线：</th>
                                <td>{{item.lossWarning}}</td>
                                <th>结束时间：</th>
                                <td>{{item.useEndTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn_1">
                        <span>方案详情</span>                    
                        <van-icon name="arrow"/>
                    </div>
                </li>
            </van-list>
        </ul>
        
    </div>
</template>

<script>
import { api_获取历史合约 , api_获取有效合约 } from "@/api/合约.js";
export default {
    name:"",
    data() {
        return {
            有效:true,
            query:{
                contractType:1,
                "pageIndex": 0,
                "pageSize": 20
            },
            loading:true,
            list:[],
            total:0
        }
    },
    methods: {
        切换有效(type){
            if(this.有效==type){
                return
            }
            this.有效=type
            this.query.pageIndex=0
            this.list=[];
            this.获取数据();
        },
        切换类型(type){
            this.query.contractType=type;
            this.query.pageIndex=0
            this.list=[];
            this.获取数据();
        },
        xiayiye(){
            this.loading=false;
            this.query.pageIndex++
            this.获取数据()
        },
        获取数据(){
            this.loading=true;
            if(this.有效){
                api_获取有效合约(this.query).then(x=>{
                    if(x.data.code==200){
                        this.total=x.data.total;
                        this.list=[...this.list,...x.data.data];
                    }
                    this.loading=false
                }).catch(err=>{
                    this.loading=false
                    console.log(err)
                })
            }else{
                api_获取历史合约(this.query).then(x=>{
                    if(x.data.code==200){
                        this.total=x.data.total;
                        this.list=[...this.list,...x.data.data];
                    }
                    this.loading=false
                }).catch(err=>{
                    this.loading=false
                    console.log(err)
                })
            }
        }
    },
    mounted() {
        // api_获取历史合约(this.query).then(x=>{
        //     console.log(x)
        // }).catch(err=>{
        //     console.log(err);
        // })
        this.获取数据();
        

    },
}
</script>

<style lang="scss" scoped>
.资配记录{
    padding: _vw(46) 0px 0px 0px;
}
.定位{
    position: sticky;
    top: _vw(46);
    z-index: 1;
}
.header_1{
    background: #ffffff;
    border-bottom: 1px solid #cccccc;
    font-size: _vw(14);
    line-height: _vw(46);
    display: flex;
    text-align: center;
    li{
        width: 25%;
        span{
            display: inline-block;
        }
        &.active{
            span{
                border-bottom: 2px solid red;
            }
        }
    }
}
.header_2{
    background: #efefef;
    border-bottom: 1px solid #cccccc;
    font-size: _vw(12);
    line-height: _vw(40);
    display: flex;
    text-align: center;
    li{
        width: 50%;
        span{
            display: inline-block;
        }
        &.active{
            border-bottom: 2px solid red;
        }
    }
}

.list{
    padding: 0px _vw(5);
    .item{
        margin: _vw(10) 0px;
        background: #ffffff;
        .title_1{
            margin: 0px;
            font-size: _vw(13);
            padding: _vw(10);
            color: #999999;
            span{
                color: #000000;
            }
            small{
                float: right;
            }
        }
        .table_1{
            font-size: _vw(13);
            width: 100%;
            border-top: 1px solid #cccccc;
            border-spacing:0px;
            tr{
                height: _vw(36);
            }
            th{
                padding: 0px _vw(3);
                width: 25%;
                background: #e6e6e6;
                border-bottom: 1px solid #cccccc;
                font-weight: 400;
            }
            td{
                padding: 0px _vw(3);
                width: 25%;
                border-bottom: 1px solid #cccccc;
            }
        }
        .btn_1{
            height: _vw(35);
            padding: 0px _vw(10);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: _vw(14);
            color: #FF6E3F;
        }
    }
}
</style>
