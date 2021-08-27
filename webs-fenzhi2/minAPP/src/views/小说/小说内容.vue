
<template>
    <div class="小说内容" :class="classA ? 'class_a' : 'class_b'">
        <!-- =================弹出框开始======================= -->
        <van-popup class="弹框" v-model="show" position="right" :style="{ height: '100%',width:'80%' }" round >
            <div class="目录">
                <div class="title_tc">目录</div>
                <ul class="ul_">
                    <li v-for="(item,index) in arry" @click="查看小说(item)" :class="{当前章:(item.id==zjid)}">{{item.title}}</li>
                </ul>
            </div>
        </van-popup>
        <!-- =================弹出框结束======================= -->

        <div class="top" v-if="titleshow">
            <div class="返回" @click="返回()">
                <van-icon name="arrow-left" />
            </div>
            <div class="span_c" @click="上一章()">{{apTitle}}</div>
            <div  class="hah"><span   :class="{'yiSC':obj.collect==1}"   class="iconfont iconshoucang " @click="点击收藏函数(obj)"></span></div>
            <!-- <div v-if="!shouchang" class="hah"><span class="iconfont iconshoucang yiSC" @click="点击收藏函数()"></span></div> weiSC -->
        </div>

        <div class="content" @click="titleshow=!titleshow">

            <!-- http://67.229.173.202:9000/vdata/XiaoShuo/1/source/4.txt -->
            <div v-html="text"></div>
        </div>
        <div class="bottom" v-if="titleshow">
            <div @click="查看目录()">目录</div>
            <div class="span_c" @click="下一章()"><span>{{dowTitle}}</span></div>
            <div class="qhshow" @click="夜间白天切换()">{{classA ? "夜晚" :"白天"}}</div>
        </div>
    </div>
</template>
<script>
import { mapGetters,mapMutations } from "vuex";
import axios from 'axios';
import { 小说内容页, 小说详情页 } from "@/api/小说.js"
import {添加收藏,删除收藏} from "@/api/首页.js"
import { Toast } from 'vant';

export default {
    name: "",
    data() {
        return {
            configData: config,
            titleshow: true,
            // shouchang: true,
            classA: true,
            show: false,
            imgQZ: "",
            text: "",
            indexnum: 0,
            xqmhid: "",
            datamax: [],
            apTitle: "",
            dowTitle: "",
            arry: [],
            obj:{},

            zjid:"",    //章节id
        };
    },
    computed: {
        
    },
    mounted() {

    },
    created() {
        this.zjid = this.$route.query.zjid; //每个章节的id
        this.indexnum = this.$route.query.index; //每章小说的index
        this.xqmhid = this.$route.query.xqmhid; //每部小说的唯一id
        this.获取所有数据函数()
    },
    methods: {
        查看小说(item) {
            this.show = false
            this.$router.replace(`/fictionContent?xqmhid=${this.xqmhid}&zjid=${item.id}`)
        },
          ...mapMutations({
              记录当前信息:"小说内容数据信息",
        }),
        获取所有数据函数() {
            this.zjid = this.$route.query.zjid; //每个章节的id
            var obj = { id: this.zjid }
            小说内容页(obj).then(x => {
                this.text = x.data.data.content
                var objdata={
                      zjid:this.zjid,//小说章节id
                      xqmhid:this.xqmhid //小说id',
                }
                  this.记录当前信息(objdata)
            }).catch(err => {
                console.log(err)
            })
            var objxq = {
                id: this.xqmhid
            }
            小说详情页(objxq).then(x => {
                this.indexnum = parseInt(this.indexnum)
                this.arry = x.data.data.jpgs
                this.obj=x.data.data
                let index = this.arry.findIndex(x=>x.id==this.zjid);
                console.log( x.data.data)
                //第一张
                if(index==0){
                    // this.apTitle = this.arry[index].title
                    this.apTitle = '第一章'
                }else{
                    this.apTitle = this.arry[index-1].title
                }
                //最后一张
                if(index==this.arry.length-1){
                    this.dowTitle = '最后一章'
                }else{
                    this.dowTitle = this.arry[index+1].title
                }
            }).catch(err => {
                console.log(err)
            })
        },

        上一章() {
            let index = this.arry.findIndex(x=>x.id==this.zjid)
            if(index==0) return;
            let id = this.arry[index-1].id
            // this.获取所有数据函数()
            this.$router.replace(`/fictionContent?xqmhid=${this.xqmhid}&zjid=${id}`)
        },
        下一章() {
            let index = this.arry.findIndex(x=>x.id==this.zjid)
            if(index>=this.arry.length-1) return;
            let id = this.arry[index+1].id
            this.$router.replace(`/fictionContent?xqmhid=${this.xqmhid}&zjid=${id}`)
            // this.获取所有数据函数()
        },
        查看目录() {
            this.show = true
        },

       点击收藏函数() {
            if(this.obj.collect==0){//未收藏
                var obj={
                    class:"xiaoshuo",
                    id:this.xqmhid
                }
                 添加收藏(obj).then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                         Toast(x.data.msg);
                           this.obj.collect=1
                    }else{
                        Toast('收藏失败111');
                    }
                }).catch(err=>{
                        Toast('收藏失败');
                    console.log(err)
                })
            }else{//已经收藏
                 var objDelete={
                    class:"xiaoshuo",
                    id:this.xqmhid
                }
                 删除收藏(objDelete).then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                          Toast(x.data.msg);
                            this.obj.collect=0
                    }else{
                        console.log("撤销收藏失败77")
                    }
                }).catch(err=>{
                  Toast('撤销收藏失败55'); 
                    console.log(err)
                })
            }
        },



        夜间白天切换() {
            this.classA = !this.classA
        },
        返回() {//头部
            history.back()
        },
    },
    watch: {
        $route(){
            this.获取所有数据函数()
        }
    },
};
</script> 

