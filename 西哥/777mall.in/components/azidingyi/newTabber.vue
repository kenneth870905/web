<template>
	<view class="">
		<view class="newTabber">
			<view v-for="item in list" class="item" @click="go(item)" v-if="!item.Authority || token">
				<view class="img-box">
					<image :src="item.iconPath" mode="widthFix"></image>
				</view>
				<view v-if="item.pagePath==path" class="text-box">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		data(){
			return {
				"list":[
					{
						"pagePath": "pages/home",
						"aliasPath":"/",
						"iconPath": "/static/tabber/home.png",
						"selectedIconPath": "/static/tabber/home.png",
						"text": "Home"
					},
					{
						"pagePath": "pages/products/product",
						"aliasPath":'/product',
						"iconPath": "/static/tabber/sousuo.png",
						"selectedIconPath": "./static/tabber/sousuo.png",
						"text": "Search"
					},
					{
						"pagePath": "pages/game/game",
						"iconPath": "/static/tabber/qian.png",
						"selectedIconPath": "static/tabber/qian.png",
						"text": "Win",
						Authority:true
					},
					{
						"pagePath":"pages/my/personal",
						"iconPath": "/static/tabber/my.png",
						"selectedIconPath": "static/tabber/my.png",
						"text":"My"
					}
				]
			}
		},
		computed:{
			path(){
				let pages = getCurrentPages();
				let route =  pages[pages.length - 1] ? pages[pages.length - 1].route : '';
				return route
			},
			...mapState({
				token:x=>x.token
			})
		},
		methods:{
			go(item){
				if(item.pagePath=='pages/my/personal' && !this.token){
					uni.navigateTo({
						url:"/pages/login"
					})
				}else{
					uni.switchTab({
						url:'/'+item.pagePath
					})
				}
			}
		},
		mounted() {
		},
		created(){
			uni.hideTabBar()
		}
	}
</script>

<style lang="scss" scoped>
.newTabber{
	// background: #009688;
	background: var(--color);
	display: flex;
	color: #fff;
	text-align: center;
	font-size: 12px;
	height: 50px;
	align-items: center;
	position: fixed;
	width: 100%;
	left: 0px;
	bottom: 0px;
	.item{
		flex: 1;
	}
	.img-box{
		width: 24px;
		margin: 0px auto;
		image{
			width: 100%;
		}
	}
}
</style>
