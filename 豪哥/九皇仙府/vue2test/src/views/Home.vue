<template>
    <div>
        <div>aaaaaaaaaaaa</div>
        <slot></slot>
        <Vnodes :vnodes="vnodes"/>
    </div>
</template>


<script>
export default {
    data() {
        return {
            vnodes:''
        }
    },
    components:{
        Vnodes: {
            functional: true,
            render:function(h, context){
                console.log(this)
                return context.props.vnodes
            } 
        }
    },
    methods:{
        renderChild(){
            // this.$slots.default = (<div>11111111111</div>)
            return <div>Child</div> //在vue jsx插件 3.4.0 之后， h 会自动注入
        },
        点击测试(){
            console.log('点击测试')
        }
    },
    created() {
        setTimeout(() => {
            this.vnodes = <div onClick={this.点击测试}>哈哈哈哈哈哈</div>
        }, 2000);
    },
}
</script>

<style lang="scss" scoped>
</style>