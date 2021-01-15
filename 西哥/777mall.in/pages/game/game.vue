<template>
	<view class="">
		<view class="status_bar"></view>
		
		<view class="game">
			<view class="box-1">
				<view class="qian">
					Available Balance：<text>{{userInfo.available}}</text>
				</view>
				<view class="ft">
					<view class="btn-1">Recharge</view>
					<view class="btn-2">Read Rule</view>
					<view class="icon-box">
						<uni-icons type="loop" color="#fff" size="25"></uni-icons>
					</view>
				</view>
			</view>

			<view class="box-2">
				<view class="tabs">
					<view class="active">Parity</view>
					<view class="">Sapre</view>
					<view class="">Bcone</view>
					<view class="">Emerd</view>
				</view>
				<view class="info">
					<view class="">
						<view class="title-1">Period</view>
						<view class="qihao">20210114409</view>
					</view>
					<view class="">
						<view class="title-1">Count Down</view>
						<view class="daojishi">
							<uni-countdown background-color="#eeeeee" :show-hour="false" :show-day="false" :minute="30" :second="0"></uni-countdown>
						</view>
					</view>
				</view>
			</view>

			<view class="box-3">
				<view class="btns">
					<view class="">Join Green</view>
					<view class="">Join Violet</view>
					<view class="">Join Red</view>
				</view>
				<view class="number">
					<view class="">0</view>
					<view class="">1</view>
					<view class="">2</view>
					<view class="">3</view>
					<view class="">4</view>
					<view class="">5</view>
					<view class="">6</view>
					<view class="">7</view>
					<view class="">8</view>
					<view class="">9</view>
				</view>
				<view class="btn-1">Submit</view>
			</view>

			<view class="box-4">
				<view class="title-1">
					<text>Parity Record</text>
				</view>
				<view class="list">
					<view class="">
						<view class="">Period</view>
						<view class="">Price</view>
						<view class="">Number</view>
						<view class="">Result</view>
					</view>
					<view class="" v-for="item in 15">
						<view class="">20210114420</view>
						<view class="">25411</view>
						<view class="">1</view>
						<view class="">
							<view class="yuan"></view>
							<view class="yuan"></view>
						</view>
					</view>
				</view>
				<uni-pagination class="fenye" show-icon="true" total="50" current="2"></uni-pagination>
			</view>

			<view class="box-5">
				<view class="title-1">My Parity Record</view>
				<view class="list">
					<view class="item" v-for="item in list">
						<view class="title-2" @click="item.open = !item.open">
							<text>20210113422</text>
							<uni-tag class="tag" text="标签" type="success" size="small"></uni-tag>
							<text class="red-text">+88.20</text>
							<text class="lv-text">+88.20</text>
							<view class="icon-box">
								<uni-icons type="arrowdown"></uni-icons>
							</view>
						</view>
						<view class="xiangqing" :class="{open:item.open}">
							<view>
								<view>Period</view>
								<view>20210113422</view>
							</view>
							<view>
								<view>Contract Money</view>
								<view>10.00</view>
							</view>
							<view>
								<view>Contract Count</view>
								<view>1</view>
							</view>
							<view>
								<view>Delivery</view>
								<view>9.80</view>
							</view>
							<view>
								<view>Fee</view>
								<view>0.20</view>
							</view>
							<view>
								<view>Open Price</view>
								<view>26261</view>
							</view>
							<view>
								<view>Result</view>
								<view> 1 <view class="yuan"></view></view>
							</view>
							<view class="select">
								<view>Parity Select</view>
								<view>1</view>
							</view>
							<view>
								<view>Status</view>
								<view>Success</view>
							</view>
							<view>
								<view>Reward</view>
								<view> +88.20 </view>
							</view>
							<view>
								<view>Create Time</view>
								<view>2021/1/13 下午11:35:24</view>
							</view>
							<view class="btn-1">
								<view>
									Pre Pay
								</view>
							</view>
						</view>
					</view>
				</view>
				<uni-pagination class="fenye" show-icon="true" total="50" current="1"></uni-pagination>
			</view>
		</view>
		
		<newTabber />
	</view>
</template>

<script>
	import newTabber from '@/components/azidingyi/newTabber.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			newTabber
		},
		computed: {
			...mapState({
				userInfo: x => x.userInfo
			})
		},
		data() {
			return {
				list:[{id:1,open:false},{id:2,open:false},{id:3,open:false}]
			};
		},

	}
</script>

