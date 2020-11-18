<template>
    <div class="discounts_banner">
        <div class="type">
            <ul class="container">
                <li @click="selectiveType(item,index)" :class="{active:item==当前选中}" v-for="(item, index) in typeList" :key="index">{{item}}</li>
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
import qs from 'qs'
import { api_获取优惠列表, api_获取优惠详情, api_优惠类型 } from '@/api/优惠接口.js'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            config:config,
            dialogVisible:false,
            config: config,
            优惠列表: [],
            typeList: ['所有优惠'],
            当前选中: "所有优惠",
            index:0,
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
        ...mapActions({
            openloading: 'openloading'
        }),
        selectiveType(item, index) {
            this.当前选中 = item
        },
        getDetails(item,index) {
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
                api_获取优惠详情(item.Id).then(x => {
                    this.$set(item, 'html', x.data)
                    this.详情.html = x.data
                }).catch(err => {})
            }
        },
        获取详情1(item) {
            if (item.Url) {
                window.open(item.Url, 'weinisi')
            } else if (item.html) {
                item.show = !item.show
                return
            }
            api_获取优惠详情(item.Id).then(x => {
                this.$set(item, 'html', x.data)
                this.$set(item, 'show', !item.show)
            }).catch(err => {
                this.$set(item, 'html', x.data)
            })
        },
    },
    mounted() {
        api_优惠类型({ home: false, type: 'bet' }).then(x => {
            if(x.data instanceof Array){
                this.typeList = [...this.typeList, ...x.data]
            }
        }).catch(err => {})
        this.openloading(true)
        api_获取优惠列表({ home: false, type: 'bet' }).then(x => {
            this.优惠列表 = x.status == 200 ? x.data : []
            this.openloading(false)
        }).catch(err => {
            this.openloading(false)
        })
    }
}
</script>

<style lang="scss" scoped>
.discounts_banner {
    background: #2b2b2d;
}
.type {
    border-bottom: 2px solid #303032;
    line-height: 44px;
    ul {
        display: flex;
        color: #fff;
        text-align: center;
        flex-wrap: wrap;
        li {
            margin: 15px;
            min-width: 120px;
            background-size: 100% 100%;
            cursor: pointer;
        }
        li:not(.active) {
            background-image: url("~@/assets/image/huodong2.png");
        }
        .active {
            background-image: url("~@/assets/image/huodong1.png");
        }
    }
}
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px 0px;
    li {
        width: 50%;
        padding: 5px;
        box-sizing: border-box;
    }
    .item1 {
        background: #585e58;
        position: relative;
        cursor: pointer;
        &:hover {
            box-shadow: 1px 1px 4px 3px #656565;
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
        height: 211px;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .ft {
        text-align: center;
        height: 32px;
        position: relative;
        .title {
            font-size: 22px;
            line-height: 32px;
            letter-spacing: 1px;
            color: #ffffff;
        }
        .btn_1 {
            position: absolute;
            top: 4px;
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

.huodong {
    li {
        position: relative;
        width: 100%;
        background: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
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
        .discounts_show:hover {
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
        }
        .discounts_show:hover .particulars_btn {
            background: red;
            color: #fff !important;
        }
        .discounts_show:hover .particulars_btn p {
            color: #fff !important;
        }
        .discounts_show {
            cursor: pointer;
            //显示的框
            box-sizing: border-box;
            border: 1px solid #ccc;
            display: flex;
            height: 233px;
            .signin_img {
                flex-shrink: 0;
                height: 100%;
                width: 650px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .signin_text {
                width: 30%;
                flex-grow: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h2 {
                    line-height: 60px;
                    font-size: 20px;
                    margin-left: 30px;
                    margin-top: 20px;
                }
                p {
                    font-size: 13px;
                    margin-left: 30px;
                }
                .activity_content {
                    width: 100%;
                    display: flex;
                    border-top: 1px solid #ccc;
                    height: 60px;
                    color: #ccc;
                    .particulars_time {
                        border-right: 1px solid #ccc;
                        width: 60%;
                        font-size: 16px;
                        padding-left: 30px;
                        span {
                            line-height: 60px;
                            color: #ccc;
                        }
                    }
                    .particulars_btn {
                        width: 40%;
                        p {
                            margin: 20px 20px 20px 56px;
                            color: red;
                            color: 18px;
                        }
                    }
                }
            }
        }
        .transition-box-1 {
            /deep/ p {
                margin: 12px 0px;
            }
            padding: 20px;
            border: 1px solid #e8e8e8;
            /deep/ table {
                border-spacing: 0px;
                border: 1px solid #cccccc;
                th,
                td {
                    border-bottom: 1px solid #cccccc;
                    border-right: 1px solid #cccccc;
                    text-align: center;
                    height: 30px;
                }
            }
        }
    }
}
</style>
