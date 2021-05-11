<template>
	<view class="fankui">
		<view class="title-2" @click="查看记录()">
			<text>反馈记录</text>
			<i class="icon iconfont iconarrow-right"></i>
		</view>
		<view class="title-1">
			请选择类型
		</view>
		<radio-group class="radio-group" name="gender" v-model="fankui.title"  @change="radioChange">
			<label>
				<radio checked value="产品功能问题反馈" /><text>产品功能问题反馈</text>
			</label>
			<label>
				<radio value="建议及意见反馈" /><text>建议及意见反馈</text>
			</label>
			<label>
				<radio value="投诉及其他问题" /><text>投诉及其他问题</text>
			</label>
		</radio-group>
		<view class="title-1">
			相关描述
		</view>
		<view class="textarea">
			<textarea v-model="fankui.content" value="" placeholder="客官~您对我们的服务哈满意慢,请给予我们你的意见,我们将做的更好~" />
		</view>
		
		<view class="btn-1">
			<button @click="tijiao()" type="default">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fankui:{
					title: "产品功能问题反馈",
					content: "",
					reply:""
				}
			};
		},
		methods:{
			radioChange(e){
				this.fankui.title = e.detail.value
			},
			tijiao(){
				if(!this.fankui.content){
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
					return
				}
				this.$http('/api/advice',this.fankui,'POST').then(x=>{
					if(x.code===0){
						uni.showToast({
							title:'提交成功'
						})
						this.fankui.content = ''
					}else{
						uni.showToast({
							title:x.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'提交失败，请联系管理员',
						icon:'none'
					})
				})
			},
			查看记录(){
				uni.navigateTo({
					url:'/pages/fankui/fankuiList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.title-2{
	padding: 0px 10px;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	height: 38px;
	margin-bottom: 10px;
}
.title-1{
	line-height: 38px;
	background: #fff;
	padding: 0px 10px;
	font-weight:bold;
	font-size: 15px;
}
radio-group{
	padding: 0px 10px;
	background: #fff;
	font-size: 14px;
	label{
		height: 35px;
		display: flex;
		align-items: center;
	}
	radio{
		zoom: 0.8;
	}
}

.textarea{
	padding: 10px 10px ;
	background: #fff;
	textarea{
		background: #f9fafc;
		width: 100%;
		padding: 5px;
		box-sizing: border-box;
	}
}

.btn-1{
	position: fixed;
	outline-offset: 0px;
	bottom: 0px;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
	button{
		line-height: 35px;
		border-radius: 35px;
		background: #ecc47c;
		font-size: 14px;
		color: #fff;
		&::after{
			display: none;
		}
	}
}

</style>
