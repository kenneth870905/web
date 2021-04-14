<template>
	<view class="zidingyiSelect">
		<view @click="setShouw()" v-if="$slots.header">
			<slot name="header"></slot>
		</view>
		<view v-else class="header" @click="setShouw()">
			{{value ? value.label : ''}}
		</view>
		<view class="list-box" v-if="show">
			<view class="list">
				<view :class="{active:item==value}" v-for="item in options" @click="xuanzhe(item)">{{item.label}}</view>
			</view>
		</view>
		<view class="bg" v-if="show" @click="close()"></view>
	</view>
</template>

<script>
export default{
	model:{
		prop:'value',
		event:"input"
	},
	props:{
		options: {
			type: Array,
			default () {
				return [
					{
					value: 'value',
					label: 'label'
				}]
			}
		},
		value:""
		// value:{
		// 	type: Object,
		// 	default: ()=>{return {}}
		// }
	},
	data() {
		return {
			show:false
		}
	},
	methods:{
		setShouw(){
			this.show = true
		},
		close(){
			this.show = false
			this.$emit('close')
		},
		xuanzhe(item){
			this.$emit('input',item)
			this.show=false
			this.$emit('close')
		}
	},
	mounted() {
		console.log(this.$slots)
	}
}
</script>

<style lang="scss" scoped>
	.zidingyiSelect{
		position: relative;
	}
	.header{
		height: 44px;
		background: #fff;
		line-height: 44px;
		padding: 0px 15px;
		border: 1px solid #c7c7c7;
	}
	.list-box{
		overflow: auto;
		padding-bottom: 50px;
		position: absolute;
		top: 100%;
		left: 0px;
		width: 100%;
		z-index: 11;
		max-height: 300px;
	}
	.list{
		line-height: 40px;
		background: #fff;
		box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
		view{
			padding: 0px 10px;
		}
		.active{
			background: #F5F7FA;
		}
	}
	.bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba($color: #000000, $alpha: 0.1);
		z-index: 10;
	}
</style>
