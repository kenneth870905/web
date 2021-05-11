<template>
	<view>
		<!-- <view class="box-1">
			<uni-list>
				<uni-list-item @click="changeWz()" clickable>
					<view slot="body" class="dingwei">
						<uni-icons type="location-filled"></uni-icons>
						<text>点击定位到当前位置</text>
					</view>
				</uni-list-item>
			</uni-list>
		</view> -->
		<view class="title">
			提示:请在下方填写收件人地址
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item :showArrow="false">
					<view class="item" slot="body">
						<text class="title-1">收件人：</text>
						<input type="text" v-model="dizhi.name" placeholder="请填写收件人姓名" />
					</view>
				</uni-list-item>
				<uni-list-item :showArrow="false">
					<view class="item" slot="body">
						<text class="title-1">手机号码：</text>
						<input type="number" v-model.number="dizhi.telephone" placeholder="请收入手机号码" />
					</view>
				</uni-list-item>
				<uni-list-item :showArrow="false">
					<view class="item" slot="body">
						<text class="title-1">所在区域：</text>
						<picker mode="multiSelector" range-key="name" @columnchange="bindMultiPickerColumnChange" :value="index" :range="diqu">
							<view class="uni-input">{{diqu[0][index[0]].name}}，{{diqu[1][index[1]].name}}，{{diqu[2][index[2]].name}}</view>
						</picker>
					</view>
				</uni-list-item>
				<!-- <uni-list-item :showArrow="false">
					<view class="item" slot="body">
						<text class="title-1">详细地址：</text>
						<input type="text" value="" v-model="dizhi.address" placeholder="如街道、门牌、小区楼栋号等"/>
					</view>
				</uni-list-item> -->
				<uni-list-item  :showArrow="true" >
					<picker slot="body" :range="schoolList" range-key="name" @change="change_1" :value="school_index">
						<view class="item">
							<text class="title-1">学校：</text>
							<input type="text" value="" disabled="" v-model="dizhi.address" placeholder="请选择学校"/>
						</view>
					</picker>
				</uni-list-item>
				<uni-list-item  :showArrow="true" >
					<picker slot="body" :range="list" range-key="name" @change="change2" :value="banji_index">
						<view class="item">
							<text class="title-1">班级：</text>
							<input type="text" value="" disabled="" v-model="dizhi.class" placeholder="请选择学校"/>
						</view>
					</picker>
				</uni-list-item>
				<!-- <uni-list-item :showArrow="false">
					<view class="item" slot="body">
						<text class="title-1">班级：</text>
						<input type="text" value="" v-model="dizhi.class" placeholder="请输入班级"/>
					</view>
				</uni-list-item> -->
			</uni-list>
		</view>
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
	export default {
		components: {
		},
		data() {
			return {
				banji_index:0,
				list: [],	//班级列表
				school_index:0,
				schoolList:[],	//学校	
				
				id: "",
				dizhi: {
					"province": "",	
					"city": "",
					"district": "",
					"address": "", //详细地址
					"name": "", //收件人
					"telephone": '',
					class:""	//班级
				},
				txt: '选择地址',
				diqu: [
					[],
					[],
					[]
				],
				index: [0, 0, 0],
			};
		},
		computed: {
			...mapState({
				loginInfo: x => x.loginInfo
			}),
		},
		methods: {
			xuanzebanji(){
				console.log('选择班级')
			},
			change_1(e){
				this.school_index = e.detail.value
				this.dizhi.address = this.schoolList[this.school_index].name
			},
			change2(e){
				this.banji_index = e.detail.value
				this.dizhi.class = this.list[this.banji_index].name
			},
			go() {
				uni.navigateTo({
					url: "../select/select"
				})
			},
			getValue(e, type) {
				switch (type) {
					case 'json':
						this.index = e;
						break;
					case 'common':
						this.city = e;
						break;
					case 'common2':
						this.city2 = e;
						break;
					case 'common3':
						this.city3 = e;
						break;
					default:
						break;
				}
				console.log(e);
			},
			change1(data) {
				this.dizhi.province = data.data[0]
				this.dizhi.city = data.data[1]
				this.dizhi.district = data.data[2]
			},
			// 选择位置
			changeWz() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						if (res.errMsg == "chooseLocation:ok") {
							this.dizhi.address = res.address + ' ' + res.name
						}
					},
					fail: (err) => {
						console.log(err)
						if (err.errMsg == 'chooseLocation:fail auth deny') {
							uni.showModal({
								title: '提示',
								content: '打开地图失败，请在小程序设置中打开允许访问位置',
								showCancel: false
							})
						}
					}
				})
			},
			提交() {
				if (!this.dizhi.name) {
					uni.showToast({
						title: '请输入收件人姓名',
						icon: 'none'
					})
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.dizhi.telephone))) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return
				} else if (!this.dizhi.address) {
					uni.showToast({
						title: '请输选择学校',
						icon: 'none'
					})
					return
				} else if (!this.dizhi.class) {
					uni.showToast({
						title: '请输选择班级',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '加载中'
				})
				var dizhi = Object.assign({}, this.dizhi)
				dizhi.telephone = dizhi.telephone.toString()
				dizhi.province = this.diqu[0][this.index[0]].id
				dizhi.city = this.diqu[1][this.index[1]].id
				dizhi.district = this.diqu[2][this.index[2]].id
				if (!this.id) {
					this.$http(`/api/user/${this.loginInfo.id}/address`, dizhi, 'POST').then(x => {
						console.log(x)
						if (x.code === 0) {
							uni.showToast({
								title: '保存成功'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						} else {
							uni.showToast({
								title: x.message,
								icon: 'none'
							})
						}
					}).catch(err => {
						uni.showToast({
							title: '网络错误稍后再试',
							icon: 'none'
						})
					})
				} else {
					delete dizhi.createdAt
					delete dizhi.deletedAt
					delete dizhi.updatedAt
					this.$http(`/api/user/${this.id}/address`, dizhi, 'PUT').then(x => {
						console.log(x)
						if (x.code === 0) {
							uni.showToast({
								title: '保存成功'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						} else {
							uni.showToast({
								title: x.message,
								icon: 'none'
							})
						}
					}).catch(err => {
						uni.showToast({
							title: '网络错误稍后再试',
							icon: 'none'
						})
					})
				}
			},
			bindMultiPickerColumnChange: function(e) {
				// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				var value = e.detail.value
				if (e.detail.column == 0) {
					var 省id = province[value].id
					this.地区初始化(省id)
				} else if (e.detail.column == 1) {
					var 省id = this.diqu[0][this.index[0]].id
					var 市id = this.diqu[1][value].id
					console.log(市id)
					this.地区初始化(省id, 市id)
				} else {
					var 省id = this.diqu[0][this.index[0]].id
					var 市id = this.diqu[1][this.index[1]].id
					var 县id = this.diqu[2][value].id
					this.地区初始化(省id, 市id, 县id)
				}
				// this.地区初始化()
			},
			地区初始化(a = false, b = false, c = false) {
				console.log(a, b, c)
				this.$set(this.diqu, 0, province)
				if (a) {
					var i = province.findIndex(x => x.id == a)
					this.$set(this.index, 0, i)
					this.$set(this.diqu, 1, city[a])
				} else {
					this.$set(this.diqu, 1, city[province[0].id])
				}
				if (b) {
					var i = this.diqu[1].findIndex(x => x.id == b)
					this.$set(this.index, 1, i)
					this.$set(this.diqu, 2, district[b])
				} else {
					this.$set(this.index, 1, 0)
					this.$set(this.diqu, 2, district[this.diqu[1][0].id])
				}
				if (c) {
					var i = this.diqu[2].findIndex(x => x.id == c)
					this.$set(this.index, 2, i)
				} else {
					this.$set(this.index, 2, 0)
				}
			},
			删除() {
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					success: (r) => {
						if (r.confirm) {
							uni.showLoading({
								title: '加载中'
							})
							this.$http(`/api/user/${this.id}/address`, {
								"id": parseInt(this.id)
							}, 'DELETE').then(x => {
								if (x.code === 0) {
									uni.showToast({
										title: '删除成功'
									})
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)
								} else {
									uni.showToast({
										title: x.message,
										icon: 'none'
									})
								}
							}).catch(err => {
								uni.showToast({
									title: '系统错误稍后再试',
									icon: 'none'
								})
							})
						}
					}
				})
			},
			查询详情() {
				this.$http(`/api/user/${this.loginInfo.id}/address/${this.id}`).then(x => {
					if (x.code === 0)
						this.dizhi = x.data
					this.地区初始化(this.dizhi.province, this.dizhi.city, this.dizhi.district)
				}).catch(err => {
					console.log(err)
				})
			},
			查询班级(){
				this.$http(`/api/class`,'').then(x=>{
					if(x.code==0) this.list = x.data
				})
			},
			查询学校(){
				this.$http(`/api/school`,'').then(x=>{
					if(x.code==0) this.schoolList = x.data
				})
			}
		},
		mounted() {
			// this.地区初始化('130000000000')
		},
		onLoad(query) {
			this.id = query.id ? query.id : ''
			// this.id = 1
			if (!this.id) {
				this.地区初始化()
			} else {
				this.查询详情()
			}
			this.查询班级()
			this.查询学校()
			
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		padding: 12px 15px;
		font-size: 14px;
		color: rgba($color: #000000, $alpha: 0.6);
	}
	.list{
		margin-top: 10px;
	}
	picker{
		width: 100%;
	}
	.box-1 {
		margin-bottom: 10px;
	}

	.dingwei {
		flex: 1;
		color: #a2813d;
		display: flex;
		align-items: center;

		text {
			font-size: 12px;
			width: 0;
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.pickerAddress {
		font-size: 14px;
	}

	.item {
		width: 100%;
		display: flex;
		align-items: center;

		.title-1 {
			font-size: 14px;
			flex-shrink: 0;
		}

		input {
			font-size: 14px;
			flex: 1;
		}
	}

	.box-2 {
		margin-top: 10px;
	}

	.flex-1 {
		flex: 1;
	}

	.btn-1 {
		padding: 5px;
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		box-sizing: border-box;
		display: flex;

		button {
			flex: 1;
			height: 38px;
			line-height: 38px;
			font-size: 14px;
			color: #fff;
			border-radius: 38px;
			border: none;

			&::after {
				display: none;
			}
		}

		.baocun {
			background: #ebb867;
		}

		.shanchu {
			background: red;
			margin-right: 10px;
		}
	}
</style>
