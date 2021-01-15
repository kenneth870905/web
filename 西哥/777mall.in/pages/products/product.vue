<template>
	<view class="">
		<view class="status_bar"></view>
		<view class="product">
			<view class="sousuo">
				<input type="text" value="" placeholder="Search..."/>
				<image src="@/static/image/sousuo.png" mode="widthFix"></image>
			</view>
			
			<view class="box-4">
				<view class="item" v-for="item in data.product" @click="xiangqing(item)">
					<view class="img">
						<image :src="item.cover" mode="aspectFit"></image>
					</view>
					<view class="title-1">
						{{item.title}}
					</view>
					<view class="price">
						{{item.price}}
					</view>
				</view>
			</view>
		</view>
		
		<newTabber />
	</view>
</template>

<script>
	import newTabber from '@/components/azidingyi/newTabber.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			newTabber
		},
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				data:x=>x.data
			})
		},
		methods:{
			xiangqing(item){
				uni.navigateTo({
					url:"/pages/products/productDetails?id="+item.id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.product{
	padding:3vw 3vw 3vw;
}
.sousuo{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	border-radius: 1vw;
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	input{
		line-height:10vw;
		padding:0px 4vw;
		height: 38rpx*2;
	}
	image{
		width: 6vw;
		margin: 0px 2vw 0px 0px;
	}
}

.box-4{
	// margin: 0px auto 0px;
	padding-bottom: 80px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	.item{
		width: calc((100% - 3vw)/2);
		margin-top: 4vw;
		box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
		border-radius: 1vw;
		background: #fff;
	}
	.img{
		height: 44vw;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.title-1{
		margin: 2vw;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-align: center;
		font-size: 3.33vw;
	}
	.price{
		text-align: center;
		color: #f44336;
		margin-bottom: 2vw;
	}
}
</style>
