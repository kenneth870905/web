<template>
	<view class="container"> 
		<view class="header">
			<view class="">￥46,800.00元</view>
			<view class="">（本区价格，以实际为准）</view>
		</view>
		
		<movable-area class="movable-box">
			<movable-view class="list-movable" @change="tuodong" @scale="scale" direction="all" :inertia="true"  :out-of-bounds="true" :scale="true">
				<view class="title-1" :style="{left:x+'px' }">
					<view class="" v-for="item in 20">
						{{item}}
						三十五
					</view>
				</view>
				<view class="list">
					<view class="item" v-for="item in 20">
						<view class="" v-for="item2 in 20">
							{{item2}}
						</view>
					</view>
				</view>
			</movable-view>
		</movable-area>
			
		
		<view class="footer">
			<view class="yixuan">
				<view class="">
					已选
				</view>
				<view class="list-2">
					<view class="item" v-for="item in 10">
						二十五排-5号
					</view>
				</view>
			</view>
			
			<view class="types">
				<view class="item">
					<view class="kexuan"></view>
					可选
				</view>
				<view class="item">
					<view class="yuding"></view>
					预定
				</view>
				<view class="item">
					<view class="yifudingjin"></view>
					已付定金
				</view>
				<view class="item">
					<view class="piliangmaichu"></view>
					批量卖出
				</view>
				<view class="item">
					<view class="yimaichu"></view>
					已卖出
				</view>
			</view>
			
			<button type="default">提交预定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				width:0,
				x:5,
				tuodongValue:{},
				scaleValue:{
					scale:1
				}
			};
		},
		methods:{
			tuodong(e){
				console.log(e)
				if(this.scaleValue.scale>=1){
					this.x= 5 + Math.abs(e.detail.x / this.scaleValue.scale)
				}else{
					this.x= 5
				}
				this.tuodongValue=e.detail
			},
			scale(e){
				if(this.scaleValue.scale>=1){
					this.x= 5 + Math.abs(e.detail.x / e.detail.scale ) 
				}else{
					this.x= 5
				}
				
				this.scaleValue=e.detail
			}
		},
		onLoad() {
			// 假如每行20个
			
		}
	}
</script>

<style lang="scss">
.container{
	height: 100vh;
	display: flex;
	flex-direction: column;
}



.header{
	padding: 20rpx 0rpx;
	text-align: center;
	view:nth-child(1){
		color: #ff5951;
		font-size: 48rpx;
	}
	view:nth-child(2){
		font-size: 24rpx;
		color: rgba($color: #000000, $alpha: 0.4);
	}
}

.movable-box{
	flex: 1;
	margin: 0rpx 0rpx 20rpx;
	width: 100%;
	overflow: hidden;
}
.list-movable{
	// border: 2rpx solid red;
	// width: 100%;
	width: max-content;
	min-width: 100%;
	height: auto;
	display: flex;
}
.title-1{
	margin: 30rpx 0rpx;
	padding: 0rpx 4rpx;
	border-radius: 16rpx;
	position: sticky;
	// 上面写了这里不需要
	// left: 20rpx;
	transition: all 0.1s; 
	background: rgba($color: #000000, $alpha: 0.4);
	text-align: center;
	font-size: 24rpx;
	color: #fff;
	min-width: 60rpx;
	view{
		// width: 60rpx;
		line-height: 60rpx;
		white-space: nowrap;
		margin: 10rpx 0rpx;
	}
}
.list{
	padding: 30rpx;
	.item{
		display: flex;
		margin: 10rpx 0rpx;
		view{
			width: 60rpx;
			height: 60rpx;
			margin: 0rpx 2rpx;
			border-radius: 8rpx 8rpx 0rpx 0rpx;
			background: #e5e5e5;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.kexuan{
			background: #e5e5e5;
		}
		.yuding{
			background:#86e4a8 ;
		}
		.piliangmaichu{
			background: #f3e08c;
		}
		.yifudingjin{
			background: #82c0e1;
		}
		.yimaichu{
			background: #f47171;
		}
	}
}



@mixin fangxing {
	height: 30rpx;
	width: 30rpx;
}
.kexuan{
	@include fangxing;
	background: #e5e5e5;
}
.yuding{
	@include fangxing;
	background:#86e4a8 ;
}
.piliangmaichu{
	@include fangxing;
	background: #f3e08c;
}
.yifudingjin{
	@include fangxing;
	background: #82c0e1;
}
.yimaichu{
	@include fangxing;
	background: #f47171;
}
.footer{
	flex-shrink: 0;
	padding: 20rpx;
	button{
		// width: 90vw;
		margin: 30rpx auto 0rpx;
		font-size: 32rpx;
		line-height: 72rpx;
		border-radius: 72rpx;
		background: #247cdc;
		color: #fff;
		border: none;
	}
}
.types{
	display: flex;
	justify-content: space-evenly;
	.item{
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}
}

.yixuan{
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	font-size: 24rpx;
	margin: 0rpx 0rpx 20rpx;
	.list-2{
		display: flex;
		overflow: auto;
		width: 0;
		flex-grow: 1;
		margin: 0rpx 0rpx 0rpx 10rpx;
	}
	.item{
		white-space: nowrap;
		padding: 10rpx;
		border: 2rpx solid #dadada;
		margin: 0rpx 10rpx;
	}
}

</style>
