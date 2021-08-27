<template>
    <div>
        <van-nav-bar title="提现记录"  left-arrow :fixed="true" @click-left="$back()" />
        <div class="content">
            <ul class="list header_1">
                <li>
                    <div>时间</div>
                    <div>金额</div>
                    <div>状态</div>
                    <div>备注</div>
                </li>
            </ul>
            <ul class="list" v-if="Alldata.length>0">
                <li v-for="(item, index) in Alldata">
                    <div>{{item.createTime}}</div>
                    <div class="红色"><b>{{item.amount}}</b></div>
                    <div :class="{'绿色':item.statusText=='已通过','红色':item.statusText=='未通过', '红色':item.statusText=='待处理',}"><b>{{item.statusText}}</b></div>
                    <div>{{item.bankName}}</div>

                    <!-- <div>2019-07-13 20:58:15</div>
                    <div class="红色"><b>500.00</b></div>
                    <div class="绿色"><b>审核通过</b></div>
                    <div>银行转账</div> -->
                </li>
            </ul>

        <van-pagination  v-if="Alldata.length>0"   v-model="currentPage"  :items-per-page="pageSize" :page-count="AllSize" mode="simple"  />



        </div>
    </div>
</template>

<script>
import { api_提现记录} from "@/api/资金接口.js";
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
              pageIndex:this.currentPage, //当前页码
             pageSize:this.pageSize, //每页几条
        }
        api_提现记录(obj).then(x=>{
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
.van-pagination{
   position: fixed;
   bottom: 0px;
   left:0px;
   width: 100%;
}
.content {
    padding-top: _vw(87);
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
        min-height: _vw(40);
        display: flex;
        font-size: _vw(12);
        border-bottom: 1px solid #cccccc;
        div{
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
          
        }
    }
}
</style>
