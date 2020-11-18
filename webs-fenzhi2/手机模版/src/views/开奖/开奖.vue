<template>
    <div class="information">
    <van-nav-bar class="title" title="视频" left-arrow :fixed="true" @click-left="onClickLeft"/>

        <div class="content">
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111
            <br>11111111

        </div>

    </div>
</template>
<script>

// Vue.use(Dialog);
export default {
    data() {  
        return {
           
        }
    },
    components: { // 注册组件
        
    },
    created() {
        
    
    },

    computed: {
      
    },
    methods:{
             onClickLeft() {//头部
            history.back()
        },
       
    }
    
}


</script>
<style lang="scss" scoped>
.确认超盘信息 {
    margin-top: _vw(20);
    border: 1px solid #ccc;
    li:nth-child(7) {
        border-bottom: none;
    }
    li {
        height: _vw(40);
        border-bottom: 1px solid #ccc;
        line-height: _vw(40);
        display: flex;
        .quer_title {
            width: 40%;
            background: #f6f7f9;
            text-align: center;
            font-size: _vw(14);
            color: #666666;
        }
        .quer_num {
            width: 50%;
            padding-left: _vw(40);
            font-size: _vw(14);
            .fred {
                font-weight: 600;
            }
        }
    }
}
.备注 {
    margin: _vw(30) 0px _vw(20) 0px;
    // height: _vw(68);
    background: #f6f7f9;
    padding: _vw(10) _vw(10) ;
    font-size: _vw(12);
}
.复选 {
    font-size: _vw(16);
    margin: 0px auto;
    width: 84%;
    margin-bottom: _vw(20);
    font-size: _vw(14);
}
.btn {
    margin: 0px auto;
    width: 80%;
    // margin:_vw(20) 0px _vw(20) 0px;
    .van-button {
        margin: 0px auto;
        width: 100%;
        font-size: _vw(18);
        border-radius: _vw(6);
    }
}
.shuom {
    font-size: _vw(14);
    text-align: center;
    color: #999999;
    margin-top: _vw(20);
    padding-bottom: _vw(20);
}

p {
    margin: 0px;
}
.information {
    .title_zhuc {
        background: red;
        color: #ffffff;
        font-size: _vw(24);
        height: _vw(50);
        border-bottom: 1px solid #ccc;
        position: relative;
        .icon {
            position: absolute;
            line-height: _vw(50);
            font-size: _vw(24);
            font-weight: 600;
            top: 0;
            left: 0px;
        }
        h4 {
            text-align: center;
            margin: 0px;
            line-height: _vw(50);
            //  margin-bottom:
        }
    }

    // 开始
    .content {

    }
}
</style>