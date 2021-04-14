<template>
	<view class="card">
		<view class="from">
			<view :class="{active:className=='BankName'}">
				<text>Bank Name</text>
				<input @focus="className='BankName'" @blur="className=''" type="text" v-model="card.bankname" />
			</view>
			<view :class="{active:className=='AccountName'}">
				<text>Account Name</text>
				<input type="text" value="" @focus="className='AccountName'" @blur="className=''" v-model="card.accountname"/>
			</view>
			<view :class="{active:className=='UPI'}">
				<text>UPI</text>
				<input type="text" value="" @focus="className='UPI'" @blur="className=''" v-model="card.upi"/>
			</view>
			<view :class="{active:className=='IFSC'}">
				<text>IFSC</text>
				<input type="text" value="" @focus="className='IFSC'" @blur="className=''" v-model="card.ifsc"/>
			</view>
			<view :class="{active:className=='Email'}">
				<text>Email</text>
				<input type="text" value="" @focus="className='Email'" @blur="className=''" v-model="card.email"/>
			</view>
			<!-- <view :class="{active:className=='Mobile'}">
				<text>Mobile</text>
				<view class="input-1">
					<text>+91</text>
					<input type="text" value="" @focus="className='Mobile'" @blur="className=''"/>
				</view>
			</view> -->
			
			<!-- <view :class="{active:className=='Sate'}">
				<text>Sate</text>
				<input type="text" value="" @focus="className='Sate'" @blur="className=''" />
			</view>
			<view :class="{active:className=='City'}">
				<text>City</text>
				<input type="text" value="" @focus="className='City'" @blur="className=''" />
			</view>
			<view :class="{active:className=='Address'}">
				<text>Address</text>
				<input type="text" value="" @focus="className='Address'" @blur="className=''"  />
			</view> -->
		</view>
		
		<view class="btn-1" @click="submit()">Submit</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				card:{
					bankname:"",
					accountname:"",
					upi:"",
					ifsc:"",
					email:""
				},
				className:""
			};
		},
		methods:{
			submit(){
				var kong= /^\s*$/g;
				if(kong.test(this.card.bankname)){
					uni.showToast({icon:'none',title:'Please enter bankname'})
				}else if(kong.test(this.card.accountname)){
					uni.showToast({icon:'none',title:'Please enter Account Name'})
				}else if(kong.test(this.card.upi)){
					uni.showToast({icon:'none',title:'Please enter UPI'})
				}else if(kong.test(this.card.ifsc)){
					uni.showToast({icon:'none',title:'Please enter IFSC'})
				}else if(kong.test(this.card.email)){
					uni.showToast({icon:'none',title:'Please enter Email'})
				}else{
					this.$http('/CardSet',this.card,'post').then(res=>{
						if(res.result){
							uni.showToast({icon:'none' , title:'Set successfully'})
							uni.navigateBack({})
						}else{
							uni.showToast({icon:'none' , title:res.msg})
						}
					}).catch(err=>{
						uni.showToast({icon:'none' , title:'Error, try again later'})
					})
				}
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.card{
		padding: 1px 15px;
	}
.from{
	color: #797979;
	margin-top: 25px;
	font-size: 12px;
	>view{
		margin: 0px 0px 35px;
		border-bottom: 1px solid #d7d7d7;
		position: relative;
		&.active{
			color:#2196f3 ;
			&::after{
				width: 100%;
			}
		}
		&::after{
			position: absolute;
			width: 0;
			left:0px;
			right:0px;
			bottom: 0px;
			margin: auto;
			height: 2px;
			background: #2196f3;
			content: '';
			transition: all 0.3s;
		}
	}
	input{
		height: 30px;
		color: #000;
		font-size: 14px;
	}
	.input-1{
		display: flex;
		align-items: center;
		input{
			flex: 1;
			margin: 0px 0px 0px 5px;
		}
	}
}

.btn-1{
	background: var(--color);
	line-height: 44px;
	text-align: center;
	border-radius: 5px;
	color: #fff;
	margin: 20px 0px;
}

</style>
