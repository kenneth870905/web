<template>
  <div class="资讯详情页"> 
         <div class="title">
            <div class="返回" @click="返回()"><van-icon name="arrow-left" /></div>
            <div>{{type==0 ? '足' : '篮'}}球资讯</div>
            <div></div>
        </div>
        <div class="content">
             <h3>{{obj.title}}</h3>
             <div class="chuzhi"><span>{{obj.author}}</span>&nbsp;| &nbsp;<span>{{obj.publish_time}}</span></div>

             <p v-html="obj.content" ></p>
             
        </div>
  </div>
</template>
<script>
import {新闻详情}  from "@/api/新闻.js"

export default {
    data() {
        return {
            obj:{},
            type:0,
        }
    },
    components: { // 注册组件
    },
    computed: {
        
    },
    created() { 
          var iddata = this.$route.query.id;
           this.type = this.$route.query.type;
          var obj={
              id:iddata
          }
          新闻详情(obj).then(x=>{
              this.obj=x.data.data
            //   console.log(x.data.data)
          }).catch(err=>{
              console.log(err)
          })
    },
 
    methods: {
        返回() {
            history.back()
        }
    },
   
}


</script>

<style lang="scss" scoped>
.资讯详情页{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    background:#ffffff;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    padding-top: _vw(40);
      .title{
        position: fixed;
        display: flex;
        justify-content: space-between;
        left: 0px;
        top:0px;
        z-index:10;
        width: 100%;
        height: _vw(44);
        background: red;
        text-align: center;
        color:#ffffff;
        line-height: _vw(44);
        font-size: _vw(18);
        font-weight: 600;
    }
    .content{
        padding:_vw(10)  _vw(10) _vw(10) _vw(10);
        /deep/img{
            width: 100%;
            margin: 0px auto;
        }
        .chuzhi{
            font-size: _vw(10);
        }
    }
}
</style>