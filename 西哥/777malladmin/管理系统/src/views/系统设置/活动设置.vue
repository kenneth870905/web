<template>
    <div>
        <div class="header-1">
            <el-button-group class="r15">
                <el-button type="primary" size="mini">全部</el-button>
                <el-button type size="mini">PC端</el-button>
                <el-button type size="mini">手机端</el-button>
            </el-button-group>
            <el-select class="r15" v-model="type2" size="mini" style="width: 100px;">
                <el-option label="所有分类" value></el-option>
                <el-option label="分类1" value="1"></el-option>
                <el-option label="分类2" value="2"></el-option>
            </el-select>
            <el-button type size="mini">添加</el-button>
        </div>

        <ul class="list">
            <li v-for="item in 5">
                <div class="img-1">
                    <img src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg" alt srcset />
                </div>
                <div class="title">标题标题标题标题</div>
                <div class="footer f1">
                    <div>状态：<span class="绿色">显示中</span></div>
                    <div class="">
                        <i class="icon-1 el-icon-s-platform"></i>
                        <i class="icon-1 el-icon-mobile-phone"></i>
                    </div>
                    <div>分类：彩票优惠</div>
                </div>
                <div class="footer">
                    <el-input size="mini" style="width: 200px;margin-right:15px;">
                        <template slot="append">修改</template>
                    </el-input>
                    <el-button type="" size="mini">查看内容</el-button>
                    <el-button type="" size="mini">编辑</el-button>
                    <el-button type="" size="mini">禁用</el-button>
                    <el-button type="" size="mini">启用</el-button>
                    <el-button type="warning" size="mini">删除</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type2: ""
        }
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    margin: 0px 0px 10px;
    font-size: 14px;
    .r15 {
        margin-right: 15px;
    }
    .flex1 {
        flex: 1;
    }
}

.list{
    li{
        margin: 0px 0px 10px 0px ;
        box-shadow: 0px 0px 5px 0px #c3c3c3;
        padding: 10px;
    }
    .img-1{
        width: 500px;
        height: 200px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .title{
        font-size: 20px;
    }
    .footer{
        display: flex;
        margin: 5px 0px;
        font-size: 14px;
    }
    .f1{
        >div:nth-child(2){
            border-left: 1px solid #6f6f6f;
            border-right: 1px solid #6f6f6f;
            margin: 0px 10px ;
            padding: 0px 10px;
        }
        .icon-1{
            margin: 0px 5px;
            color: #428bca;
            font-size: 16px;
        }
    }
    .绿色{
        color: #578958;
    }
}
</style>