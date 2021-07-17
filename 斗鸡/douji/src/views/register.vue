<template>
     <div class="banner">
        <img src="static/image/doujiBanner.jpg" alt srcset />
    </div>
    <div class="box-1">
        <div class="w1200">
            <div class="title">通知:</div>
            <marquee>滚动文字滚动文字滚动文字滚动文字</marquee>
            <div></div>
        </div>
    </div>

    <el-form class="form" size="small">
        <div class="title-1">用户注册</div>
        <el-form-item label="用户名">
            <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
            <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-checkbox label="">
                本人在此声明，我已年满十八岁及以上并同意遵守所有列示在本娱乐游戏网站内的<a href="#/rule" target="a" style="color:red">平台使用细则</a>与<a href="#/policy" target="a" style="color:red">隐私政策</a>
            </el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="warning" style="width: 100%;">提交</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.banner {
    font-size: 0px;
    img {
        width: 100%;
    }
}

.form{
    background: #fff;
    width: 800px;
    margin: 30px auto;
    padding: 25px;
    border-radius: 5px;
    box-shadow: 0px 0px 6px 0px #bdbdbd;
}
.title-1 {
    font-size: 40px;
    text-transform: uppercase;
    color: var(--color);
    text-align: center;
}

.box-1 {
    background: var(--color);
    line-height: 40px;
    > div {
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
        &::after,
        &::before {
            content: "";
            width: 100px;
            height: 100px;
            position: absolute;
        }
        &::before {
            top: -50px;
            left: -20px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
        &::after {
            top: -10px;
            right: -30px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
    }
    .title {
        white-space: nowrap;
        flex-shrink: 0;
        color: #fff;
        position: relative;
        z-index: 1;
    }
    marquee {
        background: #fff;
    }
}
</style>