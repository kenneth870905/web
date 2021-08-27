<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">意见反馈</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="title">标题</div>
                <input type="text" v-model="obj.title" placeholder="请输入标题">
                <div class="title">反馈类型</div>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="obj.feedbacktype" :options="option1" />
                </van-dropdown-menu>
                <div class="title">内容</div>
                <textarea placeholder="请输入反馈" v-model="obj.content"></textarea>     
            </div>
            <btn @click.native="提交()" />

        </div>
    </div>
</template>

<script>
import { mapMutations} from "vuex";
import { api_添加反馈 } from "@/api/反馈接口.js";
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            obj:{
                title:"",
                feedbacktype:"产品BUG",
                content:""
            },
            option1: [
                { text: '产品BUG', value: '产品BUG' },
                { text: '吐槽', value: '吐槽' },
                { text: '功能建议', value: '功能建议' },
                { text: '其他', value: '其他' }
            ],
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        async 提交(){
            var kong = /^\s+$/;
            // console.log(kong.test(this.意见))
            // console.log(this.意见.match(kong))
            if(!this.obj.title || kong.test(this.obj.title)){
                this.$toast('请输入标题')
                return
            }else if(!this.obj.content || kong.test(this.obj.content)){
                this.$toast('请输入反馈内容')
                return
            }
            this.加载中(true);
            try {
                var r = await api_添加反馈(this.obj)
            } catch (error) {
                this.$toast('系统错误稍后再试')
                this.加载中(false);
                return
            }
            this.加载中(false);
            if(r.data.code==0){
                this.$toast('提交成功');
                history.back();
            }else{
                this.$toast(r.data.msg);
            }

        }
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    font-size: _vw(14);
    .title{
        line-height: _vw(44);
        padding: 0px _vw(15);
    }
    input{
        margin: 0px;
        padding: 0px _vw(15);
        border:none;
    }
    .van-dropdown-menu{
        height: _vw(44);
    }
    /deep/ .van-dropdown-menu__item{
        justify-content: flex-start;
        padding: 0px 5px;
    }
    textarea{
        border: none;
        min-height: 100px;
    }
}
</style>