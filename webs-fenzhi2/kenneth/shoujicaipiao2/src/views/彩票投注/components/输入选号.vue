<template>
    <div class="输入选号">
        
        <div v-if="选号配置.手动输入头部">
            <div v-for="(item , key , index) in 选号配置.手动list" :key="index">
                <wzys v-if="item.style=='位置'" name="位置" :位置="item.选号" />
                <style1 v-if="item.style==1" :name="item.name" :显示头部="!item.notitle" :选号="item.选号" />
                <style2 v-if="item.style==2" :name="item.name" :显示头部="!item.notitle" :选号="item.选号" />
                <style3 v-if="item.style==3" :name="item.name" :显示头部="!item.notitle" :选号="item.选号" />

                <!-- 方形3 -->
                <fangxing3 v-if="item.style=='方形3'" :name="item.name" :选号="item.选号" />
                <fangxing4 v-if="item.style=='方形4'" :name="item.name" :选号="item.选号" />
                <fangxing5 v-if="item.style=='方形5'" :选号="item.选号" />
            </div>
        </div>

        <textarea v-model="选号配置.手动输入" :placeholder="选号配置.手动输入提示"></textarea>
        <div class="提示">
        每一注号码之间请用一个换行[Enter]、一个逗号[,] 或者 分号[;] 隔开（输入的号码会自动排序并去除不合格号码）。
        </div>
        
        <!-- <input type="text" v-model="code" @keyup.enter="随机测试()">
        <button @click="随机测试()">随机测试</button> -->
    </div>
</template>

<script>
const wzys = () => import('@/components/彩票选票/位置样式.vue')
const style1 = () => import("@/components/彩票选票/样式1.vue");
const style2 = () => import("@/components/彩票选票/样式2.vue");
const style3 = () => import("@/components/彩票选票/样式3.vue");
const fangxing3 = () => import("@/components/彩票选票/方形3.vue");
const fangxing4 = () => import("@/components/彩票选票/方形4.vue");
const fangxing5 = () => import("@/components/彩票选票/方形5.vue");

import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            输入选号:"",
            code:''
        }   
    },
    components:{
        wzys,
        style1,
        style2,
        style3,
        fangxing3,
        fangxing4,
        fangxing5
    },
    computed: {
        ...mapState({
            选号配置:x=>x.投注.选号配置,
            abc:x=>x.投注.选号配置,
        }),
    },
    methods: {
        随机测试(){
            console.log(1)
            console.log(this.选号配置.手动机选(this.code))
            this.code='';
        }
    },
    mounted() {
        
    },     
    watch: {
        '选号配置.手动输入'(){
            this.选号配置.手动输入 = this.选号配置.手动输入.replace(/[\;\，\；]/g, ",").replace(/[\r\n]/g, ",\r\n").replace(/\,{2,}/g, ",");
                    //n.replace(/[\,\;\，\；]/g, " ").replace(/[\r\n]/g, " \r\n")
        }
    },
}
</script>

<style lang="scss" scoped>
.输入选号{
    padding: _vw(10);
}
textarea{
    height: _vw(126);
    font-size: _vw(14);
}
.提示{
    font-size: _vw(14);
    color: #8c8787;
}
</style>
