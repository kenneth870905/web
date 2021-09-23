<template>
	<view class="container"> 
		<view class="header">
			<view class="" v-if="order.price">￥{{order.price}}.00元</view>
			<view class="">（本区价格，以实际为准）</view>
		</view>
		
		<view class="movable-box">
			<view class="list-movable">
				<view class="title-1" :style="{left:x+'px' }">
					<view class="" v-for="item in rows">
						{{item.name}}
					</view>
				</view>
				<view class="list">
					<view class="item" v-for="item in rows">
						<view :class="['status_'+item2.status,getClassName(item2)]" v-if="item2.column%10!=4" v-for="item2 in item.children" @click="SelectedItem(item2)">
							{{item2.column}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <movable-area class="movable-box" v-if="rows.length>0">
			<movable-view class="list-movable" @change="tuodong" @scale="scale" direction="all" :inertia="true"  :out-of-bounds="true">
				<view class="title-1" :style="{left:x+'px' }">
					<view class="" v-for="item in rows">
						{{item.name}}
					</view>
				</view>
				<view class="list">
					<view class="item" v-for="item in rows">
						<view :class="['status_'+item2.status,getClassName(item2)]" v-if="item2.column%10!=4" v-for="item2 in item.children" @click="SelectedItem(item2)">
							{{item2.column}}
						</view>
					</view>
				</view>
			</movable-view>
		</movable-area> -->
			
		
		<view class="footer">
			<view class="yixuan">
				<view class="">
					已选
				</view>
				<view class="list-2">
					<view class="item" v-if="yixuanze">
						{{yixuanze}}
					</view>
					<!-- <view class="item" v-for="item in 10">
						二十五排-5号
					</view> -->
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
			
			<button type="default" @click="tijiao()">提交预定</button>
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
				},
				
				// yqName:"",	//园区名
				// yqId:"",	//园区Id
				// title:"",	//单元名称
				// id:"",		//单元id
				rows:[],
				order:{
					"grave_id": 1,
					"park_id": '',
					"park_name": "",
					"unit_id": '',
					"unit_name": "",
					"row": 0,
					"row_name": "",
					"column": 0,
					price: '',
				}
			};
		},
		computed:{
			yixuanze(){
				if(this.rows[this.order.row-1]){
					return this.rows[this.order.row-1].name+'-'+this.order.column+'号'
				}else{
					return ''
				}
			}
		},
		methods:{
			tuodong(e){
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
			},
			tijiao(){
				console.log(this.order)
				if(!this.order.row){
					uni.showToast({
						icon:'none',
						title:"请选择号码"
					})
				}else{
					this.$http('/order',this.order).then(x=>{
						if(x.code==0){
							uni.showToast({
								title:'提交成功'
							})
							setTimeout(()=>{
								this.order.row=0
								this.order.column = 0
								this.init()
							},2000)
						}else{
							uni.showToast({
								title:'提交失败，请联系管理员',
								icon:'none'
							})
						}
					})
				}
			},
			getClassName(item2){
				if(this.order.row==item2.row && this.order.column==item2.column){
					 return 'active'
				}
				return ''
			},
			SelectedItem(item){
				if(item.status && item.status!=4){
					return
				}
				this.order.row = item.row
				this.order.column= item.column
			},
			init(){
				let id = this.order.unit_id
				Promise.all([
					this.$http(`/unit/${id}`,'','get'),
					this.$http('/order',{unit_id:id,page:1,size:5000},'get')
				]).then(([r1,r2])=>{
					console.log(r1,r2)
					this.order.price = r1.data.price
					let list = []
					r1.data.Rows.map(value=>{
						let row={}
							row.name = value.name
							row.children = []
						for (let i = 1; i <= value.count; i++) {
							let status =  ''
							let obj = r2.data.find(x=>x.row==value.row && x.column==i)
							if(obj){
								status = obj.status
							}
							row.children.push({row:value.row,column:i,status:status})
						}
						if(value.is_reverse){
							row.children.reverse()
						}
						list.push(row)
					})
					this.rows = list
					console.log(list)
				})
			}
		},
		onLoad(option) {
			// 假如每行20个
			console.log(option)
			// option.name = '永泰苑东（1-10栋）'
			// option.id='8'
			// option.yq='四合院-5',
			// option.yqid = '5'
			
			this.order.park_name =  option.yq
			this.order.park_id = parseInt(option.yqid) 
			this.order.unit_id = parseInt(option.id) 
			this.order.unit_name = option.name
			// this.title = option.name
			// this.id = option.id
			this.init()
			uni.setNavigationBarTitle({ title: option.name })
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
	// overflow: hidden;
	overflow: auto;
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
	font-size: 26rpx;
	color: #fff;
	min-width: 60rpx;
	view{
		// width: 60rpx;
		line-height: 60rpx;
		white-space: nowrap;
		margin: 20rpx 0rpx;
	}
}
.list{
	padding: 30rpx;
	.item{
		display: flex;
		margin: 20rpx 0rpx;
		view{
			width: 60rpx;
			height: 60rpx;
			line-height: 60rpx;
			margin: 0rpx 6rpx;
			border-radius: 8rpx 8rpx 0rpx 0rpx;
			background: #e5e5e5;
			font-size: 28rpx;
			text-align: center;
			font-weight: bold;
			// display: flex;
			// align-items: center;
			// justify-content: center;
			box-sizing: border-box;
		}
		// .kexuan{
		// 	background: #e5e5e5;
		// }
		// .yuding{
		// 	background:#86e4a8 ;
		// }
		// .piliangmaichu{
		// 	background: #f3e08c;
		// }
		// .yifudingjin{
		// 	background: #82c0e1;
		// }
		// .yimaichu{
		// 	background: #f47171;
		// }
		
		.active{
			color: red;
			background: none;
			border: 1px solid red;
		}
		.status_1{
			background: #87e3a8;
		}
		.status_2{
			background: #80bfeb;
		}
		.status_3{
			background: #d99493;
		}
		.status_5{
			background: #f3de8d;
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
