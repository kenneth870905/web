<template>
<div class="top">
 <!-- ============弹出框============================= -->
        <van-popup v-model="show" class="弹出框" >
           <div class="tc_box">
                 <div class="定位关闭" @click="show=false"><van-icon name="cross" /></div>
               <div class="img_box"><img @click="点击跟换二维码()" :src="configData.api_url+imgurl" alt=""></div>
        
              <div class="input" >
                <div class="left_input">
                    <van-cell-group>
                    <van-field v-model="valuenum"  placeholder="请输入以上验证码" />
                    </van-cell-group>
                </div>
                <div class="right" @click="点击确认验证码()">确认</div>
             </div>


           </div>
     </van-popup>
 <!-- ============弹出框结束============================= -->
<!-- =====================评论输入框开始========================================= -->

   <div class="评论"  v-show="tableType==1">
            <div class="input" >
                <div class="left_input">
                    <van-cell-group>
                    <van-field
                        v-model="value"
                        rows="1"
                        autosize
                        label="留言"
                        type="textarea"
                        placeholder="内容最多50字以内"
                        maxlength="50"
                    />
                    </van-cell-group>
                </div>
                <div class="right" @click="点击评论()">评论</div>
            </div>
        </div>
       
<!-- =====================评论输入框结束======================================== -->

    <div class="title_nav">
        <div class="left" @click="返回()"><van-icon name="arrow-left" class="arrow" /></div>
        <div class="title_c">漫画</div>
        <div  class="right"></div>
    </div>


        <div class="head" >
            <div class="head-info" >
                <div class="head-img"  @click="查看详情(obj)"  >
                    <img v-if="obj.fengmian" :src="configData.api_url+obj.fengmian"  v-on:error.once="dosomething($event)">
                </div>         
                <div class="head-txt">
                    <ul>
                        <li   @click="查看详情(obj)">
                             <label>书名：</label>
                            <span>{{obj.name}}</span>
                        </li>
                        <li @click="查看详情(obj)">
                            <label>作者：</label>
                            <span>{{obj.types}}</span>
                        </li>
                        <li @click="查看详情(obj)">
                            <label>总篇：</label>
                            <span>{{obj.size}}页</span>
                        </li>
                          <li class="收藏">
                          

                            <span class="span_i"  @click="收藏(obj)"  :class="{'huhu':obj.collect==1}" >
                                 <span class="sc">收藏：</span>
                                  <span  class="iconfont iconshoucang"  :class="{'huhu':obj.collect==1}"  ></span>
                             </span>


                        </li>
                    </ul>
                </div>
            </div>

        </div>
  
        <div class="detail">
            <ul class="title_ul_t">
                 <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">
                     <div class="title_text">推荐</div>
                     
                     </li>
                 <li @click="clicktite(1)"  :class="{'titleActive':tableType ==1}">
                     <div class="title_text">评论</div>
                     
                </li>
            </ul>
          
              <div  class="ul_content">
                    <van-list class="评论区"  v-if="tableType==1" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                                    <ul class="pl_ul">
                                        <li  v-for="(item2,index) in objdata.list">
                                            <div class="top_li">
                                                  <!-- {{item2.head}} -->
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
                  <div class="ul_l" v-show="tableType==0">
                    <div class="mod-recommend3">
                        <span>骚年们都在看：</span>
                        <div class="推荐书单">
                            <div class="书单" v-for="(item,index) in 推荐" :key="index" @click="查看推荐漫画(item)"    >
                                <div class="img_box" >
                                      <img  v-on:error.once="dosomething($event)" :src="configData.api_url+item.fengmian" alt="">
                                </div>
                                
                                <p>{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                 </div>

                
             </div>

           

         
        </div>
</div>
</template>


<script>
import { Toast } from 'vant';
import {漫画详情页} from "@/api/漫画.js"
import {热门推荐三部,添加收藏,删除收藏} from "@/api/首页.js"
import {添加评论,评论列表} from "@/api/评论.js"

export default {
    data() {
        return {
           configData:config,
           obj:{},
            mhidid:"",//漫画唯一id
            推荐:[],
            tableType:0,
             show:false,//弹出框
             valuenum:"",//验证码
             value:"",//评论的内容
             imgurl:"/admin/Appdiscuss/getcode",//地址
              mrimg:"/vdata/XiaoShuo/default.jpg",
                 currentPagerm: 1,//当前页数
                    rowrm: 5,//每页返回多少行数据
                    objdata: {
                        list:[],
                        total:-1
                    },
              loading: false,
        }
    },
    components: {
          
    },
    created(){
          this.mhidid= this.$route.query.mhid; //书得唯一id
         this.获取所有数据函数()
         this.漫画详情页推荐随机三部()
          this.获取评论列表() //这个函数要用岛id值  所以放在获取id值得后面
    },
    computed:{
     
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
         dosomething: function (e) {
        e.currentTarget.src = this.configData.api_url+ this.mrimg
      }, 
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
          clicktite(index) {
            this.tableType = index
        },

         点击评论(){
             if(this.value!=="" ){
              this.show=true
             }
             else{
                 Toast('请输入你要评论的类容')
             }
         
         },
         点击确认验证码(){
             if(this.valuenum!==""){//验证码不为空才能进行下一步，
                var obj={
                    content:this.value,
                    class:"manhua",
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
                     var obj = {
                        page: this.currentPagerm,//当前页数
                        row: this.rowrm,//每页返回多少行数据
                        class: "manhua",
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
         收藏(item) {
            if(item.collect==0){
                var obj={
                    class:"manhua",
                    id:item.id
                }
                 添加收藏(obj).then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                         Toast(x.data.msg);
                           item.collect=1
                    }else{
                        Toast('收藏失败111');
                    }
                }).catch(err=>{
                        Toast('收藏失败');
                    console.log(err)
                })
            }else{
                 var objDelete={
                    class:"manhua",
                    id:item.id
                }
                 删除收藏(objDelete).then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                          Toast(x.data.msg);
                            item.collect=0
                    }else{
                        console.log("撤销收藏失败")
                    }
                }).catch(err=>{
                  Toast('撤销收藏失败'); 
                    console.log(err)
                })
            }
        },
        漫画详情页推荐随机三部(){
                var obj={
                    cid:this.mhidid,
                    class:"manhua"
                }       
               热门推荐三部(obj).then(x=>{
                        if(x.data.code==1){
                             this.推荐=x.data.data
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
             },
      
         获取所有数据函数(){
                var obj={
                    id: this.mhidid
                }       
              漫画详情页(obj).then(x=>{
                        if(x.data.code==1){
                            this.obj=x.data.data
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
          },
        
        返回() {
            history.back()
        },
       查看详情(obj){
           this.$router.history.push("/cartoonContent?xqmhid="+ this.obj.id); //点击跳转的对应地址
       },
        查看推荐漫画(item){
            this.mhidid=item.id
              var obj={
                        id: this.mhidid
                    }       
                   漫画详情页(obj).then(x=>{
                        if(x.data.code==1){
                            this.obj=x.data.data
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })

                    this.漫画详情页推荐随机三部()
        },


    }
}
</script>

<style lang="scss" scoped>
//======加载中和暂无数据 的轻提示===============
/deep/.van-list__finished-text{
    font-size: _vw(14);
}
//=====================
[class*=van-hairline]::after{
    border:none;
}
//================input公用样式开始========================
       .input{
           width: 90%;
           margin: 0px auto;
           display:flex;
           justify-content: space-between;
           align-items: center;
             padding-top:_vw(6);
           .left_input{
               border-radius: _vw(6)  !important;
               background: #ffffff;
             width: 80%;
             box-sizing: border-box;
            
             
             /deep/.van-cell{
                 padding:0px;
                  line-height: _vw(36);
                  padding-left:_vw(10);
                  font-size: _vw(14);
                 .van-field__control{
                  border-radius: _vw(10);
                 }
             }
           }
           .right{
            background: #f5222d;
            width: _vw(60);
            height: _vw(36);
            color:#ffffff;
            border-radius: _vw(6);
            line-height: _vw(36);
            font-size:_vw(13);
            text-align: center;
            margin-left: _vw(6);
             box-sizing: border-box;
             
           }

       }
    // }
    //=========================input公用样式结束=============================
.titleActive{
 .title_text{
     border-bottom:_vw(3) solid #ff6700;
 }
 
}
* {
    background: none;
}

.active {
    border-bottom: 2px solid #ff9a6a;
    width: 20%;
}

.收藏{
        >span{
            display: flex;
            align-items: center;
            .iconshoucang{
                font-size:_vw(16);
            }
            .huhu{
                color:red
            }
            .sc{
                font-size:_vw(12);
                width: _vw(50);
            }
        }
    }

.top {

    background:#ffffff;
    position: absolute;
    left: 0px;
    top:0px;
     height: 100%;
    overflow:auto;
        width: 100%;
    .title_nav{
       position: fixed;
        top:0;
        left:0px;
        width: 100%;
     display:flex;
     justify-content: space-between;
     align-items: center;
     height: _vw(44);
     color:#fff;
     background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
     line-height: _vw(44);
     font-size: _vw(20);
    }


     .评论{
       padding-bottom:_vw(6);
        width: 100%;
         position: fixed;
       bottom:_vw(0);
       left:_vw(0);
       z-index:40;
       background-color:rgba(0,0,0,0.6);
       /deep/.van-cell{
           font-size: _vw(14)
       }
       /deep/.van-field__label{
           width: _vw(44);
       }
    }


}   

//弹出框开始
    .弹出框{
           width: 90%;
            border-radius: _vw(10);
        .tc_box{
            margin:0 auto;
            width: 100%;
            background: #999999; 
            border-radius: _vw(10);
            padding:_vw(20) 0px;
            position: relative;
            .定位关闭{
                position: absolute;
                right: 10px;
                top:10px;
                color:red;
                z-index: 2;
                font-size: _vw(20)
            }
           .img_box{
               height: _vw(40);
               display:flex;
               align-items: center;
               
               margin:0 auto;

               img{
               margin:0 auto;
                   height: 100%;
               }
           } 
        }
    }
    // ===============弹出框结束==================
.head {
    margin-top:_vw(44);
    background-image:url('~@/assets/img/manhua/minBanner.jpg');
    background-repeat:no-repeat;
    background-size: 100% 100% ;
    box-sizing: border-box;
    padding: _vw(20)_vw(16);
   
}

.head-info {
    display: flex;
    padding:_vw(20) 0px;
  
}

.head-img {
    height: _vw(160);
    width: 40%;
    img {
    width: 100%;
    height: 100%;
  }
}


.head-txt ul li {
    color: white;
    font-size: _vw(12);
    margin-bottom: _vw(10);
    display: flex;
    label{
      width:20%;
    }
    span{
         width:80%;
    }
} 
.head-txt{
    margin-left: _vw(10);
    width: 60%;
    ul{
        li:first-child{
            span{
                 font-weight: 600; 
                 height: _vw(20);
                 line-height: _vw(20);
                 overflow-y: hidden;
            }
      
        }
     
    }
}
.detail{
  .title_ul_t{
      display: flex;
      width: 100%;
      li{
         width: 50%;
         line-height:_vw(36);
         display:flex;
         align-items: center; 
         .title_text{
           margin:0px auto; 
           font-size: _vw(14); 
         }
      }
  }
  .ul_content{

      //=============评论区=======================
         .评论区{
                   padding:_vw(20) _vw(10)  _vw(0)  _vw(10);
         .pl_ul{
             padding-bottom: _vw(64);
               li{
                   padding:_vw(6) _vw(6) _vw(0) _vw(6) ;
                   border-bottom: 1px solid rgb(224, 221, 221);
                   .top_li{
                       margin-bottom: _vw(4);
                       display: flex;
                       width: 100%;
                         .toux{
                               width: _vw(46);
                               height: _vw(46);
                               margin-right: _vw(10);
                               border-radius: 50%;
                               background: #ec304c;
                               img{
                                   width: 100%;
                                   height: 100%;
                                   border-radius: 50%
                               }
                           }                        
                           .li_left_top{
                               flex:1;
                                  .bottom_li{
                                     font-size: _vw(14);
                                     color:#666666;
                                    }
                    
                               .name{
                                     font-size: _vw(14);
                                   
                               }
                               .li_right_top{
                                         color:#666666;
                                         font-size: _vw(12);
                                         text-align: right;
                               }
                           }
                   }
                 
               }
           }
    
         }

    //=============热门推荐随机3部=======================
        .ul_l{
        .mod-recommend3 {
            padding-bottom: _vw(0);
            span {
                font-size: _vw(14);
                color: #969696;
                margin: 15px;
                display: inline-block;
            }
            .推荐书单 {
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .书单{
                    width: 28%;
                    height: 100%;
                    margin-bottom: 10px;
                    .img_box{
                        width: 100%;
                        height:_vw(140);
                         background-size: 100% 100%;
                        background-repeat: no-repeat;
                         img {
                            width: 100%;
                            height: 100%;
                            border-radius: _vw(5);
                        }
                    }
                p {
                    font-size: _vw(12);
                    text-align: center;
                    overflow-y: hidden;
                    height: _vw(34);
                    line-height: _vw(34);
                    width: 100%;
                    margin:0px;
                }
            }

                }
            }
    } 

  }
}





</style>
