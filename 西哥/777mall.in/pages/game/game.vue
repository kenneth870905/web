<template>
	<view class="game" >
		<view class="status_bar"></view>
		
		<view class="box-1">
			<view class="qian">
				Available Balance：<text>{{userInfo.Amount}}</text>
			</view>
			<view class="ft">
				<view class="btn-1" @click="cunKuan()">Recharge</view>
				<view class="btn-2" @click="openGuiZe()">Read Rule</view>
				<view class="icon-box" @click="获取用户()">
					<uni-icons type="loop" color="#fff" size="20"></uni-icons>
				</view>
			</view>
		</view>
			
		<view class="box-1-1 shadow">
			<view class="top">
				<view class="left" @click="展开记录=!展开记录">
					<view class="title-1">
						<text>Recent Results</text>
						<uni-icons type="arrowdown" color="red"></uni-icons>
					</view>
					<view class="Results" v-if="开奖记录.list[0]">
						<text class="number">{{开奖记录.list[0].result}}</text>
						<!-- 绿 -->
						<view class="yuan Green" v-if="[1,3,7,9,5].findIndex(x=>x==开奖记录.list[0].result)!=-1"></view>
						<!-- 红 -->
						<view class="yuan Red" v-if="[2,4,6,8,0].findIndex(x=>x==开奖记录.list[0].result)!=-1"></view>
						<!-- 紫 -->
						<view class="yuan Violet" v-if="[0,5].findIndex(x=>x==开奖记录.list[0].result)!=-1"></view>
					</view>
					<view class="Results" v-if="开奖记录.list[1]">
						<text class="number">{{开奖记录.list[1].result}}</text>
						<view class="yuan Green" v-if="[1,3,7,9,5].findIndex(x=>x==开奖记录.list[1].result)!=-1"></view>
						<!-- 红 -->
						<view class="yuan Red" v-if="[2,4,6,8,0].findIndex(x=>x==开奖记录.list[1].result)!=-1"></view>
						<!-- 紫 -->
						<view class="yuan Violet" v-if="[0,5].findIndex(x=>x==开奖记录.list[1].result)!=-1"></view>
					</view>
				</view>
				<view class="right">
					<view class="title-1">{{即将开奖.period}}</view>
					<view class="daojishi">
						<uni-countdown v-if="显示倒计时" background-color="#eeeeee" :show-hour="false" :show-day="false" :second="倒计时" @timeup="timeup"></uni-countdown>
					</view>
				</view>
			</view>
			<view class="list" :class="{close:!展开记录}">
				<view class="More" @click="go('/pages/game/record')">
					More Records
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="">
					<view class="">Period</view>
					<view class="">Number</view>
					<view class="">Result</view>
				</view>
				<view class="" v-for="item in 开奖记录.list">
					<view class="">{{item.period}}</view>
					<view class="">
						<text class="textGreen" v-if="[1,3,7,9,5].findIndex(x=>x==item.result)!=-1">{{item.result}}</text>
						<text class="textRed" v-if="[2,4,6,8,0].findIndex(x=>x==item.result)!=-1">{{item.result}}</text>
					</view>
					<view class="">
						<view class="number">
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
				<view class="close" @click="展开记录=false">
					Retract <uni-icons type="arrowup"></uni-icons>
				</view>
			</view>
		</view>
			
		<view class="MoreRecords">
			<view @click="go('/pages/game/record')">More Records</uni-icons> </view>
			<view @click="go('/pages/my/orders')">My Orders <uni-icons type="arrowright"></uni-icons> </view>
		</view>
			
		<view class="shadow">
		
			<view class="box-2">
				<view class="tabs">
					<view :class="{active:id==10001}" @click="changeGame(10001)">Parity</view>
					<view :class="{active:id==10002}" @click="changeGame(10002)">Sapre</view>
					<view :class="{active:id==10003}" @click="changeGame(10003)">Bcone</view>
					<view :class="{active:id==10004}" @click="changeGame(10004)">Emerd</view>
				</view>
			</view>

			<view class="box-3">
				<view class="btns">
					<view :class="{active:选中号码.find(x=>x.number=='Green')}" @click="选号('Green')">Join Green</view>
					<view :class="{active:选中号码.find(x=>x.number=='Violet')}" @click="选号('Violet')">Join Violet</view>
					<view :class="{active:选中号码.find(x=>x.number=='Red')}" @click="选号('Red')">Join Red</view>
				</view>
				<view class="number">
					<!-- // 1 3 7 9是绿  Green
					// 2 4 6 8 是 红 Red
					// 0是红紫 RedViolet  5是绿紫 GreenViolet-->
					
					<view class="RedViolet" :class="{active:选中号码.find(x=>x.number=='0')}" @click="选号('0')">0</view>
					<view class="Green" :class="{active:选中号码.find(x=>x.number==1)}" @click="选号(1)">1</view>
					<view class="Red" :class="{active:选中号码.find(x=>x.number==2)}" @click="选号(2)">2</view>
					<view class="Green" :class="{active:选中号码.find(x=>x.number==3)}" @click="选号(3)">3</view>
					<view class="Red" :class="{active:选中号码.find(x=>x.number==4)}" @click="选号(4)">4</view>
					<view class="GreenViolet" :class="{active:选中号码.find(x=>x.number==5)}" @click="选号(5)">5</view>
					<view class="Red" :class="{active:选中号码.find(x=>x.number==6)}" @click="选号(6)">6</view>
					<view class="Green" :class="{active:选中号码.find(x=>x.number==7)}" @click="选号(7)">7</view>
					<view class="Red" :class="{active:选中号码.find(x=>x.number==8)}" @click="选号(8)">8</view>
					<view class="Green" :class="{active:选中号码.find(x=>x.number==9)}" @click="选号(9)">9</view>
				</view>
			</view>
		</view>
	
		<view class="box-5">
			<view class="">
				<text>Selected：</text>
				<text>{{选中号码.length}}</text>
				<text class="Empty" @click="选中号码=[]" v-if="选中号码.length>0">Reset</text>
			</view>
			<view class="">
				<text>Amount：</text>
				<input type="number" v-model="单注金额" />
			</view>
			<view class="">
				<text>Quick input：</text>
				<view class="list">
					<text @click="单注金额=100">100.00</text>
					<text @click="单注金额=1000">1000.00</text>
					<text @click="单注金额=10000">10000.00</text>
				</view>
			</view>
		</view>
			
		<view class="Submit" @click="购买()">Submit</view>
		
		
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
					<view class="list-1">
						<view class="item" v-for="item in 选中号码">
							<text class="number" :class="item.number">{{item.number}}</text>
							<view class="flex1 Odds">odds:{{['Green','Violet','Red'].find(x=>x==item.number) ? '2.00' : '9.00'}}</view>
							<text class="btn-1"  @click="item.amount=item.amount-单注金额" v-if="item.amount>单注金额">-</text>
							<text class="jine">{{item.amount}}</text>
							<text class="btn-1" @click="item.amount=item.amount+单注金额">+</text>
						</view>
					</view>
					<view class="">Game：Parity</view>
					<view class="">Period：<text class="red-text">{{即将开奖.period}}</text></view>
					<view class="">Quantity：<text class="red-text">{{选中号码.length}}</text></view>
					<view class="">Total amount：<text class="red-text">{{总金额}}</text></view>
				</view>
				<view class="foot">
					<text @click="$refs.OrderConfirm.close()">Cancel</text>
					<text @click="确认购买()">Confirm</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- <newTabber /> -->
		
		<!-- <view class="xuanfu">
			悬浮按钮
		</view> -->
		
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
				显示倒计时:true,
				倒计时:0,	//秒
				开奖记录:{
					loading:false,
					list:[],
					total:-1,
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
				购买记录:{
					query:{
						page:1,
						size:10
					},
					list:[],
					total:-1,
					loading:false
				},
				展开记录:false
				
			};
		},
		computed: {
			...mapState({
				userInfo: x => x.userInfo,
				token:x=>x.token
			}),
			总金额(){
				if(this.选中号码.length==0){
					return 0.00
				}
				var n = 0 
				this.选中号码.forEach(item=>{
					n = n + parseInt(Math.round( ( item.amount)*100 )) /100 
				})
				return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n)
			}
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			go(path){
				uni.navigateTo({
					url:path
				})
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
						amount:x.amount,
						method: name[x.number] ? 2 : 1 ,
						content: name[x.number] ? name[x.number] : x.number 
					})
				})
				this.$refs.OrderConfirm.close()
				this.$http('/Game/Buy',o).then(res=>{
					if(res.result){
						uni.showToast({ title:'Successful purchase'})
						// this.获取购买记录()
					}else{
						uni.showToast({ title:res.msg, icon:'none' })
					}
				}).catch(err=>{
					uni.showToast({ title:'Error, try again later', icon:'none' })
				})
			},
			购买(){
				var regPos = /^[0-9]+.?[0-9]*/;
				if(this.选中号码.length==0){
					uni.showToast({ title:'Please select a number', icon:'none' })
					return
				}else if(!regPos.test(this.单注金额) || this.单注金额<=0){
					uni.showToast({ title:'The amount entered is incorrect', icon:'none' })
					return
				}
				this.$refs.OrderConfirm.open()
			},
			选号(number){
				if(this.选中号码.find(x=>x.number==number)){
					let i = this.选中号码.findIndex(x=>x.number==number)
					this.选中号码.splice(i,1)
				}else{
					this.选中号码.push({number:number,n:1,amount:this.单注金额})
				}
			},
			changeGame(id){
				this.id = id
				this.init()
			},
			//倒计时结束
			timeup(){
				uni.showLoading({mask:true})
				setTimeout(()=>{
					uni.hideLoading()
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
						this.显示倒计时=false
						this.$nextTick(()=>{
							this.显示倒计时=true
						})
						console.log('倒计时',this.倒计时)
					}
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			fenye1(e){
				this.开奖记录.query.page= e.current
				this.获取开奖记录()
			},
			获取开奖记录(){
				this.开奖记录.loading=true
				this.开奖记录.query.gid=this.id
				this.$http('/Game/PeriodHistory',this.开奖记录.query).then(res=>{
					this.开奖记录.loading=false		
					if(res.result){
						this.开奖记录.list = res.data
						this.开奖记录.total = res.total
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
				if(!this.token){
					this.购买记录.total=0
					return
				}
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
				// this.获取购买记录()
			}
		},
		onShow(){
			this.init()
		},
		onLoad(){
			// this.init()
			// setTimeout(()=>{
			// 	this.$refs.OrderConfirm.open()
			// },1000)
		},
		onHide(){
			this.显示倒计时=false
		},
		watch:{
			单注金额(newValue,old){
				console.log(newValue,old)
				this.选中号码.forEach(x=>{
					x.amount = newValue
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.xuanfu{
		position: absolute;
	}
	.MoreRecords{
		font-size: 12px;
		display: flex;
		justify-content: space-between;
	}
	
	.game {
		padding: 10px 10px 60px;
		font-size: 14px;
	}
	
	.yuan{
		width: 16px;
		height: 16px;
		border-radius: 100%;
		display: inline-block;
		margin: 0px 3px;
		&.Green{
			background: #4caf50;
		}
		&.Red{
			background: red;
		}
		&.Violet{
			background: #673ab7;
		}
	}

	.box-1 {
		background: var(--color);
		padding: 3vw;
		border-radius: 1vw;
		color: #fff;

		.qian {
			display: flex;
			align-items: center;
			padding: 5px 0px;

			text {
				font-size: 22px;
			}
		}

		.ft {
			display: flex;
			align-items: center;

			.btn-1,
			.btn-2 {
				font-size: 13px;
				width: 80px;
				line-height: 28px;
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
	
	.box-1-1{
		background: #fff;
		margin: 10px 0px;
		border-radius: 5px;
		position: relative;
		.top{
			padding:5px 0px;
			display: flex;
			text-align: center;
			align-items: center;
			position: relative;
			&::before{
				position: absolute;
				content: '';
				left: 50%;
				width: 1px;
				height: 90%;
				top: 5%;
				background: #eee;
			}
		}
		
		.left{
			flex: 1;
		}
		.right{
			width: 50%;
		}
		.title-1{
			margin: 0px 0px 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.daojishi{
			display: flex;
			justify-content: center;
			color: red;
			/deep/ uni-text {
				line-height: 30px;
				height: 30px;
				font-size: 20px;
				color: var(--color) !important;
			}
			/deep/ .uni-countdown__number {
				width: 30px;
			}
		}
		.Results{
			display: flex;
			align-items: center;
			margin: 3px 0px;
			padding-left: 35%;
			.number{
				font-size: 12px;
				width: 20px;
				line-height: 18px;
				border-radius: 100%;
				border: 1px solid #a7a7a7;
				margin: 0px 10px 0px 0px;
			}
		}
		.list {
			// position: absolute;
			// width: 100%;
			// top: 100%;
			transition: all 0.3s;
			height: 326px;
			overflow: hidden;
			&.close{
				height: 0px;
			}
			border-top: 1px solid #eee;
			box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
			background: #fff;
			text-align: center;
			line-height: 25px;
			font-size: 12px;
			>view {
				padding: 0px 10px;
				display: flex;
				&:nth-child(2n){
					background: #eee;
				}
				>view {
					flex: 1;
				}
			}
			.textGreen{
				color:#4caf50;
			}
			.textRed{
				color: #f44336;
			}
			.More{
				justify-content: flex-end;
				align-items: center;
			}
			.number{
				margin-left: 40%;
				margin-top: 5px;
				display: flex;
				// padding-left: 40%;
				// justify-content: center;
				align-items: center;
			}
			.close{
				justify-content: center;
			}
		}
	}
	
	.box-2 {
		border-radius: 4px;
		overflow: hidden;
		margin: 10px 0px 0px;
		background: #fff;

		.tabs {
			display: flex;
			// color: #fff;
			line-height: 36px;
			// background: var(--color);
			text-align: center;
			view {
				flex: 1;
			}
			.active {
				color: var(--color);
				border-bottom: 3px solid var(--color);
			}
		}
	}

	.box-3 {
		text-align: center;
		background: #fff;
		color: #fff;
		padding: 10px 10px 10px;
		.active{
			opacity: 0.5;
		}
		.btns {
			// margin-top: 10px;
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
				line-height: 30px;
				margin: 10px 0px 0px;
				// background: #2196f3;
			}
			.Green{
				background: #4caf50;
			}
			.Red{
				background: #f44336;
			}
			.RedViolet{
				background: linear-gradient(135deg , #f44336 50%,#673ab7 50%);
			}
			.GreenViolet{
				background: linear-gradient(135deg , #4caf50 50%,#673ab7 50%);
			}
		}

		.btn-1 {
			background: #4caf50;
			line-height: 44px;
			margin: 15px 0px 0px;
		}
	}
	
	.box-5{
		margin: 10px 0px 0px;
		padding: 0px 0px 5px;
		background: #fff;
		>view{
			display: flex;
			padding: 5px 10px;
		}
		input{
			margin-left: 5px;
			border-bottom: 1px solid red;
			color: red;
			flex: 1;
		}
		.Empty{
			color: red;
			font-size: 12px;
			margin: 0px 0px 0px 15px;
		}
		.list{
			text{
				padding: 3px 5px;
				background: #eee;
				margin: 0px 5px;
				font-size: 12px;
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
		height: 70vh;
		background: #fff;
		border-radius: 5px;
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
			display: flex;
			flex-direction: column;
		}
		.list-1{
			flex: 1;
			overflow: auto;
			border-bottom: 1px solid #a5a5a5;
			.item{
				display: flex;
				align-items: center;
				padding: 3px ;
				border-bottom: 1px solid #eee;
			}
			.flex1{
				flex: 1;
			}
			.Odds{
				margin: 0px 0px 0px 15px;
				font-size: 12px;
			}
			.btn-1{
				width: 26px;
				text-align: center;
				line-height: 26px;
				background: #eaeaea;
			}
			.jine{
				color: var(--color);
				width: 50px;
				text-align: center;
			}
			.number{
				font-size: 12px;
				text-align: center;
				background: #2196f3;
				// line-height: 20px;
				margin: 2px;
				padding: 3px 5px;
				color: #fff;
				// width: 40px;
				&.Green{
					background: #4caf50;
					// color: #4caf50;
				}
				&.Violet{
					// color: #673ab7;
					background: #673ab7;
				}
				&.Red{
					// color:#f44336 ;
					background: #f44336;
				}
			}
		}
		
		.red-text{
			color: red;
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
	
	.Submit{
		background: var(--color);
		position: fixed;
		width: 100%;
		line-height: 44px;
		color: #fff;
		left: 0px;
		bottom: 0px;
		text-align: center;
	}
</style>
