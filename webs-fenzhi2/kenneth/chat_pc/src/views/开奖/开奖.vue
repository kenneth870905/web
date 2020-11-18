<template>
    <div class="开奖列表" v-loading="loading">
        <div class="刷新" @click="初始化()">
            <i class="el-icon-refresh"></i>
        </div>
        <ul class="list">
            <li class="" v-if="item.彩票详情" v-for="(item , key , index) in list" :key="index">
                <div class="img_box">
                    <img :src="config.img_url+'static/image/home/caipiao/'+key+'.png'" alt="" srcset="">
                </div>
                <div class="right_1">
                    <div class="标题">
                        <span>{{item.彩票详情.title}}</span>
                        <!-- <span>{{item.Name}}</span> -->
                        <span class="time">{{item.ActualTime}}</span>
                    </div>
                    <div class="期号">
                        <span>{{item.IssueCode}}</span>         
                    </div>
                    <div>
                        <div v-if="!item.Content || item.Content.length==0">等待开奖</div> 
                        <!-- 时时彩 -->
                        <yq v-else-if="item.type=='10' || item.type=='30' || item.type=='40' || item.type=='60'" :球组="item.Content"/>
                        <!-- pk10 -->
                        <pk10 v-else-if="item.type=='20'" :球组="item.Content"/>
                        <!-- 28 -->
                        <erba v-else-if="item.type=='50'" :球组="item.Content"/>
                        <!-- 六合彩 -->
                        <lhc v-else-if="item.type=='70'" :球组="item.Content"/>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { api_开奖公告 , api_获取近期开奖 , api_GetLotteryInfos } from "@/api/游戏彩票接口.js";

import yq from './components/圆球号码.vue';
import pk10 from './components/pk10号码.vue';
import lhc from './components/六合彩号码.vue';
import erba from './components/28.vue';
import { mapState , mapGetters, mapActions } from "vuex";
export default {
    name:"",
    components:{
        yq,
        pk10,
        lhc,
        erba
    },
    data() {
        return {
            list:[],
            loading:false
        }
    },
    computed: {
        ...mapState({
            config:"config"
        }),
        ...mapGetters({
            全部彩票:'全部彩票' 
        })
    },
    methods: {
        ...mapActions({
            加载中:"加载中",
            获取彩票:"获取彩票"
        }),
        跳转开奖(key){
            console.log(key)
            // var h=document.querySelector('html').offsetHeight;
            // var w=document.querySelector('html').offsetWidth;
            // window.open('https://0698aa.com/Lottery/Bet/Index/1/'+key, 'Lottery', 'height='+h*0.8+', width='+w*0.8+', top='+h*0.1+', left='+w*0.1+', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no') 
        },
        async 初始化(){
            // this.加载中(true)
            this.loading=true
            if(this.全部彩票.length==0){
                await this.获取彩票();
            }
            api_开奖公告().then(x=>{
                var data=x.data;
                for (const key in data) {
                    this.定时器(data[key])
                    data[key].key=key.substring(1)
                    data[key].彩票详情=this.全部彩票.find(y=>y.id==key);
                    data[key].type=key.substring(0,2)
                }
                this.list=data;
                setTimeout(() => {
                    this.loading=false
                    // this.加载中(false)
                }, 1000);
            }).catch(err=>{
                setTimeout(() => {
                    this.loading=false
                    // this.加载中(false)
                }, 1000);
            })
        },
        定时器(item){
            try {
                clearInterval(item.定时器);    
            } catch (error) {}
            item.定时器=setInterval(() => {
                item.Timer--
                if(item.Timer<=0){
                    clearInterval(item.定时器)
                    item.定时器=''
                }
            }, 3000);
        },
        定时获取(){

        }
    },
    mounted() {
        this.初始化();
        // api_GetLotteryInfos  api_开奖公告
        // api_开奖公告().then(x=>{
        //     console.log(x)
        // }).catch(err=>{})
    },
}
</script>

<style lang="scss" scoped>
.开奖列表{
    height: 100%;
    overflow: auto;
    position: relative;
}
.刷新{
    position: absolute;
    top: 30px;
    right: 30px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 100%;
    background: #127dec;
    color: #ffffff;
    cursor: pointer;
    opacity: 0.6;
    &:hover{
        opacity: 1;
    }
    &::after{
        position: absolute;
        width: 1px;
        height: 30px;
        content: "";
        background: #127dec;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 30px;
        margin: auto;
    }
}
.list{
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width:6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        background:#2e394d;
        border-radius: 6px;
    }
    >li{
        border-bottom: 10px solid #eeeeee;
        background: #ffffff;
        display: flex;
        padding: 5px 5px 5px 15px;
        align-items: center;
    }
    .img_box{
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        margin: 0px 10px 0px 0px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .right_1{
        flex-grow: 1;
        width: 0;
        .标题{
            font-size: 14px;
            color: #212121;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .time{
            font-size: 13px;
            color: #868484;
        }
        .期号{
            margin: 3px 0px;
            font-size: 13px;
            color: #868484;
        }
        .icon-xiangyou{
            font-size: 14px;
        }
    }
}
</style>