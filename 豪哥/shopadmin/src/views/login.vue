<template>
    <div class="login" style="background-image: url('static/image/tuqtttthrx.png');">
		<el-form :model="form" :rules="rules" ref="ruleForm"  class="form" @submit.native.prevent>
			<div class="title1">小程序电商系统</div>
			<el-form-item label="" prop="name">
				<el-input v-model="form.name" placeholder="请输入账号">
					<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
				</el-input>
			</el-form-item>
			<el-form-item label="" prop="password">
				<el-input type="password" auto-complete="new-password" v-model="form.password" placeholder="请输入密码">
					<i slot="prefix" class="el-input__icon el-icon-lock"></i>
				</el-input>
				<input type="password" style="display:none">
			</el-form-item>
			<el-form-item label="">
				<el-button native-type="submit" class="btn-1" type="primary" @click="onSubmit()">登陆</el-button>
			</el-form-item>
		</el-form>
    </div>
</template>


<script>
import { mapMutations } from 'vuex'
export default {
	data() {
		return {
			form:{
				name:"",
				password:""
			},
			rules:{
				name: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
				],
				password:[
					{ required: true, message: '请输密码', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		...mapMutations({
			setItem:'setItem'
		}),
		onSubmit(){
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					this.login()
				} else {
					return false;
				}
			})
		},
		login(){
			this.$loading(1)
			this.$axios.post('/api/auth/loginadmin',this.form).then(res => {
				if(res.code==0){
					this.setItem(['loginInfo',res.data])
					this.$router.push('/')
				}else{
					this.$message({ showClose: true, message: res.message, type: 'error'});
				}
				this.$loading()
			}).catch(err => {
				this.$loading()
				this.$message({ showClose: true, message: '网络错误，稍后再试', type: 'error'});
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.login{
	height: 100%;
	background-size:cover ;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
}
.title1{
	font-size: 26px;
	text-align: center;
	margin: 0px 0px 10px;
}
.form{
	padding: 20px 20px 1px;
	background: rgba(255,255,255,0.9);
	width: 350px;
}
.btn-1{
	width: 100%;
}
</style>