<template>
    <div class="video"> 

        <div class="top">
            <div class="min_top">
             <div class="icon" @click="返回()"> <van-icon name="arrow-left" /></div>
                <div class="content_top">热词搜索</div>
                <div>&nbsp;</div>
            </div>
            
            <div class="c_c">
                <span class="title_t" @click="热词推荐切换按钮()"><span class="iconfont iconremen1"></span>热词推荐</span>
                    <van-search  class="ss_k" v-model="value" placeholder="请输入搜索关键词" show-action shape="round" >
                        <div slot="action" @click="搜索()">搜索</div>
                    </van-search>
            </div>
        </div>

    
            <div class="video_content" >
                <div class="btn_group" v-if="热词显示隐藏">
                    <div class="max_box" v-for="(item,index) in listTitle" @click="查找(item)" :key="index">{{item}}</div>
                
                </div>
                   <div class="列表"  v-if="!热词显示隐藏">
                        <van-list   class="ul外容器 "v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                            <ul class="ship_ul">
                                <li v-for="(item,index) in objdata.list " @click="点击查看视频(item)"> 
                                    <div class="img_box"><img :src="configData.api_url+item.imgurl" alt=""></div>
                                    <div class="name_title">{{item.title}}</div>
                                </li>
                            </ul>
                       </van-list>
                   </div>                



            </div>

     

    </div>
</template>  

<script>
import { 视频热词搜索,视频大分类} from "@/api/视频.js"
import { Toast } from 'vant'
export default {
    data() {
        return {
            configData: config,
            热词显示隐藏:true,
            value: "",
            listTitle:[],
             queryName:"",
             currentPagerm:1,//当前页数
             rowrm: 10,//每页返回多少行数据
             objdata:{
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
        this.请求热词的函数()
    },
    methods: {
        热词推荐切换按钮(){
          this.热词显示隐藏=true;
          this.value=""
        },
          onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.获取数据() //再调取请求数据的函数
        },
        搜索(){
           if (this.value) {
                this.currentPagerm = 1//当前页数
                this.queryName = this.value;
                this.objdata.list=[],
                // this.objdata.total = -1;
                this.获取数据();
            }else{
                Toast('请输入要查找的关键字');
            }
        },
        查找(item){
             this.currentPagerm = 1//当前页数
                this.queryName = item;
                this.获取数据();
        },
      

        获取数据() {
                    var obj = {
                        page: this.currentPagerm,//当前页数
                        row: this.rowrm,//每页返回多少行数据
                        class: this.queryName
                    }
                    视频大分类(obj).then(x => {
                        //   this.objdata=x.data.data
                        if(x.data.code==1){
                         if(x.data.data.total==0){
                           Toast('未找到相关数据');
                             
                         }else{
                             console.log(  this.objdata)
                             this.热词显示隐藏=false
                             this.objdata.total = x.data.data.total
                              this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                         }
                        }else{
                           Toast('网络异常稍后再试');

                            this.objdata.total = 0
                        }
                        this.loading=false //请求发送之后
                    }).catch(err => {
                        this.objdata.total = 0
                        this.loading=false
                         Toast('网络异常稍后再试');
                    })
                },

        请求热词的函数() {
            视频热词搜索().then(x => {
                console.log(x)
                if(x.data.code==1){
                this.listTitle=x.data.data
                }else{
                    console.log("请求数据失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        点击查看视频(item) {
               var obj = { id: item.id  }
                视频播放页(obj).then(x => {
                    if (x.data.code == 1) {
                        if(x.data.data.usePoints!==0){
                            Toast(x.data.data.usePoints)
                        }
                    this.$router.push("/videoContent?id=" + item.id );
                    } else {
                        Toast(x.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                })
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


.video {
    position: absolute;
    left: 0px;;
    top:0px;
    width: 100%;
    height: 100%;
      background: #ffffff;

    .top {
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 10;
        width: 100%;
        // background: #ffffff;
        box-sizing: border-box;
        .min_top{
             display: flex;
            justify-content: space-between;
            align-items: center;
            height: _vw(44);
            line-height: _vw(44);
             background: #d3213b;
            padding:_vw(0) _vw(10);
            box-sizing: border-box;
            color:#fff;
            width: 100%;

         .icon {
            font-size: _vw(18);
            font-weight: 600;
          }
        }
       
        .c_c {
            height: _vw(54);
            background: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:-vw(0) _vw(10);
            box-sizing: border-box;
            .title_t {
                font-size: _vw(14);
                font-weight: 700;
                color:rgb(207, 12, 12);
                width: _vw(80);
            }
                .ss_k{
                flex:1;

                    width: 100%;
                }
            // /deep/ .van-icon {
            //     font-size: _vw(20);
            // }
            // .van-search__content--round {
            //     height: _vw(44);
            // }
            // .van-cell {
            //     line-height: _vw(34);
            //     font-size: _vw(12);
            // }
            // .van-search__action {
            //     font-size: _vw(14);
            // }
            // /deep/.van-search {
            //     padding: 0px;
            //     background: none !important;
            // }
        }
    }
    // .content{
        padding-top:_vw(100);

            .video_content {
                  
          box-sizing: border-box;

         .列表{
             background: #d3d2d2;
             .ul外容器{
               .ship_ul {
                width: 100%;
                padding : _vw(20) _vw(8) _vw(0) _vw(8);
                box-sizing: border-box;
                column-count: 2; //一排示多少个 div
                column-gap: 3; //每个div之间的距离

                li {
                    margin-bottom: _vw(20);
                    border-radius: _vw(10);
                    background: #ffffff;
                    .img_box {
                        margin: 0px auto;
                    
                        img {
                            width: 100%;
                            height: 100%;
                            border-top-left-radius:_vw(10);
                            border-top-right-radius:_vw(10);
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
                        
                    }

                }
            }
             }
         }



        .btn_group {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            top: _vw(110);
            position: fixed;
            width: 100%;
            background: #ffffff;
            z-index: 2;
             padding-top:_vw(0);
            .max_box {
                border-radius: _vw(35);
                padding-left: _vw(10);
                padding-right: _vw(10);
                box-sizing: border-box;
                margin: _vw(5);
                line-height: _vw(30);
                font-size: _vw(14);
                background: #df2843;
                color:#ffffff;
            }
        }
        .wrap {
        }
    }

    // }


}
</style>