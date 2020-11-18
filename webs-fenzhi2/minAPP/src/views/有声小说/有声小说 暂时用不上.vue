<template>
  <div class="video">
    <div class="top">
      <div class="icon" @click="返回()"><van-icon name="arrow-left" class="arrow-left" /></div>
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
        <div class="swiper-container">
                <div class="swiper-wrapper">
                 
                    <div class="swiper-slide" v-for="(item,index) in list">
                           <div class="nav_box" >
                              {{item.title}}
                             </div>
                      </div>
                </div>
        </div>

        <div class="tab_content">
            <div  class="div_li" v-for="(item,index) in list" v-show="tableType==index">
                <div class="热门推荐">
                    <ul class="img_shu" > 
                        <li  v-for="(keey,index) in item.lb">
                        <div class="left"  @click="查看有声小说详情页(keey,item.title)"><img v-if="keey.fengmian" :src="configData.api_url+keey.fengmian" alt=""></div>
                        <div class="right">
                            <div class="book_t"  @click="查看有声小说详情页(keey)">{{keey.name}}</div>
                            <div class="book_c"  @click="查看有声小说详情页(keey)">{{keey.description}} </div>
                         
                            <div class="bottom_b">
                                <span class="span_i"><span class="iconfont iconyinpin iconshoucang"></span>1732</span>
                                <span class="ck"  @click="查看有声小说详情页(keey)"><span class="iconfont iconerji"></span> 点击收听</span>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
           <!-- <div v-if="tableType==1" class="div_li"> <h1>1</h1></div>
          <div v-if="tableType==0" class="div_li"> <h1>0</h1></div>
            <div v-if="tableType==2" class="div_li"> <h1>2</h1></div>show
          <div v-if="tableType==3" class="div_li"> <h1>3</h1></div>
          <div v-if="tableType==4" class="div_li"> <h1>4</h1></div>
          <div v-if="tableType==5" class="div_li"> <h1>5</h1></div>
          <div v-if="tableType==6" class="div_li"> <h1>6</h1></div>
          <div v-if="tableType==7" class="div_li"> <h1>7</h1></div>
          <div v-if="tableType==8" class="div_li"> <h1>8</h1></div> -->
      </div>
    </div>
   
  </div>
</template>  

<script>

