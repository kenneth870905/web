<template>
	<view class="productDetails">
		<swiper class="box_1" :circular="true" autoplay="true" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in sp.imgs"><image :src="api_url+'/'+item" mode="aspectFill"></image></swiper-item>
		</swiper>
		
		<view class="box-2">
			<view class="title-1">{{sp.name}}</view>
			<view class="foot">
				<!-- <text class="yuanjia">原价 ￥---</text> -->
				<text class="xianjia">秒杀价 ￥{{sp.seckillPrice}}</text>
			</view>
			<view class="hengxian"></view>
		</view>

		<view class="box3" :class="{show:showDescription}">
			<view class="neirong">
				<rich-text class="rich-text" :nodes="description"></rich-text>
				<view  v-show="wh<richTextH" class="xuhua"></view>
			</view>
			<button v-show="wh<richTextH" type="default" class="btn-1" @click="showDescription=!showDescription">
				{{showDescription ? '收起':'查看商品详细介绍'}}
				<i class="icon iconfont iconxia"></i>
			</button>
		</view>

		<view class="box-4" v-if="wz.id">
			<view class="content">
				<view class="img">
					<image :src="api_url+'/'+wz.coverImg" mode="aspectFill"></image>
				</view>
				<view class="right1">
					<view class="title">
						{{wz.title}}
					</view>
					<view class="jianjie">
						{{wz.brief}}
					</view>
					<view class="foot">
						<view class="img2">
							<image src="../../static/images/logo.png" mode="aspectFill"></image>
						</view>
						<text class="text1">轻随我编</text>
						<text class="text2" @click="查看帖子()">查看帖子>></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="box-5">
			<view class="img">
				<image src="../../static/images/logo.png" mode="aspectFill"></image>
			</view>
			<view class="zhongjian">
				<view class="title">
					<text>轻随我商店</text>
					<text>官方</text>
				</view>
				<view class="text">
					极尽世间好物，专注提升逼格！
				</view>
			</view>
			<view class="btn-1" @click="去商店()">
				轻随我商店
			</view>
		</view>
		
		<view class="footer-1">
			<view class="icon-box">
				<!-- <i class="icon iconfont iconshandian"></i> -->
				<button type="default" open-type="share"><i class="icon iconfont iconfenxiang"></i></button>
			</view>
			<view class="dandu" @click="单独购买()">
				<view class="">
					￥{{sp.seckillPrice}}
				</view>
				<view class="">
					秒杀购买
				</view>
			</view>
			<!-- <view class="pingtuan" @click="团购()">
				<view class="">
					￥188
				</view>
				<view class="">
					拼团购买
				</view>
			</view> -->
		</view>
		
		<!-- 底部 -->
		<!-- <view class="goods-carts"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view> -->
		
		<!-- 加入购物车 -->
		<jiaRuGouWuChe ref="jiaRuGouWuChe" :type="type" :sp="sp"/>

	</view>
</template>

<script>
import { mapState , mapMutations } from 'vuex'
import jiaRuGouWuChe from './components/jiaRuGouWuChe'
export default {
	components:{
		jiaRuGouWuChe
	},
	data() {
		return {
			wh:0,	//浏览器高度
			richTextH:0,
			showDescription:false,	//显示全描述
			options: [
				// {
				// 	icon: 'headphones',
				// 	text: '客服'
				// }
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#fda900',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ff4e00',
					color: '#fff'
				}
			],
			id:0,
			sp:{
				imgs:[]
			},
			api_url:this.$api_url,
			type:0,	// 0 加入购物车 1 直接购买
			wz:{}
		};
	},
	computed:{
		...mapState({
			loginInfo:state=>state.loginInfo,
			baseInfo:state=>state.baseInfo
		}),
		description(){
			return this.sp.description ? this.sp.description.replace(/<img/g, '<img style="max-width:100%;height:auto" ') : ''
		}
	},
	methods: {
		...mapMutations({
			setItem:"setItem"
		}),
		查看帖子(){
			uni.navigateTo({
				url:'/pages/wenzhang/wenzhang?id='+this.wz.id
			})
		},
		去商店(){
			uni.switchTab({
				url:'/pages/shangDian/shangDian'
			})
		},
		团购(){
			uni.showToast({
				title:'功能开发中',
				icon:'none'
			})
		},
		单独购买() {
			if(!this.loginInfo.id){
				uni.showModal({
					title:"提示",
					content:'登录后才能购买商品是否现在去登录？',
					showCancel:true,
					success(e){
						if(e.confirm){
							uni.switchTab({
								url:"/pages/my/personalCenter"
							})
						}
					}
				})
				return
			} 
			this.type = 1
			this.$refs.jiaRuGouWuChe.open()
		},
		getSP(){
			this.$http(`/api/product/${this.id}`).then(x=>{
				this.sp = x.data
				this.获取文章()
				this.$nextTick(()=>{
					setTimeout(()=>{
						var query = wx.createSelectorQuery()
						query.select('.rich-text').boundingClientRect(dome=>{
							this.richTextH = dome.height
						}).exec()
					},1000)
				})
			}).catch(err=>{})
		},
		获取文章(){
			if(!this.sp.articleId) return
			this.$http(`/api/article/${this.sp.articleId}`,'').then(x=>{
				console.log(x)
				if(x.code===0)
				this.wz = x.data
			})
		}
	},
	mounted() {
		// this.$refs.gouMaiQueRen.open()
	},
	onLoad(option) {
		this.wh = wx.getSystemInfoSync().windowHeight
		this.id = option.id
		// this.id = 39
		this.getSP()
		if(option.uid){
			this.setItem(['fxuid',option.id])
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target);
		}
		return {
			title: this.sp.name,
			// imageUrl:"http://8.210.239.106/images/2020-10-30/20/04/n8BV0XxWN15qiaXW.jpg",
			// imageUrl:this.api_url+'/'+this.erwiema,
			// path: '/pages/index/index?uid='+this.loginInfo.id+'&topath=/home/home'
			path: '/pages/shangPin/pingTuan?uid=' + this.loginInfo.id+'&id='+this.id
		};
	}
};
</script>

