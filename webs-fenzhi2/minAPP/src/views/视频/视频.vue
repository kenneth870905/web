<template>
    <div class="video">
        <div class="top">
            <div class="icon" @click="返回()">
                <van-icon name="arrow-left" />
            </div>
                <span class="title_t">全部视频</span>
           
            <div class="搜索" @click="搜索()">搜索</div>
        </div>

        <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
            <ul class="ship_ul">
                <li v-for="(item,index) in objdata.list " @click="点击查看视频(item)"> 
                       <div class="img_box">
                          <img :src="configData.api_url+item.imgurl" alt="">
                        </div>
                    <div class="name_title">{{item.title}}</div>
                </li>
            </ul>
        </van-list>
    </div>
</template>  

<script>
import { 视频大分类,视频播放页 } from "@/api/视频.js"
import { Toast } from "vant";
export default {
    data() {
        return {
            configData: config,
            value: "",
            currentPagerm: 0,//当前页数
            rowrm: 5,//每页返回多少行数据
            objdata: {
                list:[],
                total:-1
            },
            loading: false,
        }
    },
    computed: {
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
    created() {
    },
    methods: {
        onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.请求所有数据() //再调取请求数据的函数
        },
      
        请求所有数据() {
            var obj = {
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
                class: ""
            }
            视频大分类(obj).then(x => {
                if(x.data.code==1){
                  console.log(x)
                    this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total 
                }else{
                    this.objdata.total = 0
                }
                this.loading=false
            }).catch(err => {
                this.objdata.total = 0
                this.loading=false
            })
        },
        点击查看视频(item) {
            var obj = { id: item.id, check_status:1,  }
            视频播放页(obj).then(x => {
                if (x.data.code == 1) {
                          if(x.data.data.usePoints!==0){
                              Toast(x.data.data.usePoints )
                              }
                this.$router.push("/videoContent?id=" + item.id );
                } else {
                    Toast(x.data.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
      搜索(){
         this.$router.push("/hotVideo");
      },
       
        返回() {
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
/deep/.van-tabs__wrap {
    position: fixed;
    left: 0px;
    top: _vw(44);
    z-index: 999;
    width: 100%;
    height: _vw(44);
}
/deep/.van-tabs__line {
    height: _vw(3);
}
/deep/.van-tab {
    line-height: _vw(44);
    font-size: _vw(14);
}

.video {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    left: 0px;
    overflow-x:auto;
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
        background: #d3213b;
        padding:_vw(0) _vw(10);
        box-sizing: border-box;
        .icon {
            font-size: _vw(18);
            font-weight: 700;
            color:#ffffff;
        }
            .title_t {
                font-size: _vw(16);
                font-weight: 700;
                 color:#ffffff;
            }
         .搜索{
              color:#ffffff;
              font-size: _vw(14);
            }
    }
     .ul外容器{
         width: 100%;
     }
    .ship_ul {
        width: 100%;
        padding : _vw(60) _vw(8) _vw(0) _vw(8);
        box-sizing: border-box;
        column-count: 2; //一排示多少个 div
        column-gap: 3; //每个div之间的距离
        li {
            width: 100%;
            margin:0 auto;
            margin-bottom: _vw(20);
            border-radius: _vw(7);
            background: #ffffff;
            break-inside: avoid;
            .img_box {
                margin: 0px auto;
                img {
                      font-size: 0; /*消除行内元素的间隙*/
                    width: 100%;
                    height: 100%;
                    border-top-left-radius:_vw(7);
                    border-top-right-radius:_vw(7);
                }
            }
            .name_title {
                width: 100%;
                margin: 0px auto;
                text-indent: _vw(4);
                padding:_vw(5);
                box-sizing: border-box;
                font-size: _vw(14);
                color:rgb(99, 100, 102);
                line-height: _vw(30);
            }
        }
    }
}
</style>             