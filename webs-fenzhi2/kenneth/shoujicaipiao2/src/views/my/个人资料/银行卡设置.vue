<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">银行卡管理</h1>
            <button @click="删除()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">移除</button>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <ul class="list">
                <li class="item">
                    <div class="icon_box">
                        <i class="icon iconfont icon-card"></i>
                    </div>
                    <div>
                        <div class="银行名">{{当前卡.BankName}}</div>
                        <div class="支持人">{{当前卡.BankKai}}</div>
                        <div class="卡号">
                            <!-- **** **** **** 6789 -->
                            {{当前卡.BankAccount | 隐藏卡号}}
                        </div>
                    </div>
                    <div class="默认" v-if="当前卡.BankAccount==银行卡.currentBank.BankAccount">默认</div>
                </li>
            </ul>


            <btn @click.native="设置默认()" value="将此卡设为默认"/>
            <!-- <ul class="btn_list">
                <li>
                    <van-button round size="small" plain type="danger">删除</van-button>
                </li>
                <li>
                    <van-button round size="small" plain type="primary">设为默认</van-button>
                </li>
            </ul> -->
            <div class="提示">
                亲，使用银行卡过程中遇到什么问题吗？
            </div>
            <ul class="问题">
                <li>
                    默认银行卡怎么删除？将其他银行卡为默认，然后再进行删除。
                </li>
                <li>
                    <div>
                        担心不安全？100万风险保金，资金被盗全赔，保额100万。
                    </div>
                </li>
                <li>
                    如果还有什么想了解的可以联系我们的客服哦~ <i @click="$router.push('/my/zxkf')" class="客服 icon iconfont icon-kefu"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { api_银行卡列表 , api_根据id查询银行卡 , api_设置默认银行卡 , api_删除银行卡} from "@/api/银行卡接口.js";
import btn from '@/components/btn.vue'
import { mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            银行卡:{
                currentBank:{}, //默认
                otherBanks:[]   //列表
            },
            id:""
        }
    },
    components:{
        btn
    },
    filters:{
        隐藏卡号(str){
            if(!str) return str
            var str1=str.substring(0,str.length-5);
            var str2=str.substring(str.length-4);
            var str3=''
            for (let i = 0; i < str1.length; i++) {
                if(i!=0 && i%4==0){
                    str3+=' '
                }
                str3+='*'
            }
                str3+=' '+str2;
                return str3
            // return "**** **** **** "+str.substring(str.length-4)
        }
    },
    computed: {
        当前卡(){
            var obj = this.银行卡.otherBanks.find(x=>x.Id==this.id);
            if(!obj){
                return {}
            }else{
                return obj;
            }
        },
        是否默认(){
            
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        设置默认(){
            this.加载中(true);
            api_设置默认银行卡(this.当前卡).then(x=>{
                console.log(x)
                if(x.data.code==0){
                    this.$toast('设置成功')
                    history.back();
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false);
            }).catch(err=>{
                this.加载中(false);
            })
        },
        删除(){
            mui.alert('删除银行卡，请联系在线客服！','提示');
            return
            mui.confirm('确定移除此卡？', '提示', ['取消', '确定'], value => {
                if(value.index==1){
                    this.加载中(true)
                    api_删除银行卡(this.id).then(x=>{
                        console.log(x)
                        if(x.data.code==0){
                            this.$toast('移除成功');
                            history.back();
                        }else{
                            this.$toast(x.data.msg)
                        }
                        this.加载中(false);
                    }).catch(err=>{
                        console.log(err)
                        this.$toast('系统错误稍后再试')
                        this.加载中(false)
                    })
                }
            }, 'div')
        }
    },
    mounted() {
        this.id=this.$route.query.id;

        api_银行卡列表().then(x=>{
            this.银行卡=x.data;
        }).catch(err=>{
            console.log(err);
        })


        // api_根据id查询银行卡(this.id).then(x=>{
        //     console.log(x)
        // }).catch(err=>{
        //     console.log(err);
        // })
    },
}
</script>

<style lang="scss" scoped>
.list{
    padding: _vw(10);
    li{
        overflow: hidden;
        margin: 0px 0px _vw(10);
        height: 130px;
        border-radius: 5px;
        display: flex;
        box-shadow: 0px 0px 5px 1px #b5b5b5;
    }
    .item{
        padding: 20px 0px 0px 20px;
        background: #4f81be;
        position: relative;
        .icon_box{
            width: _vw(40);
            height: _vw(40);
            background: #ffffff;
            border-radius: 100%;
            flex-shrink: 0;
            text-align: center;
            line-height: _vw(40);
            font-size: _vw(30);
            i{
                display: block;
            }
            margin: 10px _vw(15) 0px 0px;
        }
        .银行名{
            font-size: 20px;
            color: #ffffff;
        }
        .支持人{
            font-size: 14px;
            color: #ffffff;
        }
        .卡号{
            font-size: 25px;
            color: #ffffff;
            margin: 10px 0px 0px;
        }
        .默认{
            position: absolute;
            background: #f8c55c;
            font-size: 12px;
            padding: 2px;
            transform: rotate(45deg);
            text-align: center;

            width: 100px;
            top: 3px;
            right: -39px;
        }
    }
    .add{
        align-items: center;
        justify-content: center;
        font-size: 50px;
        color: #9e9e9e;
        background: #ffffff;
    }
}

// .btn_list{
//     display: flex;
//     li{
//         width: 50%;
//         margin: 0px 20px;
//         button{
//             width: 100%;
//         }
//     }
// }

.提示{
    text-align: center;
    margin: 30px auto 10px;
    font-size: _vw(14);
    color: #4e4e4e;
}

.问题{
    padding: _vw(10);
    font-size: _vw(12);
    color: #848484;
    li{
        margin: 0px 0px _vw(10);
    }
    .客服{
        @include textcolor;
        font-size: _vw(25);
    }
}
</style>