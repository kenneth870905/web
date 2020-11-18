<template>
    <div>
        <Header ref="head"/>
        <div class="content_1">
            <div class="w1000 banner">
                <img src="static/youhuihuodong/1.jpg" alt="" srcset="">
            </div>
            <div ref="yhhd" class="w1000 list">
                <el-collapse accordion v-for="(item,index) in resData" :key="index">
                    <el-collapse-item>
                        <template slot="title">
                            <img @click="info(item)" :src="item.Img"/>
                        </template>
                        <div v-html="item.html"></div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>  
        <Fotter ref="foot"/>
    </div>
    <!--  -->
</template>

<script>
import { api_获取优惠列表, api_获取优惠详情 } from "@/api/优惠接口.js";
import Header from "@/components/Header/Header.vue";
import Fotter from "@/components/Fotter/Fotter.vue";

import axios from "axios";
export default {
    data() {
        return {
            show3: true,
            resData: [],
            loading:""
        };
    },
    components: {
        Header,
        Fotter
    },
    methods: {
        info(item) {
            console.log(item.Id);

            api_获取优惠详情(item.Id)
                .then(result => {
                    this.$set(item, "html", result.data);
                })
                .catch(err => {
                    this.$set(item, "html", result.data);
                });
        }
    },
    created: function () {
        var this_1 = this;
        var url = config.api_url + "/Systems/Activity/InfoGetList";
        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        axios.post(url, { home: true }).then(res => {
            this.resData = res.data;
            this.loading.close();
            //   console.log(res.data);
        }).catch(err=>{
            this.loading.close();
        })
        // this.minheight=document.body.clientHeight - this.$refs.theader.clientHeight - this.$refs.bfooter.clientHeight;
    },
    mounted() {
        
        var min=document.querySelector('html').clientHeight - this.$refs.head.$el.clientHeight - this.$refs.foot.$el.clientHeight
        this.$refs.yhhd.style['min-height']=min+'px'
    },
};
</script>

<style scoped>

.content_1 {
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    padding-top: 20px;
}
/* body {
    background: #007251;
} */
.banner img{
    width: 100%;
}
.el-collapse{
    border-top: none;
    border-bottom: none;
}
.list{
    padding-top: 30px;
    padding-bottom: 40px;
}
.list .el-collapse-item{
    margin: 0px 0px 15px;
} 

/deep/ .el-collapse-item__header {
    background: #007251 !important;
    border: 5px solid #00694a;
}
/deep/ .el-collapse-item__header.is-active {
    background: #007251 !important;
}
/deep/ .el-collapse-item__header {
    height: 100px; 
}
/deep/ .el-collapse-item__header img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
/deep/ .el-collapse-item__header .el-icon-arrow-right{
    display: none;    
}
/deep/ .el-collapse-item__wrap{
    background: none;
    border-bottom: none;
}
/deep/ .el-collapse-item__content{
    color: #ffffff;
    padding: 20px;
    background: #404040;
}
.left_txt {
    margin-left: 80px;
}
.left_txt p {
    color: red;
    font-family: fantasy;
    font-weight: bold;
}
</style>
