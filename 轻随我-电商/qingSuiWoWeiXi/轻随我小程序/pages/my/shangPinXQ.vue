<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">商品名称</view>
					<input class="uni-input" v-model="formData.name" placeholder="请输入商品名称" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">允许购买设定</view>
					<radio-group name="gender" @change="changeLeve">
						<label>
							<radio :value="0" :checked="formData.leve==0" /><text>所有人</text>
						</label>
						<label>
							<radio :value="1" :checked="formData.leve==1"/><text>一级二级会员</text>
						</label>
						<label>
							<radio :value="2" :checked="formData.leve==2"/><text>仅二级会员</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">一级价格</view>
					<input class="uni-input" v-model="formData.levelOnePrice" placeholder="请输入一级价格" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">二级价格</view>
					<input class="uni-input" v-model="formData.levelTwoPrice" placeholder="请输入二级价格" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">积分价格</view>
					<input class="uni-input" v-model="formData.creditPrice" placeholder="请输入积分价格" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">限购数量</view>
					<input class="uni-input" placeholder="0或者不填写表示不限购" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">是否返佣</view>
					<radio-group name="gender" @change="radioChange">
						<label>
							<radio value="0" :checked="formData.isKickback!=1" /><text>否</text>
						</label>
						<label>
							<radio value="1" :checked="formData.isKickback==1"/><text>是</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column" v-if="formData.isKickback==1">
					<view class="title">返佣比例（百分比数字）</view>
					<input class="uni-input" v-model="formData.kickbackRate" placeholder="请输入返佣比例如：5" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						详情
					</view>
					<view class='toolbar' @tap="format">
						<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
						<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
						<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize" data-value="24px"></view>
						<view class="iconfont icon-charutupian" @tap="insertImage"></view>
						<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header" :data-value="1"></view>
						<view class="iconfont icon-shanchu" @tap="clear"></view>
					</view>
					<!-- <textarea class="uni-input" auto-height /> -->
					<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize 
						@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
					</editor>
				</view>
							
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title">图片介绍</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in formData.imgs" :key="index">
								<view class="uni-uploader__file">
									<text @click="del(index)">删除</text>
									<image class="uni-uploader__img" :src="image" :data-src="image" mode="aspectFill"></image>
								</view>
							</block>
							<view class="uni-uploader__input-box">
								<view class="uni-uploader__input" @tap="chooseImage()"></view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="uni-btn-v">
					<button form-type="submit" type="warn">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	// var  graceChecker = require("../../../common/graceChecker.js");
	export default {
		data() {
			return {
				//商品详情
				formData:{
					id:"",
					name: "",
					leve: 0,			//level是允许购买的用户级别，比如level为1那一级和二级用户都可以购买，level为2那只有二级用户才可以购买
					levelOnePrice: '',
					levelTwoPrice: '', 
					creditPrice: '',	//creditPrice是积分价格
					isKickback: true,
					kickbackRate: 0,
					description: "",
					imgs:[],	//轮播图
					coverImg:""	//封面
				},
				
				//富文本编译器
				readOnly: false,
				formats:{},
				editorCtx:"",		//编译器对象
				
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
			}
		},
		methods: {
			changeLeve(e){
				this.formData.leve = e.target.value
			},
			//富文本=======
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			onEditorReady() {
				console.log(123)
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			format(e) {
				console.log(e)
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			//富文本=======
			
			radioChange(e){
				console.log(e.target.value)
				this.formData.isKickback = e.target.value
			},
			
			uploadImg(filePath){
				return new Promise((r,e)=>{
					uni.uploadFile({
						url:'http://8.210.239.106/api/upload',
						filePath:filePath,
						// files:this.formData.imgs,
						name:'file',
						success:(res)=>{
							r(res)
						},
						fail(err) {
							e(err)
						}
					})
				})
			},
			formSubmit:async function(e) {
				
				var html =await new Promise((resolve, reject)=>{
					this.editorCtx.getContents({
						success:(res)=>{
							resolve(res.html)
						}
					})
				})
				this.formData.description = html
				if(!this.formData.name || this.formData.name.match(/^[ ]+$/)){
					uni.showToast({title:"请输入名称",icon:'none'});
					return
				}else if(!this.formData.levelOnePrice){
					uni.showToast({title:"请输入一级价格",icon:'none'});
					return
				}else if(!this.formData.levelTwoPrice){
					uni.showToast({title:"请输入二级价格",icon:'none'});
					return
				}else if(!this.formData.creditPrice){
					uni.showToast({title:"请输入积分价格",icon:'none'});
					return
				}
				console.log('可以提交')
				uni.showLoading({
				    title: '加载中',
					mask:true
				});
				
				this.$http('/api/product',this.formData,'post').then(x=>{
					console.log(x)
					if(x.code===0){
						uni.showToast({ title:"添加成功", icon:'none' })
						uni.navigateBack()
					}else{
						uni.showToast({ title:"添加失败，请联系管理员", icon:'none' })
					}
				}).catch(err=>{
					uni.showToast({ title:"网络异常", icon:'none' })
				})
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			chooseImage: async function() {
				console.log('选择图片')
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				
				if (this.formData.imgs.length >= 9) {
					return;
				}
				uni.chooseImage({
					count:9,		//最多可以选择的图片张数，默认9
					success: (res) => {
						console.log(res)
						this.formData.imgs = [...this.formData.imgs,...res.tempFilePaths]
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						//好像是授权，不用管
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			del(index){
				this.formData.imgs.splice(index,1)
			}
		},
		onLoad() {
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
	}
</script>

<style scoped lang="scss">
	@import "./editor-icon.css";
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		font-size: 16px;
		line-height: 1.5;
	}
	.toolbar {
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	.iconfont{
	    display: inline-block;
	    padding: 8px 8px;
	    width: 24px;
	    height: 24px;
	    cursor: pointer;
	    font-size: 20px;
	}
	
	
	.uni-uploader {
		margin: 10px 0px 0px;
		background: #fff;
		padding: 10rpx 10rpx;
	}
	
	.uni-uploader__file{
		position: relative;
		border: 1px solid #eee;
		text{
			position: absolute;
			z-index: 1;
			background: red;
			font-size: 12px;
			color: #fff;
			padding: 0px 5px;
			top: 0px;
			right: 0px;
		}
	}
	
	textarea{
		// width: _opx(345);
		width: _opx(320);
		// box-sizing: border-box;
		min-height: 100px;
		// box-sizing: border-box;
	}
	
</style>
