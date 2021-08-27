<template>
    <div class="znxxText">
        <van-nav-bar title="站内消息详情"   :fixed="true" left-arrow @click-left="$back()" right-text="全部已读" @click-right="onClickRight" />
       
        <div class="znxxText_content">
            <p class="title">{{通知信息详情.messageType}}</p>
            <p class="date">{{通知信息详情.content}}</p>
            <P class="znxxText_content_text">{{通知信息详情.createTime}}</P>
        </div>

    </div>
</template>

<script>
import { api_站内消息通知公告} from "@/api/站内消息.js";
export default {
    name: "",
    data() {
        return {
          通知信息详情:[],
          通知信息:[],
          currentPage:0,
          pageSize:10,
        }
    },
    created(){
         var obj={
              pageIndex:this.currentPage, //当前页码
             pageSize:this.pageSize, //每页几条
        }
        api_站内消息通知公告(obj).then(x=>{
          this.通知信息=x.data.data
          var msgCode=this.$route.query.msgCode
          this.通知信息详情 =this.通知信息.find(x=>x.msgCode==msgCode)
            console.log( this.通知信息详情)
        }).catch(err=>{
           this.$toast("系统错误稍后再试")
            console.log(err)
        })
    },
    methods: {
        onClickRight() {
            console.log('全部已读')
        }
    },
}
</script>

<style lang="scss" scoped>
.znxxText{
     background: #ffffff;
     position: absolute;
     width: 100%;
     height: 100%;
    padding-top:_vw(60);
    .znxxText_content{
        padding:_vw(20);
     background: #ffffff;
      .title{
          text-align: center;
         font-weight: 500;
     }
     .date{
         color:#999999;
         margin:0px;
         margin:_vw(10) auto;
         color:red;
     }
     .znxxText_content_text{
         text-align: right;
         text-indent: _vw(20);
     }

    }
}
</style>

