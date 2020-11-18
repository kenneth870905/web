<template>
    <div>
        <van-nav-bar title="银行卡管理" z-index="10" left-arrow :fixed="true" @click-left="$back()" />
        <div class="content" v-if="!nameshow">
          

            <ul class="list">
                <li>
                    <label>开户名: </label>
                    <input type="text">
                </li>
                <li>
                    <label> 开户行:</label>
                    <input type="text">
                </li>
                <li>
                    <label> 开户支行:</label>
                    <input placeholder="请输入开户支行" type="text">
                </li>
                <li>
                    <label>银行卡号:</label>
                    <input placeholder="请输入银行卡号" type="text">
                </li>
            </ul>
            
            <btn name="保存"/>
        </div>

        <div class="未实名认证" v-if="nameshow">
            <div class="div">
                 <p class="renzheng">你尚未通过实名认证 ,无法绑定银行卡请先前往:</p>
                 <div class="btn" @click="$router.push('/my/rechargeAutonym')">实名认证</div>
            </div>
              
        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name: "",
    components:{
        btn
    },
    data() {
        return {
         nameshow:true
        }
    },
}
</script>

<style lang="scss" scoped>
.未实名认证{
position: absolute;
width: 100%;
// width: 100%;
height: 100%;
background: #ffffff;
// padding-top:_vw(46)
.div{
padding:_vw(10) _vw(10) _vw(10) _vw(10);

  .renzheng{
    padding-top:_vw(46);
    width: 90%;
    margin:0px auto ;
    color:red;
    line-height: _vw(30);
// background: #ffffff;
    // font-size: _vw(16)
}
.btn{
      width: 90%;
    margin:0px auto ;
    margin-top:_vw(30);
    color:#fff;
    height: _vw(40);
    line-height: _vw(40);
    background: rgb(219, 77, 77);
    text-align: center;
    border-radius: _vw(6)
}
  
}

}
.content {
    padding-top: _vw(46);

}

.添加银行卡 {
    background: #ffffff;
    margin: _vw(20);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: _vw(120);
    .van-icon-add-o {
        font-size: _vw(40);
        margin: 0px 0px _vw(5);
    }
}

.list{
    margin: _vw(10) 0px 0px;
    padding: _vw(0) _vw(10);
    background: #ffffff;
    font-size: _vw(13);
    li{
        display: flex;
        align-items: center;
        height: _vw(46);
        border-bottom: 1px solid #cccccc;
        &:last-child{
            border-bottom: none;
        }
        label{
            width: _vw(80);
        }
        input{
            border: none;
        }
    }
}
</style>
