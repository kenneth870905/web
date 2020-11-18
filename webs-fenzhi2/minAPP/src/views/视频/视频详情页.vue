
<template>
    <div class="视频详情页">

        <van-nav-bar class="title" :title="obj.title" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="invition" class="invition" :class="{'shouchangactive':obj.collect==1}" slot="right" />
        </van-nav-bar>
    <div class="box_box">
        <div class="content">
            <div class="cideo_box">
                <video :src="configData.api_url+obj.url" controls="controls" class="video" width="100%">
                    您的浏览器不支持 video 标签。
                </video>
            </div>
               <div class="评论标题">
                   <div class="title评论区">
                     <div class="text">评论区</div>
                   </div>
               </div>
               


            <van-list class="评论区" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
               
                <ul class="pl_ul">
                    <li v-for="(item2,index) in objdata.list">
                        <div class="top_li">
                            <div class="toux"><img :src="configData.api_url+item2.head" alt=""></div>
                            <div class="li_left_top">
                                <div class="bottom_li">{{item2. name}}</div>
                                <div class="name">{{item2.content}}</div>
                                <div class="li_right_top">{{item2.add_time}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
        <!-- =====================评论输入框开始========================================= -->
        <div class="评论">
            <div class="input">
                <div class="left_input">
                    <van-cell-group>
                        <van-field v-model="value" rows="1" autosize label="留言" type="textarea" placeholder="内容最多50字以内" maxlength="50" />
                    </van-cell-group>
                </div>
                <div class="right" @click="点击评论()">评论</div>
            </div>
        </div>
     </div>
        <!-- //==================弹出框=========================== -->
        <van-popup v-model="show" class="弹出框">
            <div class="tc_box">
                <div class="定位关闭" @click="show=false">
                    <van-icon name="cross" />
                </div>
                <div class="img_box"><img @click="点击跟换二维码()" :src="configData.api_url+imgurl" alt=""></div>

                <div class="input">
                    <div class="left_input">
                        <van-cell-group>
                            <van-field v-model="valuenum" placeholder="请输入以上验证码" />
                        </van-cell-group>
                    </div>
                    <div class="right" @click="点击确认验证码()">确认</div>
                </div>
            </div>
        </van-popup>

    </div>
</template>

<script>
import { Toast } from 'vant';
import { 视频播放页 } from "@/api/视频.js"
import { 添加评论, 评论列表 } from "@/api/评论.js"
import { 添加收藏, 删除收藏 } from "@/api/首页.js"
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
            configData: config,
            obj: {},
            shouchang: true,
            value: "",
            show: false,
            imgurl: "/admin/Appdiscuss/getcode",
            valuenum: "",//  验证码

            currentPagerm: 0,//当前页数
            rowrm: 3,//每页返回多少行数据
            objdata: {
                list: [],
                total: -1
            },
            loading: false
        };
    },
    computed: {
        finished() {
            if (this.objdata.total == -1) {//默认的时候是-1   return false
                return false
            } else {
                if (this.objdata.total <= this.objdata.list.length) {  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                } else {
                    return false
                }
            }
        }
    },
    created() {
        this.id = this.$route.query.id
        var obj = {
            id: this.id
        }
        console.log(this.id)
        视频播放页(obj).then(x => {
            if (x.data.code == 1) {
                this.obj = x.data.data
            } else {
                // this.$router.push('/')
                Toast(x.data.msg)
                console.log("请求失败失败")
            }
        }).catch(err => {})
        //   this.获取评论列表()//这个函数要用岛id值  所以放在获取id值得后面
    },
    methods: {
        onLoad() {                     //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")      
            this.currentPagerm++       //当前页数 
            this.获取评论列表()         //再调取请求数据的函数
        },
        点击跟换二维码() {
            this.imgurl = ""
            this.$nextTick(() => {
                this.imgurl = "/admin/Appdiscuss/getcode"
            })
        },
        点击确认验证码() {
            if (this.valuenum !== "") {//验证码不为空才能进行下一步，
                var obj = {
                    content: this.value,
                    class: "video",
                    id: this.id,
                    code: this.valuenum,
                    row: 5
                }
                添加评论(obj).then(x => {
                    console.log(x)
                    if (x.data.code == 1) {
                        this.show = false
                        this.value = ""
                        var minobj = x.data.data.list[0]
                        this.objdata.list.unshift(minobj)
                       
                    } else {
                        Toast(x.data.msg)
                        console.log('请求失败')
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                Toast('请输入以上验证码')

            }
        },
        点击评论() {
            if (this.value !== "") {
                this.show = true
            } else {
                Toast('请输入你要评论的类容')
            }
        },
        获取评论列表() {
            this.id = this.$route.query.id
            var obj = {
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
                class: "Video",
                id: this.id,
            }
            评论列表(obj).then(x => {
                if (x.data.code == 1) {
                    console.log(x)
                    this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total
                } else {
                    this.objdata.total = 0
                }
                this.loading = false
            }).catch(err => {
                this.objdata.total = 0
                this.loading = false
            })
        },
        onClickRight() {
            if (this.obj.collect == 0) {
                var obj = {
                    class: "video",
                    id: this.id
                }
                添加收藏(obj).then(x => {
                    console.log(x)
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        this.obj.collect = 1

                    } else {
                        Toast('收藏失败111');
                    }
                }).catch(err => {
                    Toast('收藏失败');
                    console.log(err)
                })

            } else {
                var objDelete = {
                    class: "video",
                    id: this.id
                }
                删除收藏(objDelete).then(x => {
                    console.log(x)
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        this.obj.collect = 0
                    } else {
                        console.log("撤销收藏失败")
                    }
                }).catch(err => {
                    Toast('撤销收藏失败');
                    console.log(err)
                })
            }
            this.shouchang = !this.shouchang
        },
        onClickLeft() {//头部
            history.back()
        },
    },
};
</script> 

