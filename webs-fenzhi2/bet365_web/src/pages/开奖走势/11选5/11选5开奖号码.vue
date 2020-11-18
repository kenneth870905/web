<template>
    <div>
        <ul class="开奖号" >
            <li class="定位">
                <div class="时间">时间</div>
                <div class="期数">期数</div>
                <div class="item item1">
                    <div @tap="type=0" :class="{'active':type==0}">号码</div>
                    <div @tap="type=1" :class="{'active':type==1}">大小</div>
                    <div @tap="type=2" :class="{'active':type==2}">
                        单双
                    </div>
                    <div @tap="type=3" :class="{'active':type==3}">
                        总合/形态
                    </div>
                </div>
            </li>
            <van-list :offset="10" v-model="loading1" :finished="开奖记录.length<=查看条数" :finished-text="开奖记录.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <li v-if="item.Content && index<查看条数" v-for="(item, index) in 开奖记录" :key="index">
                    <div class="时间">{{item.ResultDatetime | 时间格式}}</div>
                    <div class="期数">{{item.IssueCode.substring(4)}}</div>
                    <div class="item item2">
                        <div class="号码列表" v-if="type==0">
                            <span class="号码" v-for="(item1, index1) in item.开奖号码" :key="index1">{{item1}}</span>
                        </div>
                        <div class="大小列表" v-if="type==1">
                            <span class="号码" :class="{'active':item1>=5}" v-for="(item1 , index1) in item.开奖号码" :key="index1">
                                {{item1>=5 ? '大':'小'}}
                            </span>
                            <!-- <span class="号码 ">大</span> -->
                        </div>
                        <div class="单双列表" v-if="type==2">
                            <span class="号码" :class="{'active':item1 % 2 ==0}" v-for="(item1 , index1 ) in item.开奖号码" :key="index1">
                                {{item1 % 2 ==0 ? '双':"单"}}
                            </span>
                        </div>
                        <div class="龙虎列表" v-if="type==3">
                            <span class="active">{{求和(item.开奖号码).和值}}</span>
                            <span class="active">{{求和(item.开奖号码).大小 }}</span>
                            <span>{{求和(item.开奖号码).单双}}</span>
                            <span :class="{'active':(计算豹子(item.开奖号码,0)=='对子' || 计算豹子(item.开奖号码,0)=='顺子')}">{{计算豹子(item.开奖号码,0)}}</span>
                            <span :class="{'active':(计算豹子(item.开奖号码,1)=='对子' || 计算豹子(item.开奖号码,1)=='顺子')}">{{计算豹子(item.开奖号码,1)}}</span>
                            <span :class="{'active':(计算豹子(item.开奖号码,2)=='对子' || 计算豹子(item.开奖号码,2)=='顺子')}">{{计算豹子(item.开奖号码,2)}}</span>
                        </div>
                    </div>
                </li>
            </van-list>
        </ul>
    </div>
</template>

<script>

import { 时间格式化 } from "@/assets/js/通用.js";
import { mapState } from 'vuex';
export default {
    name:"",
    components:{
    },
    data() {
        return {
            type:0,
            查看条数:0,
            loading1:false
        }
    },
    filters:{
        时间格式(time){
            return 时间格式化('hh:mm',time)
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录
        })
    },
    methods: {
        onLoad1(){
            this.查看条数=this.查看条数+20;
            this.loading1=false
        },
        计算豹子( arr , type){
            var index=0;
            var list1=['杂六','半顺','对子','顺子','豹子']
            var name="杂六"
            var list=[];
            for (let i = type; i < 3+type; i++) {
                list.push(arr[i])
            }
            list.forEach(item=>{
                item = parseInt(item);
                var length=list.filter(x=>x==item).length;
                if(length==3){
                    index = 4
                }else if(length==2){
                    //'对子'
                    index=index > 2 ? index : 2 
                }else {
                    if(item==0 || item==9){
                        if(item==0){
                            var length1=list.filter(x=>x==1 || x==9).length;
                            if(length1==2){
                                //'顺子'
                                index=index>3 ? index : 3
                            }else if(length1==1){
                                //'半顺'
                                index = index> 1 ? index: 1
                            }
                        }else{
                            var length1=list.filter(x=>x==0 || x==8).length;
                            if(length1==2){
                                //'顺子'
                                index=index> 3 ? index :3
                            }else if(length1==1){
                                //'半顺'
                                index=index> 1 ? index :1
                            }
                        }
                    }else{
                        var length1=list.filter(x=>x==item-1 || x==item+1).length;
                            if(length1==2){
                                //'顺子'
                                index=index > 3 ? index : 3
                            }else if(length1==1){
                                //'半顺'
                                index=index>1 ? index :1
                            }
                    }
                }
            })
            return list1[index]
        },
        求和(list){
            var number=0;
            
            list.forEach(item => {
                var item=parseInt(item)
                number= number + item
            });

            return {
                和值:number,
                大小:number>22 ? '大' : "小",
                单双:number%2==0 ? '双':'单',
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.开奖号{
    background: #ffffff;
    text-align: center;
    margin: 0;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    li{
        padding: _vw(10) _vw(5);
        display: flex;
        align-items: center;
        // border-block:
        border-bottom: 1px solid #efeff4;
    }
    .时间{
        color: #999999;
        font-size: _vw(13);
        width: _vw(50);
        flex-shrink: 0;
    }
    .期数{
        width: _vw(60);
        flex-shrink: 0;
        color: #999999;
        font-size: _vw(13);
    }
    .item{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .item1{
        color: #212121;
        font-size: _vw(14);
        div{
            height: _vw(26);
            line-height: _vw(26);
            border-radius: _vw(26);
            padding: 0px _vw(10);
        }
        .active{
            color: #ffffff;
            background: #ff7614;
        }
    }
}

.号码{
    width: _vw(22);
    height: _vw(22);
    // background-image: url('~@/assets/bg/pk10.png');
    // background-size: auto _vw(24);
    border-radius: 5px;
    text-align: center;
    font-size: _vw(12);
    line-height: _vw(22);
    border-radius: _vw(22);
}
.号码列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
    .号码{
        color: #ffffff;
        background: #ec0022;
    }
}

.单双列表,
.大小列表{
    display: flex;
    justify-content: space-between;
    .号码{
        background: #b2b2b2;
        color: #ffffff;
    }
    .号码.active{
        background: #ff7614;
    }
}




.龙虎列表,
.单双列表,
.大小列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.大小,
.单双{
    width: _vw(22);
    height: _vw(22);
    border-radius: 5px;
    text-align: center;
    font-size: _vw(12);
    line-height: _vw(22);
    color: #ffffff;
    background: #b2b2b2;
    &.active{
        background: #ff7614
    }
}
.龙虎列表{
    .active{
        color: #ff7614;        
    }
    span{
        font-size: _vw(14);
    }
}

</style>
