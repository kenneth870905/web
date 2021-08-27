<template>
    <div class="discounts">
        <div class="type">
            <ul class="container">
                <li @click="selectiveType(item,index)" :class="{active:item==当前选中}" v-for="(item, index) in typeList" :key="index">
                    <div>
                        {{item}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="container">
            <ul class="list">
                <li @click="getDetails(item,index)" v-for="(item, index) in list" :key="index">
                    <div class="item1">
                        <div class="已结束" v-if="item.Stop">
                            <img src="image/discounts/hdjss.png" alt="">
                        </div>
                        <div class="bg">
                            <img :src="item.Img" alt="">
                        </div>
                        <div class="ft">
                            <span class="title">{{item.Name}}</span>
                            <div class="btn_1">
                                <span>查看详情</span>
                                <i class="el-icon-caret-right"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <el-dialog :title="详情.title" class="详情" :visible.sync="dialogVisible" width="1000px">
            <div class="neirong" v-html="详情.html"></div>
        </el-dialog>

    </div>
</template>

<script>
import { api_首页轮播 , api_首页轮播点击详情 , api_优惠类型 } from "@/api/首页轮播.js";
export default {
    data() {
        return {
            show2: true,
            app滚动条位置: '',
            优惠列表: [],//轮播 的图片
            timeActivity:true,

            typeList:['所有优惠'],
            dialogVisible:false,
            当前选中:"所有优惠",
            详情:{
                url:"",
                html:"",
                title:""
            }
        }
    },
    computed: {
        list() {
            if (this.当前选中 == '所有优惠') {
                return this.优惠列表
            } else {
                return this.优惠列表.filter(x => x.Classification == this.当前选中)
            }
        }
    },
    methods: {
        getDetails(item,index) {
            console.log(item)
            if(item.Url){
                // this.详情.url=item.Url
                window.open(item.Url, 'weinisi')
            }else if(item.html){
                this.dialogVisible = true
                this.详情.title = item.Name
                this.详情.url='';
                this.详情.html = item.html
            }else{
                this.dialogVisible = true
                this.详情.title = item.Name
                this.详情.url='';
                this.详情.html = ''
                api_首页轮播点击详情({ Id: item.Id }).then(x => {
                    this.$set(item, 'html', x.data)
                    this.详情.html = x.data
                }).catch(err => {})
            }
        },
        获取优惠活动() {
            api_首页轮播({ home: false } ).then(x => {
                this.优惠列表 = x.data
                if(this.$route.query.Id){
                    var obj=this.优惠列表.find(y=>y.Id==this.$route.query.Id);
                    if(obj){
                        this.getDetails(obj)
                    }
                }
            }).catch(err => {})
        },
        selectiveType(item, index) {
            this.当前选中 = item
        },
    },
    mounted() {
        this.获取优惠活动()
        api_优惠类型({ home: false }).then(x => {
            if(x.data instanceof Array){
                this.typeList = [...this.typeList, ...x.data]
            }
        }).catch(err => {})

    }
}
</script>
<style lang="scss" scoped>
.type {
    border-bottom: 2px solid #e0e0e0;
    line-height: 44px;
    ul {
        display: flex;
        color: #fff;
        text-align: center;
        flex-wrap: wrap;
        li {
            margin: 15px 0px;
            padding: 0px 5px;
            box-sizing: border-box;
            // min-width: 120px;
            width: calc(100% / 8);
            background-size: 100% 100%;
            cursor: pointer;
            div{
                background-size: 100% 100%;
            }
        }
        li:not(.active) {
            div {
                background-image: url("~@/assets/images/huodong2.png");
            }
        }
        .active {
            div {
                background-image: url("~@/assets/images/huodong1.png");
            }
        }
    }
}

.list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px 0px;
    li {
        width: 50%;
        padding: 8px;
        box-sizing: border-box;
    }
    .item1 {
        background: #585e58;
        position: relative;
        cursor: pointer;
        &:hover {
            box-shadow: 2px 3px 4px 3px #b7b7b7;
        }
    }
    .已结束 {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        text-align: right;
        padding: 30px 30px;
        box-sizing: border-box;
        img {
            height: 100%;
        }
    }
    .bg {
        font-size: 0px;
        height: 173px;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .ft {
        text-align: center;
        position: relative;
        .title {
            font-size: 22px;
            line-height: 40px;
            letter-spacing: 1px;
            color: #ffffff;
        }
        .btn_1 {
            position: absolute;
            top: 9px;
            right: 4px;
            color: #fff887;
            border: 1px solid #fff887;
            line-height: 21px;
            border-radius: 23px;
            font-size: 15px;
            padding: 0px 3px 0px 7px;
        }
    }
}


.详情 {
    /deep/ .el-dialog{
        height: calc(100% - 30vh);
    }
    /deep/ .el-dialog__header{
        background: rgb(235, 160, 59);
        padding: 10px 20px;
    }
    /deep/ .el-dialog__title{
        color: #fff;
    }
    /deep/ .el-dialog__headerbtn{
        top: 15px;
        .el-dialog__close{
            color: #fff;
        }
    }
    /deep/ .el-dialog__body{
        height: calc(100% - 44px);
        box-sizing: border-box;
        padding: 5px;
    }
    iframe{
        width: 100%;
        height: 100%;
    }
    .neirong{
        height: 100%;
        overflow: auto;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width:5px;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            border-radius:10px;
            background:rgba(0,0,0,0.1);
        }
    }
    .btn_1{
        position: absolute;
        top:0px;
        bottom: 0px;
        margin: auto;
        width: 45px;
        height: 45px;
        border-radius: 45px;
        background: #868686;
        text-align: center;
        color: #fff;
        line-height: 45px;
        font-size: 24px;
        &.left_1{
            left: -60px
        }
        &.right_1{
            right: -60px;
        }
    }
}

</style>
  