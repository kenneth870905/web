<template>
	<view class="address">
		<view class="item" v-for="item in list">
			<view class="name-1">
				{{item.name[0]}}
			</view>
			<view class="xiangqing" @click="选择地址(item)">
				<view class="">
					<text>{{item.name}}</text>
					<text class="phone">{{item.telephone}}</text>
				</view>
				<view class="dizhi">
					{{item.address}}
				</view>
			</view>
			<view class="btn-1" @click="地址详情(item)">
				编辑
			</view>
		</view>
		<view class="add-btn">
			<button type="default" @click="地址详情()">新增收货地址</button>
		</view>
	</view>
</template>

<script>
	import { mapState , mapMutations } from 'vuex'
	export default {
		data() {
			return {
				list:[]
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo
			})
		},
		methods:{
			...mapMutations({
				setItem:'setItem'
			}),
			选择地址(item){
				this.setItem(['选择收货地址',item])
				var pages = getCurrentPages()
				if(pages[pages.length-2].route=="pages/myOrder/quRenOrder"){
					uni.navigateBack()
				}
			},
			地址详情(item){
				uni.navigateTo({
					url:'/pages/address/addressDetails'+(item ? `?id=${item.id}` : '' )
				})
			},
			获取地址(){
				this.$http(`/api/user/${this.loginInfo.id}/address`).then(x=>{
					if(x.code===0)
					this.list = x.data
				}).catch(err=>{})
			}
		},
		mounted() {
		},
		onShow() {
			this.获取地址()
		}
	}
</script>

<style lang="scss">
.address{
	padding-bottom: 80px;
}

.item{
	background: #fff;
	border-bottom: 1px solid #f5f5f5;
	padding: 5px 55px 5px 10px ;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	position: relative;
	.name-1{
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #fff;
		border-radius: 100%;
		background: #b2b3b5;
		font-size: 14px;
		margin: 0px 10px 0px 0px;
	}
	.xiangqing{
		flex: 1;
		.phone{
			color: #acacac;
			margin: 0px 0px 0px 10px;
			font-size: 10px;
		}
		.dizhi{
			margin: 3px 0px 0px 0px;
			font-size: 12px;
		}
	}
	.btn-1{
		width: 50px;
		position: absolute;
		top: 10px;
		right: 0px;
		height: calc(100% - 20px);
		border-left: 1px solid #f5f5f5;
		display:flex;
		align-items: center;
		justify-content: center;
		color: #b2b2b2;
	}
}


.add-btn{
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 100%;
	padding: 5px;
	background: #fff;
	box-sizing: border-box;
	button{
		background: #cf4101;
		color: #fff;
		height: 34px;
		line-height: 34px;
		border-radius: 34px;
		font-size: 14px;
	}
}
</style>
