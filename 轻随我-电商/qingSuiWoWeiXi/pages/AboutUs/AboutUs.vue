<template>
	<view class="aboutUs">
		<rich-text :nodes="description"></rich-text>
	</view>
</template>

<script>
	import { mapState , mapMutations  } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				baseInfo:x=>x.baseInfo
			}),
			description(){
				return this.baseInfo.introduction ? this.baseInfo.introduction.replace(/<img/g, '<img style="max-width:100%;height:auto" ') : ''
			}
		},
		methods:{
			...mapMutations ({
				setItem:"setItem"
			}),
			getConfig(){
				this.$http('/api/config').then(x=>{
					if(x.code===0 && x.data){
						this.setItem(['baseInfo',x.data])
					}
				}).catch(err=>{
				})
			}
		},
		mounted() {
				this.getConfig()
		}
	}
</script>

<style lang="scss" scoped>
.aboutUs{
	padding: 15px 5px;
}
</style>
