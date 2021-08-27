<template>
    <div>
        测试
        <div v-for="(item, index) in autourl" :key="index">
            <iframe @load="load(item)" :src="item.url+'?v='+time" frameborder="0"></iframe>
            <!-- <iframe @load="load(item)" :src="'https://0698aa.com/M1/#/yxdt?v='+time" frameborder="0"></iframe> -->
            {{计算时间(item.时间)}}
        </div>
    </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
    name: "",
    data() {
        return {
            time:"",
            autourl:[
                {
                    url:"https://4927i.com",
                    时间:""
                },{
                    url:"https://4927a.com",
                    时间:""
                },{
                    url:"https://4927b.com",
                    时间:""
                },{
                    url:"https://4927c.com",
                    时间:""
                },{
                    url:"https://4927d.com",
                    时间:""
                },
                {
                    url:"https://0698aa.com/Bet/#/",
                    时间:""
                }
            ]
        }
    },
    filters:{
        
    },
    methods: {
        计算时间(time){
            if(!time){
                return '测速中'
            }else{
                return  (time - this.time) / 1000
            }
        },
        load(item){
            var date=new Date();
            item.时间=date.getTime();
        }
    },
    mounted() {
        var date=new Date();
        this.time=date.getTime();
    },
}
</script>

<style lang="scss" scoped>
iframe{
    height: 10px;

}
</style>
