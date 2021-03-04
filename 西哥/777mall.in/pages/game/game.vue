<template>
	<view class="" >
		<view class="status_bar"></view>
		
		<view class="game">
			<view class="box-1">
				<view class="qian">
					Available Balance：<text>{{userInfo.Amount}}</text>
				</view>
				<view class="ft">
					<view class="btn-1" @click="cunKuan()">Recharge</view>
					<view class="btn-2" @click="openGuiZe()">Read Rule</view>
					<view class="icon-box" @click="获取用户()">
						<uni-icons type="loop" color="#fff" size="25"></uni-icons>
					</view>
				</view>
			</view>

			<view class="box-2">
				<view class="tabs">
					<view :class="{active:id==10001}" @click="changeGame(10001)">Parity</view>
					<view :class="{active:id==10002}" @click="changeGame(10002)">Sapre</view>
					<view :class="{active:id==10003}" @click="changeGame(10003)">Bcone</view>
					<view :class="{active:id==10004}" @click="changeGame(10004)">Emerd</view>
				</view>
				<view class="info">
					<view class="">
						<view class="title-1">Period</view>
						<view class="qihao">{{即将开奖.period}}</view>
					</view>
					<view class="">
						<view class="title-1">Count Down</view>
						<view class="daojishi">
							<uni-countdown background-color="#eeeeee" :show-hour="false" :show-day="false" :second="倒计时" @timeup="timeup"></uni-countdown>
						</view>
					</view>
				</view>
			</view>

			<view class="box-3">
				<view class="btns">
					<!-- <view :class="{active:method=='g'}" @click="method='g'">Join Green</view>
					<view :class="{active:method=='v'}" @click="method='v'">Join Violet</view>
					<view :class="{active:method=='r'}" @click="method='r'">Join Red</view> -->
					
					<view :class="{active:选中号码.find(x=>x=='Green')}" @click="选号('Green')">Join Green</view>
					<view :class="{active:选中号码.find(x=>x=='Violet')}" @click="选号('Violet')">Join Violet</view>
					<view :class="{active:选中号码.find(x=>x=='Red')}" @click="选号('Red')">Join Red</view>
				</view>
				<view class="number">
					<view :class="{active:选中号码.find(x=>x=='0')}" @click="选号('0')">0</view>
					<view :class="{active:选中号码.find(x=>x==1)}" @click="选号(1)">1</view>
					<view :class="{active:选中号码.find(x=>x==2)}" @click="选号(2)">2</view>
					<view :class="{active:选中号码.find(x=>x==3)}" @click="选号(3)">3</view>
					<view :class="{active:选中号码.find(x=>x==4)}" @click="选号(4)">4</view>
					<view :class="{active:选中号码.find(x=>x==5)}" @click="选号(5)">5</view>
					<view :class="{active:选中号码.find(x=>x==6)}" @click="选号(6)">6</view>
					<view :class="{active:选中号码.find(x=>x==7)}" @click="选号(7)">7</view>
					<view :class="{active:选中号码.find(x=>x==8)}" @click="选号(8)">8</view>
					<view :class="{active:选中号码.find(x=>x==9)}" @click="选号(9)">9</view>
				</view>
				<view class="btn-1" @click="购买()">Submit</view>
			</view>

			<view class="box-4">
				<view class="title-1">
					<text v-if="id==10001">Parity</text>
					<text v-if="id==10002">Sapre</text>
					<text v-if="id==10003">Bcone</text>
					<text v-if="id==10004">Emerd</text>
					<text>Record</text>
				</view>
				<view class="list">
					<view class="">
						<view class="">Period</view>
						<view class="">Number</view>
						<view class="">Result</view>
					</view>
					<view class="" v-for="item in 开奖记录.list">
						<view class="">{{item.period}}</view>
						<view class="">{{item.result}}</view>
						<view class="">
							<!-- // 1 3 7 9是绿
							// 2 4 6 8 是 红
							// 0是红紫 5是绿紫 -->
							<!-- 绿 -->
							<view class="yuan Green" v-if="[1,3,7,9,5].findIndex(x=>x==item.result)!=-1"></view>
							<!-- 红 -->
							<view class="yuan Red" v-if="[2,4,6,8,0].findIndex(x=>x==item.result)!=-1"></view>
							<!-- 紫 -->
							<view class="yuan Violet" v-if="[0,5].findIndex(x=>x==item.result)!=-1"></view>
						</view>
					</view>
				</view>
				<uni-pagination class="fenye" show-icon="true" total="50" current="2"></uni-pagination>
			</view>

			<view class="box-5">
				<view class="title-1">My Record</view>
				<view class="list">
					<view class="item" v-for="item in 购买记录.list">
						<view class="title-2" @click="item.open = !item.open">
							<text class="name">
								<text v-if="item.gid==10001">Parity</text>
								<text v-if="item.gid==10002">Sapre</text>
								<text v-if="item.gid==10003">Bcone</text>
								<text v-if="item.gid==10004">Emerd</text>
							</text>
							<text class="period">{{item.period}}</text>
							<!-- <uni-tag class="tag" text="标签" type="success" size="small"></uni-tag> -->
							<text class="red-text">+88.20</text>
							<text class="lv-text">+88.20</text>
							<view class="icon-box">
								<uni-icons type="arrowdown"></uni-icons>
							</view>
						</view>
						<view class="xiangqing" :class="{open:item.open}">
							<view>
								<view>Period</view>
								<view>{{item.period}}</view>
							</view>
							<view>
								<view>Contract Money</view>
								<view>{{item.amount}}</view>
							</view>
							<!-- <view>
								<view>Delivery</view>
								<view>9.80</view>
							</view> -->
							<view>
								<view>odds</view>
								<view>{{item.odds}}</view>
							</view>
							<!-- <view>
								<view>Open Price</view>
								<view>26261</view>
							</view> -->
							<view class="select">
								<view>Buy</view>
								<view>
									<text v-if="item.method==1">{{item.content}}</text>
									<text v-if="item.method==2">
										<text v-if="item.content=='g'">Green</text>
										<text v-if="item.content=='v'">Violet</text>
										<text v-if="item.content=='r'">Red</text>
									</text>
								</view>
							</view>
							<view>
								<view>Result</view>
								<view>
									开奖号码
									<view class="yuan"></view>
								</view>
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
								<view>{{item.created_at}}</view>
							</view>
							<!-- <view class="btn-1">
								<view>
									Pre Pay
								</view>
							</view> -->
						</view>
					</view>
				</view>
				<uni-pagination class="fenye" show-icon="true" @change="fenye2" :pageSize="购买记录.query.size" :total="购买记录.total" :current="购买记录.query.page"></uni-pagination>
			</view>
		</view>
		
		<uni-popup ref="popup" type="center">
			<view class="guize">
				<view class="title-1">
					Rule of Guess
				</view>
				<view class="cont">
					<div data-v-573f1a04="" class="rule-box"><p data-v-573f1a04=""> 3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues </p><p data-v-573f1a04=""> If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98: </p><p data-v-573f1a04=""> 1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196 </p><p data-v-573f1a04="">If the result shows 5, you will get (98*1.5) 147</p><p data-v-573f1a04=""> 2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get (98*1.5) 147 </p><p data-v-573f1a04=""> 3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441 </p><p data-v-573f1a04=""> 4. SELECT NUMBER: if the result is the same as the number you selected, you will get (98*9) 882 </p></div>
				</view>
				<view class="fot" @click="$refs.popup.close()">
					Close
				</view>
			</view>
		</uni-popup>
		
		<!-- 订单确认 -->
		<uni-popup type="center" ref="OrderConfirm" :maskClick="false">
			<view class="OrderConfirm">
				<view class="title-1">Order Confirm</view>
				<view class="content">
					<view>Selected number:</view>
					<view class="list-1">
						<text :class="item" v-for="item in 选中号码">{{item}}</text>
					</view>
					<view>Amount per bet:</view>
					<view class="list-2">
						<text :class="{active:单注金额==10}" @click="单注金额=10">10.00</text>
						<text :class="{active:单注金额==100}" @click="单注金额=100">100.00</text>
						<text :class="{active:单注金额==1000}" @click="单注金额=1000">1000.00</text>
						<text :class="{active:单注金额==10000}" @click="单注金额=10000">10000.00</text>
					</view>
					<view>Number of bets:</view>
					<input class="input-1" type="number" v-model="注数" @blur="blur1()"/>
					<view class="zongjine">Total contract money is <text>{{总金额}}</text> </view>
				</view>
				<view class="foot">
					<text @click="$refs.OrderConfirm.close()">Cancel</text>
					<text @click="确认购买()">Confirm</text>
				</view>
			</view>
		</uni-popup>
		
		
		<newTabber />
	</view>
