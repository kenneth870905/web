<template>
    <div>
        <div class="header_1">
          <div class="box_img"><img :src="dataconfig.api_urlData+img" alt=""></div> <div>{{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}</div>  
        </div>
    </div>
</template>


<script>
import 规则 from './规则.js'
export default {
    name: "",
    props: {
        name: {
            default: ""
        },
        type: {
            default: ""
        },
         img: {
            default:""
        }
    },
    data() {
        return {
              dataconfig: {
                api_urlData:config.api_url//api_url
            },
            activeNames: ''
        }
    },
    computed: {
        id(){
            return this.$route.query.id
        },
        开奖配置(){
            if(规则[this.id]){
                return 规则[this.id];            
            }else{
                return {}
            }
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.header_1 {
    line-height: 60px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 200;
    color: #e21;
    display:flex;
         margin-top:20px;
    .box_img{
           width: 60px;
         height: 60px;
         margin-right:10px;
        img{
         width: 100%;
         height: 100%;
        }
    }
}

.黄色背景 {
    background: #fc9;
}
.wanfa_first {
    width: 70px;
    text-align: center;
}

.wanfa_content {
    padding: 30px 30px 50px 30px;
    p {
        line-height: 32px;
        font-size: 14px;
        color: #666;
    }
    thead{
        background: #f2f2f2;
    }
    .kaijiang thead {
        background: #fc9;
    }
    img {
        width: 26px;
    }
    table {
      
        border-spacing: 0;
    }
    tr:nth-child(1) {
        td {
            border-top: 1px solid #cccccc;
        }
    }
    tr {
        td:nth-child(1) {
            border-left: 1px solid #cccccc;
        }
        td {
            border-right: 1px solid #cccccc;
            padding: 3px 20px;
            // border-left: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
        }
    }

    /deep/ .el-collapse-item__header {
        background: none;
        font-weight: bold;
        font-size: 22px;
    }
}
</style>