<style scoped lang="scss">
.productDetails {
	padding: 0px 0px 130rpx;
}

.box_1 {
	height: 435rpx;
	image {
		width: 100%;
		height: 100%;
	}
}

.box-2{
	background: #fff;
	padding: 0px 28rpx;
	.title-1{
		padding: 27rpx 0rpx 0px;
		font-size: 25rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}
	.foot{
		display: flex;
		align-items: center;
		padding: 30rpx 0rpx 40rpx;
	}
	.yuanjia{
		font-size: 21rpx;
		margin-right: 38rpx;
		color: #999999;
	}
	.xianjia {
		font-size: 21rpx;
		color: #ff2020;
		font-weight: bold;
	}
	.hengxian{
		width: 699rpx;
		border-bottom:1px dashed  #dcdcdc;
	}
}


.box3 {
	padding: 30rpx 28rpx 0px;
	background: #fff;
	&.show{
		.neirong{
			height: auto;
			overflow: auto;
			.xuhua{
				display: none;
			}
		}
		.btn-1{
			i{
				transform:rotate(180deg);
			}
		}
	}
	.neirong{
		height: 100vh;	
		overflow: hidden;
		position: relative;
		.xuhua{
			position: absolute;
			left: 0px;
			bottom: 0px;
			width: 100%;
			height: 100px;
			background-image: linear-gradient(rgba(255,255,255,0), #fff);
		}
	}
	.btn-1{
		margin: 20px 0px 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 63rpx;
		background-color: #dcdcdc;
		font-size: 17rpx;
		color: #333333;
		border: none;
		border-radius: 0px;
		i{
			font-size: inherit;
			margin: 0px 0px 0px 10px;
		}
		&::after{ 
			border: none;
		}
	}
}

.box-4{
	background: #fff;
	padding: 14rpx 28rpx 14rpx;
	.content{
		border: solid 1rpx #dcdcdc;
		padding: 28rpx;
		display: flex;
	}
	.img{
		width: 140rpx;
		height: 140rpx;
		flex-shrink: 0;
		margin: 0px 28rpx 0px 0px;
		image{
			width:100%;
			height: 100%;
		}
	}
	.right1{
		width: 0;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.title{
		font-size: 25rpx;
		color: #333333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.jianjie {
		font-size: 17rpx;
		color: #999999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}
	.foot{
		display: flex;
		align-items: center;
		.img2{
			width: 35rpx;
			height: 35rpx;
			margin:0px 10rpx 0px 0px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.text1{
			flex: 1;
			font-size: 21rpx;
			color: #333333;
		}
		.text2{
			font-size: 17rpx;
			color: #ff1c1c;
		}
	}
	
}

.box-5{
	margin:18rpx 0px 0px ;
	background: #fff;
	padding: 20rpx 68rpx 20rpx 30rpx;
	display: flex;
	align-items: center;
	.img{
		width: 104rpx;
		height: 104rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.zhongjian{
		flex: 1;
		.title{
			display: flex;
			align-items: center;
			text:nth-child(1){
				font-size: 28rpx;
				color: #333333;
			}
			text:nth-child(2){
				background-color: #000000;
				color: #eec811;
				font-size: 17rpx;
				line-height: 26rpx;
				padding: 0px 5rpx;
				position: relative;
				margin-left: 20px;
				&::after{
					position: absolute;
					left: -10px;
					top: 0px;
					content: '';
					width:0px; 	 
					height:0px;  
					border: 5px solid transparent;
					border-bottom: 10px solid #000000;
					transform: rotate(-90deg);
				}
			}
		}
		.text{
			font-size: 17rpx;
			color: #999999;
		}
	}
	.btn-1{
		flex-shrink: 0;
		width: 139rpx;
		height: 42rpx;
		border: solid 1rpx #dcdcdc;
		line-height: 42rpx;
		text-align: center;
		font-size: 21rpx;
		color: #333;
	}
	
}

.footer-1{
	position: fixed;
	width: 100%;
	left: 0px;
	bottom: 0px;
	height: 113rpx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	border-top: 1px solid #f5f5f5;
	i{
		font-size:43rpx;
	}
	.icon-box{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	button{
		background: none;
		&::after{
			display: none;
		}
	}
	.dandu,
	.pingtuan{
		// width: 235rpx;
		width: 500rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 25rpx;
		text-align: center;
		color: #fff;
	}
	.dandu{
		background: #e50000;
	}
	.pingtuan{
		background: #000000;
	}
}

</style>
