<template>
    <el-dialog title="群红包" class="群红包" :visible.sync="聊天室state.领取红包.发布弹框" width="300px" size="mini">
        <el-form :model="redEnvelope" :rules="验证" ref="form" size="small">
            <el-form-item label="红包个数" prop="quantity">
                <el-input  v-model.number="redEnvelope.quantity" placeholder="请输入红包个数"></el-input>
            </el-form-item>
            <el-form-item label="红包总金额" prop="totalAmount">
                <el-input v-model.number="redEnvelope.totalAmount" placeholder="红包最小金额为5元"></el-input>
            </el-form-item>
            <el-form-item label="红包台词(不建议太长)">
                <el-input type="textarea" v-model="redEnvelope.Note"></el-input>
            </el-form-item>
             <el-form-item size="small">
                <el-button type="primary" style="width:100%" @click="onSubmit()">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import axios from "axios";
import { api_发布群红包 } from "@/api/红包接口.js";
import { mapState , mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            redEnvelope:{
                Note:"",
                chatId:'',      //房间Id
                quantity:'',    //红包数量
                totalAmount:'',  //总金额
            },
            验证:{
                quantity:[
                    { required: true , min:1 , type:"number" ,  message: '红包数量有误', trigger: 'change' }
                ],
                totalAmount:[
                    { required: true , min:5 , type:"number" ,  message: '红包金额有误', trigger: 'change' }
                ]
            },
            标语:[]
        }
    },
    computed: {
        ...mapState({
            聊天室state:x=>x.聊天室            
        })
    },
    methods: {
        ...mapActions({
            加载中:"加载中",
            失败提示:"失败提示",
            成功提示:"成功提示"
        }),
        onSubmit(){
            this.$refs.form.validate((valid)=>{
                if (valid) {
                    this.提交()
                } else {
                    Console.log('不能提交')
                    return false;
                }
            })
        },
        async 提交(){
            this.加载中(true);
            this.redEnvelope.chatId = this.聊天室state.当前房间.Id;
            try {
                var r = await api_发布群红包(this.redEnvelope);
            } catch (error) {
                this.失败提示('系统错误，稍后再试');
                this.加载中(false);
                return
            }
            if(r.data.code==0){
                this.聊天室state.领取红包.发布弹框 = false;
                this.成功提示('发送成功');
            }else{
                this.失败提示(r.data.msg);
            }
            this.加载中(false);
        },
        初始化(){
            this.redEnvelope = {
                Note:"",
                chatId:'',      //房间Id
                quantity:'',    //红包数量
                totalAmount:''  //总金额
            }
            
            axios('static/json/hongbao.json').then(x=>{
                console.log(x);
                // this.标语= x.data;
                if(x.data.length>0){
                    let n = Math.floor(Math.random()*x.data.length);
                    this.redEnvelope.Note = x.data[n] ;
                }else{
                    this.redEnvelope.Note='恭喜发财,大吉大利'
                }
            }).catch(err=>{
                this.redEnvelope.Note='恭喜发财,大吉大利'
            })
        }
    },
    mounted() {
        this.初始化()
    },
    watch: {
        '聊天室state.领取红包.发布弹框'(){
            this.初始化()
        }
    },
}
</script>

<style lang="scss" scoped>
.群红包{
    .el-dialog__header{

    }
    /deep/ .el-dialog__body{
        padding: 10px ;
    }
}
</style>