<style lang="scss" scoped>
.当前章{
    color:red !important;
    // background:red;
}
/deep/.van-popup__close-icon--top-right {
    color: red;
    font-size: _vw(18);
    // line-height:_vw(44);
    top: _vw(14);
}
.class_a {
    background: #c4b395;
}
.class_b {
    background: #1a1a1a;
    color: rgba(255, 255, 255, 0.5);

    // color:#554a4a;
}
.小说内容 {
    box-sizing: border-box;
    position: absolute;
    height: 100%;
    width: 100%;

    left: 0px;
    top: 0px;
    font-size: _vw(16);
    overflow: auto;
    .弹框 {
        .目录 {
            padding: _vw(0) _vw(0) _vw(10) _vw(10);
            .title_tc {
                position: fixed;
                left: 0;
                top: 0px;
                z-index: 20;
                width: 100%;
                height: _vw(44);
                text-align: center;
                border-bottom: 1px solid red;
                line-height: _vw(44);
                color: red;
            }
            .ul_ {
                padding-left: _vw(10);
                padding-top: _vw(44);
                li {
                    font-size: _vw(14);
                    border-bottom: _vw(1) solid #e6e2e2;
                    line-height: _vw(38);
                    font-size: _vw(14);
                    color:#acacac;
                }
            }
        }
    }
    .content {
        p {
            text-indent: _vw(10);
        }
    }

    .top,
    .bottom {
        height: _vw(44);
        line-height: _vw(44);
        background: rgba(0, 0, 0, 0.9);
        position: fixed;
        left: 0px;
        color: #fff;
        width: 100%;
        z-index: 10;
        padding: _vw(0) _vw(10) _vw(0) _vw(10);
        box-sizing: border-box;
        .span_c {
            text-align: center;
        }
    }
    .top {
        top: 0px;
        display: flex;
        justify-content: space-between;

        align-items: center;

        .weiSC {
            color: #acacac;
        }
        .yiSC {
            color: red;
        }
        .iconshoucang {
            font-size: _vw(18);
        }
        .返回 {
            width: _vw(30);

            .iconzuobian {
                color: #ffffff;
            }
        }
    }
    .bottom {
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .qhshow {
        }
    }
    .img_box {
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>



