<template>
    <ul class="操作" ref="操作" :style="styles" v-show="操作.show">
        <li @click="撤销消息()">
            <span class="icon_1">
                <i class="icon_chehui el-icon-warning"></i>
            </span>
            撤回/删除
        </li>
        <li>
            <span class="icon_1">
            </span>
            更多1
        </li>
        <li>
            <span class="icon_1">
            </span>
            其他
        </li>
    </ul>
</template>

<script>
import { mapState , mapActions} from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    inject:['隐藏操作'],
    computed: {
        ...mapState({
            操作:x=>x.聊天室.操作
        }),
        styles(){
            return {top:this.操作.top+'px',left:this.操作.left+'px'} 
        }
    },
    methods: {
        ...mapActions({
            撤销消息:'聊天室/撤销消息' 
        })
    },
    mounted() {
        var click1=(e)=>{
            console.log(e.target)
            // console.log(e);
            // console.log(e.target)
            if(e.target==this.$refs.操作){
                console.log('是的点对了')
            }else{
                console.log('隐藏')
                // this.操作.show=false
                this.隐藏操作()
            }
        }
        document.querySelector('body').addEventListener('click',click1)
        // document.querySelector('body').addEventListener('click',function(e){
        //     console.log(e);
        // })
        // setTimeout(() => {
        //     document.querySelector('body').removeEventListener('click',click1)        
        // }, 3000);
    },
}
</script>

<style lang="scss" scoped>
.操作{
    position: fixed;
    top: 319px;
    left: 316px;
    width: 200px;
    height: 250px;
    background: #eeeeee;
    border: 1px solid #bababa;
    box-shadow: 2px 2px 3px 0px #949494;
    font-size: 13px;
    padding: 5px 0px;
    box-sizing: border-box;
    z-index: 1;
    li{
        padding:0px 10px;
        height: 24px;
        display: flex;
        align-items: center;
        &:hover{
            background: #ffffff;
        }
    }
    .icon_1{
        width: 20px;
        flex-shrink: 0;
        font-size: 20px;
        margin: 0px 5px 0px 0px;
    }
    .icon_chehui{
        color: #d25959;
    }
}

</style>