</template>

<script>
	import newTabber from '@/components/azidingyi/newTabber.vue'
	import { mapState , mapMutations } from 'vuex'
	export default {
		components: {
			newTabber
		},
		data() {
			return {
				id:10001, //10001-10004 Parity Sapre Bcone Emerd
				即将开奖:{},
				倒计时:0,	//秒
				开奖记录:{
					loading:true,
					list:[],
					query:{
						gid:"",
						size:10,
						page:1
					}
				},
				time1:"",	//倒计时用
				// method:"g", //玩法 g r v 
				选中号码:[],
				单注金额:10,
				注数:1,
				购买记录:{
					query:{
						page:1,
						size:10
					},
					list:[],
					total:-1,
					loading:false
				},
				
			};
		},
		computed: {
			...mapState({
				userInfo: x => x.userInfo
			}),
			总金额(){
				if(!this.注数){
					return 0.00
				}
				let n = Math.abs(parseInt(this.注数))  * this.选中号码.length * this.单注金额
				return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n)
			}
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			blur1(){
				if(!this.注数){
					this.注数 = 1
				}else{
					this.注数 = Math.abs( parseInt(this.注数) )
				}
			},
			获取用户(){
				this.$http('/UserInfo','').then(x=>{
					if(x.result && x.data){
						this.setItem(['userInfo',x.data])
					}
				}).catch(err=>{
				})
			},
			确认购买(){
				let o = {
					gameid:this.id,
					period:this.即将开奖.period,
					order:[]
				}
				let name = {
					Green:'g',
					Violet:'v',
					Red:'r'
				}
				this.选中号码.forEach(x=>{
					o.order.push({
						amount:this.单注金额*this.注数,
						method: name[x] ? 2 : 1 ,
						content: name[x] ? name[x] : x 
					})
				})
				this.$refs.OrderConfirm.close()
				this.$http('/Game/Buy',o).then(res=>{
					if(res.result){
						uni.showToast({ title:'Successful purchase'})
						this.获取购买记录()
					}else{
						uni.showToast({ title:res.msg, icon:'none' })
					}
				}).catch(err=>{
					uni.showToast({ title:'Error, try again later', icon:'none' })
				})
			},
			购买(){
				if(this.选中号码.length==0){
					uni.showToast({ title:'Please select a number', icon:'none' })
					return
				}
				this.$refs.OrderConfirm.open()
			},
			选号(number){
				if(this.选中号码.find(x=>x==number)){
					let i = this.选中号码.findIndex(x=>x==number)
					this.选中号码.splice(i,1)
				}else{
					this.选中号码.push(number)
				}
			},
			changeGame(id){
				this.id = id
				this.init()
			},
			//倒计时结束
			timeup(){
				setTimeout(()=>{
					this.init()
				},5000)
			},
			cunKuan(){
				uni.navigateTo({
					url:'/pages/my/Recharge'
				})
			},
			openGuiZe(){
				this.$refs.popup.open()
			},
			获取即将(){
				uni.showLoading({ title:'loading' })
				this.$http('/Game/Period',{id:this.id}).then(res=>{
					if(res.result){
						let data = res.data
						this.即将开奖 = data
						// 计算倒计时
						this.倒计时 = data.endTime - parseInt(new Date().getTime() / 1000) 
						console.log(this.倒计时)
					}
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			获取开奖记录(){
				this.开奖记录.loading=true
				this.开奖记录.query.gid=this.id
				this.$http('/Game/PeriodHistory',this.开奖记录.query).then(res=>{
					this.开奖记录.loading=false		
					if(res.result){
						this.开奖记录.list = res.data
					}
				}).catch(err=>{
					this.开奖记录.loading=false
				})
			},
			fenye2(e){
				console.log(e)
				this.购买记录.query.page= e.current
				this.获取购买记录()
			},
			获取购买记录(){
				this.$http('/Game/BuyRecords',this.购买记录.query).then(res=>{
					if(res.result){
						let data = res.data
						data.forEach(item=>{
							item.open=false
						})
						this.购买记录.list = data
						this.购买记录.total=res.total
					}else{
						this.购买记录.total=0
					}
				}).catch(err=>{
					this.购买记录.total=0
					console.log(err)
				})
			},
			init(){
				this.获取即将()
				this.获取开奖记录()
				this.获取购买记录()
			}
		},
		onShow(){
			// this.init()
		},
		onLoad(){
			this.init()
		}

	}
</script>

<style lang="scss" scoped>
	
	.game {
		padding: 10px 10px 60px;
		font-size: 14px;
	}

	.box-1 {
		background: var(--color);
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
			background: var(--color);
			text-align: center;

			view {
				flex: 1;
			}

			.active {
				border-bottom: 3px solid #000;
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
		.active{
			opacity: 0.5;
			// opacity: 1 !important;
		}
		.btns {
			
			margin-top: 10px;
			display: flex;
			justify-content: space-between;

			view {
				// opacity: 0.6;
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
				// opacity: 0.6;
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
			background: var(--color);
			color: #fff;
			font-size: 16px;
			text{
				margin: 0px 5px;
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
				margin: 0px 3px;
				&.Green{
					background: #4caf50;
				}
				&.Violet{
					background: #673ab7;
				}
				&.Red{
					background: red;
				}
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
			background: var(--color);
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
				font-size: 12px;
				.name{
					width: 50px;
				}
				.period{
					width: 100px;
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
	
	.guize{
		overflow: hidden;
		background: #fff;
		width: 90%;
		margin: 0px auto;
		.title-1{
			text-align: center;
			font-size: 20px;
			text-align: center;
			padding: 20px 0px 0px;
		}
		.cont{
			padding: 15px;
			margin-top: 10px;
			font-size: 12px;
			color: rgba(0,0,0,.6);
			p{
				margin: 10px 0px;
			}
		}
		.fot{
			padding: 12px;
			text-align: center;
			color: #2196f3;
			
		}
	}
	
	.OrderConfirm{
		width: 80vw;
		min-height: 60vh;
		background: #fff;
		display: flex;
		flex-direction: column;
		.title-1{
			line-height: 36px;
			text-align: center;
			border-bottom: 1px solid #eee;
		}
		.content{
			flex: 1;
			overflow: auto;
			padding: 10px;
		}
		.list-1{
			margin: 5px 0px 10px;
			display: flex;
			flex-wrap: wrap;
			text{
				font-size: 12px;
				text-align: center;
				border-radius: 3px;
				background: #2196f3;
				line-height: 26px;
				margin: 2px;
				color: #fff;
				width: calc(100% / 5 - 4px);
				&.Green{
					background: #4caf50;
				}
				&.Violet{
					background: #673ab7;
				}
				&.Red{
					background: #f44336;
				}
			}
		}
		.list-2{
			margin: 5px 0px 10px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			text{
				&.active{
					opacity: 1;
				}
				opacity: 0.6;
				width: 45%;
				margin: 0px 0px 10px;
				text-align: center;
				color: #fff;
				background: #f44336;
				line-height: 30px;
			}
		}
		.zongjine{
			margin: 5px 0px 10px;
			text{
				color: red;
			}
		}
		.input-1{
			border-bottom: 1px solid #eee;
			margin: 5px 0px 10px;
		}
		.foot{
			border-top: 1px solid #eee;
			display: flex;
			line-height: 36px;
			text-align: center;
			text{
				flex: 1;
			}
			text:nth-child(2){
				border-left: 1px solid #eee;
				color: #2196f3;
			}
		}
	}
	
	
</style>
