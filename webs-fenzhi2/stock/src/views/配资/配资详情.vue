<template>
    <div>
        <van-nav-bar title="方案详情" :z-index="10" left-arrow :fixed="true" @click-left="$back()" />
        <div class="content">
            <ul class="header">
                <li @click="type=1" :class="{active:type==1}">基本信息</li>
                <li @click="type=2" :class="{active:type==2}">配资资金记录</li>
            </ul>

            <div class="内容">
                <div v-if="type==1">
                    <ul class="message-list">
                        <li>
                            <label>交易账号：</label>
                            <span>-------</span>
                        </li>
                        <li>
                            <label>操盘金额（元）：</label>
                            <span>{{obj.contractAmount}}</span>
                        </li>
                        <li>
                            <label>保证金：</label>
                            <span>{{obj.bondAmount}}</span>
                        </li>
                        <li>
                            <label>配资周期<span>（天）</span>：</label>
                            <span>---</span>
                        </li>
                        <li>
                            <label>服务费：</label>
                            <span>{{obj.bondAmount * obj.interestRate / 100}}</span>
                        </li>
                        <li>
                            <label>开始时间：</label>
                            <span>{{obj.createTime}}</span>
                        </li>
                        <li>
                            <label>到期时间：</label>
                            <span>{{obj.useEndTime}}</span>
                        </li>
                        <li>
                            <label>借款协议：</label>
                            <span @click="$toast('开发中')" class="btn_1">查看协议</span>
                        </li>
                    </ul>
                    <btn v-if="obj.status==0" name="扩大配资" @click.native="显示输入金额(1)"/>
                    <btn v-if="obj.status==0" name="追加保证金" @click.native="显示输入金额(2)"/>
                    <btn v-if="obj.status!=2" name="终止合约" @click.native="终止合约()"/>
                    <btn v-if="obj.status" name="提取盈利" @click.native="提取盈利()"/>
                    <btn  name="合约持仓" @click.native="$router.push('/position')" />

                </div>

                <ul class="list_1 list1" v-if="type==2">
                    <li class="title_1">
                        <div>发生类型</div>
                        <div>发生金额</div>
                        <div>发生时间</div>
                    </li>
                </ul>
                <ul class="list_1 list2" v-if="type==2">
                    <van-list v-model="loading" finished-text="暂无相关数据"  @load="onLoad"></van-list>
                    <!-- <li v-for="(item, index) in 30" :key="index">
                        <div>解冻保证金</div>
                        <div>+200</div>
                        <div>2019-07-17 20:10:06</div>
                    </li> -->
                </ul>
            </div>

        </div>

        <van-popup v-model="show" round>
            <div class="金额输入">
                <div class="title_2">请在下方输入金额</div>
                <div class="输入框">
                    <span>￥</span>
                    <input type="text" placeholder="请输入金额" v-model.number="输入金额.金额"/>
                </div>
                <ul class="footer_1">
                    <li @click="show=false">取消</li>
                    <li @click="提交()">确定</li>
                </ul>
            </div>
        </van-popup>
        

    </div>
</template>

