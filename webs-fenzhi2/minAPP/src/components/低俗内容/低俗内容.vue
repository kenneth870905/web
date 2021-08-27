
            <template>
       <div class="video">
       
        <div class="搜索按钮" @click="搜索后显示列表=!搜索后显示列表">{{搜索后显示列表 ? "列表" :"搜索"}}</div>

        <div class="video_content SS_div" v-if="搜索后显示列表">
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
            <ul class="guanz_ul">
                    <van-list class="ul外容器搜索"  v-model="loadingSS" :offset="20" :finished="finishedSS" :finished-text="objSS.total==0 ? '暂无数据' : '没有更多了'" @load="onLoadSS">
                        <ul class="guanz_ul">
                          <li v-for="(keey,index) in objSS.list">
                                <div class="left">{{keey.title}}</div>   
                                <div class="right"  v-if="keey.type!=='txt'"><img :src="configData.api_url+keey.jpg" alt=""></div>
                                  <div  class="text" v-if="keey.type=='txt'" v-html="keey.content"></div>
                                <div class="t_t">
                                    <div class="t_L">{{keey.collectweb}}</div>
                                    <div class="t_r">{{keey.add_time}}</div>
                                </div>
                            </li>
                        </ul>
                    </van-list>
            </ul>
        </div>



        <div class="video_content" v-if="!搜索后显示列表"> 
          <van-tabs @click="onClick" animated>
                <van-tab v-for="(item,index) in title" :title="item">
                    <van-list class="ul外容器" v-if="titledata == item" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                        <ul class="guanz_ul">
                          <li v-for="(keey,index) in objdata.list">
                                <div class="left">{{keey.title}}</div>   
                                <div class="right" v-if="keey.type!=='txt'" ><img :src="configData.api_url+keey.jpg" alt=""></div>
                                 <div  class="text" v-if="keey.type=='txt'" v-html="keey.content"></div>
                                <div class="t_t">
                                    <div class="t_L">{{keey.collectweb}}</div>
                                    <div class="t_r">{{keey.add_time}}</div>
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
import { Dialog } from 'vant';
import { 低俗内容分类标题,低俗内容分类内容列表,关键字搜索} from "@/api/低俗内容.js"
import { Toast } from 'vant';
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

            listtitle:["同人","汉化","奇幻","汉化","汉化",],
            activeName:0,
            trlist:[
               "同人内容1",
               "同人内容2",
               "同人内容3",
            ],
                 yqlist:[
               "言情内容1",
               "言情内容2",
               "言情内容3",
            ], 

              loadingSS: false,
              currentPagermSS: 1,//当前页数
              rowrmSS: 10,//每页返回多少行数据
            objSS: {
                list: [],
                total: 0
            },
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
        },

        finishedSS() {
            if (this.objSS.total == -1) {//默认的时候是-1   return false
                return false
            } else {
                if (this.objSS.total <= this.objSS.list.length) {  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数
            this.获取列表() //再调取请求数据的函数
        },

         onLoadSS() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagermSS++//当前页数
            this.搜索() //再调取请求数据的函数
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
            低俗内容分类标题().then(x => {
                console.log(x)
                if (x.data.code == 1) {
                    this.title = x.data.data
                    this.titledata = this.title[0]
                    var obj = {
                        class: this.title[0],
                        page: this.currentPagerm,
                        row: this.rowrm,
                    }
                    低俗内容分类内容列表(obj).then(x => {
                        if (x.data.code == 1) {
                            //  if(x.data.data.usePoints!==0){
                            //     Toast(x.data.data.usePoints)
                            //     }
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
            低俗内容分类内容列表(obj).then(x => {
                if (x.data.code == 1) {
                    // if(x.data.data.usePoints!==0){
                    //       Toast(x.data.data.usePoints)
                    //     }
                    this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total
                } else {
                    this.objdata.total = 0
                    
                }
                 this.loading = false

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
                    page: this.currentPagermSS,
                    row:  this.rowrmSS,
                }
                关键字搜索(obj).then(x => {

                if (x.data.code == 1 ) {
                     if (x.data.data.total !== 0) {
                              this.value="";
                              this.objSS.list =[];
                              this.objdata.total = -1;
                              this.currentPagerm = 0

                        this.objSS.list = [...this.objSS.list, ...x.data.data.list];// x.data.data.list持续加加 
                        this.objSS.total = x.data.data.total
                     }else{
                       this.objSS.total = 0
                        Toast('未查找到相关数据')
                     }
                     
                } else {
                    
                }
                setTimeout(()=>{
                    this.loadingSS = false
                },1000)

                    // if (x.data.code == 1) {
                    //     if (x.data.data.total !== 0) {
                    //         this.搜索后显示列表 = true
                    //         this.objSS = x.data.data
                    //     } else {
                    //         Toast("未查找到相关数据")
                    //     }
                    // } else {
                    //     console.log("请求数据失败")
                    // }
                }).catch(err => {
                     this.objSS.total = 0
                    this.loadingSS = false
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
            console.log(item.id)
            // this.$router.history.push("/cartoonContent?mhid="+ item.id+'&type='+type); //点击跳转的对应地址
            this.$router.history.push("/cartoonDetails?mhid=" + item.id + '&type=' + type); //点击跳转的对应地址
        },

        返回() {//头部
            history.back()
        },
        // 页码改变时(){
        //      console.log(this.currentPage+"当前页")//当前页数
        //      console.log(this.zhongY+"总页数")//当前页数
        // }
    },
}

</script>
<style lang="scss" scoped>
//======加载中和暂无数据===============
/deep/.van-list__finished-text{
    font-size: _vw(14);
}

// ===================================
/deep/.van-tabs__nav--card .van-tab.van-tab--active{
 //   background: goldenrod;
    color:red;
    font-weight: 600;
    font-size: _vw(16);
    background: none;

}
/deep/.van-tabs__nav--card{
    margin:0px;
    border:none;
    border-bottom: 1px solid #acacac;
   -webkit-box-shadow:inset 0 0 10px rgb(73, 154, 246);  
   -moz-box-shadow:inset 0 0 10px rgb(73, 154, 246);  
    box-shadow:inset 0 0 10px rgb(73, 154, 246);  
}
/deep/.van-tabs__nav--card .van-tab{
    border-right:none;
}
/deep/.van-tabs__line {
    height: _vw(3);
}
/deep/.van-tabs__wrap {
    position: fixed;
    left: 0px;
    top: _vw(43);
    z-index: 10;
    width: 100%;
    height: _vw(44);
}
/deep/.van-tab {

    // line-height: _vw(44);
    font-size: _vw(14);
    color:#797777;
}

.top {
    height: _vw(44);
    position: fixed;
    top: 44px;
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
        /deep/.van-icon{
            font-size: _vw(20);
        }
        .van-search__content--round{
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
     background: rgb(236, 240, 242);
     position: absolute;
     left: 0px;
     top:0px;
     height: 100%;
     width: 100%;
     overflow:auto;
     .搜索按钮{
         width: _vw(50);
         height: _vw(50);
         border-radius: 50%;
         background: rgba(0,0,0,0.6);
         position: fixed;
         bottom:_vw(64);
         right:_vw(10);
         z-index: 20;
         color:#ffffff;
         line-height: _vw(50);
         text-align: center;
         font-size:_vw(14);
     }
    .title {
        .van-icon {
            color: #ffffff;
        }
        .van-nav-bar__title {
            font-size: _vw(18);
            color: #ffffff;
        }
    }
    .SS_div{
        position: absolute;
        left: 0px;
        top:-44px;
        background: #ffffff;
        width: 100%;
        height: 100%;
        overflow-x:auto;

    }
    .video_content {
        padding-top: _vw(44);
                box-sizing: border-box;

            .guanz_ul{
                box-sizing: border-box;
                padding-top: _vw(46);
                background: rgb(236, 240, 242);
                .ul外容器搜索{
                    background:#ffffff;
                }
                li{
                    width: 100%;
                    margin:_vw(0) auto;
                    box-sizing: border-box;
                    background:#ffffff;
                    margin-bottom: _vw(10);
                    padding-top:_vw(10);
                    .t_t{
                    width: 90%;
                    margin:_vw(0) auto;
                    display:flex;
                    justify-content:space-between;
                    color:#aaaaaa; 
                    font-size: _vw(12);
                    line-height: _vw(30);
                    }
                    .left{
                        width: 90%;
                        line-height: _vw(30);
                        font-size: _vw(14);
                        text-align: center;
                        margin:_vw(0) auto;
                        font-size: _vw(16);
                        font-weight: 600;
                    }
                    .right{
                        width: 90%;
                        margin:_vw(0) auto;
                        img{
                            width: 100%;
                        }
                    }
                    .text{
                         width: 90%;
                        margin:_vw(0) auto;
                        font-size: _vw(14);
                        // margin-top:0;
                    }
                }
            }
    }
}
</style>