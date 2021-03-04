<template>
	<view class="padding10">
		<!-- <view class="list">
			<view class="item" v-for="item in list">
				<view class="">
					<text>{{item.accountname}}</text>
					<text>{{item.bankname}}</text>
				</view>
				<view class="">{{item.upi}}</view>
			</view>
		</view> -->
		<view class="title-1">Swipe left to delete</view>
		<uni-swipe-action class="list">
			<uni-swipe-action-item :options="options" @click="bindClick(item,index)"  v-for="(item,index) in list" class="item1">
				<view class="item">
					<view class="">
						<text>{{item.accountname}}</text>
						<text>{{item.bankname}}</text>
					</view>
					<view class="">{{item.upi}}</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<Anodate v-if="!loading && list.length==0"></Anodate>
		<view class="btn-1" @click="card()">Add Bank Card</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				loading:true,
				options:[
					{
						text: 'Delete',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		methods:{
			card(){
				uni.navigateTo({
					url:"/pages/card/card"
				})
			},
			bindClick(item,index){
				console.log(item,index)
				uni.showModal({
					title:'prompt',
					content:"Sure to delete this bank card？",
					cancelText:"Cancel",
					confirmText:"Confirm",
					success:(r)=>{
						if(r.confirm){
							this.$http('/CardDel',{id:item.id}).then(x=>{
								if(x.result){
									uni.showToast({
										title:'Set successfully'
									})
									this.获取卡列表()
								}else{
									uni.showToast({
										title:x.msg,
										icon:'none'
									})
								}
							}).catch(err=>{
								uni.showToast({ title:'Error, try again later', icon:'none' })
							})
						}
					}
				})
			},
			获取卡列表(){
				this.$http('/CardList','').then(x=>{
					console.log(x)
					if(x.result){
						this.list = x.data
					}
					this.loading=false
				}).catch(err=>{
					this.loading=false
				})
			}
		},
		mounted() {
			// this.获取卡列表()
		},
		onShow() {
			this.获取卡列表()
		}
	}
</script>

<style lang="scss" scoped>
	.title-1{
		color: rgba($color: #000000, $alpha: 0.6);
		margin: 0px 0px 10px;
	}
.list{
	.item1{
		margin-bottom: 10px;
	}
	.item{
		flex: 1;
		background: #009688;
		padding: 12px;
		// margin: 0px 0px 10px;
		border-radius: 5px;
		color: #fff;
		>view:nth-child(1){
			display: flex;
			justify-content: space-between;
		}
		>view:nth-child(2){
			text-align: right;
			margin-top: 10px;
			font-size: 16px;
		}
	}
}

.btn-1{
	background: var(--color);
	color: #fff;
	line-height: 44px;
	text-align: center;
	margin: 50px 0px 20px;
}

</style>
