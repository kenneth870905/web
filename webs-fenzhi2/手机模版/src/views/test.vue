<template>
    <div >
        测速
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <div>网站：{{item.url}}</div>
                <img :src="item.url+'/'+time" @error="error(item)"  alt="">
                时间:
                {{计算时间(item.time)}}
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {
            time:"",
            list:[
                // {
                //     url:'https://0698aa.com/M1/#/yxdt',
                //     time:''
                // },
                // {
                //     url:'https://blog.csdn.net/qq_29362889/article/details/52033793',
                //     time:''
                // },
                // {
                //     url:'https://0698aa.com/Index/#/chess',
                //     time:''
                // },
                // {
                //     url:'https://111110698aa.com/Index/#/chess',
                //     time:''
                // },
                // {
                //     url:'http://m.t2209.com/#module/common/action/home',
                //     time:''
                // },
            ]
        };
    },
    components: {
        // 注册组件
    },
    filters:{
        
    },
    methods: {
         计算时间(time){
            if(!time){
                return '测速中'
            }else{
                return  (time - this.time) <200 ? (time - this.time) : (time - this.time) + '大于200'
            }
        },
        error(item){
            console.log('结束')
            var date1=new Date();
            item.time=date1.getTime();
        }
    },
    mounted() {
        var date=new Date();
        this.time=date.getTime();

        $.ajax({
            type: "GET",
            async: false,
            // url: "https://0698aa.com/Bet/json/delist.json",
            url: "https://0698aa.com/Bet/index.html#/electron",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback:"handler",
            success: function (result) {
                console.log(result)
            },
            error: function (e) {
                console.log(e)
            }
        });
        
    }
};

</script>