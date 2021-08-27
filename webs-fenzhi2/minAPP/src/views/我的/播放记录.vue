<template>
    <div class="历史记录">
        <div class="top">
           <div class="fanhui" @click="onClickLeft()"><van-icon name="arrow-left"  class="arrow-left"/></div>
           <div class="top_content">
                <div class="bof" @click="clicktite(0)" :class="{'titleActive':tableType ==0}">播放历史</div>
                <div class="yuedu" @click="clicktite(1)" :class="{'titleActive':tableType ==1}">阅读历史</div>
           </div>
        </div>
        
        <div  class="content_t" v-if="tableType==0">
          <div class="今天">
              <!-- <h5 class="title">今天</h5> -->
              <ul>
                <li class="li" v-for="(item,index) in 播放数据" >
                        <div class="left" @click="查看详情(item)"> <img :src="configData.api_url+item.imgurl" alt=""></div>
                        <div class="right">
                            <h5 class='by_h5' @click="查看详情(item)">{{item.title}}</h5>
                            <div class="icon_box">
                                <div class="tub"><van-icon name="aim" class="aim" /><span> {{item.time}}</span></div>
                                <!-- <div class="tub" @click="删除记录(item)"><van-icon name="delete" class="delete" /></div> -->
                            </div>         
                        </div>
                </li>
              </ul>
          </div>
        </div>

       <div  class="content_t" v-if="tableType==1">
          <div class="今天">
              <ul>
                <li class="li" v-for="(item,index) in 阅读数据" >
                        <div class="left_yd" @click="查看详情(item)"> <img :src="configData.api_url+item.fengmian" alt=""></div>
                        <div class="right_yd">
                            <h5 class="yd_h5">{{item.name}}</h5>
                            <p class="text_p" v-if="item.mtype=='xiaoshuo'">{{item.description}}  </p>
                            <div class="icon_box">
                                <div class="tub"><van-icon name="aim" class="aim" /><span>{{item.time}}</span></div>
                                <!-- <div class="tub" @click="删除记录(item)"><van-icon name="delete" class="delete" /></div> -->
                            </div>
                        </div>
                </li>
              </ul>
          </div>
            
             


        </div>
    </div>

</template> 

<script> 
import { Toast } from 'vant';
import { mapMutations} from 'vuex' 
import {历史记录} from "@/api/我的.js"
export default {
    data() {
        return {
          tableType:0,
          阅读数据:[],
          播放数据:[],
          configData: config,
        }
    },

    computed: {
         
    },
    created(){
        历史记录().then(x=>{
        if(x.data.code==1){
            var dataT=x.data.data
            var 播放=[]
            var 阅读=[]
            for (let i = 0; i < dataT.length; i++) { 
                    if(dataT[i].mtype=="video"){
                        播放.push(dataT[i])
                    }else{
                        阅读.push(dataT[i])
                    }
                }
                this.阅读数据=阅读
                this.播放数据=播放
        }else{
            console.log('请求失败')
        }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        // 删除记录(item){
        //     alert(1)
        //   console.log(item.id)
        // },
        查看详情(item){
            if(item.mtype=='video'){
                this.$router.push("/videoContent?id=" + item.id );
            }else if(item.mtype=='manhua'){
            this.$router.history.push("/cartoonDetails?mhid="+ item.id); //点击跳转的对应地址
             
            }else if(item.mtype=='xiaoshuo'){
            this.$router.history.push("/fictionDetails?mhid="+ item.id); //点击跳转的对应地址
            }
        },
           clicktite(index) {
            this.tableType = index
        },
         onClickLeft() {//头部
            history.back()
         },
    },
    mounted() {
       
    },
}


</script>
<style lang="scss" scoped>
.titleActive{
    border-bottom: 4px solid red;
    color:rgb(15, 15, 15) !important;
    font-weight: 800;
}
.历史记录{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    overflow:auto;
    .top{
        background: #ffffff;
        height: _vw(44);
        position:fixed;
        width: 100%;
        z-index: 20;
        // border-bottom:1px solid #d3d0d0;
        .fanhui{
        height: _vw(44);

        line-height:  _vw(44);
        position: absolute;
        left:0px;
        top:0px; 
        .arrow-left{
           line-height:  _vw(44);
            font-size: 24px;
            font-weight: 8000;
            font-size: _vw(18);
        }       
        }
        .top_content{
            height:  _vw(44);
            line-height:  _vw(44);
            display:flex;
            justify-content: space-between;
            width: 50%;
            margin:0px auto;
            .bof{
                 color:#acacac;
                 font-size: _vw(16);
            }
            .yuedu{
                color:#acacac;
                font-size: _vw(16);
            }
        }
    }
    .content_t{
     padding-top:_vw(44);
     padding-bottom:_vw(0);
        background: #ffffff;

    .更早{
        margin-top:_vw(10);
        height: 100%;
        background: #ffffff;
    }
    .今天{
        background: #ffffff;
     padding-top:_vw(10);
 
       li:nth-last-child(1){
           .right,.right_yd{
            border-bottom:none;             
           }
       }
        li{
               padding:_vw(10) _vw(10) _vw(0) _vw(10);
               display:flex;
               align-items: center;
               box-sizing: border-box;
               .left_yd{
                     width:_vw(100);
                   height: _vw(130);
                   margin-right: _vw(10);
                   img{
                    width: 100%;
                    height: 100%;
                   }
               }
               .left{
                   width:_vw(150);
                   height: _vw(80);
                    background:rgba(219, 9, 9, 0.2);
                    margin-right: _vw(10);
                   img{
                    width: 100%;
                    height: 100%;
                    object-fit:contain;

                   }
               }
              
               .right ,.right_yd{
                 padding-bottom:_vw(10);
                 box-sizing: border-box;
                 position: relative;
                 flex:1;
                 border-bottom:1px solid #d8d2d2;
                    .yd_h5{
                          margin:0px;
                    //    font-size: _vw(15);
                       padding-left: _vw(10);
                    //    overflow: hidden;
                    //  text-overflow: ellipsis;
                    //  white-space: wrap;
                    }
                   .by_h5{
                        height:_vw(60);
                         overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:3;
                        -webkit-box-orient:vertical;
                        font-size: _vw(14);
                       margin:0px;
                    //    padding-left: _vw(10);
                    
                   }
                   .text_p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display:-webkit-box; //作为弹性伸缩盒子模型显示。
                    -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                    -webkit-line-clamp:3; //显


                       font-size: _vw(14);
                       text-indent: _vw(10);
                      
                   }
                   .c_c{
                   }
                   .tub{
                       text-align: right;
                   }
                   .icon_box{
                       position: absolute;
                       bottom: 2px;
                       width: 100%;
                       margin-top:_vw(10);
                       display: flex;
                       justify-content: space-between; 
                       .tub{  
                             display: flex;
                             align-items: center;  
                            //  padding-left: _vw(10);
                            span{
                            color:#acacac;
                               font-size:_vw(12);
                            }
                            .aim,.delete{
                            font-size:_vw(16);
                            color:#acacac;
                            }
                         
                           }   
                   }
                   
               }
               .right_yd{
                   height: _vw(130);
                   bottom: green;
               }
               .right{
                    height: _vw(80);
               }
           }
    }

  }
}



</style>