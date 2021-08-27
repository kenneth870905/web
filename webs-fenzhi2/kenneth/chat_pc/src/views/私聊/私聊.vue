<template>
    <div class="私聊入口">
        <div class="title_1">
            您正在和 <span class="username">{{私聊state.正在聊天.SenderProfile.Nickname ? 私聊state.正在聊天.SenderProfile.Nickname : 私聊state.正在聊天.SenderProfile.MemberId}}</span> 聊天
            <span class="提示">（如需返回多人聊天室请点击左侧房间）</span>
        </div>
        <div class="消息">
            <ul class="list" @scroll="scroll($event)">
                <!-- <li>
                    <xtts1 />
                </li> -->
                <li v-for="(item, index) in 私聊state.正在聊天.list" :key="index">
                    <!-- 纯文字 -->
                    <textbox1 :obj="item" v-if="item.MessageType==1"/>
                    <!-- 彩票 -->
                    <!-- <cp1 :obj="item" v-if="item.Type==3" /> -->
                    <!-- 图片 -->
                    <tp :obj="item" v-if="item.MessageType==4"/>
                </li>
                <li ref="锚点"></li>
            </ul>
            <div @click="底部()" class="指引" v-show="!私聊state.到达底部">
                <!-- <div v-show="私聊state.未读条数>0">{{私聊state.未读条数}}</div> -->
                <div>
                    <i class="el-icon-download"></i>
                </div>
            </div>
        </div>

        <footer1 class="footer1"/>

        <!-- 操作 -->
        <caozuo v-show="私聊state.操作.show" :styles="styles" />
    </div>
</template>

<script>
const xtts1 = ()=>import('./系统提示1.vue');
const textbox1 = ()=>import('./纯文字1.vue');
// const cp1 = ()=>import('./彩票1.vue');
const tp = ()=>import('./图片.vue');
const footer1 = () =>import('./底部.vue');
const caozuo = () =>import('@/components/操作.vue')
import { mapState , mapGetters , mapActions } from "vuex";
export default {
    name:"",
    components:{
        xtts1,
        textbox1,
        tp,
        footer1,
        caozuo
    },
    provide(){
        return{
            隐藏操作:()=>{
                this.私聊state.操作.show=false
            },
            操作动作:(type)=>{
                this.私聊state.操作.show=false                
                if(type==1){
                    this.撤销消息()
                }
            }
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            私聊state:x=>x.私聊
        }),
        styles(){
            return {left:this.私聊state.操作.left+'px' , top:this.私聊state.操作.top+'px' }
        }
    },
    methods: {
        ...mapActions({
            私聊初始化:'私聊/私聊初始化',
            撤销消息:'私聊/撤销消息',
            销毁定时器:"私聊/销毁定时器"
        }),
        scroll(e){
            var scrollTop = e.target.scrollTop;
            var h1 = e.target.offsetHeight;
            var h2 = e.target.scrollHeight;
            // console.log(h1,t1,h2);
            if (h1 + scrollTop + 20 >= h2) {
                this.私聊state.未读条数=0;
                this.私聊state.到达底部=true
            } else {
                this.私聊state.到达底部=false
            }
        },
        底部(){
            this.$refs.锚点.scrollIntoView({behavior:'smooth'})
        }
    },
    mounted() {
        this.私聊初始化(this.$route.query.id)
    },
    watch: {
        "私聊state.正在聊天.list"(){
            this.$nextTick(() => {
                if (this.私聊state.到达底部) {
                    this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                }
                setTimeout(() => {
                    if (this.私聊state.到达底部) {
                        this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                    }
                }, 300);
            })
        }
    },
    beforeDestroy() {
        this.销毁定时器();
    },
}
</script>

<style lang="scss" scoped>
.title_1{
    line-height: 43px;
    padding: 0px 10px;
    font-size: 14px;
    border-bottom: 1px solid #cccccc;
    .username{
        font-weight: bold;
        font-size: 15px;
    }
    .提示{
        font-size: 12px;
        color: #a0a0a0;
    }
}

.私聊入口{
    // flex:1;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.消息{
    flex:1;
    overflow: auto;
    height: calc(100% - 170px);
    position: relative;
    .list{
        height: 100%;
        overflow: auto;
    }
}
.footer1{
    flex-shrink: 0;
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