<style lang="scss" scoped>
	.game {
		padding: 10px 10px 60px;
		font-size: 14px;
	}

	.box-1 {
		background: #009688;
		padding: 3vw;
		border-radius: 1vw;
		box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
		color: #fff;

		.qian {
			display: flex;
			align-items: center;
			padding: 12px 0px;

			text {
				font-size: 22px;
			}
		}

		.ft {
			display: flex;
			align-items: center;

			.btn-1,
			.btn-2 {
				width: 94px;
				line-height: 36px;
				text-align: center;
				margin: 0px 5px 0px 0px;
			}

			.btn-1 {
				background: #2196f3;
				color: #fff;
			}

			.btn-2 {
				background: #fff;
				color: #000;
			}

			.icon-box {
				flex: 1;
				text-align: right;
			}
		}
	}

	.box-2 {
		box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
		border-radius: 4px;
		overflow: hidden;
		margin: 10px 0px 0px;
		background: #fff;

		.tabs {
			display: flex;
			color: #fff;
			line-height: 48px;
			background: #009688;
			text-align: center;

			view {
				flex: 1;
			}

			.active {
				border-bottom: 2px solid red;
			}
		}

		.info {
			display: flex;
			padding: 10px;
			text-align: center;
			height: 124px;
			box-sizing: border-box;

			>view {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
			}

			.title-1 {
				color: #9e9e9e;
			}

			.qihao {
				font-size: 22px;
			}

			.daojishi {

				/deep/ uni-text:nth-child(1),
				/deep/ uni-text:nth-child(2) {
					display: none;
				}

				/deep/ uni-text {
					line-height: 38px;
					height: 38px;
					font-size: 25px;
				}

				/deep/ .uni-countdown__number {
					width: 38px;
				}
			}
		}
	}

	.box-3 {
		text-align: center;
		color: #fff;

		.btns {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;

			view {
				width: calc((100% - 6vw)/3);
				line-height: 36px;
				box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
			}

			view:nth-child(1) {
				background: #4caf50;
			}

			view:nth-child(2) {
				background: #673ab7;
			}

			view:nth-child(3) {
				background: #f44336;
			}
		}

		.number {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			view {
				width: calc((100% - 12vw)/5);
				line-height: 44px;
				margin: 15px 0px 0px;
				background: #2196f3;
			}
		}

		.btn-1 {
			background: #4caf50;
			line-height: 44px;
			margin: 15px 0px 0px;
		}
	}

	.box-4 {
		margin-top: 15px;

		.title-1 {
			height: 44px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #009688;
			color: #fff;
			font-size: 16px;

			image {
				margin: 0px 5px 0px 0px;
				width: 22px;
				height: 22px;
			}
		}

		.list {
			box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
			background: #fff;
			text-align: center;
			line-height: 44px;
			font-size: 13px;
			>view {
				padding: 0px 10px;
				display: flex;
				border-bottom: 1px solid #d6d6d6;

				>view {
					flex: 1;
				}
			}

			.yuan {
				width: 16px;
				height: 16px;
				border-radius: 100%;
				display: inline-block;
				background: red;
				margin: 0px 3px;
			}
		}

		.fenye {
			margin: 10px auto 0px;
			width: 50%;

			/deep/ .uni-pagination__btn {
				width: 30px;
				border-radius: 100%;
				background: #fff;
			}
		}
	}

	.box-5 {
		.title-1 {
			margin: 15px 0px 0px;
			background: #009688;
			color: #fff;
			line-height: 44px;
			text-align: center;
		}
		.list {
			background: #fff;
			box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
			.item{
				border-bottom: 1px solid #eee;
				padding: 0px 15px 0px;
			}
			.title-2{
				height: 44px;
				display: flex;
				align-items: center;
				.tag{
					margin: 0px 10px;
				}
				.icon-box{
					flex: 1;
					text-align: right;
				}
			}
			.xiangqing.open{
				height: 325px;
			}
			.xiangqing {
				height: 0px;
				transition: all 0.5s;
				padding: 0px 10px 0px;
				font-size: 12px;
				box-sizing: border-box;
				overflow: auto;
				>view:not(.btn-1){
					display: flex;
					padding: 5px 0px;
					>view{
						display: flex;
						align-items: center;
					}
					>view:nth-child(1){
						width: 124px;
						flex-shrink: 0;
					}
				}
				.yuan{
					width: 16px;
					height: 16px;
					border-radius: 100%;
					background: #4caf50;
					margin: 0px 0px 0px 10px;
				}
				.btn-1{
					margin-bottom: 10px;
					text-align: right;
					view{
						display: inline-block;
						width: 88px;
						line-height: 28px;
						text-align: center;
						color: #fff;
						font-size: 14px;
						background: #2196f3;
					}
				}
			}
			.red-text{
				color: #f44336;
			}
			.lv-text{
				color: #4caf50;
			}
		}
		.fenye {
			margin: 10px auto 0px;
			width: 50%;
		
			/deep/ .uni-pagination__btn {
				width: 30px;
				border-radius: 100%;
				background: #fff;
			}
		}
	}
	
</style>
