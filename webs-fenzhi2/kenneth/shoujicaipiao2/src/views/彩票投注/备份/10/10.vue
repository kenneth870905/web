<template>
    <div class="时时彩">
        
        <router-view :is="开奖头部"></router-view>

        <ul class="开奖头部">
            <li>
                <div class="近期" @click="显示最近记录=!显示最近记录">
                    <img class="logo_1" :src="config.img_url+'static/image/home/caipiao/'+当前彩种.id+'.png'">
                    <div>近期开奖</div>
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </div>
                <ul class="上期开奖">
                    <li v-if="近期开奖.length>0 && 近期开奖[0].Content && 近期开奖[0].Content.length>0">
                        <div v-for="(item1, index2) in 近期开奖[0].Content" :key="index2">
                            <span class="圆球">{{item1}}</span>
                            <div class="生肖"></div>
                        </div>
                    </li>
                    <li v-else class="红色">
                        <div class="开奖中">
                            开奖中...
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <div>距{{即将开奖.IssueCode}}期截止</div>
                <div >
                    <span v-if="即将开奖.Timer>0">
                        {{即将开奖.showTimer.h}}:{{即将开奖.showTimer.m}}:{{即将开奖.showTimer.s}}
                    </span>
                    <span v-else>开奖中</span>
                </div>
            </li>
            <div class="记录" v-show="显示最近记录">
                <div class="遮罩" @click="显示最近记录=!显示最近记录"></div>
                <ul>
                    <li class="item">
                        <div class="期数">期数</div>
                        <div class="开奖号">开奖号</div>
                        <div class="和值">和值</div>
                        <div class="大小">大小</div>
                        <div class="单双">单双</div>
                    </li>
                    <li class="item" v-for="(item, index) in 近期开奖" :key="index">
                        <div class="期数2">{{item.IssueCode}}</div>
                        <div v-if="item.Content" class="开奖号2">
                            <div v-for="(item1, index2) in item.Content" :key="index2">
                                <span class="圆球">{{item1}}</span>
                            </div>
                        </div>
                        <div v-if="item.Content" class="和值 font14">{{计算和值(item.Content)}}</div>
                        <div v-if="item.Content" class="大小 font14">{{计算大小(item.Content)}}</div>
                        <div v-if="item.Content" class="单双 font14">{{计算单双(item.Content)}}</div>
                        <div v-else class="开奖中">
                            开奖中...
                        </div>
                    </li>
                </ul>
            </div>
        </ul>

        <div class="记录入口">
            <span>开奖记录</span>
            <span @click="切换官信()">{{type == 1 ? '切换到信用玩法' : '切换到官方玩法'}}</span>
        </div>

        <div class="选号区">
            <!-- 选择号码 -->
            <div v-for="(item , key , index) in 选号列表" :key="index">
                <wzys v-if="item.style=='位置'" name="位置" :位置="item.位置"/>
                <style1 v-if="item.style==1" :name="item.name" :显示头部="!item.notitle" :选号="item.选号"/>

                <!-- 方形3 -->
                <fangxing3 v-if="item.style=='方形3'" :name="item.name" :选号="item.选号"/>
                <fangxing4 v-if="item.style=='方形4'" :name="item.name" :选号="item.选号"/>
                <fangxing5 v-if="item.style==4" :选号="item.选号"/>


            </div>

            <srxh v-if="选号列表.length==0"/>
        </div>
        
    </div>
</template>

<script>
// import xuanhao from './components/pk10选号.vue'
import qhcz from '@/views/彩票投注/切换彩种.vue';
import qhwf from '@/views/彩票投注/切换玩法.vue';

import style1 from "@/components/彩票选票/样式1.vue";
import fangxing3 from "@/components/彩票选票/方形3.vue";
import fangxing4 from "@/components/彩票选票/方形4.vue";
import fangxing5 from "@/components/彩票选票/方形5.vue";
import srxh from '@/components/彩票选票/输入选号.vue'
import wzys from '@/components/彩票选票/位置样式.vue'

import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    name: "",
    components: {
        qhcz,
        qhwf,
        style1,
        srxh,
        wzys,
        fangxing3,
        fangxing4,
        fangxing5,
        // xuanhao
    },
    data() {
        return {
            显示最近记录: false,
            // 选号列表:[]
            开奖头部:""
        }
    },
    computed: {
        ...mapState({
            彩票配置:state=>state.投注.彩票配置,
            玩法三级:state=>state.投注.玩法三级,
            
            当前玩法: state => state.投注.玩法,
            彩种: state => state.投注.彩种,
            彩种配置: state => state.投注.彩票配置,
            近期开奖:state=>state.投注.近期开奖,
            即将开奖:state=>state.投注.即将开奖,
            marSixNums:state=>state.marSixNums,
            选号列表:x=>x.投注.球组,
            config:'config'
        }),
        ...mapGetters({
            当前彩种:'投注/当前彩种'
        }),
        type(){
            return this.$route.query.t ? this.$route.query.t : 1
        },
        id(){
            return this.$route.query.i
        },
        显示输入选号(){
            if( this.玩法三级.Code==501 || 
                this.玩法三级.Code==401 || 
                this.玩法三级.Code==421 || 
                this.玩法三级.Code==301 || 
                this.玩法三级.Code==305 ||
                this.玩法三级.Code==321 ||
                this.玩法三级.Code==325 ||
                this.玩法三级.Code==341 ||
                this.玩法三级.Code==345 ||
                this.玩法三级.Code==201 ||
                this.玩法三级.Code==205 ||
                this.玩法三级.Code==221 ||
                this.玩法三级.Code==225 ||
                this.玩法三级.Code==127 ||
                this.玩法三级.Code==130 ||
                this.玩法三级.Code==133 ||
                this.玩法三级.Code==135
            ){
                return true;   
            }
            return false
        },
    },
    methods: {
        ...mapMutations({
            设置state: "投注/设置state"
        }),
        getColor(number){
            var colorCode=this.marSixNums.nums[number];
            return colorCode;
        },
        切换官信(){
            if(this.type==1){
                this.$router.replace('/buyLottery?i='+this.id+'&t=2')
            }else{
                this.$router.replace('/buyLottery?i='+this.id)
            }
        },
        计算和值(list){
            var number=0;
            list.forEach(element => {
                number=number + parseInt(element);
            });
            return number;
        },
        计算大小(list){
            var number=0;
            list.forEach(element => {
                number=number + parseInt(element);
            });
            return number >22 ? '大':'小';
        },
        计算单双(list){
            var number=0;
            list.forEach(element => {
                number=number + parseInt(element);
            });
            return number % 2 == 0 ? '双' : '单';
        },
        
    },
    mounted() {

        // this.开奖头部=
    },
    watch: {
       
    },
}
</script>

