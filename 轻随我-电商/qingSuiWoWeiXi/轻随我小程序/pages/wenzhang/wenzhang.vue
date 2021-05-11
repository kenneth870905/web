<template>
	<view class="wz">
		<view class="title-1">
			{{wz.title}}
		</view>
		<view class="time">
			{{wz.updatedAt}}
		</view>
		<view class="content">
			<rich-text :nodes="wz.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				wz:{
					title:"",
					content:"",
					updatedAt:""
				}
			};
		},
		methods:{
			获取文章(){
				this.$http(`/api/article/${this.id}`).then(x=>{
					if(x.code===0)
					// data.sp.description.replace(/<img/g, '<img style="max-width:100%;height:auto" ')
					this.wz = x.data
					this.wz.content = this.wz.content.replace(/<img/g, '<img style="max-width:100%;height:auto" ')
					this.wz.updatedAt = this.wz.updatedAt.substring(0,10)
				})
			}
		},
		onLoad(query) {
			console.log(query)
			this.id = query.id
			// this.id = 2
			this.获取文章()
		}
	}
</script>

<style lang="scss" scoped>
.wz{
	padding: 10px;
}
.title-1{
	font-size: 20px;
}
.time{
	font-size: 12px;
	color: #8c8c8c;
	margin: 5px 0px;
}
.content{
	font-size: 14px;
	line-height: 25px;
	margin-bottom: 20px;
}

</style>
