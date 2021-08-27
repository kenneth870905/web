<template>
    <div>
        <van-nav-bar title="站内消息"   :fixed="true" left-arrow @click-left="$back()" right-text="全部已读" @click-right="onClickRight" />
       


        <ul class="list"  >
            <li v-for="(item, index) in Alldata" :key="index" @click="go(item)" >
                <p class="clear read"> 
                    <!-- {{控制已读数据}} -->
                    <b class="fl txt-s15">{{item.messageType}}</b> 
                    <small class="fr txt-s13 color9">{{item.createTime}}</small>
                </p> 
                <div>{{item.content}}</div>
                <div   v-if="item.msgCode" class="状态 fred" >未读</div>
                <div  v-if="!item.msgCode"  class="状态 green">已读</div>
            </li>

        </ul>


    </div>
</template>

<script>
import { api_站内消息通知公告} from "@/api/站内消息.js";
import { mapState,mapGetters,mapActions } from "vuex";
import {  api_更改消息状态为已读 } from "@/api/站内消息.js";
export default {
    name: "",
    data() {
        return {
            currentPage: 0,//当前页码
           pageSize:10,//每页几条
           Alldata:[],
           AllSize:13,//总页数
        //    xinxiaoxi:{},

        }
    },

      computed: {
        //   test(){
        //       return this.$store.state.控制已读数据
        //   }
        // ...mapState({ mapActions
        //     控制已读数据: '控制已读数据'
        // })
        },


    created(){
         var obj={
              pageIndex:this.currentPage, //当前页码
             pageSize:this.pageSize, //每页几条
        }
        api_站内消息通知公告(obj).then(x=>{
             this.Alldata=x.data.data
              console.log(x.data.data)

        }).catch(err=>{
           this.$toast("系统错误稍后再试")
            console.log(err)
        })
    },

    computed:{ 
        
     
    },

        
    methods: { 


      
    go(item){
        var msgCode=item.msgCode
            api_更改消息状态为已读(msgCode).then(x=>{
                    console.log(x.data)
                }).catch(err=>{
                    console.log(err)
         })
        this.$router.push('/znxxText?msgCode='+item.msgCode)
    },
        onClickRight() {
            console.log('全部已读')
        }
    },
}
</script>

<style lang="scss" scoped>
 .green{
     color:green;

}
.list{
    margin-top: _vw(52);
    li{
        margin: _vw(10) 0px 0px;
        background: #ffffff;
        padding: _vw(10);
        p{
            margin: 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            b{
                font-size: _vw(14);
            }
            small{
                font-size: _vw(12);
            }
        }
        div{
            font-size: _vw(13);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 90%;
        }
        .状态{
            text-align: right;
            width: 100%;
            margin-top:_vw(10)
        }
    }
}
</style>

