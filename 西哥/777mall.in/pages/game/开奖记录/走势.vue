<template>
	<view class="kjhm">
		<view class="item header-1">
			<view class="Period">Period</view>
			<view class="n">0</view>
			<view class="n">1</view>
			<view class="n">2</view>
			<view class="n">3</view>
			<view class="n">4</view>
			<view class="n">5</view>
			<view class="n">6</view>
			<view class="n">7</view>
			<view class="n">8</view>
			<view class="n">9</view>
		</view>
		<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="tobuttom()">
			<view class="item" v-for="(item,index) in list">
				<view class="Period">{{item.period}}</view>
				
				<!-- // 1 3 7 9是绿 Green
				// 2 4 6 8 是 红 Red
				// 0是红紫 RedViolet 5是绿紫 GreenViolet -->
				<view class="n"><text class="RedViolet" v-if="item.result==0">0</text></view>
				<view class="n"><text class="Green" v-if="item.result==1">1</text></view>
				<view class="n"><text class="Red" v-if="item.result==2">2</text></view>
				<view class="n"><text class="Green" v-if="item.result==3">3</text></view>
				<view class="n"><text class="Red" v-if="item.result==4">4</text></view>
				<view class="n"><text class="GreenViolet" v-if="item.result==5">5</text></view>
				<view class="n"><text class="Red" v-if="item.result==6">6</text></view>
				<view class="n"><text class="Green" v-if="item.result==7">7</text></view>
				<view class="n"><text class="Red" v-if="item.result==8">8</text></view>
				<view class="n"><text class="Green" v-if="item.result==9">9</text></view>
				<canvas2 v-if="getposition(item,index).left" :width="getposition(item,index).width" :height="38" :start="getposition(item,index).start" :left="getposition(item,index).left"/>
			</view>
			<Aloading :loading="loading" :total="total" :length="list.length"></Aloading>
		</scroll-view>
	</view>
</template>

<script>
import canvas2 from './斜线canvas.vue'
export default{
	props:{
		gid:{
			default:''
		}
	},
	components:{
		canvas2
	},
	data() {
		return {
			query:{
				gid:10001,
				page:0,
				size:20
			},
			list:[],
			total:-1,
			loading:false,
			ww:''
		}
	},
	computed:{
	},
	methods:{
		tobuttom(){
			this.获取开奖()
		},
		getposition(item,i){
			if(!this.list[i+1] || !this.ww){
				return {left:''}
			}
			let w1 = (this.ww-90)/10
			let left = 0
			let width = Math.abs(item.result-this.list[i+1].result)*w1
			let start = ''
			// let width = this.list[i+1].result
			if(item.result>this.list[i+1].result){
				left = 90 + w1*item.result + w1/2 - width
			}else{
				left = 90 + w1*item.result + w1/2
				start = 'left'
			}
			return {
				left:left,
				width:width ? width : 1,
				start:start
			}
		},
		获取开奖(){
			if(this.loading || (this.total!=-1 && this.total<=this.list.length)){
				readline
			}
			this.query.gid = this.gid
			this.query.page++
			this.loading=true
			this.$http('/Game/PeriodHistory',this.query).then(res=>{
				if(res.result){
					var data = res.data
					for (var i = 0; i < data.length; i++) {
						// data[i]['index'] = i
						// if(i==0){
							
						// }else if(data[i+1]){
						// 	data[i].start = data[i].result < data[i+1].result ? 'left' : '';
						// 	data[i].left = 90 + 28*data[i].result
						// }
					}
					this.list = [...this.list,...data]
					this.total = res.total
				}else{
					this.total = 0
				}
				this.loading=false
			}).catch(err=>{
				this.total = 0
				this.loading=false
			})
		}
	},
	mounted() {
		//获取屏幕宽度
		uni.getSystemInfo({
			success:  (res)=> {
				this.ww = res.screenWidth
			}
		});
		this.获取开奖()
	},
	watch:{
		gid(){
			this.list = []
			this.query.page=0
			this.total = -1
			this.loading = false
			this.获取开奖()
		}
	}
	
}
</script>

<style lang="scss" scoped>
.kjhm{
	height: 100%;
}
.header-1{
	position: sticky;
	top: 0px;
	background: #fff;
	z-index: 2;
}
.scroll-view{
	height: calc(100% - 38px) ;
}
.item{
	font-size: 12px;
	position: relative;
	&:nth-child(2n){
		background: #fff;
	}
	display: flex;
	>view{
		flex: 1;
		height: 38px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Period{
		width: 90px;
		flex-shrink: 0;
		min-width: 90px;
		flex-grow: 0;
	}
	.n{
		border-left: 1px solid #eee;
		text{
			// background: #fff;
			color: #fff;
			position: relative;
			z-index: 2;
			width: 20px;
			height: 20px;
			line-height: 20px;
			border-radius: 100%;
			// border: 1px solid red;
			text-align: center;
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
}



// .yuan{
// 	width: 16px;
// 	height: 16px;
// 	border-radius: 100%;
// 	display: inline-block;
// 	margin: 0px 3px;
// 	&.Green{
// 		background: #4caf50;
// 	}
// 	&.Red{
// 		background: red;
// 	}
// 	&.Violet{
// 		background: #673ab7;
// 	}
// }
</style>
