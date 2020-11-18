<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">绑定银行卡</h1>
            <!-- <a class="mui-btn mui-btn-link mui-pull-right">明细</a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            
            <div class="title_1">
                请输入您的身份和银行卡信息
            </div>
            <ul class="mui-table-view list">
				<li class="mui-table-view-cell item">
                    <span class="text_1">真实姓名</span>
                    <input type="text" placeholder="请输入真实姓名" />
				</li>
                <li class="mui-table-view-cell item">
                    <span class="text_1">银行卡号</span>
                    <input type="text" placeholder="请输入真实姓名" />
				</li>
                <li class="mui-table-view-cell item">
                    <span class="text_1">银行名称</span>
                    <input type="text" placeholder="请输入真实姓名" />
				</li>
                <li class="mui-table-view-cell item">
                    <span class="text_1">开户行</span>
                    <input type="text" placeholder="请输入真实姓名" />
				</li>
            </ul>

            <ul class="mui-table-view list2">
				<li class="mui-table-view-cell">
                    <van-checkbox v-model="checked">我已同意《服务协议》</van-checkbox>
				</li>
                <li class="mui-table-view-cell tishgi">
                    尊敬的用户，为了保障您的资金安全，请您绑定您的真实姓名和设置提款密码。如果姓名与开户名不一致，将无法提款
				</li>
            </ul>
            <div class="btn">
                <btn />
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            checked:true
        }
    },
    methods: {
        change(){
            this.radio=!this.radio
        }
    },
}
</script>

<style lang="scss" scoped>
.title_1{
    padding: _vw(10) _vw(10);
    font-size: _vw(14);    
}
.list{
    .item{
        display: flex;
        align-items: center;
        font-size: _vw(14);
        .text_1{
            width: _vw(90);
            flex-shrink: 0
        }
        input{
            margin: 0px ;
            padding: 0px;
            border: none;
            height: auto;
        }
    }
}
.list2{
    margin: _vw(5) 0px 0px;
    font-size: _vw(13);
    .tishgi{
        font-size: _vw(12);
        color: red;
    }
}
.btn{
    margin: _vw(20) 0px;
}
</style>
