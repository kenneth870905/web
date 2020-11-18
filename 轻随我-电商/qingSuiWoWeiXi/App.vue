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

.iconfont{
	font-size: inherit !important;
}
</style>
