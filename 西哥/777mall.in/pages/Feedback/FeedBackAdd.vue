<template>
	<view class="FeedBackAdd">
		<view class="input-box" :class="{ok:obj.Type,focus:focusName=='Type'}">
			<text>Type</text>
			<azidingyiSelect v-model="obj.Type" :options="options" @close="focusName=''">
				<view class="header-1" slot="header" @click="focusName='Type'">
					<text>{{obj.Type ? obj.Type.label : ""}}</text>
					<uni-icons type="arrowdown"></uni-icons>
				</view>
			</azidingyiSelect>
		</view>
		<view class="input-box" :class="{ok:obj.whatsapp,focus:focusName=='whatsapp'}">
			<text>whatsapp</text>
			<input type="text" v-model="obj.whatsapp" value="" @focus="focusName='whatsapp'" @blur="focusName=''"/>
		</view>
		<view class="input-box" :class="{ok:obj.OuterID,focus:focusName=='OuterID'}">
			<text>Outer ID</text>
			<input type="text" v-model="obj.OuterID" value="" @focus="focusName='OuterID'" @blur="focusName=''"/>
		</view>
		<view class="input-box" :class="{ok:obj.Content,focus:focusName=='Content'}">
			<text>Content</text>
			<input type="text" v-model="obj.Content" value="" @focus="focusName='Content'" @blur="focusName=''"/>
		</view>
		
		<view class="message">
			Service: 10:00~17:00, Mon~Fri about 1~5 business days
		</view>
		
		<view class="btn-1">
			Continue
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:[
					{
						value: 'value',
						label: 'label'
					},
					{
						value: 'value1',
						label: 'label1'
					},
					{
						value: 'value2',
						label: 'label2'
					}
				],
				val:{
					value: 'value',
					label: 'label'
				},
				obj:{
					Type:'',
					whatsapp:"",
					OuterID:"",
					Content:""
				},
				focusName:""
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.FeedBackAdd{
	padding: 30px;
}
.input-box{
	height: 32px;
	position: relative;
	border-bottom: 1px solid #d7d7d7;
	margin: 20px 0px 50px;
	&::after{
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
		width: 0px;
		height: 2px;
		margin: 0px auto;
		content: '';
		background: #2196f3;
		transition: all 0.3s;
	}
	&.focus{
		&::after{
			width: 100%;
		}
		>text{
			font-size: 12px;
			top: -18px;
			color: #2196f3;
		}
	}
	&.ok{
		>text{
			font-size: 12px;
			top: -18px;
		}
	}
	>text{
		position: absolute;
		color: rgba(0,0,0,.38);
		left: 0px;
		top: 5px;
		transition: all 0.3s;
	}
	input{
		height: 100%;
	}
	.header-1{
		height: 32px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

.message{
	color: #7d7d7d;
	text-align: center;
}


.btn-1{
	width: 100px;
	line-height: 40px;
	color: #fff;
	background: #009688;
	margin: 20px auto;
	text-align: center;
}

</style>
