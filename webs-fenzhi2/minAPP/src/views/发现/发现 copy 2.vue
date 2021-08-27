<template>
    <div class="CreditsLog">
          <!-- <div class="title_box">特色专题</div> -->
                <van-nav-bar  title="专题"  class="title"   left-arrow :fixed="true" @click-left="onClickLeft"/>
            <div class="content">
                <ul>
                    <li @click="点击查看主题详情列表(item)" v-for="(item,index) in list" >
                        <div class="top"><img :src="configData.api_url+item.img" alt=""></div>
                        <div class="bottom">{{item.title}}</div>
                    </li>
                </ul>
            </div>
    </div>

</template>

<script> 
import {主题首页} from "@/api/发现.js"

export default {
    data() {
        return {
         list:[], 
         configData:config,
        }
    },
    computed: {
         
    },
    created(){
        主题首页().then(x=>{
            console.log(x)
            if(x.data.code==1){
              this.list=x.data.data
            console.log(this.list)
            }else{
                console.log("请求失败")
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: { 
        点击查看主题详情列表(item){
            this.$router.history.push("/generalizeDetails?type="+item.type); //点击跳转的对应地址
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
.CreditsLog{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    overflow-y:auto;
    // background: #d8d5d5;
    //  background:url('~@/assets/img/fx.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;

    // .title_box{
    //     line-height: _vw(60);
    //     background:url('~@/assets/img/fxyop.png');
    //     background-repeat: no-repeat;
    //     background-size: 100% 100%;
    //     text-align: center;
    //     position: fixed;
    //     top:0;
    //     left: 0px;
    //     z-index: 10;
    //     width: 100%;
    // }
   .title{
         background: #ec304c; 
         margin-bottom: none; 
           /deep/.van-nav-bar__title{
           color:#ffffff !important; 
           font-size:_vw(18);           
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
        }
        .content{
            padding-top:_vw(44);
            ul{
                padding:_vw(20) _vw(10) _vw(54)  _vw(10) ;
                box-sizing: border-box;
                li{
                    margin-bottom: _vw(20);
                  .top{
                      width: 100%;
                      height: _vw(200);
                      img{
                          width: 100%;
                          height: 100%;
                      }
                  }
                    .content_c{
                        flex:1;
                        background:_vw(13);
                        background: #ffffff;
                        padding:_vw(0) _vw(10);

                        .marquee{
                            line-height: _vw(40);
                            font-size: _VW(12);
                             font-size: _vw(14);
                        }
                    }
                  .bottom{
                      width: 100%;
                      font-size: _vw(14);
                      color:#acacac;
                      background: #ffffff;
                      line-height: _vw(34);
                      padding:_vw(0) _vw(10);
                      box-sizing:border-box;
                  }
                }
            }
        }



}




</style>