var ip = "http://10.10.27.150:3001/api"

new Vue({
    el: "#vue",
    data() {
        return {
            test: "132",
            marSixNums: $.base.markSixNums,
            list: [],
            screen_1: [
                { name: '正码一', checkbox: false, value: 0 },
                { name: '正码2', checkbox: false, value: 1 },
                { name: '正码3', checkbox: false, value: 2 },
                { name: '正码4', checkbox: false, value: 3 },
                { name: '正码5', checkbox: false, value: 4 },
                { name: '正码6', checkbox: false, value: 5 },
                { name: '特码', checkbox: false, value: 6 },
            ],
            screen_2: [
                {
                    name: "生肖",
                    checkbox:true,
                    value:"sx",
                    children: [
                        { name: '鼠', checkbox: false, value: "鼠" },
                        { name: '牛', checkbox: false, value: "牛" },
                        { name: '虎', checkbox: false, value: "虎" },
                        { name: '兔', checkbox: false, value: "兔" },
                        { name: '龙', checkbox: false, value: "龙" },
                        { name: '蛇', checkbox: false, value: "蛇" },
                        { name: '马', checkbox: false, value: "马" },
                        { name: '羊', checkbox: false, value: "羊" },
                        { name: '猴', checkbox: false, value: "猴" },
                        { name: '鸡', checkbox: false, value: "鸡" },
                        { name: '狗', checkbox: false, value: "狗" },
                        { name: '猪', checkbox: false, value: "猪" }
                    ]
                },
                {
                    name: "五行",
                    checkbox:false,
                    value:"wu",
                    children: [
                        { name: '金', checkbox: false, value: "金" },
                        { name: '木', checkbox: false, value: "木" },
                        { name: '水', checkbox: false, value: "水" },
                        { name: '火', checkbox: false, value: "火" },
                        { name: '土', checkbox: false, value: "土" }
                    ]
                }
            ],
            screen_2_index:0
        }
    },
    methods: {
        getClass(item,index){
            var o = {
                className:"",
                text:"",
                screen_2:[]
            }
            let a = this.marSixNums.nums[item];
            // { "color": "绿", "colorCode": "LV", "wu": "土", "wuCode": "T", "sx": "蛇", "sxCode": "A6" }
            o.className = ''
            //基本颜色
            o.className = a.color 
            // 第一排 正码一 之类的
            var screen_1 = this.screen_1.filter(x=>x.checkbox)
            if(screen_1.length!=0){
                o.className += screen_1.find(y=>y.value==index) ? '' : ' opacity'
            }

            var key = this.screen_2[this.screen_2_index].value
            o.text = a[key]
            var screen_2 = this.screen_2[this.screen_2_index].children.filter(x=>x.checkbox)
            o.screen_2 = screen_2
            if(screen_2.length!=0){
                o.className += screen_2.find(x=>x.value == o.text) ? '' : " opacity"
             }
            return o
        },
    },
    mounted() {
        $.ajax({
            type: "get",
            url: `${ip}/Results/70001/2020/2020.json`,
            // url:"https://0698aa.com/Results/70001/2020/2020.json",
            success: (x) => {
                x.forEach(y => {
                    y.开奖号 = y.Content ? y.Content.split('|') : []
                });
                this.list = x
            },
            error: function (err) {
                console.log(err)
            }
        });
    },
})