<template>
    <Modal class="购机弹框" v-model="显示弹框" width="350">
        <div class="tittle">购买云机</div>
        <Form :label-width="80" size="small">
            <FormItem label="型号">
                <Select v-model="setId">
                    <Option v-for="item in 机型list" :value="item.setId">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="价格">
                <div class="价格">{{价格}}</div>
            </FormItem>
            <FormItem label="账号余额">
                <div>
                    ￥0<span class="btn-1">充值</span>
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
import { mapState } from 'vuex'
export default {
    inject:['获取设备列表'],
    data() {
        return {
            显示弹框:false,
            setId:230,
            机型list:[
                {
                    name:"荣耀30天",
                    setId:230,
                    价格:230
                },{
                    name:"荣耀15天",
                    setId:46,
                    价格:46
                },{
                    name:"荣耀7天",
                    setId:13,
                    价格:13
                }
            ]
        }
    },
    computed:{
        价格(){
            return this.机型list.find(x=>x.setId==this.setId).价格
        }
    },
    methods: {
        确定(){
            var o = {"count": 1, "setId": this.setId}
            this.$axios.post('/api/order',o)
            .then(res => {
                if(res.data.code===0){
                    this.显示弹框 = false
                    this.正确('购买成功')
                    this.获取设备列表()
                }else{
                    this.错误(res.data.message)
                }
            })
            .catch(err => {
                this.错误('系统错误，稍后再试')
            })
        },
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