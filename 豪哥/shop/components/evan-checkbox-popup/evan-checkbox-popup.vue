<template>
	<view class="evan-checkbox-popup">
		<view class="evan-checkbox-popup__trigger" @click="openPopup">
			<slot name="trigger" :label="label"></slot>
			<slot></slot>
		</view>
		<uni-popup @change="onPopupChange" ref="popup" type="bottom" :maskClick="maskClick">
			<view class="evan-checkbox-popup__target">
				<view class="evan-checkbox-popup__target__header">
					<text @click="onCancel" class="evan-checkbox-popup__target__header__cancel">{{cancelText}}</text>
					<text class="evan-checkbox-popup__target__header__title">{{title}}</text>
					<text @click="onConfirm" class="evan-checkbox-popup__target__header__confirm" :style="{color:primaryColor}">{{confirmText}}</text>
				</view>
				<scroll-view scroll-y="true" class="evan-checkbox-popup__target__body">
					<evan-checkbox-group :max="max" v-model="currentValue">
						<view @click="toggleCheckbox(index)" class="evan-checkbox-popup__target__body__listitem" v-for="(item,index) in options"
						 :key="item[optionValue]">
							<text class="evan-checkbox-popup__target__body__listitem__label" :style="{color:isChecked(item[optionValue])?primaryColor:'#333'}">{{item[optionLabel]}}</text>
							<evan-checkbox :primaryColor="primaryColor" ref="checkbox" :preventClick="true" :label="item[optionValue]">
								<template slot="icon">
									<view>
										<template v-if="isChecked(item[optionValue])">
											<uni-icons type="checkmarkempty" size="25" :color="primaryColor"></uni-icons>
										</template>
									</view>
								</template>
							</evan-checkbox>
						</view>
					</evan-checkbox-group>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import EvanCheckbox from '@/components/evan-checkbox/evan-checkbox.vue'
	import EvanCheckboxGroup from '@/components/evan-checkbox-group/evan-checkbox-group.vue'
	export default {
		name: 'EvanCheckboxPopup',
		components: {
			uniPopup,
			EvanCheckbox,
			EvanCheckboxGroup
		},
		props: {
			options: {
				type: Array,
				default: () => []
			},
			value: {
				type: Array,
				default: null
			},
			primaryColor: {
				type: String,
				default: '#108ee9'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			title: {
				type: String,
				default: '请选择'
			},
			optionLabel: {
				type: String,
				default: 'label'
			},
			optionValue: {
				type: String,
				default: 'value'
			},
			max: {
				type: Number,
				default: null
			},
			labelSeparator: {
				type: String,
				default: ','
			},
			maskClick: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			label() {
				if (!this.value || this.value.length === 0) {
					return ''
				}
				return this.options
					.filter((op) => this.value.includes(op[this.optionValue]))
					.map((item) => item[this.optionLabel])
					.join(this.labelSeparator)
			}
		},
		data() {
			return {
				currentValue: null,
				maskClose: true // 是否由点击遮罩层关闭
			}
		},
		methods: {
			openPopup() {
				this.currentValue = Object.assign([], this.value)
				this.$refs.popup.open()
			},
			closePopup() {
				this.maskClose = false
				this.$refs.popup.close()
			},
			onCancel() {
				this.closePopup()
				this.$emit('cancel', this.currentValue)
			},
			onConfirm() {
				this.closePopup()
				const objArr = this.options.filter((op) => this.currentValue && this.currentValue.includes(op[this.optionValue]))
				this.$emit('input', this.currentValue)
				this.$emit('confirm', this.currentValue)
				this.$emit('objConfirm', objArr)
			},
			toggleCheckbox(index) {
				this.$refs.checkbox[index].toggle()
			},
			onPopupChange(e) {
				// 捕捉uniPopup点击遮罩层关闭事件
				if (!e.show) {
					if (this.maskClose) {
						this.$emit('cancel', this.currentValue)
					}
					this.maskClose = true
				}
			},
			isChecked(value) {
				return this.currentValue && this.currentValue.includes(value)
			},
			selectAll() {
				this.currentValue = this.options.map((item) => item[this.optionValue])
				this.$emit('input', this.currentValue)
			},
			selectReverse() {
				let current = Object.assign([], this.currentValue)
				this.currentValue = this.options.filter((item) => !current.includes(item[this.optionValue])).map((item) => item[
					this.optionValue])
				this.$emit('input', this.currentValue)
			},
			clearAll() {
				this.currentValue = []
				this.$emit('input', this.currentValue)
			}
		}
	}
</script>

<style lang="scss">
	.evan-checkbox-popup {}

	.evan-checkbox-popup__target {}

	.evan-checkbox-popup__target__header {
		height: 54px;
		background-color: #f7f7f7;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		font-size: 16px;
	}

	.evan-checkbox-popup__target__header__cancel {
		color: #999;
		padding: 0 15px;
	}

	.evan-checkbox-popup__target__header__title {
		color: #333;
		flex: 1;
		text-align: center;
	}

	.evan-checkbox-popup__target__header__confirm {
		padding: 0 15px;
	}

	.evan-checkbox-popup__target__body {
		background-color: #fff;
		/* #ifndef APP-NVUE */
		max-height: 350px;
		/* #endif */
		/* #ifdef APP-NVUE */
		maxHeight: 350px;
		/* #endif */
	}

	.evan-checkbox-popup__target__body__listitem {
		align-items: center;
		height: 50px;
		padding: 0 15px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #eee;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
	}

	.evan-checkbox-popup__target__body__listitem__label {
		font-size: 16px;
		color: #333;
		flex: 1;
		margin-right: 6px;
	}
</style>
