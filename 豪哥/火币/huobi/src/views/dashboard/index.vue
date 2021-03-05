<template>
    <div class="打开">
        <div @click="打卡(0)">打上班卡</div>
        <div @click="打卡(1)">打下班卡</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";

export default {
    name: "Dashboard",
    computed: {
        ...mapGetters(["name"])
    },
    methods: {
        打卡(t) {
            
            var str = t==0 ? '确定打上班卡？' : "确定打下班卡？"
            this.$confirm(str, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$axios.post(`/huobi/public/index.php/kaoqin/daka`,{type:t}).then(x=>{
                    if(x.data.code==1){
                        this.$message({ showClose: true, message: '恭喜您，打卡成功', type: 'success' });
                    }else{
                        this.$message({ showClose: true, message: x.data.message, type: 'error' });
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$message({ showClose: true, message: '系统错误，稍后再试！', type: 'error' });
                })
            }).catch(() => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.打开 {
    height: 100%;
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div:nth-child(1) {
        background: #e6a23c;
        color: #fff;
        width: 100px;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        margin: 20px;
        cursor: pointer;
        &:hover {
            background: #c58017;
        }
    }
    > div:nth-child(2) {
        cursor: pointer;
        border-radius: 5px;
        width: 100px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background: #f56c6c;
        &:hover {
            background: #e02f2f;
        }
    }
}
</style>
