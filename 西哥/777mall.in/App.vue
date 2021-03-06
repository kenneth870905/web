<script>
	import {mapState} from 'vuex'
export default {
	onLaunch: function() {
		// #ifndef APP-PLUS
			// if(this.color){
			// 	document.body.style.setProperty('--color',this.color);
			// }
		// #endif
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	computed:{
		...mapState({
			color:x=>x.color
		})
	},
};
//系统错误提示
// uni.showToast({ title:'Error, try again later', icon:'none' })

</script>

<style lang="scss">
// @import url("~@/static/icon/iconfont.css");

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

page{
	height: 100%;
	background: #f5f5f5;
	font-size: 14px;
}
:root {
	--color:#e62534; 
}

/* 自定义的顶部站位 */
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background: var(--color);
	position: sticky;
	top: 0px;
	left: 0px;
	z-index: 1;
}

.shadow{
	// box-shadow: 0px 0px 5px rgba(0,0,0,.15);
	@include shadow;
}
.padding10{
	padding: 10px;
}
*{
	box-sizing: border-box;
}

// 英文换行问题
uni-toast .uni-simple-toast__text{
	word-break:inherit;
}


</style>
