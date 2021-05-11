<template>
	<view class="wenzhang">
		<view class="t1">
			{{wz.title}}
		</view>
		<view class="t2">
			<text></text>
			<text>{{wz.createdAt}}</text>
		</view>
		<rich-text :nodes="wz.content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				wz:{
					title:"",
				}
			};
		},
		methods:{
			获取文章(){
				this.$http(`/api/article/${this.id}`,'').then(x=>{
					console.log('文章',x)
					let data =x.data
						data.content = data.content ? data.content.replace(/<img/g, '<img style="max-width:100%;height:auto" ') : ''
						console.log(data)
					this.wz = data
				}).catch(err=>{
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			// this.id = 3
			this.获取文章()
		}
	}
</script>

<style lang="scss">
	.wenzhang{
		padding: 15px;
	}
.t1{
	font-size: 30px;
}
.t2{
	margin: 0px 0px 15px 0px;
	display: flex;
	font-size: 12px;
	color: rgba($color: #000000, $alpha: 0.5);
	text{
		margin: 0px 10px 0px 0px;
	}
}
</style>
