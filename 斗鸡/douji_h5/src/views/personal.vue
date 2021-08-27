<template>
        <div span="24" class="box-1">
            <van-icon name="user-circle-o" class="icon-1" />
            <div>
                <div>
                    欢迎！
                    <span>xxxxxxxxxx</span>
                </div>
                <div>
                    账户余额：
                    <span>0.00</span>
                    <van-icon name="replay" class="icon-2" />
                </div>
            </div>
        </div>

    <van-cell-group >
        <van-cell title="充值" is-link/>
        <van-cell title="提现" is-link />
        <van-cell title="额度转换" is-link />
        <van-cell title="交易记录" is-link />
        <van-cell title="个人资料" is-link />
        <van-cell title="银行卡管理" is-link />
    </van-cell-group>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .box-1 {
        margin: 10px 0px 10px;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 10px;
        line-height: 30px;
        .icon-1 {
            color: var(--color);
            font-size: 80px;
            margin: 0px 10px 0px 0px;
        }
        span {
            color: var(--color);
            font-weight: bold;
        }
        .icon-2 {
            margin: 0px 0px 0px 10px;
        }
    }
    .item {
        text-align: center;
    }
</style>