import {有声小说大分类} from "@/api/有声小说.js"
import Swiper from "swiper";
export default {
  data() {
    return {
        configData:config,
      // list: ["性感", "熟女", "清纯", "少女", "萝莉", "学生", "御女"],
      value: "",
      active: 4,
      tableType:3,
      list:[],
      banner: [
        require("../../assets/img/meil.jpg"),
        require("../../assets/img/meil2.jpg"),
        require("../../assets/img/meil3.jpg")
      ]
    };
  },

  created() {
       有声小说大分类().then(x=>{
            if(x.data.code==1){
                this.list=x.data.data.class
                 console.log(this.list)
            }else{
                console.log(x.data.data.class)
            }
        }).catch(err=>{
            console.log(err)
        })
  },
  mounted(){
          var _this=this
    //  console.log(document.querySelector('.swiper-container'))
          var swiper = new Swiper('.swiper-container', {
          slidesPerView: 4,//控制宽度
          spaceBetween: 10,//控制高度
        centeredSlides: true,
        initialSlide :2,//默认显示索引
        // loop: true, 控制是否循环
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          observer:true,//监听器  重要  解决每单个宽度显示100%
            on: {
            slideChangeTransitionEnd: function(){
                _this.tableType=this.activeIndex
                console.log( _this.tableType)
            },
        },
        });
  },
  computed: {},
  methods: {

       查看有声小说详情页(item,type) { 
           console.log(item.id) 
              this.$router.history.push("/videoFictionDetails?mhid="+ item.id+'&type='+type); //点击跳转的对应地址
        },
    onSearch(value) {
      console.log(value);
    },
    go(url) {
      this.$router.history.push(url); //点击跳转的对应地址  item.id
    },
      返回() {//头部
            history.back()
        },
  }
};
</script>
<style lang="scss" scoped>
// 导航滑动
 .swiper-container {
      background:#fff;
      width: 100%;
      height: 100%;
       height: _vw(80);
       position: absolute;
       left:0px;
       top:_vw(44);
       z-index:2;
            .swiper-slide {
            text-align: center;
            font-size: 18px;
            //  background: rgb(223, 197, 218);
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
          transition: 300ms;
          transform: scale(0.8); // background-image:url('../../assets/img/wode3.png');
          // background-size: 100% 100%;
          // background-repeat: no-repeat;
            // background:olive;

           .nav_box{
                  width: 100%;
                  height: 100%;
                  background-image: url('~@/assets/img/wode2.png');
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  line-height: 400%;
                  // background:olive;
                color:red;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
      }
    .swiper-slide-active,.swiper-slide-duplicate-active{
        transform: scale(1);
    }
    }

  // 导航滑动结束
    .tab_content{
      padding-top:_vw(122);
      background:#fff;
      height: 100%;
      .div_li{
          .热门推荐{
                background: #ffffff;
                margin-top:_vw(10);
                .title_div{
                    display:flex;
                    justify-content:space-between;
                    padding:_vw(0) _vw(10) _vw(0) _vw(10);
                    line-height: _vw(40);
                    font-size: _vw(15);
                    align-items: center;
                    .rm{
                    align-items: center;   
                    }
                    .xy{
                    align-items: center;            
                    }
                    .fac{
                        display: flex;
                        align-items: center;
                    }
                }
                .img_shu{
                    li{
                        padding:_vw(0) _vw(10);
                        display:flex;
                        justify-content: space-between;
                        margin-bottom:_vw(10);
                      .left{
                        margin-right:_vw(10);
                        width: _vw(100);
                        height: _vw(120);
                        img{
                            width: 100%;
                            height: 100%;
                        }
                      }
                      .right{
                        border-bottom:1px solid #f0f0f0;
                        flex:1;
                        .book_t{
                          font-weight: 600;
                          height: _vw(30);
                          line-height:_vw(30);
                          font-size: _vw(14);
                          }
                        .book_c{
                          height:_vw(60);
                          overflow:hidden;
                          text-overflow:ellipsis;
                          display:-webkit-box;
                          -webkit-line-clamp:3;
                          -webkit-box-orient:vertical;
                          font-size: _vw(14)
                          
                          }
                          
                        .bottom_b{
                            display: flex;
                            justify-content: space-between;
                            font-size: _vw(12);
                              height: _vw(30);
                              line-height: _vw(30);
                              .ck{
                                color:#acacac;
                              }
                            .span_i{
                              display: flex;
                              justify-content: space-between; 
                                color:#acacac;
                              .iconyinpin{
                                font-size: _vw(14);
                              // color:red;
                              }  
                            }
                          
                        } 
                      }
                    }
                }
                
       }
      }
    }


//+++++=+++++++++++++++++++++++++公用标题样式
.gaunz_top {
  display: flex;
  justify-content: space-between;
  height: _vw(30);
  align-items: center;
  height: _vw(50);
  .gz_left {
    margin-left: _vw(10);
    display: flex;
    align-items: center;
    .iconremen1 {
      font-size: _vw(20);
    }
  }
  .gz_right {
    display: flex;
    align-items: center;
    margin-right: _vw(10);
    .arrow {
      font-size: _vw(14);
    }
  }
}

//++++++++++++++++++++++++++++

.video {
  width: 100%;
  position: absolute;
  left:0px;
  top:0px;
  width: 100%;
  height: 100%;
  background:#fff;
  .top {
    height: _vw(44);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    background: #ffffff;
    padding-left: 10px;
    box-sizing: border-box;
    .arrow-left{
      font-size: _vw(14);
    }
  
    .c_c {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title_t {
        margin-right: _vw(5);
        font-size: _vw(12);
        font-weight: 700;
      }
      /deep/ .van-icon {
        font-size: _vw(20);
      }
      .van-search__content--round {
        height: _vw(30);
      }
      .van-cell {
        line-height: _vw(20);
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

}
</style>