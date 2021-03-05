<template>
    <div class="个人中心">
        <el-form label-width="80px" class="form">
            <h4>个人资料</h4>
            <el-form-item label="头像">
                <div class="touxiang" @click="选择图片()">
                    <img :src="user2.headPortrait ? user2.headPortrait : 'static/image/头像.png'" alt="" srcset="">
                </div>
            </el-form-item>
            <el-form-item label="账号">
                <el-input size="small" :disabled="true" v-model="user2.account"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input size="small" v-model="user2.nickname"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input size="small" show-password v-model="user2.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input size="small" show-password v-model="user2.password1"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input size="small" v-model="user2.telephone"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input size="small" :disabled="true" v-model="user2.creationTime"></el-input>
            </el-form-item>
            
            <el-button @click="tijiao()" class="tijiao" size="small" type="warning" round>保存</el-button>
        </el-form>
        <!-- <el-form label-width="80px" class="form"> 
            <h4>Google 秘钥</h4>
            <el-form-item label="账号">
                <el-input size="small" :disabled="true" :value="user2.GooglePassword"></el-input>
            </el-form-item>
            <div class="erweima">
                <img :src="erweima" alt="" srcset="">
            </div>
            <el-button @click="更换秘钥()" class="tijiao" size="small" type="warning" round>更换秘钥</el-button>
        </el-form> -->

        <input class="file" @change="fileChange()" type="file" ref="file" accept="image/*">
    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations } from 'vuex';
    export default {
        name: "",
        data() {
            return {
                user2:{
                }
            }
        },
        computed: {
            ...mapState({
                user:x=>x.user2.user
            }),
            erweima(){
                return `https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2F${this.user2.account}%3Fsecret%3D${this.user2.GooglePassword}&size=200x200&ecc=M`
            }
        },
        methods: {
            ...mapMutations({
                设置state:"user2/设置state"
            }),
            选择图片(){
                console.log('选择图片')
                this.$refs.file.click()
            },
            fileChange(){
                var file = this.$refs.file.files[0]
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e)=>{
                    this.user2.headPortrait = e.target.result
                };
            },
            tijiao(){
                
                if(this.user2.password){
                    if(this.user2.password!=this.user2.password1){
                        this.$message({ showClose: true, message: '两次密码不一致', type: 'error' });
                        return
                    }
                }
                this.$Loading(true);
                this.$axios.post('/huobi/public/index.php/user/modify',this.user2).then(x=>{
                    if(x.data.code==1){
                        this.$message({ showClose: true, message: '修改成功', type: 'success' });
                        this.设置state(['user',x.data.user])
                    }else{
                        this.$message({ showClose: true, message: x.data.message, type: 'error' });
                    }
                    this.$Loading(false);
                }).catch(err=>{
                    this.$message({ showClose: true, message: '系统错误，稍后再试', type: 'error' });
                    this.$Loading(false);
                })
            },
            更换秘钥(){
                this.$Loading(true)
                this.$axios.post('/huobi/public/index.php/google/getSecret').then(x=>{
                    this.user2.GooglePassword = x.data.secret
                    this.$axios.post('/huobi/public/index.php/user/modify',{GooglePassword:this.user2.GooglePassword}).then(y=>{
                        this.设置state(['user',y.data.user])
                        this.$Loading(false)
                    })
                }).catch(err=>{
                    this.$Loading(false)
                })
            }
        },
        mounted() {
            let user2 = Object.assign({},this.user)
                user2.password = '';
                user2.password1 = ''
            this.user2 = user2    
        },
    }
</script>

<style lang="scss" scoped>
.个人中心{
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: baseline;
}
h4{
    text-align: center;
}
.form{
    width: 400px;
    margin:0px 10px;
    border-radius: 5px;
    border: 1px solid #949494;
    padding: 20px;
}
/deep/ .tijiao{
    width: 100%;
}
.touxiang{
    cursor: pointer;
    width: 64px;
    height: 64px;
    background: #fff;
    border-radius: 100%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }
}
.erweima{
    width: 150px;
    height: 150px;
    margin: 0px auto 20px;
    img{
        width: 100%;
    }
}
.file{
    display: none;
}
/deep/ .el-input.is-disabled .el-input__inner{
    color: #000;
}
</style>