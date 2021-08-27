<template>
	<view>
		<uni-notice-bar text="说明: 请在下方输入对方昵称,搜索出结果请点击确认,如出现多人同名,无法确认,请联系管理员!"></uni-notice-bar>
		<mSearch placeholder="请输入对方昵称" @search="search"></mSearch>
		
		<view class="list" v-show="souSuoInit">
			<view class="title">
				搜索结果(点击确认)
			</view>
			<view class="item" @click="xuanzhong(item)" v-for="item in userList">
				<image class="touxiang" :src="item.avatarUrl" mode="aspectFill"></image>
				<text>{{item.nickName}}</text>
				<image v-show="item.active" class="isok" src="../../static/images/ok-08.png" mode="aspectFill"></image>
			</view>
			<view class="tishi" v-if="userList.length==0">
				没有相关找到相关用户
			</view>
		</view>
		<view class="box_1" v-show="user">
			<view class="title1">
				当前积分:{{loginInfo.credit}}
			</view>
			<input type="number" placeholder="请输入赠送积分" v-model="jinge"/>
			<button type="warn" @click="tijiao()">确定</button>
		</view>
	</view>
</template>

<script>
	// https://ext.dcloud.net.cn/plugin?id=94
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import {mapState} from 'vuex'
	export default {
		components: {
		        mSearch
		},
		computed:{
			...mapState({
				loginInfo:state=>state.loginInfo
			}),
			user(){
				return this.userList.find(x=>x.active) ? this.userList.find(x=>x.active) : ''
			}
		},
		data() {
			return {
				souSuoInit:false,	//是否搜索到用户
				userList:[],
				input2:"",
				jinge:0
			};
		},
		methods:{
			search(value){
				if(!value) return
				this.$http('/api/user/',{name:value}).then(x=>{
					console.log(x)
					if(x.code===0){
						var data = x.data
						data.forEach(item=>{
							item.active = false
						})
						this.userList = data
					}
					this.souSuoInit = true
				}).catch(err=>{
					this.souSuoInit = true
					console.log(err)
				})
			},
			xuanzhong(item){
				this.userList.forEach(x=>{
					x.active = false
				})
				item.active = true
			},
			tijiao(){
				if(!this.jinge){
					uni.showToast({
						title:'请输入积分',
						icon:'none'
					})
					return
				}else if(this.jinge>this.loginInfo.credit){
					uni.showToast({
						title:'积分不足',
						icon:'none'
					})
					return
				}
				var o = {"id": this.user.id, "credit":  parseInt(this.jinge)}
				uni.showLoading({
					mask:true
				})
				this.$http(`/api/user/${this.loginInfo.id}/transferCredit`,o,'POST').then(x=>{
					console.log(x)
					if(x.code===0){
						uni.showToast({
							title:'转让成功'
						})
					}else{
						uni.showToast({
							title:x.message,
							icon:'none'
						})
					}
					this.getUser()
					// uni.hideLoading()
				}).catch(err=>{
					uni.showToast({
						title:"赠送失败，稍后再试",
						icon:'none'
					})
					// uni.hideLoading()
				})
			},
			getUser(){
				this.$http(`/api/user/${this.loginInfo.id}`).then(res=>{
					this.loginInfo.credit = res.data.credit
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.list{
	margin: 10px 0px 0px;
	padding: 0px 10px;
	background: #fff;
	.title{
		padding: 5px 0px;
		border-bottom: 1px solid #eee;
	}
	.item{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding: 10px 20px 10px 0px;
		.touxiang{
			width: 50px;
			height: 50px;
			border-radius: 100%;
			margin: 0px 15px 0px 0px;
			border: 1px solid #828282;
		}
		text{
			flex: 1;
		}
		.isok{
			width: 40px;
			height: 40px;
		}
	}
	.tishi{
		line-height: 100px;
		text-align: center;
	}
}

.box_1{
	background: #fff;
	margin: 10px 0px 10px;
	padding: 1px 10px;
	.title1{
		padding: 5px 0px;
		color: red;
	}
	input{
		border-bottom: 1px solid #eee;
		padding: 3px 3px;
	}
	button{
		margin: 20px 0px 5px;
		height: 32px;
		line-height: 32px;
	}
}

</style>
