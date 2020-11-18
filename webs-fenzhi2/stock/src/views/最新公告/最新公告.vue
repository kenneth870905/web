<template>
<div class="notice">
    <van-nav-bar title="最新公告" left-arrow :fixed="true" @click-left="onClickLeft"/>
<!-- <h1>最新公告</h1> -->

<ul class="notice_content">
 <li v-for="(item,index) in 公告">
     <p class="P_title">{{item.title}}</p>
     <p class="P_date">{{item.date}}</p>
 </li>

  
</ul>

</div>
</template>
<script>
export default {
    data() {
        return {
            公告: [
                {
                    id: "0",
                    title: "上海霜害DJS",
                    date: "20197-7-12 16:32:19",
                    text: "上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS"
                },
                {
                    id: "1",
                    title: "上海霜害DJSHFKSA霜害DJSHFKSA",
                    date: "20197-7-12 16:32:19",
                    text: "上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS"
                },
                {
                    id: "2",
                    title: "上海霜害DJSHFKSA霜害DJSHFKSA",
                    date: "20197-7-12 16:32:19",
                    text: "上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS"
                },

            ],
        }
    },
    components: { // 注册组件
      
    },
    created() {
      
        
    },
    computed: {
        
    },
      methods: {
        onClickLeft(){//头部
            history.back()
        },
       
    },
}


</script>
<style lang="scss" scoped>
p{
    margin: 0px;
}
.notice{
    padding-top:_vw(60);
    // height:800px;
    .notice_content{
        padding:_vw(20) ;
        background: #ffffff;
      li{
          border-bottom:1px solid #ccc;
          font-size: _vw(14);
          p{
              line-height: _vw(36);
          }
          .P_title{
              font-size: _vw(16);
          }
          .P_date{
          text-align:right; 
           color:#999999;  
        //    margin-bottom: _vw(10);      
          }
      }
    }
}
</style>