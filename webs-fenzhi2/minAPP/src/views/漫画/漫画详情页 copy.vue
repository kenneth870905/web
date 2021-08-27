<template>
    <div class="漫画详情">
        <van-nav-bar  title="漫画详情"  class="title"  left-arrow  @click-left="onClickLeft" /> 
         <div class="content">
              <div class="top">
                 <div class="left"><img src="../../assets/img/manhua/moban3.jpg" alt=""><div class="lz">连载</div></div>
                 <div class="right">
                     <p class="t_P"><span class="t_t">更新至:</span><span>第450话</span></p>
                     <p class="t_P"><span class="t_t">更新于:</span><span>2019-05-08</span></p>
                     <p class="t_P"><span class="t_t">作者:</span><span>三幅动漫</span></p>
                     <p class="t_P"><span class="t_t">类别:</span><span>爱情搞笑</span></p>
                     <div class="btn_box">
                         <div class="left_btn">开始阅读</div>
                         <div class="right_btn">章节列表</div>
                     </div>
                 </div>
              </div>
              <p class="text_c"></p>
         </div>
    </div>
</template>
<script>
 export default {
    data() {
        return {
          
        }
    },
   
    created() {  
    },
    computed: {
        
    },
      methods: {
            onClickLeft() {//头部
            history.back()
           },
    },
}

</script>
<style  lang="scss" scoped >
 .漫画详情{
       background: #ffffff;
        position: absolute;
        left: 0px;
        top:0px;
        width: 100%;
        height: 100%;
  .content{
    //   margin-top:_vw(50);
   .top{
       padding:_vw(10);
       display:flex;
       background: #ffffff;
     .left{
      width:_vw(91);
      height: _vw(120);
      margin-right: _vw(10);
      position: relative;
      .lz{
          position: absolute;
          left:0px;
          bottom:0px;
          height: _vw(24);
          background: rgba(0,0,0,0.6);
          line-height: _vw(24);
          text-align: center;
          width: 100%;
          color:#ffffff;
          font-size: _vw(14);
      }
      img{
          width: 100%;
          height: 100%;
      }
     }
     .right{
         position: relative;
       flex:1;
       .t_P{
           font-size: _vw(14);
           margin:0px;
           font-size: 14;
           line-height:_vw(20);
           .t_t{
               color:#acacac;
           }
       }
       .btn_box{
           display:flex;
           position: absolute;
           left:0px;
           bottom:0px;
       }
       .left_btn{
           background: #6eb80b;
           margin-right:_vw(10);
       }
       .right_btn{
           background: #b8590b;
       }
       .left_btn,.right_btn{
           width: _vw(80);
           height: _vw(30);
           color:#ffffff;
           line-height: _vw(30);
           border-radius: _vw(4);
           text-align: center;
       }
     }
   }
  }
 }
</style>