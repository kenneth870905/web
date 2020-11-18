<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">汇总</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="title">
                <div class="time" @click="show = true">
                    {{name[type]}}
                    <van-icon name="arrow-down" />
                </div>
                <div class="time" @click="selectTime()">
                    {{time}}
                    <van-icon name="arrow-down" />
                </div>
            </div>

            <router-view :is="hzView" :huizong="huizong"></router-view>
        </div>

        <van-popup v-model="showTime" position="bottom" :overlay="true">
            <van-datetime-picker v-model="time1" type="date" @cancel="showTime=false" @confirm="ok()" />
        </van-popup>
        
        <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    </div>
</template>

<script>
import { api_扫雷汇总 , api_禁抢汇总 , api_牛牛汇总 } from "@/api/红包游戏.js";
import moment from 'moment'
import { mapActions, mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            huizong:{},
            time:moment().format('YYYY-MM-DD'),
            time1:new Date(),
            showTime:false,
            type:6 , //6 扫雷红包 8 禁抢
            name:{
                6:'扫雷汇总',
                8:"禁抢汇总",
                7:'牛牛游戏汇总'
            },
            show:false,
            actions:[
                {name:'扫雷汇总',t:6},
                {name:'禁抢汇总',t:8},
                {name:'牛牛游戏汇总',t:7},
            ],
            hzView:""
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        onSelect(item){
            this.show=false;
            this.type = item.t;
            this.g1();
            this.设置组件()
        },
        g1(){
            this.加载中(true)
            if(this.type==6){
                api_扫雷汇总(this.time).then(x=>{
                    this.huizong = x.data;
                    this.加载中(false)
                }).catch(err=>{
                    this.加载中(false)
                })
            }else if(this.type==8){
                api_禁抢汇总(this.time).then(x=>{
                    this.huizong = x.data;
                    this.加载中(false)
                }).catch(err=>{
                    this.加载中(false)
                })
            }else if(this.type){
                api_牛牛汇总(this.time).then(x=>{
                    console.log(x)
                    this.huizong = x.data
                    this.加载中(false)
                }).catch(err=>{
                    this.加载中(false)
                })
            }else{
                this.加载中(false)
                this.$toast('未知类型');
            }
        },
        selectTime(){
            this.showTime=true
        },
        ok(){
            this.showTime = false;
            this.time = moment(this.time1).format('YYYY-MM-DD')
            this.g1();
        },
        设置组件(){
            if(this.type== 6 || this.type==8){
                this.hzView =()=>import('./汇总1.vue');
            }else if(this.type==7){
                this.hzView =()=>import('./汇总2.vue');
            }else{
                this.hzView = '';
            }
        }
    },
    mounted() {
        this.type = this.$route.query.t ? this.$route.query.t : 6; 
        this.g1()
        this.设置组件();

        

    },
}
</script>

<style lang="scss" scoped>
.title{
    display: flex;
    justify-content: space-between;
}
.time{
    width: _vw(130);
    margin: _vw(5);
    font-size: _vw(14);
    padding: 5px 10px;
    background: #fff;
    text-align: center;
    border-radius: _vw(30);
}

</style>
