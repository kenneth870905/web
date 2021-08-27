<template>
    <div class="FQA">
        <div class="title-2">
            <span :class="{active:type==1}" @click="type=1">FAQ</span>
            <span :class="{active:type==2}" @click="type=2">技术支持</span>
        </div>

        <div class="mainText" v-if="type==1">
            <div class="t1">澳門六合彩官方FAQ</div>
            <div class="main">
                <div>1、澳門六合彩在什麼時間段可以購買？</div>
                <p>答：澳門六合彩票為區域性彩種，請根據站點的具體營運時間購買。</p>
                <div>2、需要多少錢才可以購買？</div>
                <p>答：澳門六合彩注項單位為每注10澳門幣。</p>
                <div>3、單張彩票可以購買多少金額？</div>
                <p>答：購買者可對其選定的投注號碼進行單倍或多倍投注，投注倍數範圍為1-100倍。單張彩票的投注金額最高不得超過1000澳門幣。</p>
                <div>4、我應如何確認是否中獎？</div>
                <p>答：您可在澳門六合彩的銷售站點查詢確認、或在澳門六合彩官網的「開獎公告」處查詢核對中獎號碼。</p>
                <div>5、如何能進一步確認開獎結果的正確性？</div>
                <p>答：您可在澳門六合彩官網查看即時開獎公告與開獎視頻，或查看歷史開獎期號的視頻回放。</p>
                <div>6、購買彩券後可以退款不買嗎？</div>
                <p>答：抱歉，根據《奖券规例》規定獎券彩票一經發出給參加者或經參加者確認，參加者不得以任何理由更換、取消或撤回。</p>
                <div>7、中獎之後領獎的步驟是什麼樣的？</div>
                <p>答：所有獲中彩票，必須於有關攪珠的日期後起計60天內領取 (例子：於3月1日所舉行的攪珠的獲中彩票，可於3月1日當天至4月30日內任何一天領取)。逾期未兌獎視為棄獎，棄獎獎金納入彩票公益金。</p>
                <div>8、如果我的彩券受到污染或損壞是否可以兌獎？</div>
                <p>答：根據《奖券规例》規定任何獎券彩票（包括損毀彩票）不會獲得派發獎金或發還退款，除非該彩票可憑其獨有的序列號碼辨證。</p>
            </div>
        </div>

        <div class="mainText">
            <div class="t1">技術支持</div>
            <div class="main">
                <div>最低硬件系統要求：</div>
                <p>1、可以接上互聯網的計算機；</p>
                <p>2、區域寬帶；</p>
                <p>3、Windows , Mac OS X , Linux , Android操作系統其中之一；</p>
                <p>4、Internet Explorer瀏覽器v10.0 或以上，Mozilla Firefox (瀏覽器v3.0 或以上)，Opera (瀏覽器v8.0 或以上)，Chrome(瀏覽器v6.0 或以上)，Safari (瀏覽器v4.0 或以上)。</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    setup(props, ctx) {
        let type = ref(1)

        return {
            type
        }
    }
}
</script>

<style lang="scss" scoped>
.FQA {
    width: 1170px;
    margin: 0px auto;
}

.title-2 {
    background: #f0f0f0;
    border-radius: 36px;
    margin: 30px 0px 0px;
    span {
        display: inline-block;
        width: 120px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
    }
    .active {
        background: #d80011;
        border-radius: 36px;
        color: #fff;
    }
}

.mainText {
    min-height: 234px;
    margin: 0 auto 0;
    background-color: #fff;
    padding: 15px 180px 48px;
    .t1 {
        width: 808px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 24px;
        color: #2c2c2c;
    }
    .main {
        color: #2c2c2c;
        font-size: 15px;
        div {
            height: 30px;
            line-height: 30px;
            margin-top: 20px;
        }
        p {
            line-height: 30px;
            padding-left: 15px;
        }
    }
}
</style>