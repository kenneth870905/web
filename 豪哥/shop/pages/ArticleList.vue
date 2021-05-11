<template>
	<view>
		<view class="typeList">
			<view @click="changeType('')" :class="{active:!query.categoryId}">全部文章</view>
			<view @click="changeType(item.id)" :class="{active:item.id == query.categoryId}" v-for="item in wztype">{{item.name}}</view>
		</view>
		
		<swiper :circular="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper-1">
			<swiper-item v-for="(item,index) in wzList" v-if="index<3">
				<view class="swiper-item" @click="go('/pages/article?id='+item.id)">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
					<text>{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="list" >
			<view class="item" v-for="item in wzList" @click="go('/pages/article?id='+item.id)">
				<image v-if="item.coverImg" :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				<view class="t1">{{item.title}}</view>
			</view>
		</view>
		<Aloading :loading="loading" :total="total" :length="length"></Aloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api_url:this.$api_url,
				wztype:[],	//文章类型
				query:{
					page:0,
					size:10,
					categoryId:""
				},
				wzList:[],
				loading:false,
				total:-1
			};
		},
		computed:{
			length(){
				return this.wzList.length
			}
		},
		methods:{
			go(path){
				uni.navigateTo({
					url:path
				})
			},
			changeType(id){
				this.total=-1
				this.query.categoryId = id
				this.query.page=0
				this.wzList = []
				this.获取文章()
			},
			获取文章类型(){
				
				this.$http('/api/articleCategory',{page:1,pageSize:1000}).then(x=>{
					console.log('文章分类',x)
					this.wztype = x.data
					
				}).catch(err=>{
				})
			},
			获取文章(){
				if(this.loading || (this.total!=-1 && this.total<=this.wzList.length)){
					return
				}
				this.query.page++
				this.loading = true
				this.$http('/api/article',this.query).then(x=>{
					console.log('文章',x)
					this.wzList = [...this.wzList,...x.data]
					this.total = x.total
					this.loading = false
				}).catch(err=>{
					this.loading = false
				})
			},
		},
		onLoad(option) {
			console.log(option)
			this.query.categoryId = option.categoryId ? option.categoryId : ''
			this.获取文章类型()
			this.获取文章()
			
		},
		onReachBottom(){
			console.log('滚动到底了')
			this.获取文章()
		}
	}
</script>

<style lang="scss">
page{
	background: #f6f6f6;
}

.typeList{
	display: flex;
	overflow: auto;
	white-space: nowrap;
	line-height: 40px;
	background: #fff;
	padding: 0px 5px;
	position: sticky;
	top: 0px;
	z-index: 1;
	border-bottom: 1px solid #eee;
	view{
		padding: 0px 10px;
	}
	.active{
		color: #409eff;
	}
}
.swiper-1{
	margin: 10px 15px 0px;
	.swiper-item{
		height: 100%;
		overflow: hidden;
		position: relative;
	}
	image{
		width: 100%;
		height: 100%;
	}
	text{
		position: absolute;
		left: 0px;
		bottom: 0px;
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		background: rgba($color: #000000, $alpha: 0.5);
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.list{
	margin: 0px 15px;
	padding: 0px 15px;
	background: #fff;
	.item{
		display: flex;
		padding: 10px 0px;
		border-bottom: 1px solid #eee;
	}
	.t1{
		flex-grow: 1;
		padding: 0px 10px;
	}
	image{
		width: 50px;
		height: 50px;
		flex-shrink: 0;
	}
}

</style>