<style lang="scss" scoped>
 [class*="van-hairline"]::after {
    border: none;
}
//======加载中和暂无数据 的轻提示===============
/deep/.van-list__finished-text{
    font-size: _vw(14);
}
//=====================


// =============title样式===================
/deep/.van-nav-bar .van-icon {
    color: #fff;
}
/deep/.van-nav-bar__title {
    color: #fff;
    font-size: _vw(16) !important;
}

// =============title样式===================
//==============公用样式 state===============================
.input {
    width: 90%;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: _vw(6);
    .left_input {

           background: #f8f8f8;
        width: 80%;
        box-sizing: border-box;
        margin-right: _vw(10);
        border-radius: _vw(20) !important;

        // background: #f5222d;
        // width: 80%;
        // box-sizing: border-box;
       
        /deep/ .van-field__label {
            width: _vw(40);
        }
        /deep/ input {
            font-size: _vw(14);
        border-radius: _vw(20) !important;

        }
        /deep/.van-cell {
            padding: 0px;
            line-height: _vw(36);
            padding-left: _vw(10);
            border-radius: _vw(6);
            font-size: _vw(14);
            .van-field__control {
                border-radius: _vw(10);
                //  height: _vw(33);
            }
        }
    }
    .right {
        background: #f5222d;
        width: _vw(60);
        height: _vw(36);
        color: #ffffff;
        border-radius: _vw(6);
        line-height: _vw(36);
        font-size: _vw(13);
        text-align: center;
    }
}
//================公用样式 out================
.视频详情页 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    overflow-y:auto;
    .title {
        background: linear-gradient(135deg, #ec304c 0%, #cb1c36 100%);
        position: fixed;
        width: 100%;
        // height: 100%;

        .invition {
            font-size: _vw(18);
        }

        .shouchangactive {
            color: rgb(63, 128, 248);
        }
    }
    .box_box{
         display: flex;
        flex-direction: column;
        min-height: 100%;

         
        .评论{
              height: _vw(48);
              background-color: rgba(0, 0, 0, 0.6);
        }
        .content{
            flex:1
        }
    }
    .content {
        padding-top: _vw(0);
         display: flex;
           .评论标题{
               height:_vw(20);
            //    background: #cb1c36;
                background: #ffffff;
               padding-top:_vw(40);
            //    height: _vw();
               position: absolute;
                width: 100%;
                left: 0px;
                top:_vw(240);

                  .title评论区 {
                    margin-bottom: _vw(10);
                    border-bottom: 1px solid rgb(224, 221, 221);
                    
                    .text {
                        position: absolute;
                        left: 50%;
                        height: _vw(30);
                        line-height: _vw(30);
                        background: #ffffff;
                        width: _vw(60);
                        font-size: _vw(14);
                        top: _vw(24);
                        text-align: center;
                        margin-left: _vw(-30);
                        color: #666;
                    }
                }
           }
     
        .评论区 {
            max-height: _vw(240);
            overflow-y:auto;
            padding: _vw(300) _vw(10) _vw(0) _vw(10);

             width: 100%;
            .pl_ul {

                li {
                    padding: _vw(6);
                    border-bottom: 1px solid rgb(224, 221, 221);
                    .top_li {
                        margin-bottom: _vw(4);
                        display: flex;
                        width: 100%;
                        .toux {
                            width: _vw(46);
                            height: _vw(46);
                            margin-right: _vw(10);
                            border-radius: 50%;
                            //    background: #ec304c;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .li_left_top {
                            flex: 1;
                            word-break: break-all;
                            white-space: normal;
                            .bottom_li {
                                font-size: _vw(14);
                                color: #666666;
                            }
                            .name {
                                font-size: _vw(14);
                                word-break: break-all;
                                white-space: normal;
                            }
                            .li_right_top {
                                color: #666666;
                                font-size: _vw(12);
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }

        .titledata {
            color: #444242;
            width: 100%;
            line-height: _vw(36);
            font-weight: 600;
            font-size: _vw(15);
            padding: _vw(0) _vw(10);
            box-sizing: border-box;
        }
        .cideo_box {
            height: _vw(200);
            position: fixed;
            top: _vw(40);
            padding-top: _vw(10);
            left: 0px;
            width: 100%;
            z-index: 2;
            background: #ffffff;
            .video {
                width: 100%;
                height: _vw(200);
            }
        }
    }
    .弹出框 {
        // width: 100%;
        width: 90%;
        border-radius: _vw(10);

        .tc_box {
            height: _vw(200);
            margin: 0 auto;
            width: 100%;
            

            // background: #387599;
            background: rgba(0, 0, 0, 0.4);
            border-radius: _vw(10);

            padding: _vw(20) 0px;
            position: relative;
            top:0;
            left: 0;
            z-index: 100;
            .定位关闭 {
                position: absolute;
                right: 10px;
                top: 10px;
                color: red;
                z-index: 2;
                font-size: _vw(20);
            }
            .img_box {
                //    width: _vw(90);
                height: _vw(40);
                display: flex;
                align-items: center;

                margin: 0 auto;

                img {
                    margin: 0 auto;

                    //    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    // .评论 {
    //     padding-bottom: _vw(6);
    //     width: 100%;
    //     position: fixed;
    //     bottom: _vw(0);
    //     left: _vw(0);
    //     z-index: 40;
    //     background-color: rgba(0, 0, 0, 0.6);

    // }
}
</style>



