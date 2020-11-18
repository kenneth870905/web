<template>
    <div>
        <div class="滚动通知">
            <!-- <img class="bg" src="static/image/memo-bg.jpg" alt="" srcset="" /> -->
            <div class="content">
                <i class="icon iconfont icon-yinlianglabashengyin"></i>
                <span class="title">最新公告：</span>
                <marquee scrollamount="3" @click="dialogVisible = true" direction="left" onmouseover="this.stop();" onmouseout="this.start();">
                    <div v-html="config.roll_text"></div>
                </marquee>
                <!-- <button>网站地址</button>
                <span class="网址">www.48bet.com</span> -->
            </div>
        </div>

        <!-- <el-dialog title="通知" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"> -->
        <el-dialog title="通知" :visible.sync="dialogVisible" width="400px">
            <div class="内容" v-html="config.roll_text"></div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "",
    data() {
        return {
            dialogVisible: false
        };
    },
    computed: {
        ...mapState({
            config: "config"
        })
    },
    methods: {
        handleClose() { }
    },
    mounted() { }
};
</script>

<style lang="scss" scoped>
.滚动通知 {
    height: 45px;
    position: relative;
    padding: 4px 0px;
    box-sizing: border-box;
    background: #707070;
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
    .content {
        border-top: 2px solid #595959;
        border-bottom: 2px solid #595959;
        box-sizing: border-box;
        // border-radius: 20px;
        background: linear-gradient(0deg, #383838, #444444, #b1b1b1);
        position: relative;
        z-index: 1;
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0px 15px;
        .icon {
            color: $color;
            font-size: 20px;
            margin: 0px 10px 0px 0px;
            flex-shrink: 0;
        }
        .title {
            font-size: 12px;
            white-space: nowrap;
            flex-shrink: 0;
        }
        button {
            white-space: nowrap;
            border: none;
            background: $color;
            padding: 5px 10px;
            border-radius: 3px;
            color: #ffffff;
            margin: 0px 10px;
        }
        marquee {
            font-size: 12px;
            color: #ffffff;
            flex-grow: 1;
            line-height: 36px;
            cursor: pointer;
        }
        .网址 {
            color: $color;
            font-weight: bold;
        }
    }
}

.内容 {
    margin: -30px 0px;
    line-height: 26px;
}
</style>
