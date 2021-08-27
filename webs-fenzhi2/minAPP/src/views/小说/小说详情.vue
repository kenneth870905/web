<template>
    <div class="top">
        <!-- =====================评论输入框开始========================================= -->
        <div class="评论" v-show="tableType == 3">
            <div class="input">
                <div class="left_input">
                    <van-cell-group>
                        <van-field v-model="value" rows="1" autosize label="留言" type="textarea" placeholder="内容最多50字以内" maxlength="50" />
                    </van-cell-group>
                </div>
                <div class="right" @click="点击评论()">评论</div>
            </div>
        </div>
        <!-- //==================弹出框=========================== -->
        <van-popup v-model="show" class="弹出框">
            <div class="tc_box">
                <div class="定位关闭" @click="show=false">
                    <van-icon name="cross" />
                </div>
                <div class="img_box">
                    <img @click="点击跟换二维码()" :src="configData.api_url+imgurl" alt />
                </div>

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

        <div class="title_nav">
            <div class="left" @click="返回()">
                <van-icon name="arrow-left" class="arrow" />
            </div>
            <div class="title_c">小说详情</div>
            <div class="right"></div>
        </div>
        <div class="head">
            <div class="head-info">
                <div class="head-img" >
                    <img v-if="obj.fengmian" :src="configData.api_url+obj.fengmian"   v-on:error.once="dosomething($event)" />
                </div>
                <div class="head-txt">
                    <ul>
                        <li style="font-size:20px;">{{obj.name}}</li>
                        <li>
                            <label>作者：</label>
                            <span>{{obj.types}}</span>
                        </li>
                        <li>
                            <label>时间：</label>
                            <span>{{obj.last_updatetime}}</span>
                        </li>

                        <li>
                            <label>最后新章节：</label>
                            <span style="color:yellow;">{{obj.last_update_chapter_name}}</span>
                        </li>

                        <li class="收藏">
                            <span @click="收藏(obj)">
                                <span class="sc">收藏：</span>
                                <span :class="{'huhu':obj.collect==1}" class="iconfont iconshoucang"></span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="排行分类">
            <div class="div" @click="切换(1)" :class="{active:tableType == 1 }">
                <div class="title_text">详情</div>
            </div>
            <div class="div" @click="切换(2)" :class="{active:tableType == 2 }">
                <div class="title_text">目录</div>
            </div>
            <div class="div" @click="切换(3)" :class="{active:tableType == 3 }">
                <div class="title_text">评论</div>
            </div>
        </div>
        <div class="detail">
            <div class="ul_l" v-show="tableType == 1">
                <div class="detail-summary">
                    <p>{{obj.description}}</p>
                </div>
                <div class="mod-recommend3">
                    <span>骚年们都在看：</span>
                    <div class="推荐书单">
                        <div class="书单" v-for="(item,index) in 推荐" :key="index" @click="查看推荐小说(item)">
                            <div class="img_box">
                                <img  :src="configData.api_url+item.fengmian" alt  v-on:error.once="dosomething($event)" />
                            </div>
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ul_l" v-show="tableType == 2" style="width:100%">
                <div class="time">
                    <span>&nbsp;&nbsp;{{obj.add_time}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{obj.last_update_chapter_name}}</span>
                </div>
                <div class="chapter">
                    <ul class="nav_ul">
                        <li v-show="index<12 || 展开 " v-for="(item,index) in obj.jpgs"    :class="{刚查看的章节:(小说内容数据.zjid==item.id)}" @click="查看详情(item,index)"  :key="index">{{item.title}}</li>
                    </ul>
                    <div v-if="obj.jpgs && obj.jpgs.length>12" class="加载更多" @click="展开=!展开">查看更多目录</div>
                </div>
            </div>

                <van-list class="ul_l"  v-if="tableType == 3"  v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                  
                    <ul class="pl_ul">
                        <li v-for="(item2,index) in objdata.list">
                            <div class="top_li">
                                <div class="toux">
                                    <img :src="configData.api_url+item2.head" alt />
                                </div>

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
    </div>
