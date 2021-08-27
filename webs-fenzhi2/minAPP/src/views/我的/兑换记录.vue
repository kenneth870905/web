<template>
    <div class="积分记录">
        <div class="top">
                <van-nav-bar  title="兑换记录" class="title"  left-arrow :fixed="true" @click-left="onClickLeft"/>
                <div class="num">￥500.00</div>
                <div class="title_top">
                    <div class="left"  @click="clicktite(0)"> <span><span class="iconfont iconjifenzhang-copy "> </span></span>&nbsp;<span>元宝兑换</span></div>
                    <div class="left"  @click="clicktite(1)"><span><span class="iconfont iconduihuan"> </span></span>&nbsp;<span>元宝记录</span></div>
                </div>
        </div>

                <ul  v-if="tableType==0">
                    <li>
                        <div class="box_cont">
                             <div class="left">钱</div>
                             <div class="right fred">+50</div>
                        </div>
                        <div class="bottom">2016-11-18 09:43:43</div>
                    </li>
                     <li>
                        <div class="box_cont">
                             <div class="left">浏览消耗</div>
                             <div class="right fgr">-40</div>
                        </div>
                        <div class="bottom">2016-11-18 09:43:43</div>
                       
                    </li>
                     <li>
                        <div class="box_cont">
                             <div class="left">分享—APP</div>
                             <div class="right fred">+100</div>
                        </div>
                        <div class="bottom">2016-11-18 09:43:43</div>
                    </li>
                </ul>

                 <ul  v-if="tableType==1">
                    <li>
                        <div class="box_cont">
                             <div class="left">微信分享——APP</div>
                             <div class="right fred">+100</div>
                        </div>
                        <div class="bottom">2016-11-18 09:43:43</div>
                       
                    </li>
                     <li>
                        <div class="box_cont">
                             <div class="left">邀请好友</div>
                             <div class="rightt fred ">+200</div>
                        </div>
                        <div class="bottom">2016-11-18 09:43:43</div>
                       
                    </li>
                     <li>
                        <div class="box_cont">
                             <div class="left">浏览网站积分消耗</div>
                             <div class="right fgr">+60</div>
                        </div>
                        <div class="bottom">2016-11-18 09:43:43</div>
                       
                    </li>
                </ul>

                <div class="btn">赚积分</div>
    </div>

</template>

<script> 
export default {
    data() {
        return {
          tableType:0
        }
    },
    computed: {
         
    },
    created(){
    },
    methods: {
        onClickLeft() {//头部
            history.back()
         },           
        clicktite(index) {
                    this.tableType = index
                },
    },
    mounted() {
       
    },
}


</script>
<style lang="scss" scoped>

.title{
    /deep/.van-nav-bar__title{
        color:#ffffff !important; 
        font-size:_vw(18);           
        } 
}
 //头部top 返回
     /deep/.van-nav-bar{       
            border-bottom:0px !important;
          background: #ec304c       
        }
         /deep/.van-hairline--bottom::after{
            border-bottom-width: 0px !important;
        }
          /deep/.van-nav-bar__title{
           color:#ffffff !important;            
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
            //头部top 返回
            .积分记录{
                .top{
                background: #ec304c; 
                height:_vw(200);
                position: fixed;
                left: 0px;
                top:0px;
                box-sizing: border-box;
                padding-top:_vw(60);
                width: 100%;
                .num{
                    font-size:_vw(30);
                    color:#ffffff;
                    font-weight: 800;
                    text-align: center;
                    // .dqyb{
                    //     font-size: _vw(14);
                    //     font-weight: none;
                    // }
                }
                .title_top{
                //  height: _vw(60);
                 width: 100%;
                 background: #ffffff;
                 display:flex;
                 position: absolute;
                 left:0px;
                 bottom:0px;
                 justify-content: space-between;
                 display: flex;
                 align-items: center;
                 .left{
                     border-right: 1px solid #ccc;
                     font-size: _vw(14);
                     .iconfont{
                     font-size: _vw(16);

                     }
                 }
                  div{
                        margin:_vw(16) auto;
                        display:flex;
                        justify-content: center;
                        justify-items: center;
                        width: 50%;
                        text-align: center;
                      .iconjifenzhang-copy{
                       color:rgb(228, 137, 18);
                       font-size: 22px;
                      }
                      .iconduihuan{
                       color:rgb(15, 50, 116);
                       font-size: 22px;
                      }
                      span{
                          color:black;
                      }
                  }
                 }
                }

                ul{
                    //  padding-top: _vw(230);
                     margin-top:_vw(220);
                    //  li:nth-last-child(1){
                    //      border-bottom:none;
                       
                    //  }
                    li{
                        box-sizing: border-box;
                        margin-bottom: _vw(5);
                           background: #ffffff;
                        .box_cont{
                            margin:0px _vw(16);
                             display:flex;
                             justify-content: space-between;
                             line-height:_vw(40);
                             font-size: _vw(18);
                        }
                        .bottom{
                            text-align: right;
                            font-size: _vw(12);
                            color:#acacac;
                            padding-right: _vw(16);
                            line-height: _vw(30);
                        }

                    }
                }
                .btn{
                    margin:0px auto _vw(10) auto;
                    width: 80%;
                    height: _vw(40);
                    background: #ec304c; 
                    text-align: center;
                    line-height: _vw(40);
                    color:#ffffff;
                    margin-top:_vw(30);
                    border-radius: _vw(4);
                    font-size:_vw(14);
                    
                }
            }

</style>