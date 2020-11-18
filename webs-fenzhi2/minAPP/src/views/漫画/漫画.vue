<template>
    <div class="video">
        <div class="top">
            <div class="icon" v-if="!搜索后显示列表" @click="返回()">
                <van-icon name="arrow-left" />
            </div>
            <div class="lei" v-if="搜索后显示列表" @click="分类列表()">分类列表</div>

            <div class="c_c">
                <span class="title_t" @click="返回首页()"></span>
                <div>
                    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" :clearable="false">
                        <div slot="action" @click="搜索()">搜索</div>
                    </van-search>
                </div>
            </div>
            <div></div>
        </div>

        <div class="video_content" v-if="搜索后显示列表">
            <ul class="guanz_ul">
                <li @click="查看漫画(keey)" v-for="(keey,index) in objSS.list">
                    <div class="img_box"  ><img  v-on:error.once="dosomething($event)" :src="configData.api_url+keey.fengmian" alt=""></div>
                    <div class="name_title">{{keey.name}}</div>
                    <div class="text_bottom">
                        <div class="收藏 fac">{{keey.last_update_chapter_name}}</div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="video_content" v-if="!搜索后显示列表">
            <van-tabs @click="onClick" animated>
                <van-tab v-for="(item,index) in title" :title="item">

                    <van-list class="ul外容器" v-if="titledata == item" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                        <ul class="guanz_ul">
                            <li @click="查看漫画(keey,item.title)" v-for="(keey,index) in objdata.list">
                                <div class="img_box"  ><img  v-on:error.once="dosomething($event)"  :src="configData.api_url+keey.fengmian" alt=""></div>
                                <div class="name_title">{{keey.name}}</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">{{keey.last_update_chapter_name}}</div>
                                </div>
                            </li>
                        </ul>
                    </van-list>

                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>  

<script>

import { 漫画大分类类型文字, 漫画大分类类型内容, 漫画搜索,漫画详情页 } from "@/api/漫画.js"
import { Toast } from 'vant';
import { 登录状态 } from "@/api/登录.js";