</template>


<script>
import { Toast } from "vant";
import { 小说详情页 } from "@/api/小说.js";
import { 热门推荐三部, 添加收藏, 删除收藏 } from "@/api/首页.js";
import { 添加评论, 评论列表 } from "@/api/评论.js";
import { mapState,mapMutations} from "vuex";

export default {
    data() {
        return {
            展开: false,
            configData: config,
            obj: {},
            tableType:2,
            mhidid: "",
            shouchang: true, //收藏图标切换
            推荐: [],
            catalog:"",//判断
             mrimg:"/vdata/XiaoShuo/default.jpg",
            show:false,//弹出框
             valuenum:"",//验证码
             value:"",//评论的内容
             imgurl:"/admin/Appdiscuss/getcode",//地址
                 currentPagerm: 0,//当前页数
                    rowrm: 5,//每页返回多少行数据
                    objdata: {
                        list:[],
                        total:-1
                    },
              loading: false,
        };
    },
    components: {},
    created() {   
        this.mhidid = this.$route.query.mhid;
        console.log(this.mhidid);
        this.获取所有数据函数();
        this.推荐随机三部();
     
    },
    computed: {
          ...mapState({
              小说内容数据:"小说内容数据",
             
        }),
         
          finished(){
            if(this.objdata.total==-1){//默认的时候是-1   return false
                return false
            }else{
                if(this.objdata.total<=this.objdata.list.length){  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                }else{
                    return false
                }
            }
        }

    },
    methods: {
        //   ...mapMutations({
        //             是否展开:"是否显示查看更多按钮状态"
        //         }),
        dosomething: function (e) {
        e.currentTarget.src = this.configData.api_url+ this.mrimg
      },


        /////////////////////////////////评论开始///////////////////////////////////////////////
           onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.获取评论列表() //再调取请求数据的函数
          },
          点击跟换二维码(){
            this.imgurl=""
            this.$nextTick(()=>{
                this.imgurl="/admin/Appdiscuss/getcode"
            })
         },
     

         点击评论(){
             if(this.value!==""){
              this.show=true
             }else{
                 Toast('请输入你要评论的类容')
             }
         
         },
         点击确认验证码(){
             if(this.valuenum!==""){//验证码不为空才能进行下一步，
                var obj={
                    content:this.value,
                    class:"xiaoshuo",
                    id:this.mhidid,
                    code:this.valuenum,
                }
                添加评论(obj).then(x=>{
                    console.log(x)     
                    if(x.data.code==1){
                          this.show=false
                           this.value=""
                           this.valuenum=""
                          var minobj=x.data.data.list[0]
                          console.log(minobj)
                          this.objdata.list.unshift(minobj)
                        Toast(x.data.msg)

                    }else{
                        Toast(x.data.msg)
                        console.log('请求失败')
                    }
                }).catch(err=>{
                    console.log(err)
                })
             }else{
                 Toast('请输入以上验证码')

             }

         },
         获取评论列表(){
        this.mhidid = this.$route.query.mhid;

         var obj = {
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
                class: "xiaoshuo",
                  id:this.mhidid,
                     }
       
             评论列表(obj).then(x=>{
                 console.log(x)
                 if(x.data.code==1){
                       this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                       this.objdata.total = x.data.data.total 
                 }else{
                    this.objdata.total = 0
                     console.log('请求失败')
                 }
                this.loading=false

             }).catch(err=>{
                  this.objdata.total = 0
                this.loading=false
                 console.log(err)
             })
           },
            获取所有数据函数(){
                var obj={
                    id: this.mhidid
                }       
              漫画详情页(obj).then(x=>{
                        // console.log(x)
                        if(x.data.code==1){
                            this.obj=x.data.data
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
          },

        ////////////////////////////评论结束////////////////////////////////////////////////
        收藏(item) {
            if (item.collect == 0) {
                var obj = {
                    class: "xiaoshuo",
                    id: item.id
                };
                添加收藏(obj)
                    .then(x => {
                        console.log(x);
                        if (x.data.code == 1) {
                            Toast(x.data.msg);
                            item.collect = 1;
                        } else {
                            Toast("收藏失败111");
                        }
                    })
                    .catch(err => {
                        Toast("收藏失败");
                        console.log(err);
                    });
            } else {
                var objDelete = {
                    class: "xiaoshuo",
                    id: item.id
                };
                删除收藏(objDelete)
                    .then(x => {
                        console.log(x);
                        if (x.data.code == 1) {
                            Toast(x.data.msg);
                            item.collect = 0;
                        } else {
                            console.log("撤销收藏失败");
                        }
                    })
                    .catch(err => {
                        Toast("撤销收藏失败");
                        console.log(err);
                    });
            }
            this.shouchang = !this.shouchang;
        },

        查看推荐小说(item) {
            this.mhidid = item.id;
            var obj = {
                id: this.mhidid //漫画唯一id
            };
            
                小说详情页(obj).then(x => {
                    if (x.data.code == 1) {
                        console.log(x.data.data);
                        this.obj = x.data.data;
                    } else {
                        console.log("请求数据失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // this.漫画详情页推荐随机三部()
        },
        推荐随机三部() {
            var obj = {
                cid: this.mhidid,
                class: "xiaoshuo"
            };
            热门推荐三部(obj)
                .then(x => {
                    console.log(x);
                    if (x.data.code == 1) {
                        this.推荐 = x.data.data;
                    } else {
                        console.log("请求数据失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        获取所有数据函数() {
            var obj = {
                id: this.mhidid
            };
            小说详情页(obj)
                .then(x => {
                    console.log(x);
                    if (x.data.code == 1) {
                        this.obj = x.data.data;
                        console.log(x.data.data);
                    } else {
                        console.log("请求数据失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        切换(index) {
            this.tableType = index

            // this.选择详情 = index;
            // this.active = index;
        },

        返回() {
     
            history.back();
        },
        查看详情(item, index) {
            //    obj.id当前小说唯一id               item.id前章数唯一id
            this.$router.history.push(
                "/fictionContent?xqmhid=" +
                this.obj.id +
                "&zjid=" +
                item.id +
                "&index=" +
                index
            ); //点击跳转的对应地址
        }
    }
};
</script>

<style lang="scss" scoped>
.刚查看的章节{//激活样式
  background: #cb1c36;
  color:#ffffff !important;
}
//======加载中和暂无数据 的轻提示===============
/deep/.van-list__finished-text{
    font-size: _vw(14);
}
//=====================
* {
    background: none;
}
[class*="van-hairline"]::after {
    border: none;
}
.active {
    div {
        border-bottom: 3px solid #ff9a6a;
    }
}
//==================input====结束=======================
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
        font-size: _vw(14);
        
        /deep/ .van-field__label {
            width: _vw(40);
        }
        /deep/ input {
            font-size: _vw(14);
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
//================input==结束==============
.top {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;

    width: 100%;
    background: #fff;
    // <!-- =====================评论输入框开始========================================= -->
    .评论 {
        padding-bottom: _vw(6);
        width: 100%;
        position: fixed;
        bottom: _vw(0);
        left: _vw(0);
        z-index: 40;
        background-color: rgba(0, 0, 0, 0.6);
        /deep/.van-cell{
          font-size: _vw(14);
        }
    
    }
    .弹出框 {
        width: 90%;
        border-radius: _vw(10);

        .tc_box {
            margin: 0 auto;
            width: 100%;

            background: rgba(0, 0, 0, 0.4);
            border-radius: _vw(10);

            padding: _vw(20) 0px;
            position: relative;
            .定位关闭 {
                position: absolute;
                right: 10px;
                top: 10px;
                color: red;
                z-index: 2;
                font-size: _vw(20);
            }
            .img_box {
                height: _vw(40);
                display: flex;
                align-items: center;

                margin: 0 auto;

                img {
                    margin: 0 auto;
                    height: 100%;
                }
            }
        }
    }
    .title_nav {
        position: fixed;
        top: 0;
        left: 0px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: _vw(44);
        color: #fff;
        background: linear-gradient(
            135deg,
            #ec304c 0%,
            #cb1c36 100%
        ) !important;
        line-height: _vw(44);
        font-size: _vw(20);
    }
}

.head {
    margin-top: _vw(44);
    display: flex;
    justify-content: center;
    background: green;
    background-image: url("~@/assets/img/manhua/minBanner.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.head-info {
    width: 100%;
    display: flex;
    align-items: center;
    padding: _vw(15) 10px;
    box-sizing: border-box;
    
    .head-img {
        width: 40%;
        height: _vw(160);
        text-align: center;
       
        img {
            max-width: 100%;
            height: 100%;
        }
    }
}


.head-txt ul li {
    color: white;
    font-size: _vw(12);
    margin: _vw(10);
}
.head-txt {
    width: 60%;
    margin-left: _vw(10);
    ul {
        .收藏 {
            > span {
                display: flex;
                align-items: center;
                .iconshoucang {
                    font-size: _vw(16);
                }
                .huhu {
                    color: red;
                }
                .sc {
                    font-size: _vw(12);
                }
            }
        }
    }
}

.排行分类 {
    display: flex;
    width: 100%;
    justify-content: center;
    height: _vw(44);
    border-bottom: 1px solid #f8f8f8;
    line-height: _vw(44);
    .div {
        // width: 50%;
        width: 33.33%;
        text-align: center;
        // background: white;
        font-size: _vw(16);
        color: #969696;
        font-weight: 500;
        display: flex;
        align-items: center;
        div {
            margin: 0px auto;
        }
    }
}

.detail-icon {
    text-align: center;
    margin: 10px;
}
.detail {
    background: #fff;
    .ul_l {
        // height: 100%;
        // padding-top:_vw(20);
        background: #fff;
        overflow: auto;
        //======================评论列表开始========================================
        // .评论区 {
        //   padding:_vw(0) _vw(10) _vw(0) _vw(10);
 
        // }

        .pl_ul {
          padding:_vw(0) _vw(10) _vw(40) _vw(10);


            li {
                   padding:_vw(6) _vw(6) _vw(0) _vw(6) ;
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

        //======================评论列表展示结束========================================
        .detail-summary {
            width: 90%;
            margin: 0 auto;
        }
    }
}
.detail-summary p {
    font-size: _vw(13);
    color: #535252;
    line-height: _vw(24);
}

.推荐书单 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.书单 {
    width: 33.33%;
    height: 100%;
    margin-bottom: 10px;
}

.书单 p {
    font-size: _vw(12);
    text-align: center;
    background: white;
}

.书单 {
    .img_box {
        width: 90%;
        margin: 0px auto;
        height: _vw(148);
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.mod-recommend3 {
    padding-bottom: _vw(0);
    span {
        font-size: _vw(14);
        color: #969696;
        margin: 15px;
        display: inline-block;
    }
}

.time span {
    font-size: _vw(14);
    line-height: _vw(30);
    color: #969696;
}

.chapter {
    width: 100%;
    // height: 200px;
    .nav_ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-left: _vw(5);
        padding-right: _vw(5);
        box-sizing: border-box;

        li {
            width: 31.53%;
            height: 47px;
            border: 1px solid #c5c5c5;
            margin: _vw(3);

            text-align: center;
            line-height: 47px;
            color: #535252;
            font-size: _vw(14);
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
            padding-left: _vw(5);
            padding-right: _vw(5);
            box-sizing: border-box;
        }
    }
}
.加载更多 {
    width: 95%;
    height: _vw(50);
    border: 1px solid #c5c5c5;
    margin: 0 auto;
    text-align: center;
    color: #535252;
    font-size: _vw(18);
    line-height: _vw(50);
}
</style>
