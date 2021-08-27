<template>
    <div class="header">
        <div class="l">
            <!-- <span class="全选">全选</span> -->
            <!-- <ButtonGroup class="btn-1" >
                <Button :type="列表显示 ? 'default' : 'primary'" @click="查看设备(false)">
                    <Tooltip content="预览图" placement="bottom">
                        <Icon type="md-apps" />
                    </Tooltip>
                </Button>
                <Button :type="列表显示 ? 'primary' : 'default'" @click="查看设备(true)">
                    <Tooltip content="列表显示" placement="bottom">
                        <Icon type="md-menu" />
                    </Tooltip>
                </Button>
            </ButtonGroup> -->
            <!-- <Poptip trigger="hover">
                <Button class="btn-1">
                    移动分组
                    <Icon type="md-swap" />
                </Button>
                <div class="分组列表" slot="content">
                    <div>分组1</div>
                    <div>分组2</div>
                </div>
            </Poptip> -->
            <!-- <Button type="primary" @click="安装应用()" class="btn-1" v-show="$route.path=='/device'">
                <Icon type="logo-android" />
                安装应用
            </Button> -->
            <!-- <Button class="btn-1">
                <Icon type="md-cloud-upload" />
                上传文件
            </Button> -->
            <Button type="primary" class="btn-1" @click="购买()">
                <Icon type="md-add-circle" />
                购买机器
            </Button>
            <Button class="btn-1" @click="$router.push('/borderList')">
                <Icon type="md-list" />
                购买记录
            </Button>
            <Button type="primary" class="btn-1" @click="充值()">
                充值
            </Button>
            <Button class="btn-1" @click="$router.push('/TransactionRecord')">
                充值记录
            </Button>
            <Button type="text" @click="更新用户信息()">
                余额：{{userInfo.balance | jine}}
                <Icon type="md-refresh" />
            </Button>
            
        </div>
        <div class="r">
            <!-- <Icon class="icon-1" type="md-search" /> -->
            <!-- <Icon class="icon-1" type="md-refresh" /> -->
            <!-- <Icon class="icon-1" type="md-cloud-done" /> -->
            <!-- <Icon class="icon-1" type="logo-twitch" /> -->
            <!-- <Icon class="icon-1" type="md-flower" /> -->
            <Poptip trigger="hover" placement="bottom-end" width="150">
                <div class="touxiang">
                    <img src="static/image/touxiang.png" alt="" srcset="">
                </div>
                <div class="分组列表2" slot="content">
                    <!-- <div>修改资料</div> -->
                    <div @click="修改密码=true">修改密码</div>
                    <div @click="退出()">安全退出</div>
                </div>
            </Poptip>
        </div>

        <Modal class="修改密码" title="修改密码" v-model="修改密码" width="500" :mask-closable="false">
            <Form ref="formValidate" :model="密码" :rules="ruleValidate" :label-width="80">
                <FormItem label="新密码" prop="password">
                    <Input type="password" password v-model="密码.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="password2">
                    <Input type="password" password  v-model="密码.password2" placeholder="请确认密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="footer-1">
                <Button @click="修改密码=false">取消</Button>
                <Button type="primary" @click="确定修改密码()">确定修改</Button>
            </div>
        </Modal> 

        
        <!-- 选机弹框 -->
        <gjtk ref="gjtk"/>


    </div>
</template>

<script>
import gjtk from '@/components/选机弹框.vue'
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    name: "",
    inject:['安装应用','显示充值'],
    components:{
        gjtk
    },
    data() {
        return {
            列表显示:true,
            修改密码:false,
            密码:{
                password:"",
                password2:""
            },
            ruleValidate:{
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                password2:[
                    { required: true, trigger: 'blur' ,
                        validator:(rule, value, callback) => {
                            if(!value){
                                return callback(new Error('请确认密码'));
                            }else if(value!=this.密码.password){
                                return callback(new Error('两次密码不一致'));
                            }else{
                                callback();
                            }
                        }
                    }
                ]
            }
        }
    },
    computed:{
       ...mapState({
            userInfo:'userInfo',
            分组:"分组",
            入款账户: "入款账户"
       })
    },
    filters: {
        jine(num) {
            return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num / 100)
        }
    },
    methods: {
        ...mapMutations({
            setItem:"setItem"
        }),
        ...mapActions({
            更新用户信息:"更新用户信息"
        }),
        充值(){
            if(this.入款账户.length==0){
                this.$Modal.warning({
                    title: '提示',
                    content: '商家未设置收款账号或获取入款账户失败，请稍后再试'
                });
                return
            }
            this.显示充值(true)
        },
        购买(){
            if(this.分组.length==0){
                this.$Modal.warning({
                    title: '提示',
                    content: '您还没有分组，请在右侧先添加分组'
                });
                return
            }
            this.$refs.gjtk.显示弹框=true
        },
        查看设备(type){
            this.列表显示 = type
            this.$router.push('/')
        },
        确定修改密码(){
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/auth/password',{"password": this.密码.password}).then(res => {
                        if(res.data.code===0){
                            this.正确('修改成功')
                            this.修改密码 = false
                        }else{
                            this.错误(res.data.message)
                        }
                    }).catch(err => {
                        this.错误('系统错误，稍后再试')
                    })
                } 
            })
        },
        退出(){
            this.setItem(['userInfo',{}])
            this.$router.push('/login')
        }
    },
    mounted() {
    },
}
</script>


<style lang="scss" scoped>
.header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.l {
    flex: 1;
    display: flex;
    align-items: center;
    .全选 {
        color: #1890ff;
        cursor: pointer;
        margin: 0px 15px 0px 0px;
    }
    .btn-1{
        margin: 0px 10px 0px 0px;
    }
    .分组列表{
        line-height: 30px;
        div{
            cursor: pointer;
            &:hover{
                color: #1890ff;
            }
        }
    }
}
.r{
    display: flex;
    align-items: center;
    .icon-1{
        cursor: pointer;
        font-size: 20px;
        margin: 0px 0px 0px 15px;
    }
}
.touxiang{
    display: flex;
    align-items: center;
    margin: 0px 0px 0px 15px;
    img{
        width: 30px;
    }
}
.分组列表2{
    text-align: center;
    line-height: 30px;
    div{
        cursor: pointer;
        &:hover{
            color: #2778ff;
        }
    }
}

.修改密码{
    .footer-1{
        text-align: center;
    }
}
</style>