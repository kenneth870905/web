<template>
	<view class="padding10">
		<view class="box-1 shadow">
			Balance：1000.00
		</view>
		
		<view class="box-2 shadow">
			<icon type="icon iconfont iconqiandai"></icon>
			<input type="text" v-model="num" placeholder="Enter or Select recharge amount"/>
		</view>
		
		<view class="box-3">
			<text v-for="item in list" :class="{active:num==item}">{{item}}</text>
		</view>
		
		<!-- <easy-select :options="bounsArr" ref="easySelect" size="medium" v-model="bouns_date" @selectOne="selectOne"></easy-select> -->
		
		<view class="box-4">
			<view class="t1">bonus</view>
			<azidingyiSelect :options="bounsArr" v-model="bouns_date">
				<view slot="header" class="btn-1">
					<uni-icons class="icon" type="checkmarkempty"></uni-icons>
					{{bouns_date.label}}
				</view>
			</azidingyiSelect>
		</view>
		
		<view class="box-4">
			<view class="t1">Payment</view>
			<!-- <azidingyiSelect :options="bounsArr" v-model="bouns_date"> -->
			<view class="btn-1 jinyong">
				<uni-icons class="icon" type="checkmarkempty"></uni-icons>
				Cashfree 
			</view>
			<!-- </azidingyiSelect> -->
		</view>
		
		<view class="btn-2" @click="提交()">
			Recharge
		</view>
		
		
		<view class="message">
			<view class="">
				 Reminder: If you still do not receive the account within 30 minutes after payment, please send it by email. Please provide the detailed voucher for recharge and the mall ID to contact us. Or contact your supervisor. 
			</view>
			<view class="">
				 Tip: If you have any questions about the order or payment failure, please contact 
				 <uni-link color="rgb(0, 0, 255)" :showUnderLine="false" href="www.baidu.com" text="777mall.in@gmail.com"></uni-link>
				 . We will reply as soon as possible within 2 hours. 
			</view>
		</view>
		
		
	</view>
</template>

<script>
	// 充值
	export default {
		data() {
			return {
				list:[100,200,300,500,1000,2000,5000,10000,50000,100000],
				num:100,
				bounsArr:[
					{
						value:"0",
						label:"none"
					},
					{
						value:1,
						label:"Recharge Bonus Rate 10 %"
					},{
						value:2,
						label:"Recharge Bonus Rate 15 %"
					},{
						value:3,
						label:"Recharge Bonus Rate 20 %"
					},
				],
				bouns_date:{
						value:"0",
						label:"none"
					},
				
				
			};
		},
		methods:{
			 selectOne(options) {
				 console.log(options)
				this.bouns_date = options.label
			},
			提交(){
				uni.showModal({
					// title:'提示',
					content:"The recharge amount does not meet the minimum requirements",
					showCancel:false,
					confirmText:'Confirm',
					success:()=>{
						console.log(123)
					}
				})
			}
		},
		//自定义标题按钮点击事件
		onNavigationBarButtonTap(e) {
			console.log(e)
			uni.navigateTo({
				url:"/pages/my/RechargeRecord"
			})
		}
	}
</script>

<style lang="scss" scoped>
.box-1{
	text-align: center;
	line-height: 84px;
	font-size: 26px;
	background: #fff;
}
.box-2{
	display: flex;
	background: #fff;
	align-items: center;
	height: 56px;
	padding: 0px 10px;
	margin: 35px 0px 0px;
	icon{
		margin: 0px 15px 0px 0px;
		color: #bdbdbd;
	}
}

.box-3{
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	line-height: 44px;
	justify-content: center;
	margin: 20px 0px 0px;
	text{
		margin: 7px 0px;
		width: calc((100% - 20rpx * 2 )/3);
		background: #fff;
		@include shadow;
		&.active{
			background: #2196f3;
			color: #fff;
		}
	}
	text:nth-child(3n-1){
		margin-left: 10rpx*2;
		margin-right: 10rpx*2;
	}
}

.box-4{
	margin-top: 20px;
	.t1{
		font-size: 12px;
		color: #9e9e9e;
		margin-bottom: 5px;
	}
	.btn-1{
		&.jinyong{
			background: #e6e6e6;
		}
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 0px 10px;
		box-sizing: border-box;
		.icon{
			font-size: 40px;
		}
	}
}

.btn-2{
	line-height: 44px;
	text-align: center;
	color: #fff;
	background: #009688;
	margin-top: 20px;
}

.message{
	margin: 10px 0px;
	color: #999;
	view{
		margin: 0px 0px 10px;
	}
	uni-link{
	}
}

</style>
