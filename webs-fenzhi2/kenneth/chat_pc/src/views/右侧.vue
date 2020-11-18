<template>
    <div class="right">
        <ul class="tabs">
            <li :class="{active:type==0}" @click="type=0"><i class="iconfont icon-liebiao"></i>文字开奖</li>
            <li :class="{active:type==1}" @click="type=1"><i class="iconfont icon-jiangbei"></i>彩票计划</li>
            <li :class="{active:type==3}" @click="type=3"><i class="iconfont icon-02"></i>PK10直播</li>
        </ul>
        <div class="内容">
            <!-- 开奖 -->
            <kj v-if="type==0"/>
            <!-- 计划 -->
            <jihua v-if="type==1"/>
            <!-- <wsj v-if="type==1 && (个人资料.MemberType!=1 || !userinfo.UserId)" name="功能正在升级"/> -->

            <div v-if="type==3">
                <wsj name="功能正在升级"/>
            </div>
        </div>
    </div>
</template>

<script>
const wsj = ()=>import('@/components/无数据.vue');
const kj = ()=>import('@/views/开奖/开奖.vue');
const jihua = () =>import('@/views/计划/计划.vue');
import { mapState, mapMutations } from "vuex";
export default {
    name: "",
    components:{
        wsj,
        kj,
        jihua
    },
    data() {
        return {
            type:0,
        }
    },
    computed: {
        ...mapState({
            userinfo:'userinfo',
            个人资料:'个人资料'
        })
    },
    methods: {
        // 获取数据(){
        //     obj.list.push('添加的新数据')
        //     obj.list.splice(100);
        // }
    },
}
</script>

<style lang="scss" scoped>
.right{
    height: 100%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #e3e3e3;
}
.内容{
    height: 100%;
    overflow: auto;
    // * 设置滚动条的样式 */
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
        background:var(--color);
        border-radius: 6px;
    }
}
.tabs{
    flex-shrink: 0;
    line-height: 40px;
    display: flex;
    text-align: center;
    font-size: 12px;
    border-bottom: 1px solid #e3e3e3;
    li{
        width: 110px;
        cursor: pointer;
    }
    .active{
        color: #0188fb;
        // color:var(--color);
        border-bottom: 2px solid #0188fb;
    }
}
</style>