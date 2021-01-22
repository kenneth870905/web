<template>
	<view class="card">
		<view class="from">
			<view :class="{active:className=='BankName'}">
				<text>Bank Name</text>
				<input @focus="className='BankName'" @blur="className=''" type="text" value="" />
			</view>
			<view :class="{active:className=='IFSC'}">
				<text>IFSC</text>
				<input type="text" value="" @focus="className='IFSC'" @blur="className=''"/>
			</view>
			<view :class="{active:className=='AccountName'}">
				<text>Account Name</text>
				<input type="text" value="" @focus="className='AccountName'" @blur="className=''"/>
			</view>
			<view :class="{active:className=='UPI'}">
				<text>UPI</text>
				<input type="text" value="" @focus="className='UPI'" @blur="className=''"/>
			</view>
			<view :class="{active:className=='Mobile'}">
				<text>Mobile</text>
				<view class="input-1">
					<text>+91</text>
					<input type="text" value="" @focus="className='Mobile'" @blur="className=''"/>
				</view>
			</view>
			<view :class="{active:className=='Email'}">
				<text>Email</text>
				<input type="text" value="" @focus="className='Email'" @blur="className=''" />
			</view>
			<view :class="{active:className=='Sate'}">
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
			</view>
		</view>
		
		<view class="btn-1">Submit</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				className:''
			};
		},
		methods:{
			
		}
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
	background: #2196f3;
	line-height: 44px;
	text-align: center;
	border-radius: 5px;
	color: #fff;
	margin: 20px 0px;
}

</style>