<script>
import btn from '@/components/btn.vue'
import { api_合约详情 , api_扩大配资 , api_追加保证金 , api_终止合约 , api_提取盈利} from "@/api/合约.js";
import { mapActions } from 'vuex';
export default {
    name: "",
    data() {
        return {
            show:false,
            输入金额:{
                type:1,      // 1 扩大配资 2 追加保证金 
                金额:''
            },
            type: 1,
            contractCode:"",
            obj:{},
            loading:false
        }
    },
    components:{
        btn
    },
    methods: {
        ...mapActions({
            加载中:"加载中"
        }),
        合约持仓(){
         alert("合约持仓")
        },
        onLoad(){
            this.loading=false
        },
        显示输入金额(type){
            this.show=true
            this.输入金额.type = type
        },
        提交(){
            if(!this.输入金额.金额){
                this.$toast('请输入金额');
                return
            }
            var obj={
                    contractCode:this.contractCode,
                    amount:this.输入金额.金额
                }
            this.show=false;
            this.加载中(true)
            if(this.输入金额.type==1){
                api_扩大配资(obj).then(x=>{
                    if(x.data.code==200){
                        this.$toast('扩大配资成功')
                    }else{
                        this.$toast(x.data.msg)
                    }
                    this.查询合约详情()
                    this.加载中()
                }).catch(err=>{
                    this.加载中()
                    this.$toast('系统错误，稍后再试。')
                })
            }else{
                api_追加保证金(obj).then(x=>{
                    if(x.data.code==200){
                        this.$toast('追加保证金成功')
                    }else{
                        this.$toast(x.data.msg)
                    }
                    this.查询合约详情()
                    this.加载中()
                }).catch(err=>{
                    this.加载中()
                    this.$toast('系统错误，稍后再试。')
                })
            }
        },
        终止合约(){
            this.$dialog.confirm({ title: '提示', cancelButtonText:'在想想', message: '确定要终止合约？'}).then(() => {
                this.加载中(true)
                api_终止合约(this.contractCode).then(x=>{
                    console.log(x);
                    if(x.data.code==200){
                        this.$toast('终止成功')
                    }else{
                        this.$toast(x.data.msg);
                    }
                    this.加载中(false)                
                }).catch(err=>{
                    this.加载中(false)
                    this.$toast('系统错误，稍后再试。')
                })
            }).catch(() => {});
        },
        提取盈利(){
            this.加载中(true)
            api_提取盈利(this.contractCode).then(x=>{
                this.$toast(x.data.msg);
                this.查询合约详情()
            }).catch(err=>{
                this.$toast('系统错误，稍后再试。')
                this.加载中(false)
            })
        },
        查询合约详情(){
            this.加载中(true)
            api_合约详情(this.contractCode).then(x=>{
                if(x.data.code==200){
                    this.obj=x.data.data;
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false)
            }).catch(err=>{
                this.加载中(false)
                this.$toast('系统错误，稍后再试。')
            })
        }
    },
    mounted() {
        this.contractCode=this.$route.params.contractCode
        this.查询合约详情()

    },
}
</script>

<style lang="scss" scoped>
.content {
    position: absolute;
    top: _vw(46);
    bottom: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.header {
    flex-shrink: 0;
    line-height: _vw(40);
    display: flex;
    background: #ffffff;
    li {
        width: 50%;
        text-align: center;
        font-size: _vw(14);
        &.active {
            border-bottom: 1px solid red;
        }
    }
}
.内容{
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    margin: _vw(5) 0px 0px;
    .list1{
        flex-shrink: 0;
    }
    .list2{
        overflow: auto;
    }
}


.message-list {
    margin: _vw(10) 0px 0px;
    padding: 0px _vw(10);
    background: #ffffff;
    li {
        display: flex;
        height: _vw(40);
        align-items: center;
        font-size: _vw(12);
        &:not(.last-child) {
            border-bottom: 1px solid #eeeeee;
        }
        label {
            width: 50%;
        }
        .btn_1 {
            background: #ffffff;
            color: #0179fe;
        }
    }
}

.list_1{
    padding: 0px _vw(10);
    background: #ffffff;
    li{
        background: #ffffff;
        text-align: center;
        display: flex;
        height: _vw(40);
        align-items: center;
        font-size: _vw(12);
        &:not(.last-child) {
            border-bottom: 1px solid #eeeeee;
        }
        div{
            width: calc(100% / 3);
        }
    }
}

.金额输入{
    width: _vw(250);
    .title_2{
        text-align: center;
        line-height: _vw(40);
        border-bottom: 1px solid #eeeeee;
    }
    .输入框{
        padding: _vw(20) _vw(20);
        display: flex;
        font-size: _vw(20);
        span{
            white-space: nowrap;
            flex-shrink: 0;
            color: red;
        }
        input{
            width: 100%;
            border:none;
            border-bottom: 1px solid #cccccc;
            padding: _vw(3) _vw(10);
        }
    }
    .footer_1{
        line-height: _vw(40);
        text-align: center;
        display: flex;
        border-top: 1px solid #eeeeee;
        li{
            width: 50%;
            &:nth-child(1){
                border-right: 1px solid #eeeeee;
                color: #a2a2a2;
            }
        }
    }
}
</style>
