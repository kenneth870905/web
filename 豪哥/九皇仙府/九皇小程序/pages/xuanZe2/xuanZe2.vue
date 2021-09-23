<template>
	<view>
		<view class="header">
			<image src="/static/bg2.jpg" mode="aspectFill"></image>
			<view class="">
				{{title}}
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in UnitList" @click="xuanze(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				UnitList:[],
				id:""
			}
		},
		methods: {
			xuanze(item){
				uni.navigateTo({
					url:"/pages/xuanZe3/xuanZe3?id="+item.id+'&name='+item.name+'&yq='+this.title+'&yqid='+this.id
				})
			},
			getUnitList(id){
				this.$http('/unit',{park_id:id,page:1,size:1000},'get').then(x=>{
					console.log('查询单元',x)
					this.UnitList = x.data
				})
			}
		},
		onLoad(option) {
			console.log(option)
			// option.name = '测试',
			// option.id='5'
			
			this.id = option.id
			this.title = option.name
			this.getUnitList(option.id)
			uni.setNavigationBarTitle({ title: option.name })
		}
	}
</script>

<style lang="scss">
.header {
	position: relative;
	height: 480rpx;
	image{
		width: 100%;
		height: 100%;
		display: block;
	}
	view{
		width: 100%;
		top: 226rpx;
		left: 0px;
		right: 0px;
		margin: auto;
		position: absolute;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		color: #fff;
		font-family: cursive;
	}
}

.list{
	padding: 60rpx 0rpx 60rpx;
	view{
		width: 600rpx;
		margin: 0rpx auto 60rpx;
		text-align: center;
		line-height: 90rpx;
		color: #247cdc;
		border: 2rpx solid #247cdc;
		background: url("/static/bg1.png");
		background: rgba($color: #247cdc, $alpha: 0.1);
	}
}

</style>
