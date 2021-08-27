<!--
 * @Description: In User Settings Edit
 * @Author: kenneth
 * @Date: 2019-08-27 14:35:41
 * @LastEditTime: 2019-09-14 16:24:03
 * @LastEditors: kenneth
 -->
<template>
    <div class="消息">
        <ul class="list" @scroll="scroll($event)">
            <li>
                <xtts1 />
            </li>
            <li v-for="(item, index) in 聊天室state.msglist" :key="index">
                <!-- 纯文字 -->
                <textbox1 :obj="item" v-if="item.Type==1"/>
                <!-- 彩票 -->
                <cp1 :obj="item" v-if="item.Type==3" />
                <!-- 图片 -->
                <tp :obj="item" v-if="item.Type==4"/>
                <!-- 计划 -->
                <jh :obj="item" v-if="item.Type==2"/>
                <!-- 红包 -->
                <hb :obj="item" v-if="item.Type==5"/>
            </li>
            <li ref="锚点"></li>
        </ul>

        <div @click="底部()" class="指引" v-show="!聊天室state.到达底部">
            <div v-show="聊天室state.未读条数>0">{{聊天室state.未读条数}}</div>
            <div>
                <i class="el-icon-download"></i>
            </div>
        </div>

        
    </div>
</template>

<script>
const xtts1 = ()=>import('./系统提示1.vue');
const textbox1 = ()=>import('./纯文字1.vue');
const cp1 = ()=>import('./彩票1.vue');
const tp = ()=>import('./图片.vue');
const jh = ()=>import('./计划.vue');
const hb = ()=>import('./红包.vue');
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
        }
    },
    components:{
        textbox1,
        cp1,
        xtts1,
        tp,
        jh,
        hb
    },
    computed: {
        ...mapState({
            聊天室state:x=>x.聊天室 
        })
    },
    methods: {
        scroll(e){
            var scrollTop = e.target.scrollTop;
            var h1 = e.target.offsetHeight;
            var h2 = e.target.scrollHeight;
            // console.log(h1,t1,h2);
            if (h1 + scrollTop + 20 >= h2) {
                this.聊天室state.未读条数=0;
                this.聊天室state.到达底部=true
            } else {
                this.聊天室state.到达底部=false
            }
        },
        底部(){
            this.$refs.锚点.scrollIntoView({behavior:'smooth'})
        }
    },
    mounted() {
        this.聊天室state.到达底部=true;
        this.$nextTick(()=>this.$refs.锚点.scrollIntoView())       
    },
    watch: {
        '聊天室state.msglist'(){
            if(this.聊天室state.到达底部){
                // var type = this.第一次 ? {} : {behavior:'smooth'}
                var type = {}
                this.$nextTick(()=>this.$refs.锚点.scrollIntoView(type))
                setTimeout(() => {
                    this.$nextTick(()=>this.$refs.锚点.scrollIntoView(type))                
                }, 300);
            }
        },
        '聊天室state.当前房间'(){
            this.聊天室state.到达底部 = true;
        }
    },
}
</script>

<style lang="scss" scoped>
.消息{
    position: relative;
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
}
.指引{
    position: absolute;
    right: 20px;
    bottom: 20px;
    >div{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        &:hover{
            opacity: 0.6;
        }
        &:nth-child(1){
            background: red;
            color: #ffffff;
            font-size: 14px;
        }
        &:nth-child(2){
            border:1px solid #cccccc;
            background: #ffffff;
        }
    }
}
</style>