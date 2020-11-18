<template>
    <div class="autonym">
        <van-nav-bar title="实名认证" left-arrow :fixed="true" @click-left="$back()" />

        <div class="content">
            <van-cell-group>
                <van-field required v-model="obj.realName" label="真实姓名" placeholder="请输入真实姓名" />
                <van-field required v-model="obj.idCard" label="身份证号" placeholder="请输入身份号码" />
                <van-field required v-model="obj.bankcard" label="银行卡号" placeholder="请输入16或19位数银行卡号" />
                <van-field required v-model="obj.mobile" label="手机号码" placeholder="请输入手机号码"/>
            </van-cell-group>
            <btn name="确定" @click.native="提交()" />

        </div>
        <!-- <ul class="autonym_content">
            <li>
                <div class="title">手机号码:</div>
                <div class="content">
                    <input type="text" placeholder="手机号码" v-model="obj.mobile" />
                </div>
            </li>
        </ul> -->

    </div>
</template>

<script>
import { mapActions } from "vuex";
import btn from "@/components/btn.vue";
import { api_实名认证 } from "@/api/用户.js";
export default {
    data() {
        return {
            value:"",
            obj:{
                realName: "",
                idCard: "",
                bankcard: "",
                mobile: "",
                // "realName": "张少鹏",
                // "idCard": "410322199107251814",
                // "bankcard": "6231189800000026675",
                // "mobile": "15716669171"
            },

        }
    },
    components: { // 注册组件
        btn
    },
    created() {

    },
    computed: {

    },
    methods: {
        ...mapActions({
            加载中:'加载中'
        }),
        提交(){
            var test_18=/^\d{17}(\d|x)$/i;
            var test_15=/^\d{14}(\d|x)$/i;
            var test_phone=/^1[3456789]\d{9}$/
            var 银行卡正则=/^([1-9]{1})(\d{15}|\d{18})$/;   //16或者19位

            if(!this.obj.realName){
                this.$toast('请输入真实姓名')
                return
            }else if(!this.obj.idCard){
                this.$toast('请输入身份号码')
                return
            }else if(!test_18.test(this.obj.idCard) && !test_15.test(this.obj.idCard)){
                this.$toast('身份证位数错误');
                return
            }else if(!银行卡正则.test(this.obj.bankcard)){
                this.$toast('请输入银行卡号')
                return
            }else if(!test_phone.test(this.obj.mobile)){
                this.$toast('手机号码有误')
                return
            }

            this.加载中(true)
            api_实名认证(this.obj).then(x=>{
                if(x.data.code==0){
                    this.$toast('设置成功')
                }else{
                    this.$toast(x.data.msg);
                }
                this.加载中(false)
            }).catch(err=>{
                this.$toast('系统错误，稍后再试！')
                this.加载中(false)
            })
        }
    },
}


</script>
<style lang="scss" scoped>
.content{
    margin: _vw(50) 0px 0px ;
}
// .autonym {
//     .autonym_content {
//         margin-top: _vw(60);
//         background: #ffffff;
//         li:nth-last-child(1) {
//             border-bottom: none;
//         }
//         li {
//             // line-height: _vw(50);
//             border-bottom: 1px solid #ccc;
//             width: 90%;
//             margin: 0px auto;
//             display: flex;
//             font-size: _vw(14);
//             height: _vw(44);
//             align-items: center;
//             .title {
//                 width: 25%;
//             }
//             input{
//                 border: none;
//             }
//         }
//     }
// }
</style>