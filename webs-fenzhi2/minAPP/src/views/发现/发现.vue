<template>
    <div class="CreditsLog">
            <van-nav-bar  title="专题"  class="title"   left-arrow :fixed="true" @click-left="onClickLeft"/>
            <div class="content">
                <ul class="title_ul">
                    <li v-for="(item,index) in listTitle" @click="类型查找(item)">{{item}}</li>
                </ul>
                <ul class="content_ul">
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
         listTitle:[],
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
              var listdta=[];
                 for (let i = 0; i < x.data.data.length; i++) {
                   listdta.push(x.data.data[i].type)
                 }
            this.listTitle=listdta
            }else{
                console.log("请求失败")
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: { 
        类型查找(item){
            this.$router.history.push("/generalizeDetails?type="+item); //点击跳转的对应地址
        },
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
            .title_ul{
                padding-top:_vw(50);
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                
                li{
                    width: 24%;
                    line-height: _vw(30);
                    background: #ffffff;
                    margin:_vw(1);
                    font-size: _vw(14);
                    text-align: center;
                }
            }
            
            .content_ul{
                    display: flex;
                    flex-wrap: wrap;
                    box-sizing: border-box;
                    padding:_vw(4) _vw(4) _vw(10) _vw(4);
                li{
                 
                  width: 47.8%;
                  margin:_vw(4);
                  position: relative;
                  .top{
                      width: 100%;
                      height: _vw(120);
                      img{
                          width: 100%;
                          height: 100%;
                      }
                  }
                    // .content_c{
                    //     flex:1;
                    //     background:_vw(13);
                    //     background: #ffffff;
                    //     padding:_vw(0) _vw(10);

                    //     .marquee{
                    //         line-height: _vw(40);
                    //         font-size: _VW(12);
                    //          font-size: _vw(14);
                    //     }
                    // }
                  .bottom{
                      width: 100%;
                      position: absolute;
                      font-size: _vw(14);
                      color:#ffffff;
                      background: rgba(228, 11, 11, 0.5);
                      line-height: _vw(24);
                      left: 0px;
                      bottom: 0px;
                      text-align: center;
                     //   padding:_vw(0) _vw(10);
                      box-sizing:border-box;
                  }
                }
            }
        }



}




</style>