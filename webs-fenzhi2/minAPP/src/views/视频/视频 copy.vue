<template>
<div class="video">
          <div class="top">
                <div class="icon" @click="返回()"><van-icon name="arrow-left" /></div>
                <div class="c_c"> 
                  <span class="title_t">魅力社</span>
                  <div>
                      <van-search
                      v-model="value"
                      placeholder="请输入搜索关键词"
                      show-action
                      shape="round"
                      @search="onSearch"
                    >
                      <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
                  </div>
                </div>
           <div>&nbsp;</div>
        </div>
              <div class="video_content">
              <van-tabs animated>
                <van-tab v-for="(item,index) in list" :title="item.title">
                      <div class="关注 ">
                        <ul class="guanz_ul">
                          <li v-for="(keey,index) in item.lbimg " @click="点击查看视频(keey)">
                               <div class="img_box" ><img :src="configData.api_url+keey.imgurl" alt=""></div>
                               <div class="name_title">{{keey.title}}</div>
                               <div class="text_bottom">
                                   <div class="收藏 fac">2016-11-17</div>
                                   <!-- <div class="fred"><i class="iconfont iconshoucang"></i></div> -->
                                </div>
                          </li>
                        </ul>
                     </div>


            </van-tab>
            </van-tabs>
     </div>

</div>
</template>  

<script>
import {视频大分类} from "@/api/视频.js"
 export default {
    data() {
        return {
           configData:config,
            list:[  ],
            value:"",
            // active:1,
            //   banner:[
            //     require('../../assets/img/meil.jpg'),
            //     require('../../assets/img/meil2.jpg'),
            //     require('../../assets/img/meil3.jpg'),
            // ],
        }
    },
   
    created() {
      this.请求所有数据()
    },
      methods: {
          请求所有数据(){
                视频大分类().then(x=>{
                    if(x.data.code==1){
                        this.list=x.data.data.class
                    }else{
                        console.log("请求数据失败")
                    }
                }).catch(err=>{
                    console.log(err)
                })
          },
        点击查看视频(item){
                this.$router.push("/videoContent?id="+ item.id); 
            },
          onSearch(value){
          console.log(value)
        },
           
      返回() {
            history.back()
        },
    },
}

</script>
<style lang="scss" scoped>
/deep/.van-tabs__wrap{
    position: fixed;
    left: 0px;
    top:_vw(44);
    z-index: 999;
    // background-color:olive;
    width: 100%;
    height: _vw(44);
}
/deep/.van-tabs__line{
    height: _vw(3);
}
  /deep/.van-tab{
  line-height: _vw(44);
  font-size: _vw(14);
}           
//+++++=+++++++++++++++++++++++++公用标题样式
//    .gaunz_top{
//                  display: flex;
//                  justify-content:space-between;
//                  height: _vw(30);
//                  align-items: center;
//                  height: _vw(50);
//                  .gz_left{
//                      margin-left: _vw(10);
//                      display:flex;
//                      align-items: center;
//                      .tt_t{
//                          font-size: _vw(14);
//                      }
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
            //  }

 //++++++++++++++++++++++++++++


.video{
      width: 100%;
    .top{
        height: _vw(44);
        position: fixed;
        top:0px;
        left:0px;
        z-index: 10;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        padding-left: 10px;
        box-sizing: border-box;
        .icon{
            font-size: _vw(18);
            font-weight: 600;
        }
        .c_c{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title_t{
            margin-right: _vw(5);
             font-size: _vw(12);
            font-weight: 700;
            }
           /deep/ .van-icon{
                font-size: _vw(20);
            }
            .van-search__content--round {
            height: _vw(30);
            }
            .van-cell{
                line-height: _vw(20);
                font-size: _vw(12);
            }
            .van-search__action{
                font-size:_vw(14);
            }
            /deep/.van-search{
            padding:0px;
            background: none !important;
            } 
        }
        
   }
        



        .video_content{
            padding-top:_vw(48);
    
         .关注{
             background:#ffffff;
               margin-top:_vw(44);
             .guanz_ul{
                 display: flex;
                 flex-wrap: wrap;
                 li{
                     margin-bottom:_vw(20);
                     width: 50%;
                     .img_box{
                      width:93%;
                      margin: 0px auto;
                      height: _vw(120);
                      img{
                      border-radius:_vw(4) !important;
                          width: 100%;
                          height: 100%;
                      }
                     }
                     .name_title{
                      width:93%;
                      margin:0px auto;
                       text-overflow:ellipsis; white-space:nowrap; overflow:hidden; 
                       font-size: _vw(14)
                     }
                     .text_bottom{
                        display:flex;
                      width:93%;
                      margin:0px auto;
                        justify-content: space-between;
                         .收藏{
                          font-size: _vw(12);                        
                         }
                         .titme{
                          font-size: _vw(12);
                         }
                     }
                 }
             }

         }
    //   }
}
}
</style>