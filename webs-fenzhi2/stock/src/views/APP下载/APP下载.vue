<template>
<div class="APP下载">
    <van-nav-bar class="title" title="APP下载" left-arrow :fixed="true" @click-left="onClickLeft"/>
    <div class="content">

      <div class="第一种">
            <p>第一种方式:</p>
            <p> (如果在浏览器中打开此页面,点开下面按钮下载)</p>
            <div   class="div_box" @click="点击下载()" >点击app下载</div>
      </div>

      
      <div class="第一种 第二种">
            <p>第二种方式:</p>
            <p> (如果在微信打开此页面,复制链接到浏览器中打开下载)</p>
            <div class="div_box">
                <div class="left">{{wangzhi}}</div>
                <div class="right"  @click="复制()" >复制链接 </div>
            </div>
      </div>

      <div class="第三种">
         <p>第三种方式:&nbsp;&nbsp;(扫描二维码下载)</p>

         <div  class="code_img">
             <img src="../../assets/img/appCode.png" alt="">
         </div>
      </div>
        
        <p class="title">苹果手机添加信任操作说明</p>

        
         <p class="步骤">1.点击"交易软件" 弹出下面对话框</p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>

         <p class="步骤">2.点击“设置” </p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>

          <p class="步骤">3.点击“通用” </p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>

          <p class="步骤">4.点击“设备管理” </p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>
        
        
          <p class="步骤">5.点击“企业级应用” —— “dark...” </p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>
      
      <p class="步骤">6.点击信任“dark，000” </p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>
        
          <p class="步骤">7.点击“信任” </p>

         <div class="div_img">
             <img src="../../assets/img/buzhou.png" alt="">
         </div>
      
          <p class="步骤">完成操作，可以正常使用 “交易软件了” </p>
        
    </div>

 

</div>
</template>
<script>
export default {
    data() {
        return {
            wangzhi:"klasfjlfalkj"
        }
    },
    components: { // 注册组件
      
    },
    created() {
      
        
    },
    computed: {
    },
    methods: {
        点击下载(){
       



        },
        复制(){
           var text= this.wangzhi
            this.$copyText(text).then((e) => {
                this.$toast("复制成功")
            }, (e) => {
                this.$toast("复制失败，请手动复制")
            })
        },
         onClickLeft(){//头部
            history.back()
        },
  }
}


</script>
<style lang="scss" scoped>
.APP下载{
    // height:800px;
        // background: linear-gradient(180deg,rgba(251,122,101,1) 0%,rgba(158,31,157,1) 100%);

    .content{
        padding-top:_vw(60);
        // height: _vw(800);
        padding: _vw(20) _vw(10) _vw(10) _vw(10);
        // background: gold;
        background: linear-gradient(180deg,rgba(251,122,101,1) 0%,rgba(158,31,157,1) 100%);
    //    position: absolute;
    //    width: 100%;
    //    height: 100%;
        .第一种{
            margin-top:_vw(40);
            border-radius: _vw(6);
            // height: _vw(200);
            background: #e2554d;
                border: 1px  solid rgba(255,182,55,1);
                p:nth-child(2){
                    margin-top:_vw(24);
                    margin-bottom:_vw(26);
                }
            p{
                text-align: center;
                color: #ffffff;
                font-size: _vw(15);
            }
           .div_box{
                background: linear-gradient(180deg,rgba(255,247,0,1) 0%,rgba(229,176,0,1) 100%);
                text-align: center;
                height: _vw(35);
                width: 80%;
                margin:0px auto;
                border-radius: _vw(35);
                line-height: _vw(35);
                margin-bottom:_vw(30)
            }
        }
        .第二种{
            margin-top:_vw(20);
            .div_box{
                display:flex;
                justify-content: space-between;
                border: 1px  solid rgba(255,182,55,1);
                font-size: _vw(15);
                .left{
                    width: 70%;
                    height: 100%;
                     background: #e2554d;
                    border-top-left-radius: _vw(35);
                    border-bottom-left-radius: _vw(35);
                    color: #ffffff;
                    font-size: _vw(12);
                 }
                .right{
                    width: 30%;
                    height: 100%;
                    background: #ffd500;
                    border-top-right-radius: _vw(35);
                    border-bottom-right-radius: _vw(35);
                }
            }
        }
        .第三种{
                border: 1px  solid rgba(255,182,55,1);
                 background: #e2554d;
                 margin-top:_vw(20);
                border-radius: _vw(6);
                text-align: center;
                color:#ffffff;
                .code_img{
                    width:_vw(160);
                    height:_vw(160);
                    margin:_vw(20) auto _vw(20) auto;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
        }
        
        .title{
            color:#ffff87;
            font-weight: 600;
            text-align:center;
            font-size: _vw(18);
        }
        .步骤{
            color:#ffffff;
            font-size: _vw(15)
        }
        .div_img{
            width:_vw(240);
            height: _vw(260);
            margin:0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }

    }
}
</style>