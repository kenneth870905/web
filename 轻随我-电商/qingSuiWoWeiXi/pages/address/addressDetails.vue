<template>
	<view>
		<view class="box-1">
			<uni-list >
				<uni-list-item @click="选择位置()">
					<view class="dingwei">
						<i class="icon iconfont iconposition"></i>
						<text>点击定位到当前位置</text>
						<!-- <i class="icon iconfont iconarrow-right"></i> -->
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- <uni-list>
			<uni-list-item :showArrow="false" title="列表文字" ></uni-list-item>
		</uni-list> -->
		
		<uni-list>
		    <uni-list-item :showArrow="false">
		        <view class="item">
					<text class="title-1">收件人：</text>
					<input type="text" v-model="dizhi.name" placeholder="请填写收件人姓名"/>
				</view>
		    </uni-list-item>
			<uni-list-item :showArrow="false">
			    <view class="item">
					<text class="title-1">手机号码：</text>
					<input type="number" v-model.number="dizhi.telephone" placeholder="请收入手机号码"/>
				</view>
			</uni-list-item>
			<uni-list-item :showArrow="false">
			    <view class="item">
					<text class="title-1">所在区域：</text>
					<picker mode="multiSelector" range-key="name" @columnchange="bindMultiPickerColumnChange" :value="index" :range="diqu">
						<view class="uni-input">{{diqu[0][index[0]].name}}，{{diqu[1][index[1]].name}}，{{diqu[2][index[2]].name}}</view>
					</picker>
					<!-- <input type="text" value="" placeholder="点击选择所在地区" disabled/> -->
				</view>
			</uni-list-item>
			<uni-list-item :showArrow="false">
			    <view class="item">
					<text class="title-1">详细地址：</text>
					<input type="text" value="" v-model="dizhi.address" placeholder="如街道、门牌、小区楼栋号等"/>
				</view>
			</uni-list-item>
		</uni-list>
		
		
		
		<view class="btn-1">
			<button type="default" v-if="id" @click="删除()" class="shanchu">删除收货地址</button>
			<button type="default" @click="提交()" class="baocun">保存收货地址</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import province from '@/static/diqu/province.js'
	import city from '@/static/diqu/city.js'
	import district from '@/static/diqu/district.js'
	// https://ext.dcloud.net.cn/plugin?id=1086
	// import pickrAddress from '../../components/wangding-pickerAddress/wangding-pickerAddress.vue'
	export default {
		components:{
			// pickerAddress
		},
		data() {
			return {
				id:"",
				dizhi:{
					"province":	"",
					"city":		"",
					"district":	"",
					"address":	"",		//详细地址
					"name":		"",		//收件人
					"telephone": ''
				},
				txt: '选择地址',
				diqu:[[],[],[]],
				index: [0, 0, 0],
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo
			}),
		},
		methods:{
			change1(data) {
				this.dizhi.province = data.data[0]
				this.dizhi.city = data.data[1]
				this.dizhi.district = data.data[2]
			},
			选择位置(){
				console.log('选择位置')
				uni.chooseLocation({
					success:(res)=>{
						console.log(res)
						if(res.errMsg=="chooseLocation:ok"){
							this.dizhi.address = res.address+' '+res.name
						}
					},
					fail:(err)=>{
						console.log(err)
						if(err.errMsg=='chooseLocation:fail auth deny'){
							uni.showModal({
								title:'提示',
								content:'打开地图失败，请在小程序设置中打开允许访问位置',
								showCancel:false
							})
						}
					}
				})
			},
			提交(){
				if(!this.dizhi.name){
					uni.showToast({
						title:'请输入收件人姓名',
						icon:'none'
					})
					return
				}else if( !(/^1[3456789]\d{9}$/.test(this.dizhi.telephone)) ){
					uni.showToast({
						title:'请输入手机号码',
						icon:'none'
					})
					return
				}else if(!this.dizhi.address){
					uni.showToast({
						title:'请输入详细地址',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title:'加载中'
				})
				var dizhi = Object.assign({},this.dizhi)
					dizhi.telephone = dizhi.telephone.toString()
					dizhi.province = this.diqu[0][this.index[0]].id
					dizhi.city = this.diqu[1][this.index[1]].id
					dizhi.district = this.diqu[2][this.index[2]].id
				if(!this.id){
					this.$http(`/api/user/${this.loginInfo.id}/address`,dizhi,'POST').then(x=>{
						console.log(x)
						if(x.code===0){
							uni.showToast({title:'保存成功'})
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
						}else{
							uni.showToast({ title:x.message, icon:'none' })
						}
					}).catch(err=>{
						uni.showToast({ title:'网络错误稍后再试', icon:'none' })
					})
				}else{
					delete dizhi.createdAt
					delete dizhi.deletedAt
					delete dizhi.updatedAt
					this.$http(`/api/user/${this.id}/address`,dizhi,'PUT').then(x=>{
						console.log(x)
						if(x.code===0){
							uni.showToast({title:'保存成功'})
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
						}else{
							uni.showToast({ title:x.message, icon:'none' })
						}
					}).catch(err=>{
						uni.showToast({ title:'网络错误稍后再试', icon:'none' })
					})
				}
			},
			bindMultiPickerColumnChange: function(e) {
				// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				var value = e.detail.value
				if(e.detail.column==0){
					var 省id = province[value].id 
					this.地区初始化(省id)
				}else if(e.detail.column==1){
					var 省id = this.diqu[0][this.index[0]].id
					var 市id = this.diqu[1][value].id
					console.log(市id)
					this.地区初始化(省id,市id)
				}else{
					var 省id = this.diqu[0][this.index[0]].id
					var 市id = this.diqu[1][this.index[1]].id
					var 县id = this.diqu[2][value].id
					this.地区初始化(省id,市id,县id)
				}
				// this.地区初始化()
			},
			地区初始化(a=false,b=false,c=false){
				console.log(a,b,c)
				this.$set(this.diqu,0,province)
				if(a){
					var i = province.findIndex(x=>x.id==a)
					this.$set(this.index,0,i)
					this.$set(this.diqu,1,city[a])
				}else{
					this.$set(this.diqu,1,city[province[0].id])
				}
				if(b){
					var i = this.diqu[1].findIndex(x=>x.id==b)
					this.$set(this.index,1,i)
					this.$set(this.diqu,2,district[b])
				}else{
					this.$set(this.index,1,0)
					this.$set(this.diqu,2,district[this.diqu[1][0].id])
				}
				if(c){
					var i = this.diqu[2].findIndex(x=>x.id==c)
					this.$set(this.index,2,i)
				}else{
					this.$set(this.index,2,0)
				}
			},
			删除(){
				uni.showModal({
					title:'提示',
					content:'确定删除？',
					success:(r)=>{
						if(r.confirm){
							uni.showLoading({
								title:'加载中'
							})
							this.$http(`/api/user/${this.id}/address`,{"id": parseInt(this.id)},'DELETE').then(x=>{
								if(x.code===0){
									uni.showToast({
										title:'删除成功'
									})
									setTimeout(()=>{
										uni.navigateBack()
									},1000)
								}else{
									uni.showToast({
										title:x.message,
										icon:'none'
									})
								}
							}).catch(err=>{
								uni.showToast({
									title:'系统错误稍后再试',
									icon:'none'
								})
							})
						}
					}
				})
			},
			查询详情(){
				this.$http(`/api/user/${this.loginInfo.id}/address/${this.id}`).then(x=>{
					if(x.code===0)
					this.dizhi = x.data
					this.地区初始化(this.dizhi.province,this.dizhi.city,this.dizhi.district)
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		mounted() {
			// this.地区初始化('130000000000')
		},
		onLoad(query) {
			this.id = query.id ? query.id : ''
			// this.id = 1
			if(!this.id){
				this.地区初始化()
			}else{
				this.查询详情()
			}
		}
	}
</script>

<style lang="scss" scoped>
.box-1{
	margin-bottom: 10px;
}
.dingwei{
	color: #a2813d;
	display: flex;
	align-items: center;
	text{
		font-size: 12px;
		width: 0;
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}

.pickerAddress{
		font-size: 14px;
}

.item{
	display: flex;
	align-items: center;
	.title-1{
		font-size: 14px;
		flex-shrink: 0;
	}
	input{
		font-size: 14px;
		flex: 1;
	}
}

.box-2{
	margin-top: 10px;
}

.flex-1{
	flex: 1;
}
.btn-1{
	padding: 5px;
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	button{
		flex: 1;
		height: 38px;
		line-height: 38px;
		font-size: 14px;
		color: #fff;
		border-radius: 38px;
		border: none;
		&::after{
			display: none;
		}
	}
	.baocun{
		background: #ebb867;
	}
	.shanchu{
		background: red;
		margin-right: 10px;
	}
}
</style>
