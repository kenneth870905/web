<template>
    <div class="load">
        <div class="钩子" ref="div"></div>
        <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
        <van-empty v-if="!loading && total==0" :description="text ? text : '暂无数据'" />
        <div class="text" v-if="!loading && total>0 && total<=length">没有更多了</div>
    </div>
</template>

<script>
export default {
    props:{
        loading:{
            default:false
        },
        total:{
            default:-1
        },
        length:{
            default:0
        },
        text:{
            default:""
        },
        reachBottom:{
            type: Function,
            default: null
        }
    },
    data() {
        return {
            io:""
        }
    },
    mounted() {
        this.io = new IntersectionObserver((entries) => {
                // console.log(entries)
                if(entries[0].isIntersecting){
                    if(typeof this.reachBottom=='function' && this.total>this.length && !this.loading){
                        this.reachBottom()
                    }
                }
            },{
                // root: document.querySelector('#scrollArea'),
                // rootMargin: '0px 0px 50px 0px',
                // threshold: 0
            }
        );
        // io.observe(this.$refs.div);
        this.io.observe(document.querySelector('.钩子'));
    },
    beforeDestroy(){
        console.log('销毁了')
        this.io.disconnect()
    }
}
</script>

<style lang="scss" scoped>
.load{
    position: relative;
    padding: 10px;
    .钩子{
        position: absolute;
        // pointer-events: none;
        top: -20px;
        left: 0px;
        width: 100%;
        height: 20px;
    }
    .text{
        text-align: center;
        font-size: 12px;
        color: rgba(0,0,0,0.8);
    }
}
</style>