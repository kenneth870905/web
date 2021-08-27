<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">发禁抢红包</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="list">
                <li class="item">
                    <label>总金额</label>
                    <van-field type="number" v-model="redEnvelope.totalAmount"  input-align="right" placeholder="1-200" clearable></van-field>
                    <span class="单位">元</span>
                </li>
                <li class="item">
                    <label>红包个数</label>
                    <ul class="号码">
                        <li><div class="yuan" :class="{active:redEnvelope.quantity==5}" @click="选择个数(5)">5</div></li>
                        <li><div class="yuan" :class="{active:redEnvelope.quantity==6}" @click="选择个数(6)">6</div></li>
                        <li><div class="yuan" :class="{active:redEnvelope.quantity==7}" @click="选择个数(7)">7</div></li>
                        <li><div class="yuan" :class="{active:redEnvelope.quantity==9}" @click="选择个数(9)">9</div></li>
                        <li><div class="yuan" :class="{active:redEnvelope.quantity==10}" @click="选择个数(10)">10</div></li>
                    </ul>
                    <span class="单位">包</span>
                </li>
                <li class="item">
                    <label>雷号</label>
                    <ul class="号码">
                        <li v-for="(item, index) in list" :key="index"><div class="yuan" :class="{active:item.active}" @click="选择雷号(item)">{{item.name}}</div></li>
                    </ul>
                    <span class="单位">
                        <div v-show="显示6不中" class="yuan" @click="redEnvelope.playType=(redEnvelope.playType==600 ? '' : 600)" :class="{active:redEnvelope.playType==600}">不</div>
                    </span>
                </li>
                <li class="item2">
                    ￥{{redEnvelope.totalAmount ? redEnvelope.totalAmount : 0}}
                </li>
            </ul>
            
            <btn value="塞钱进红包" @click.native="添加()"/>
        </div>
    </div>
</template>

<script>
import { api_发布禁抢 } from "@/api/红包游戏.js";
import btn from '@/components/btn.vue'
import { mapMutations } from 'vuex';
export default {
    name: "",
    components:{btn},
    data() {
        return {
            redEnvelope:{
                Note:"",
                gameType:"300",     //扫雷游戏
                chatId:'',          //房间Id
                quantity:0,         //红包数量
                totalAmount:'',     //总金额
                bomb:"",            //炸弹
                playType:"",        //为六包不中玩法，其它的可以不传
            },
            list:[
                {name:0,active:false},
                {name:1,active:false},
                {name:2,active:false},
                {name:3,active:false},
                {name:4,active:false},
                {name:5,active:false},
                {name:6,active:false},
                {name:7,active:false},
                {name:8,active:false},
                {name:9,active:false},
            ]
        }
    },
    computed: {
        显示6不中(){
            if(this.redEnvelope.quantity==6){
                let l = this.list.filter(x=>x.active).length;
                if(l>1 && l<6){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        }
    },
    methods: {
        ...mapMutations({
            加载中:'加载中'
        }),
        选择个数(index){
            this.redEnvelope.quantity = index;
            this.redEnvelope.playType = '';
            this.list.map(x=>{
                x.active = false
            })
        },
        选择雷号(item){
            if(item.active){
                item.active = false
            }else{
                var len = this.list.filter(x=>x.active).length;
                if(this.redEnvelope.quantity==5 && len==5){
                    this.$toast('红包个数为5的红包只能勾选5个雷号');
                    return
                }else if(this.redEnvelope.quantity==6){
                    if(this.redEnvelope.playType==600 && len>=5){
                        this.$toast('6不中玩法最多选择5个');
                        return
                    }else if(len>=6){
                        this.$toast('红包个数为6的红包只能勾选6个雷号');
                        return
                    }
                }else if(this.redEnvelope.quantity==7 && len>=7){
                    this.$toast('红包个数为7的红包只能勾选7个雷号');
                    return
                }else if(this.redEnvelope.quantity==9 && len>=7){
                    this.$toast('红包个数为9的红包只能勾选7个雷号');
                    return
                }else if(this.redEnvelope.quantity==10 && len>=7){
                    this.$toast('红包个数为9的红包只能勾选7个雷号');
                    return
                }
                item.active = !item.active;
            }
        },
        添加(){
            var kong = /^\s+$/;
            var l = this.list.filter(x=>x.active);
            var bomb = []
                l.map(x=>{
                    bomb.push(x.name);
                })
            this.redEnvelope.bomb = bomb.join(',');
            if(!this.redEnvelope.totalAmount || this.redEnvelope.totalAmount<1){
                this.$toast('请输入红包金额');
                return
            }else if(!this.redEnvelope.quantity){
                this.$toast('请选择红包个数')
                return
            }else if(!this.redEnvelope.bomb){
                this.$toast('请选择雷号');
                return
            }
            console.log(this.redEnvelope)
            this.加载中(true)
            api_发布禁抢(this.redEnvelope).then(x=>{
                // this.$toast('系统错误，稍后再试')
                if(x.data.code!=0){
                    this.$toast(x.data.msg);
                }else{
                    this.$toast('发布成功');
                    history.back()
                }
                this.加载中(false)
            }).catch(err=>{
                this.$toast('系统错误，稍后再试')
                this.加载中(false)
            })
        }
    },
    mounted() {
        this.redEnvelope.chatId= this.$route.query.id
    },
}
</script>

<style lang="scss" scoped>
.list{
    .item{
        background: #fff;
        margin: 10px;
        padding:10px 15px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        /deep/ input{
            margin: 0px;
            padding: 0px;
            border: none;
            height: 24px;
        }
        /deep/ .van-cell{
            padding: 0px 15px;
        }
    }
    label{
        width: 70px;
        font-size: _vw(14);
    }
    .单位{
        width: 25px;
        text-align: right;
    }
    .号码{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        li{
            width: 20%;
            
        }
    }
    .yuan{
        margin: 2px auto;
        width: _vw(30);
        height: _vw(30);
        border-radius: 100%;
        font-size: _vw(12);
        text-align: center;
        line-height: _vw(30);
        background: #b9c2d6;
        color: #fff;
        &.active{
            background: #ee7a4e;
        }
    }
    .item2{
        margin: -10px 10px 0px;
        background: #fff;
        font-size: 32px;
        padding: 15px;
        text-align: center;
        color: #ee7a4e;
    }
}
</style>
