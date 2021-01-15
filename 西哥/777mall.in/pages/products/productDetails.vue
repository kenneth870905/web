<template>
	<view class="productDetails">
		<view class="img-1">
			<image :src="product.cover" mode="widthFix"></image>
		</view>
		<view class="title-1">
			{{product.title}}
		</view>
		<view class="jiage">
			<text>{{product.price}}</text>
			<text class="btn-1">Sold Out</text>
		</view>
		<view class="xiangqing">
			<view class="item">
				<view >
					Brand
				</view>
				<view class="">
					{{product.Brand}}
				</view>
			</view>
			<view class="item">
				<view>Stone</view>
				<view>{{product.Stone}}</view>
			</view>
			<view class="item">
				<view>Resizable</view>
				<view>{{product.Resizable}}</view>
			</view>
			<view class="item">
				<view class="">Material</view>
				<view class="">{{product.Material}}</view>
			</view>
			<view class="item">
				<view class="">Model Number</view>
				<view class="">{{product.ModelNumber}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				id:'',
				product:{}
			};
		},
		computed:{
			// ...mapGetters({
			// 	sp:"getproduct"
			// })
		},
		methods:{
			...mapGetters({
				getproduct:"getproduct"
			})
		},
		onLoad(o) {
			// console.log(o)
			this.id = o ? o.id : '' 
			// this.id = 8
			this.product = this.getproduct()(this.id)
			// console.log(this.getproduct()(this.id))
		}
	}
</script>

<style lang="scss" scoped>
	.productDetails{
		padding-bottom: 1px;
	}
.img-1{
	image{
		width: 100%;
	}
}
.title-1{
	font-size: 14rpx*2;
	width: 94vw;
	margin: 4vw auto 0px;
	background: #fff;
	border-radius: 1vw;
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	box-sizing: border-box;
	padding: 3vw;
}
.jiage{
	width: 94vw;
	margin: 4vw auto 0px;
	background: #fff;
	border-radius: 1vw;
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	padding: 3vw;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	color: #f39839;
	font-size: 4.4vw;
	// line-height: 4.4vw;
	.btn-1{
		width: 90rpx*2;
		background: #e6e6e6;
		color: rgba(0,0,0,.3);
		text-align: center;
		line-height: 36rpx*2;
		border-radius: 3px;
	}
}

.xiangqing{
	font-size: 14rpx*2;
	width: 94vw;
	margin: 4vw auto 4vw;
	background: #fff;
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	padding: 0 3vw;
	box-sizing: border-box;
	.item{
		width: 100%;
		height: 12vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		view:nth-child(1){
			width: 40vw;
		}
	}
}


</style>
