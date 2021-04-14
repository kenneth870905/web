<template>
	<view class="content">
		<view class="box-1">
			<view class="tabs">
				<text class="Result" :class="{active:gid==10001}" @click="gid=10001">{{game[10001] ? game[10001].name : ''}}</text>
				<text class="Charts" :class="{active:gid==10002}" @click="gid=10002">{{game[10002] ? game[10002].name : ''}}</text>
				<text class="Charts" :class="{active:gid==10003}" @click="gid=10003">{{game[10003] ? game[10003].name : ''}}</text>
				<text class="Charts" :class="{active:gid==10004}" @click="gid=10004">{{game[10004] ? game[10004].name : ''}}</text>
			</view>
			<view class="tabs">
				<text class="Result" :class="{active:tabs=='Result'}" @click="tabs='Result'">Result</text>
				<text class="Charts" :class="{active:tabs=='Charts'}" @click="tabs='Charts'">Charts</text>
			</view>
		</view>
		
		<view class="box-2">
			<kjhm :gid="gid" v-if="tabs=='Result'"/>
			<zs :gid="gid" v-if="tabs=='Charts'"/>
		</view>
	</view>
</template>

<script>
	let kjhm=()=>import('./开奖记录/开奖号码.vue')
	let zs=()=>import('./开奖记录/走势.vue')
	// import kjhm from './开奖记录/开奖号码.vue'
	import { mapState  , mapActions } from 'vuex'
	export default {
		components:{
			kjhm,
			zs
		},
		data() {
			return {
				gid:10001,
				tabs:'Charts',	//Result  
				query:{
					gid:10001,
					page:1,
					size:10
				},
			};
		},
		computed:{
			...mapState({
				game:x=>x.game
			}),
		},
		methods:{
			...mapActions({
				getGame:"getGame"
			}),
		},
		onLoad() {
			if(Object.keys(this.game).length==0){
				this.getGame()
			}
		},
		onReachBottom(){
			console.log('滚动到底部')
		}
	}
</script>

<style lang="scss" scoped>
.content{
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
}
.box-1{
	flex-shrink: 0;
}
.box-2{
	flex: 1;
	height: 0px;
}
.tabs{
	line-height: 36px;
	display: flex;
	background: #fff;
	border-bottom: 1px solid #eee;
	.active{
		border-bottom: 1px solid var(--color);
		color: var(--color);
	}
	text{
		border-bottom: 1px solid #fff;
		flex: 1;
		text-align: center;
	}
}
</style>
