<template>
    <Modal class="购机弹框" v-model="显示弹框" width="350">
        <div class="tittle">购买主机</div>
        <Form :label-width="80" size="small">
            <FormItem label="分组">
                <Select v-model="setName" placeholder="请选择分组">
                    <Option v-for="item in 分组" :value="item.name">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="型号">
                <Select v-model="setId" placeholder="请选择机型">
                    <Option v-for="item in 机型list" :value="item.setId">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="价格">
                <div class="价格">{{价格}}</div>
            </FormItem>
            <FormItem label="账号余额">
                <div>
                    ￥{{userInfo.balance | qian}}<span class="btn-1" @click="显示充值(true)">充值</span>
                </div>
            </FormItem>
            <div class="btn-list">
                <Button @click="显示弹框=false">取消</Button>
                <Button @click="确定()" type="primary">确定购买</Button>
            </div>
        </Form>
    </Modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    inject:['获取设备列表','显示充值'],
    data() {
        return {
            显示弹框:false,
            setName:"",
            setId:'',
        }
    },
    computed:{
        ...mapState({
            分组:"分组",
            机型list:'设备类型',
            userInfo:'userInfo'
        }),
        价格(){
            var num = this.机型list.find(x=>x.setId==this.setId) ? this.机型list.find(x=>x.setId==this.setId).price : ''
            if(num){
                return num/100
            }
            return ''
        }
    },
    filters: {
        qian(num) {
            if(!num){
                return 0
            }
            return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num / 100)
        }
    },
    methods: {
        ...mapActions({
            统计:"统计" 
        }),
        确定(){
            if(!this.setName){
                this.错误('请选择分组')
                return
            }else if(!this.setId){
                this.错误('请选择机型')
                return
            }
            this.$Spin.show();
            var o = {"count": 1, "setId": this.setId,setName:this.setName}
            this.$axios.post('/api/order',o)
            .then(res => {
                this.$Spin.hide();
                if(res.data.code===0){
                    this.显示弹框 = false
                    this.正确('购买成功')
                    this.获取设备列表()
                    this.统计()
                }else{
                    this.错误(res.data.message)
                }
                this.$Spin.hide();
            })
            .catch(err => {
                this.$Spin.hide();
                this.错误('系统错误，稍后再试')
            })
        },
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.购机弹框{
    /deep/ .ivu-modal-footer{
        display: none;
    }
}
.tittle{
    color: #1890ff;
    text-align: center;
    font-size: 26px;
    margin: 10px 0px 20px;
}
.价格{
    color:red;
}
.btn-1{
    color: #2778ff;
    margin: 0px 0px 0px 10px;
    cursor: pointer;
}
.ivu-form-item{
    margin-bottom:10px;
}
.btn-list{
    margin: 30px 0px 0px;
    text-align: center;
    button{
        margin: 0px 5px;
    }
}
</style>