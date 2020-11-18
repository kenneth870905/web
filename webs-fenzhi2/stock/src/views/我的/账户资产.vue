<template>
    <div>
        <van-nav-bar title="账户资产" left-arrow :fixed="true" @click-left="onClickLeft"/>
        <div class="资产详情">
            <div class="title_1">
                <p>总资产</p>
                <b>-00.00</b>
            </div>
            <ul class="list_1">
                <li>
                    <label>账户余额：</label>
                    <span><b>00.00</b>元</span>
                </li>
                <li>
                    <label>冻结资金:</label>
                    <span><b>0.00</b>元</span>
                </li>
                <li>
                    <label>赠送管理费余额:</label>
                    <span><b>1886.56</b>元</span>
                </li>
            </ul>
        </div>

        <btn name="查询资金流水" @click.native="$router.push('/my/zjls')"/>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            
        }
    },
    methods: {
        onClickLeft(){
            history.back()
        },
        onClickRight(){
            console.log(123)
        }
    },
}
</script>

<style lang="scss" scoped>
.资产详情{
    padding-top:_vw(50);
    background: #ffffff;
    margin: _vw(56) 0px 0px;
    p{
        margin: 0px;
    }
    .title_1{
        font-size: _vw(15);
        text-align: center;
        padding: _vw(20) 0px;
        b{
            font-size: _vw(20);
        }
        border-bottom: 1px solid #ccc;
    }
    .list_1{
        li{
            font-size: _vw(13);
            border-bottom: 1px solid #cccccc;
            padding: _vw(15) 0px;
            margin: 0px _vw(10);
            display: flex;
            align-items: center;
            &:last-child{
                border-bottom: none;
            }
            label{
                width: _vw(120);
            }
            b{
                font-size: _vw(16);
            }
        }
    }
}

</style>

