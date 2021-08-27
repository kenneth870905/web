<template>
	<view class="jiajianBtn">
		<view @click="jian()">-</view>
		<input type="number" v-model="data" @change="change" value="" />
		<view @click="jia()">+</view>
	</view>
</template>

<script>
	export default {
		model:{
			prop:'value',
			event:"input"
		},
		props:{
			min:{
				default:""
			},
			max:{
				default:""
			},
			value:{
				default:0
			}
		},
		data() {
			return {
				data:0
			};
		},
		mounted() {
			this.data = this.value
		},
		methods:{
			jian(){
				if(this.min!==''){
					if(this.data<=this.min) return
				}
				this.data--
			},
			jia(){
				if(this.max!==''){
					if(this.data>=this.max) return
				}
				this.data++
			},
			change(){
				var re = /^[0-9]+.?[0-9]*/
				if (!re.test(this.data)) {
					this.data = 0
			　　}
				this.data = this.data ? parseInt(this.data) : 0
				if(this.min!=='' || this.max!==''){
					if(this.min!=='' && this.data<=this.min){
						this.data = this.min
					} 
					if( this.max!=='' && this.data>=this.max) {
						this.data = this.max
					}
				}
				
			}
		},
		watch:{
			data(){
				// console.log(this.data,this.value)
				var data = ''
				if(this.min!==''){
					data = this.data<this.min ? this.min : this.data
				}else if(this.max!==''){
					data = this.data>this.max ? this.max : this.data
				}
				
				if(data==this.value){
					return
				}
				
				// if(this.data==this.value){
				// 	// console.log('第三部')
				// 	return
				// }
				
				this.$emit('input',data)
				
			},
			value(){
				this.data = this.value
			}
		}
	}
</script>

<style lang="scss" scoped>
.jiajianBtn{
	width: 70px;
	// height: 20px;
	display: flex;
	border-radius: 3px;
	border: 1px solid #c3c3c3;
	// overflow: hidden;
	view{
		line-height: 21px;
		width: 20px;
		flex-shrink: 0;
		text-align: center;
	}
	input{
		border-right: 1px solid #c3c3c3;
		border-left: 1px solid #c3c3c3;
		box-sizing: border-box;
		text-align: center;
		height: 21px;
		font-size: 10px;
	}
}
</style>