<style lang="scss" scoped>
.时时彩{
    height: 100%;
    display: flex;
    flex-direction: column;
    
}
.选号区{
    flex-grow: 1;
    height: 100%;
    background: #ffffff;
    overflow: auto;
}
.font14{
    font-size: _vw(14);
}
.mui-bar-nav {
    .mui-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .btn_1 {
            font-size: 14px;
            background: none;
            padding: 0px 10px;
            line-height: 30px;
            outline: none;
        }
    }
    .btn_2 {
        display: flex;
        align-items: center;
        font-size: 14px;
        i {
            font-size: 10px;
            margin: 0px 0px 0px 3px;
            font-size: 10px;
        }
    }
}

.开奖头部 {
    flex-shrink: 0;
    display: flex;
    min-height: _vw(70);
    position: sticky;
    top: 0px;
    border-bottom: 1px solid #f2f2f2;
    > li {
        width: 50%;
        flex-shrink: 0;
        background: #ffffff;
        padding: _vw(10) 0px;
    }
    > li:nth-child(1) {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .近期 {
            margin: 0px 0px _vw(3) 0px;
            display: flex;
            align-items: center;
            font-size: _vw(14);
            .logo_1 {
                width: _vw(24);
                height: _vw(24);
                margin: 0px _vw(5) 0px 0px;
            }
            i {
                font-size: _vw(10);
            }
        }
        .上期开奖 {
            >li{
                display: flex;
                justify-content: center
            }
            .圆球 {
                font-size: _vw(12);
                width: _vw(20);
                height: _vw(20);
                border-radius: 100%;
                margin: 0px _vw(2);
                text-align: center;
                line-height: _vw(20);
                color: #ffffff;
                @include bgcolor;
                display: block;
            }
            .单双{
                font-size: _vw(12);
            }
        }
    }
    > li:nth-child(2) {
        position: relative;
        z-index: 1;
        border-left: 1px solid #efeff4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > div:nth-child(1) {
            font-size: _vw(14);
            margin: 0px 0px _vw(3) 0px;
        }
        > div:nth-child(2) {
            font-size: _vw(18);
            @include textcolor;
        }
    }
    .记录 {
        position: absolute;
        width: 100%;
        left: 0px;
        height: _vw(240);
        bottom: _vw(-240);
        overflow: auto;
        .遮罩 {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
        }
        > ul {
            position: relative;
            z-index: 1;
            background: #ffffff;
        }
        .item {
            &:nth-child(2n-1) {
                background: #e5e5e5;
            }
            &:nth-child(1) {
                position: sticky;
                top: 0px;
                line-height: _vw(30);
                font-size: _vw(15);
            }
            height: _vw(30);
            display: flex;
            text-align: center;
            align-items: center;
            .期数,
            .期数2 {
                width: _vw(120);
                flex-shrink: 0;
                flex-grow: 0;
                line-height: _vw(30);
                border-right: 1px solid #cccccc;
            }
            .期数2 {
                font-size: _vw(14);
            }
            .开奖号,
            .开奖号2 {
                flex-grow: 1;
            }
            .开奖号2{
                align-items: center;
                display: flex;
                justify-content: center;
                .单双{
                    font-size: _vw(13);
                }
            }
            .开奖中 {
                flex-grow: 1;
            }
            .和值,
            .大小,
            .单双{
                width: _vw(40);
            }
        }
    }
}
.圆球 {
    font-size: _vw(12);
    width: _vw(20);
    height: _vw(20);
    border-radius: 100%;
    margin: 0px _vw(2);
    text-align: center;
    line-height: _vw(20);
    color: #ffffff;
    @include bgcolor;
    display: block;
}



.记录入口 {
    flex-shrink: 0;
    font-size: _vw(12);
    display: flex;
    justify-content: space-between;
    padding: _vw(5) 0px;
    color: #676767;
    span{
        padding: 0px _vw(15);
        display: inline-block;
        height: _vw(20);
        line-height: _vw(20);
        background: #ffffff;
    }
    span:nth-child(1){
        border-top-right-radius: _vw(20);
        border-bottom-right-radius: _vw(20);
    }
    span:nth-child(2){
        border-top-left-radius: _vw(20);
        border-bottom-left-radius: _vw(20);
    }
}
</style>