export default {
    data() {
        return {
            title: [],
            list: [],
            configData: config,
            value: "",
            active: 1,
            搜索后显示列表: false,
            objdata: {
                list: [],
                total: 0
            },
            loading: false,
            currentPagerm: 1,//当前页数
            rowrm: 10,//每页返回多少行数据
            titledata: "",
            mrimg :"/vdata/XiaoShuo/default.jpg"
        }
    },

    created() {

        this.获取标题()
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
    methods: {
           dosomething: function (e) {
        e.currentTarget.src = this.configData.api_url+ this.mrimg
      },
        onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数
            this.获取列表() //再调取请求数据的函数
        },
        onClick(name, title) {
            this.titledata = title
            this.currentPagerm = 0
            this.objdata.list = []
            this.objdata.total = -1;
            console.log(name)
            console.log(title)
        },

        获取标题() {
            漫画大分类类型文字().then(x => {
                if (x.data.code == 1) {
                    this.title = x.data.data
                    this.titledata = this.title[0]
                    var obj = {
                        class: this.title[0],
                        page: this.currentPagerm,
                        row: this.rowrm,
                    }
                    漫画大分类类型内容(obj).then(x => {
                        if (x.data.code == 1) {
                            this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                            this.objdata.total = x.data.data.total
                        } else {
                            this.objdata.total = 0
                        }
                        this.loading = false
                    }).catch(err => {
                        this.objdata.total = 0
                        this.loading = false
                        console.log(err)
                    })
                } else {
                    this.objdata.total = 0
                }
                this.loading = false
            }).catch(err => {
                this.objdata.total = 0
                this.loading = false
                console.log(err)
            })
        },
        获取列表(titletext) {
            var obj = {
                class: this.titledata,
                page: this.currentPagerm,
                row: this.rowrm,
            }
            漫画大分类类型内容(obj).then(x => {
                if (x.data.code == 1) {
                    //  this.objdata=x.data.data
                    this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total
                } else {
                    this.objdata.total = 0
                }
                setTimeout(()=>{
                    this.loading = false
                },1000)
            }).catch(err => {
                this.objdata.total = 0
                this.loading = false
                console.log(err)
            })
        },
        分类列表() {
            this.搜索后显示列表 = false;
            this.value = ""
        },
        搜索() {
            if (this.value !== "") {
                var obj = {
                    search: this.value,
                    page: 1,
                    row: 10,
                }
                漫画搜索(obj).then(x => {
                    if (x.data.code == 1) {
                        if (x.data.data.total !== 0) {
                            this.搜索后显示列表 = true
                            this.objSS = x.data.data
                        } else {
                            Toast("未查找到相关数据")
                        }
                    } else {
                        console.log("请求数据失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                Toast('请输入关键字')
            }
        },
        返回首页() {
        },
        onClickLeft() {//头部
            history.back()
        },
        clicktite(index) {
            this.tableType = index
        },
        查看漫画(item, type) {
            var obj={ id: item.id, check_status:1, }  
              漫画详情页(obj).then(x=>{
                        if(x.data.code==1){
                            if(x.data.data.usePoints!==0){
                              Toast(x.data.data.usePoints )
                              }
                             this.$router.history.push("/cartoonDetails?mhid=" + item.id); //点击跳转的对应地址
                        }else{
                             Toast(x.data.msg)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
        },

        返回() {//头部
            history.back()
        },
       
    },
}

</script>
<style lang="scss" scoped>
//======加载中和暂无数据 的轻提示===============
/deep/.van-list__finished-text{
    font-size: _vw(14);
}
//=====================
/deep/.van-tabs__line {
    height: _vw(3);
}
/deep/.van-tabs__wrap {
    position: fixed;
    left: 0px;
    top: _vw(44);
    z-index: 999;
    width: 100%;
    height: _vw(44);
}
/deep/.van-tab {
    line-height: _vw(44);
    font-size: _vw(14);
}
.top {
    height: _vw(44);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding-left: 10px;
    box-sizing: border-box;
    .icon {
        font-size: _vw(18);
        font-weight: 600;
    }
    .lei {
        font-size: _vw(14);
        color: red;
    }
    .c_c {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title_t {
            margin-right: _vw(5);
            font-size: _vw(15);
            font-weight: 700;
        }
        /deep/ .van-icon {
            font-size: _vw(20);
        }
        .van-search__content--round {
            height: _vw(30);
        }
        .van-cell {
            line-height: _vw(23);
            font-size: _vw(12);
        }
        .van-search__action {
            font-size: _vw(14);
        }
        /deep/.van-search {
            padding: 0px;
            background: none !important;
        }
    }
}
//+++++=+++++++++++++++++++++++++公用标题样式
//    .gaunz_top{
//                  display: flex;
//                  justify-content:space-between;
//                  height: _vw(30);
//                  align-items: center;
//                  height: _vw(50);
//                   .tt_t{
//                       font-size: _vw(14);
//                   }
//                  .gz_left{
//                      margin-left: _vw(10);
//                      display:flex;
//                      align-items: center;
//                  .iconremen1{
//                     font-size: _vw(20)
//                     }
//                  }
//                  .gz_right{
//                         display:flex;
//                      align-items: center;
//                      margin-right: _vw(10);
//                    .arrow{
//                     font-size: _vw(14)
//                    }
//                  }
//              }

//++++++++++++++++++++++++++++

//+++++=+++++++++++++++++++++++++去除顶部间隙
/deep/.van-nav-bar {
    border-bottom: 0px !important;
}
/deep/.van-hairline--bottom::after {
    border-bottom-width: 0px !important;
}
//++++++++++++++++++++++++++++
.video {
    width: 100%;
    .title {
        //   background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
        .van-icon {
            color: #ffffff;
        }
        .van-nav-bar__title {
            font-size: _vw(18);
            color: #ffffff;
        }
    }
    .video_content {
        padding-top: _vw(44);
        .guanz_ul {
            display: flex;
            padding-top: _vw(10);
            flex-wrap: wrap;
            li {
                margin-bottom: _vw(20);
                width: 33.33%;
                .img_box {
                    width: 92%;
                    margin: 0px auto;
                    height: _vw(140);
                    
                    img {
                        border-radius: _vw(6) !important;
                        width: 100%;
                        height: 100%;
                    }
                }
                .name_title {
                    font-size: _vw(14);
                    text-align: center;
                    width: 92%;
                    margin: 0px auto;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .text_bottom {
                    display: flex;
                    width: 92%;
                    margin: 0px auto;
                    justify-content: space-between;
                    .收藏 {
                        font-size: _vw(12);
                    }
                    .titme {
                        font-size: _vw(12);
                    }
                }
            }
        }
    }
}
</style>