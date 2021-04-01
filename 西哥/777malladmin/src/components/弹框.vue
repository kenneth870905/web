<template>
    <div class="弹框" ref="box1">
        <!-- <div class="viewA" :class="{hide:showTk}">
            <router-view :is="view"></router-view>
            <transition name="fade">
                <tk v-if="showTk" :tkType="tkType"/>
            </transition>
        </div> -->
<!-- :resizable="true" -->
        <vue-draggable-resizable class="viewA" v-if="w" :active="true" :drag-handle="'.'+className" style="z-index: 1;" :w="w" :h='h' :x="left" :y="top">
            <div :class="className" class="header">{{title}}（拖动手柄）</div>
            <i class="el-icon-close" @click="closeTk()"></i>
            <div class="content" :class="{hide:showTk}" >
                <router-view :is="view" :userId="userId"></router-view>
                <transition name="fade">
                    <tk v-if="showTk" :type="tkType" :userId="uid"/>
                </transition>
            </div>
        </vue-draggable-resizable>

       <div class="bg" @click="closeTk()"></div>
    </div>
</template>

<script>
const tk=()=>import('@/components/弹框.vue')
export default {
    components:{
        tk
    },
    inject:['closeTk'],
    provide() {
        return {
            showTk: (type,userId) => {
                console.log('showTk')
                this.uid = userId
                this.tkType= type
                this.showTk=true
            },
            closeTk: () => {
                this.showTk=false
                console.log('关闭弹框1')
            }
        }
    },
    props:{
        type:"",
        userId:""
    },
    data() {
        return {
            tk:"",
            view:"",
            showTk:false,
            className:'handle'+Math.floor((Math.random()*10000)+1),
            title:"",
            uid:'',

            // 定位
            w:0,
            h:0,
            left:0,
            top:0,
        }
    },
    methods:{
    },
    mounted() {
        console.log(this.type)
        let w = this.$refs.box1.offsetWidth
        let h = this.$refs.box1.offsetHeight
        this.w = w*0.8
        this.h = h*0.8
        this.left = w*0.2/2
        this.top = h*0.2/2

        if(this.type=='user'){
            this.title = '用户列表'
            this.view = ()=>import('@/views/会员/用户列表.vue')
        }else if(this.type=='Details'){
            this.title="资金明细"
            this.view = ()=>import('@/views/资金管理/资金明细.vue')
        }else if(this.type=='WithdrawRecords'){
            this.title="提现记录"
            this.view = ()=>import('@/views/资金管理/提现记录.vue')
        }
    },
}
</script>

<style lang="scss" scoped>
.弹框{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0px;
    left: 0px;
    .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.6);
    }
    .viewA{
        // position: absolute;
        // top: 0px;
        // left: 0px;
        // bottom: 0px;
        // right: 0px;
        // width: 80%;
        // height: 80%;
        // background: #fff;
        // z-index: 1;
        // margin: auto;
        // overflow: hidden;
        .header{
            padding: 0px 15px;
            line-height: 30px;
            background: #eee;
            cursor: pointer;
            border-bottom: 2px solid #c5c5c5;
        }
        .content{
            height: calc(100% - 30px);
            // padding: 5px;
            overflow: auto;
            background: #fff;
            position: relative;
            border: 5px solid #fff;
            &.hide{
                overflow: hidden;
            }
        }
    }
}
.el-icon-close{
    position: absolute;
    right: 15px;
    top: 6px;
    font-size: 20px;
    cursor: pointer;
    color: red;
    font-weight: bold;
}
</style>