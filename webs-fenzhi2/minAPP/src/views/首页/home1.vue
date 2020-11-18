<template>
    <div class="彩票">
            <div class="固定" :class="{ active: 显示全部 }">
                <div class="titleg" @click="显示全部=true" :class="{ active: 显示全部 }">优惠</div>
            </div>
            <van-tabs class="table" v-model="type" @click="onClick" :class="{active:!显示全部}">
                <van-tab  class="nav_n" v-for="(item, index) in 导航" :key="index" :title="item">
                </van-tab>
            </van-tabs>


            <div class="content_tA" v-if="显示全部">优惠内容1111</div>
            <div class="content_t" v-if="index==type && !显示全部" v-for="(item,index) in 导航">
            <div v-if="item=='视频'">视频内容</div>
            
            <div v-if="item=='漫画'">漫画内容</div>
            
            <div v-if="item=='小说'">小说内容</div>
            
            <div v-if="item=='vip'">vip内容</div>

            </div>

    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            显示全部: true,
            type: 0,
            导航:[
                "视频",
                "漫画",
                "小说",
                "有声",
                "vip",

            ]
        }
    },
    created() {

    },
    filters: {

    },
    computed: {

    },
    methods: {
        全部() {
            this.全部内容 = true
            this.active = 0
            this.isActive = true
        },
        onClick(name, title) {
            this.显示全部 = false
        }

    },
    mounted() {

    },
    watch: {

    },
}
</script>

<style lang="scss" scoped>



.彩票 {
    height: 100%;
    background: #ffffff;
    overflow: auto;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    box-sizing: border-box;

    .table{
    /deep/ .van-tabs__line{
        // height: _vw(44);
        display: none
    }
      /deep/ .van-tab--active{
          color: #7d7e80
    }
}
.table.active{
    /deep/ .van-tabs__line{
        display: block
    }

}


/deep/.active{
    color: red !important;
    font-size: 18px;
}

    .固定 {
        position: absolute;
        top: 0px;
        width: 100%;
            height:43px;

        .titleg {
            width:64px;
            height: 43px;
            line-height:43px;
            border-bottom:1px solid #eef0f5;
            text-align: center;
         
        }
        .content_tA {
            width: 100%;
            height: 100%;
            background: red;
            margin-top:44px;
        }
    }
    /deep/.van-tabs__wrap{
          background: green;
        }
  .table {
         
        margin-left:64px;
        .nav_n{
        

        }
    }
   
    
}
</style>
