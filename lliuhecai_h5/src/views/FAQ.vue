<template>
    <div class="title-1">
        <span :class="{active:type==1}" @click="type=1">澳門六合彩</span>
        <span :class="{active:type==2}" @click="type=2">技術支持</span>
    </div>

    <div v-if="type==1">
        <div class="title-2">FAQ</div>
        <ul class="faqList">
            <li>
                <div class="t1" @click="open($event)"><span>1、澳門六合彩在什麼時間段可以購買？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：澳門六合彩票為區域性彩種，請根據具體投注站點的營運時間購買。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>2、需要多少錢才可以購買？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：澳門六合彩注項單位為每注10澳門幣。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>3、單張彩票可以購買多少金額？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：購買者可對其選定的投注號碼進行單倍或多倍投注，投注倍數範圍為1-100倍。單張彩票的投注金額最高不得超過1000澳門幣。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>4、我應如何確認是否中獎？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：您可在澳門六合彩的銷售站點查詢確認、或在澳門六合彩官網的“開獎公告”處查詢核對中獎號碼。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>5、如何能進一步確認開獎結果的正確性？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：您可在澳門六合彩官網查看即時開獎公告與開獎視頻，或查看歷史開獎期號的視頻回放。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>6、購買彩券後可以退款不買嗎？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：抱歉，根據《奖券规例》規定獎券彩票一經發出給參加者或經參加者確認，參加者不得以任何理由更換、取消或撤回。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>7、中獎之後領獎的步驟是什麼樣的？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：所有獲中彩票，必須於有關攪珠的日期後起計60天內領取 (例子：於3月1日所舉行的攪珠的獲中彩票，可於3月1日當天至4月30日內任何一天領取)。逾期未兌獎視為棄獎，棄獎獎金納入彩票公益金。</div>
            </li>
            <li>
                <div class="t1" @click="open($event)"><span>8、如果我的彩券受到污染或損壞是否可以兌獎？</span><img src="static/右.png" alt=""></div>
                <div class="content">答：根據《奖券规例》規定任何獎券彩票（包括損毀彩票）不會獲得派發獎金或發還退款，除非該彩票可憑其獨有的序列號碼辨證。</div>
            </li>
        </ul>
    </div>

    <div v-if="type==2">
        <div class="title-2">技術支持</div>
        <div class="text">
            最低硬體系統要求：
            <br>
            1、可以接上互聯網的電腦；
            <br>
            2、區域寬頻；
            <br>
            3、Windows , Mac OS X , Linux , Android操作系統其中之一；
            <br>
            4、Internet Explorer流覽器v10.0 或以上，Mozilla Firefox (流覽器v3.0 或以上)，Opera (流覽器v8.0 或以上)，Chrome(流覽器v6.0 或以上)，Safari (流覽器v4.0 或以上)。
        </div>
    </div>

</template>

<script>
import { reactive, ref } from 'vue'
export default {
    setup(props) {
        // const type = reactive({})
        const type = ref(1)
        const open=(e)=>{
            let li = e.currentTarget.parentElement
            li.classList.toggle('open')
        }
        return {
            type,
            open
        }
    }
}
</script>

<style lang="scss" scoped>
.title-1{
    line-height: 40px;
    color: #fff;
    font-size: 15px;
    text-align: center;
    display: flex;
    span{
        flex: 1;
    }
    span:nth-child(1){
        background: #d80011;
    }
    span:nth-child(2){
        background: #0068b7;
    }
    .active{
        color: #fff100;
    }
}

.title-2{
    font-size: 20px;
    color: #343434;
    text-align: center;
    margin: 30px 0px 0px;
}
.faqList{
    padding: 0px 15px;
    margin: 0px 0px 30px;
    .open{
        .t1 img{
            transform: rotate(-90deg);
        }
        .content{
            display: block;
        }
    }
    .t1{
        height: 50px;
        color: #eb5e04;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ededed;
        img{
            transition: all 0.3s;
            width: 12px;
            transform: rotate(90deg);
            filter: grayscale(1);
        }
    }
    .content{
        padding: 20px 0;
        font-size: 14px;
        color: #343434;
        line-height: 20px;
        display: none;
    }
}
.text{
    padding: 0px 15px;
    margin: 20px 0px;
    font-size: 14px;
    color: #343434;
    line-height: 20px;
}
</style>