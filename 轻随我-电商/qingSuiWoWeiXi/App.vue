<script>
import {mapState} from 'vuex'
export default {
	computed:{
		...mapState({
			state:state=>state
		})
	},
	methods:{
		
	},
	onLaunch: function() {
		// console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		// console.log(this.state)
		this.$http('/api/config').then(x=>{
			if(x.code===0 && x.data){
				this.state.baseInfo = x.data
			}
		}).catch(err=>{
		})
	},
	onHide: function() {
		console.log('App Hide');
		
		// 图片地址
		// http://8.210.239.106/images/2020-12-06/13/50/ULVdJLrN2lzuVleF.png
		// http://8.210.239.106/images/2020-12-06/13/50/0Xxo8tm1QuLjcrMR.png
		// http://8.210.239.106/images/2020-12-06/13/50/YkQMe68sJ32CUJ7H.png
		// http://8.210.239.106/images/2020-12-06/13/50/noeIdMqZv9VxRDe5.png
		// http://8.210.239.106/images/2020-12-06/13/56/sI2TW3AzU4FfqC8b.png
		// https://sm.ms/  部分图片地址
		// https://i.loli.net/2020/12/06/3HXBJC9Lnhi64Ky.png   
	},
};
</script>

<style>
/* 注意
修改了common  通用样式第11行 
事项 */
	
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
/* #endif*/

page {
  background: #f5f5f5;
}

/* .iconfont{
	font-size: inherit !important;
} */


.Loading{
	text-align: center;
	line-height: 44px;
	color: #1f1f1f;
	font-size: 14px;
}
</style>
