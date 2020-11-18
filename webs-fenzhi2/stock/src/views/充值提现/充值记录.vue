<template>
    <div>
        <van-nav-bar title="充值记录"  left-arrow :fixed="true" @click-left="$back()" />
        <div class="content">
            <ul class="list header_1">
                <li>  
                    <div>支付状态</div>
                    <div class="date">操作时间</div>
                    <div>操作金额</div>
                    <div>状态</div>
                    <div>备注</div>
                </li>
            </ul>
   

      
            <ul class="list" v-if="Alldata.length>0">
                <li v-for="(item, index) in Alldata" :key="index">
                    <div class="绿色">字段不足</div>
                    <div  class="date">{{item.createTime}}</div>
                    <div class="红色"><b>{{item.amount}}</b></div>
                    <div :class="{'绿色':item.status=='审核通过','红色':item.status=='审核拒绝', '红色':item.status=='待处理',}"><b>{{item.status}}</b></div>
                    <div>{{item.paymentTypeText}}</div>
                </li>
            </ul>
        </div>

        <!-- <van-pagination  v-if="Alldata.length==0"  v-model="currentPage"  :items-per-page="pageSize" :page-count="AllSize" mode="multi"  /> -->

    </div>
</template>

<script>
import { api_充值记录} from "@/api/资金接口.js";
export default {
    name: "",
    data() {
        return {
           currentPage: 1,//当前页码
           pageSize:2,//每页几条
           Alldata:[],
           AllSize:13,//总页数
           
        }
    },
    created(){
        var obj={
              pageIndex:this.currentPage, //当前页数
             pageSize:this.pageSize, //每页几条
        }
        api_充值记录(obj).then(x=>{
       this.Alldata=x.data.data
            console.log( this.Alldata)

        }).catch(err=>{
           this.$toast("系统错误稍后再试")
            console.log(err)
        })
    }
}
</script>

<style lang="scss" scoped>
.van-pagination {
 position: fixed;
 bottom:0px;
 left:0px;
 width: 100%;
 border-top:1px solid #ccc;
}
.content {
    padding-top: _vw(98);
 
}

.绿色{
    color: green;
}
.红色{
    color: red;
}

.list.header_1{
    position: fixed;
    width: 100%;
    top: _vw(46);
   
    li{
        background: #ececec;
    }
}
.list{
         li:nth-last-child(1){
        border-bottom: none;
    }
    li{
        background: #ffffff;
        min-height: _vw(56);
        display: flex; 
        font-size: _vw(12);
        border-bottom: 1px solid #cccccc;
        .date{
            width: 25%;
        }
        div{
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align:center;
        }
    }
}
</style>
