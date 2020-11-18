/* eslint-disable camelcase */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
//请求地址头部
var img_base_url="image/";

// 10.10.27.200
//基本配置
var title="威尼斯人";

var config={
        //控制维护页面的显示与隐藏
        weihu:false,
        // img_url:"https://tu.jienuoshangmao.com/",
        img_url:"",
        // api_url:"https://0698aa.com",
        api_url:"/apis",
        // api_url:"",
        //每隔多少毫秒用户没点击就弹出弹框刷新页面 10代表10秒
        time:"0",
        // iframe 和 a 标签跳转前缀  如果是本站请使用 "https://0698aa.com"
        iframe_url:"",
        //app 下载地址
        app_download: "https://luofandiya.com/down.php?id=1001",
        //国际电话
        // internation_phone:"+639770796888",
        //监督电话
        // supervision_phone:"+639770797888",
        //客服电话
        kefu_phone:"+63 9278935888",
        title: title ,
        logo:"webConfig/image/logo.png",
        logoType:1,  //0 文件夹图片 1 威尼斯动图
        //页面底部图片 共两张
        footer_1:"webConfig/image/footer_1.jpg",
        footer_2:"webConfig/image/footer_2.png",
        //底部文字 ， 建议不超过5行
        footer_text:"业界良好的信誉口碑，以及高质量的服务，是玩家选择"+title+"的第一因素。获得GEOTRUST国际认证，确保网站公平公正性，所有会员数据均经过加密，保障玩家隐私。您所想要的，就是我们一直在追求的，我们绝对是您的最佳选择。",
        //是否显示底部  0 表示隐藏 1 表示显示
        footer_show:1,
        //在线客服跳转地址
        online_chat:"https://e-143504.chatnow.meiqia.com/dist/standalone.html",
        qq:"68383668",
        mobile_url:"/m/other/index",
        // app 二维码地址 
        // erweima:"https://0698aa.com/App_upload/appBet.png",

        //首页 滚动字幕
        roll_text:[
            {
                title:"彩票规则",
                text:"✿尊敬的"+title+"娱乐城会员您好，感谢您的到来！我们拥有真人百家乐骰宝龙虎、电子游戏、老虎机、水果机、捕鱼、彩票等等游戏品类，满足您的所有需求。活动多多彩种多多，请尽情享受吧。"
            }
        ],
        //显示二维码充值次数
        ck:0,
        
        // telegram:{
        //     number:'1111',
        //     a:'aaa',   //添加好友链接
        //     //不区分大小写  菲律宾        缅甸     泰国       澳大利亚    柬埔寨        美国
        //     whiteList:['PHILIPPINES','Myanmar','Thailand','AUSTRALIA','CAMBODIA','UNITED STATES']
        // },

        //导航栏排序
        typeSort:[
            {
                url:['10.10.27.150','Localhost'],
                sort:['体育','真人','电子','棋牌','捕鱼','彩票']
            }
        ],

        //导航地址
        navigation_list:[
            {
                name:"首页",
                // 主要用于纯图标
                icon:"el-icon-s-home",
                //跳转地址 没有就不跳写
                url:"/",
                //url类型 0表示vue内部地址  1表示 外部地址 如：http://image.baidu.com/
                url_type:0,
                //可填写本地图片和网络图片地址
                img:"",
                //是否热门
                hot:false,
                //前端导航样式  主要用于 子导航
                style:0,
                //子导航 格式和父导航保持一致
                children:[]
            },
            {
                name:"真人娱乐",
                url:"/immortal",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[
                    {
                        cname:"AG",
                        type:'AG',      //查询 余额名称
                        // id:"qjt",
                        gid:"1",
                        name:"AG旗舰厅",
                        url:"",
                        url_type:0,
                        img:"image/daohang/qj.png",
                        hot:false,
                        style:0,
                    },
                    {                        
                        cname:"AG",
                        type:'AG',
                        // id:"gjt",
                        gid:"2",
                        name:"AG国际厅",
                        url:"",
                        url_type:0,
                        img:"image/daohang/gj.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:'BY',
                        // id:"dt",
                        gid:"live",
                        name:"BBIN娱乐厅",
                        cname:"BBIN",
                        url:"",
                        url_type:0,
                        img:"image/daohang/yul.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:'BG',
                        // id:"",
                        gid:"1",
                        name:"BG视讯大厅",
                        cname:"BG",
                        url:"",
                        url_type:0,
                        img:"image/daohang/bg-sxdt.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:'OG',
                        // id:"",
                        gid:"lobby",
                        name:"OG视讯大厅",
                        cname:"OG",
                        url:"",
                        url_type:0,
                        img:"image/daohang/og-sxdt1.png",
                        hot:false,
                        style:0
                    },
                    // {
                    //     type:'TG',
                    //     gid:"qp",
                    //     name:"申博视讯大厅",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/shenbo1.png",
                    //     hot:false,
                    //     style:0
                    // },
                    {
                        type:'AB',
                        gid:"100",
                        name:"欧博聚龙厅",
                        url:"",
                        url_type:0,
                        img:"image/daohang/oubo1.png",
                        hot:false,
                        style:0
                    },
                    {
                        type:'EB',
                        gid:"0",
                        name:"易博视讯大厅",
                        url:"",
                        url_type:0,
                        img:"image/daohang/boji1.png",
                        hot:false,
                        style:0
                    }
                ]
            },{
                name:"电子游艺",
                url:"/electron",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[
                    {
                        cname:"AG",
                        type:'AG',
                        name:"AG电子游艺",
                        id:"dz",
                        gid:"8",
                        url:"",
                        url_type:0,
                        img:"image/daohang/dz-ag.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BBIN",
                        type:"BY",
                        gid:"game",
                        name:"BBIN电子游艺",
                        id:"dz",
                        url:"",
                        url_type:0,
                        img:"image/daohang/dz-by.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"AG",
                        type:"AG",
                        name:"YP水果机",
                        id:"yp",
                        gid:"YP800",
                        url:"",
                        url_type:0,
                        img:"image/daohang/dz-yoplay.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"MG电子",
                        type:"MG",
                        name:"MG冰球突破",
                        id:"0",
                        gid:"0",
                        url:"",
                        url_type:0,
                        img:"image/daohang/dz-MG01.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BG电子",
                        type:"BG",
                        name:"BG国王的财富",
                        id:"0",
                        gid:"0",
                        url:"",
                        url_type:0,
                        img:"image/daohang/dz-BG02.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    // =====================
                    {
                        type:"FY",
                        name:"泛亚游戏大厅",
                        gid:"-",
                        url:"",
                        url_type:0,
                        img:"image/daohang/fy.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    // {
                    //     type:"FG",
                    //     name:"FG电子",
                    //     gid:"NETENT_CAS reelrush_not_mobile_sw",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/FG.png",
                    //     hot:false,
                    //     style:1,  // class='min_li'
                    // },
                    {
                        type:"HB",
                        name:"哈巴电游",
                        gid:"SGFaCaiShen",
                        url:"",
                        url_type:0,
                        img:"image/daohang/HB.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"LY",
                        name:"乐游电子",
                        gid:"8180",
                        url:"",
                        url_type:0,
                        img:"image/daohang/LY.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"CQ",
                        name:"CQ9电子",
                        gid:"138",
                        url:"",
                        url_type:0,
                        img:"image/daohang/CQ93.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"sw",
                        name:"SW电子",
                        gid:"sw_kxcs",
                        url:"",
                        url_type:0,
                        img:"image/daohang/SW3.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    
                    {
                        type:"DT",
                        name:"DT电子",
                        gid:"dtdz",
                        url:"",
                        url_type:0,
                        img:"image/daohang/DT.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    // {
                    //     type:"TG",
                    //     name:"申博电子",
                    //     gid:"lh",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/TG.png",
                    //     hot:false,
                    //     style:1,  // class='min_li'
                    // },
                    {
                        type:"AB",
                        name:"欧博电子",
                        gid:"kzsj",
                        url:"",
                        url_type:0,
                        img:"image/daohang/AB.png",
                        hot:false,
                        style:1,  // class='min_li'
                    }
                ]
            },{
                name:"捕鱼",
                url:"/fish",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[
                    {
                        cname:"AG",
                        type:"AG",
                        name:"AG捕鱼王二代",
                        id:"byw",
                        gid:"6",
                        url:"",
                        url_type:0,
                        img:"image/daohang/buyu-ag02.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BG",
                        type:"BG",
                        name:"BG捕鱼大师",
                        id:"105",
                        gid:"105",
                        url:"",
                        url_type:0,
                        img:"image/daohang/buyu-BG01.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BG",
                        type:"BG",
                        name:"BG西游捕鱼",
                        id:"411",
                        gid:"411",
                        url:"",
                        url_type:0,
                        img:"image/daohang/buyu-BG02.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BBIN",
                        type:"BY",
                        name:"BBIN捕鱼达人",
                        id:"byds",
                        gid:"38001",
                        url:"",
                        url_type:0,
                        img:"image/daohang/buyu-bbin01.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BBIN",
                        type:"BY",
                        id:"bydr",
                        gid:"30599",

                        name:"BBIN捕鱼大师",
                        url:"",
                        url_type:0,
                        img:"image/daohang/buyu-bbin02.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    
                    {
                        type:"LY",
                        gid:"510",
                        name:"LY捕鱼大作战",
                        url:"",
                        url_type:0,
                        img:"image/daohang/LY1.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"CQ",
                        gid:"AT01",
                        name:"CQ9一炮捕鱼",
                        url:"",
                        url_type:0,
                        img:"image/daohang/CQ9.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"SW",
                        gid:"sw_fufish_intw",
                        name:"sw捕鱼多福",
                        url:"",
                        url_type:0,
                        img:"image/daohang/SW1.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        type:"KY",
                        gid:"510",
                        name:"KY红包捕鱼",
                        url:"",
                        url_type:0,
                        img:"image/daohang/510.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    // {
                    //     type:"QL",
                    //     gid:"lkpy",
                    //     name:"QL李逵捕鱼",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/51.png",
                    //     hot:false,
                    //     style:1,  // class='min_li'
                    // },
                    {
                        type:"CQ",
                        gid:"AB3",
                        name:"CQ9皇金渔场",
                        url:"",
                        url_type:0,
                        img:"image/daohang/AB3.png",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    // {
                    //     type:"QL",
                    //     gid:"jcby",
                    //     name:"QL金蟾捕鱼",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/52.png",
                    //     hot:false,
                    //     style:1,  // class='min_li'
                    // },
                    // {
                    //     type:"QL",
                    //     gid:"dsnh",
                    //     name:"QL大圣闹海",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/53.png",
                    //     hot:false,
                    //     style:1,  // class='min_li'
                    // },
                    // {
                    //     type:"QL",
                    //     gid:"hwby",
                    //     name:"QL海王捕鱼",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/54.png",
                    //     hot:false,
                    //     style:1,  // class='min_li'
                    // }

                ]
            },
            // {
            //     name:"街机电游",
            //     url:"/street",
            //     url_type:0,
            //     img:"",
            //     hot:false,
            //     style:0,
            //     children:[]
            // },
            {
                name:"趣味游戏",
                url:"/quweigame",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[]
            },
            {
                name:"体育",
                url:"/sports",
                url_type:0,
                img:"",
                hot:false,
                style:1,  // son_end
                children:[
                    {
                        cname:"BBIN",
                        type:"BY",
                        name:"BBIN体育",
                        id:"sports",
                        gid:"ball",

                        url:"",
                        url_type:0,
                        img:"image/daohang/tiyu-bbin.png",
                        hot:false,
                        style:0,
                    },
                    {
                        cname:"AG",
                        type:"AG",
                        id:"sports",
                        gid:"TASSPTA",
                        name:"AG体育",
                        url:"",
                        url_type:0,
                        img:"image/daohang/tiyu-ag.png",
                        hot:false,
                        style:0,
                    },
                    {
                        cname:"SS",
                        type:"SS",
                        id:"sports",
                        gid:"0",
                        name:"三昇体育",
                        url:"",
                        url_type:0,
                        img:"image/daohang/tiyu-2.png",
                        hot:false,
                        style:0,
                    },
                    {
                        cname:"FY",
                        type:"FY",
                        id:"sports",
                        gid:"3",
                        name:"泛亚电竞",
                        url:"",
                        url_type:0,
                        img:"image/daohang/tiyu-3.png",
                        hot:false,
                        style:0,
                    },
                    // {
                    //     cname:"WG",
                    //     type:"WG",
                    //     id:"",
                    //     gid:"lobby",
                    //     name:"万游体育",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/WG.png",
                    //     hot:false,
                    //     style:0,
                    // },
                    {
                        cname:"WG",
                        type:"WG",
                        id:"",
                        gid:"lobby",
                        name:"皇冠体育",
                        url:"",
                        url_type:0,
                        img:"image/daohang/huangguan.png",
                        hot:false,
                        style:0,
                    },
                ]
            },
            {
                name:"彩票",
                url:"/lottery",
                url_type:0,
                img:"",
                hot:true,
                style:0,
                children:[
                    {
                        name:"官方玩法",
                        url:"/Lottery/Home/Index/1",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/1.png",
                        hot:false,
                        style:1, // min_li
                    },
                    {
                        name:"信用玩法",
                        url:"/Lottery/Home/Index/2",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/2.png",
                        hot:false,
                        style:1, // min_li
                    },{
                        name:"香港六合彩",
                        url:"/Lottery/Bet/Index/1/70001",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/70001.png",

                        hot:false,
                        style:1, // min_li
                    },
                    {
                        name:"威尼斯飞艇",
                        url:"/Lottery/Bet/Index/2/20003",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/20003.png",
                        hot:false,
                        style:1, // min_li
                    },
                    {
                        name:"五分pk拾",
                        url:"/Lottery/Bet/Index/2/20004",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/20004.png",

                        hot:false,
                        style:1, // min_li
                    },{
                        name:"江苏快三",
                        url:"/Lottery/Bet/Index/2/40003",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/40003.png",

                        hot:false,
                        style:1, // min_li
                    },{
                        name:"广东11选5",
                        url:"/Lottery/Bet/Index/2/60001",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/60001.png",

                        hot:false,
                        style:1, // min_li
                    },
                    // {
                    //     name:"新幸运飞艇",
                    //     url:"/Lottery/Bet/Index/2/20005",
                    //     url_type:1,
                    //     img:"/Areas/Lottery/Content/img/20005.png",
                    //     hot:false,
                    //     style:1, // min_li
                    // },
                    {
                        name:"澳门六合彩",
                        url:"/Lottery/Bet/Index/2/70002",
                        url_type:1,
                        img:"/Areas/Lottery/Content/img/20002.png",
                        hot:false,
                        style:1, // min_li
                    },
                    {
                        name:"极速六合彩",
                        url:"/Lottery/Bet/Index/2/70000",
                        url_type:1,
                        // img:"image/daohang/caipiao-9.png",
                        img:"/Areas/Lottery/Content/img/70000.png",
                        hot:false,
                        style:1, // min_li
                    },
                    {
                        cname:"VR",
                        type:"VR",
                        gid:"16",
                        name:"VR彩票",
                        url:"",
                        url_type:0,
                        img:"image/daohang/VR.png",
                        hot:false,
                        style:1,
                    },
                ]
            },
            {
                name:"棋牌",
                url:"/chess",
                url_type:0,
                img:"",
                hot:false,
                style:1,  // son_end
                children:[
                    {
                        cname:"KY",
                        type:"KY",
                        gid:"0",
                        name:"开元棋牌",
                        url:"",
                        url_type:0,
                        img:"image/daohang/qipai-kaiyuan.png",
                        hot:false,
                        style:0,
                    },
                    {
                        cname:"GM",
                        type:"GM",
                        gid:"0",
                        name:"GM棋牌",
                        url:"",
                        url_type:0,
                        img:"image/daohang/qipai-gm.png",
                        hot:false,
                        style:0,
                    },
                    // {
                    //     cname:"QL",
                    //     type:"QL",
                    //     gid:"0",
                    //     name:"爱棋牌",
                    //     url:"",
                    //     url_type:0,
                    //     img:"image/daohang/qipai-761.png",
                    //     hot:false,
                    //     style:0,
                    // },
                    {
                        cname:"HL",
                        type:"HL",
                        gid:"0",
                        name:"欢乐棋牌",
                        url:"",
                        url_type:0,
                        img:"image/daohang/qipai-huanle.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:"LY",
                        gid:"0",
                        name:"乐游棋牌",
                        url:"",
                        url_type:0,
                        img:"image/daohang/ly2.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:"DT",
                        gid:"0",
                        name:"DT大厅",
                        url:"",
                        url_type:0,
                        img:"image/daohang/DT2.png",
                        hot:false,
                        style:0,
                    },

                ]
            },
            {
                name:"聊天室",
                // 主要用于纯图标
                icon:"",
                //跳转地址 没有就不跳写
                url:"https://0698bb.com/index/chat/index.html#/",
                //url类型 0表示vue内部地址  1表示 外部地址 如：http://image.baidu.com/
                url_type:1,
                //可填写本地图片和网络图片地址
                img:"",
                //是否热门
                hot:false,
                //前端导航样式  主要用于 子导航
                style:0,
                //子导航 格式和父导航保持一致
                children:[]
            },
            {
                name:"优惠",
                url:"/discounts",
                url_type:0,
                hot:false,
                children:[]
            },
            {
                name:"",
                icon:"el-icon-mobile-phone",
                url:"/phone",
                url_type:0,
                hot:true,
                children:[],
            }
        ],

}
// 通用 common
//首页 图片等配置
var homeConfig={
    //游戏列表
    game_list:[
        {
            title: "真人视讯",
            url: img_base_url + "home/game_list_1.jpg",
            //这个 roter 不能随意修改
            roter: "/immortal",
            rule:"",    //游戏规则
            url_type:0, //内部地址
        },
        {
            title: "电子游艺",
            url: img_base_url + "home/game_list_2.jpg",
            roter: "/electron",
            rule:"",
            url_type:0,
        },
        {
            title: "体育游戏",
            url: img_base_url + "home/tiyu.png",
            roter: "/sports",
            rule:"",
            url_type:0,
        },
        // {
        //     title: "双面盘彩票",
        //     url: img_base_url + "home/game_list_3.jpg",
        //     roter: "/lottery",
        //     rule:"/1321",
        //     url_type:0,
        // },
        {
            title: "捕鱼游戏",
            url: img_base_url + "home/game_list_4.jpg",
            roter: "/fish",
            rule:"",
            url_type:0,
        },
        {
            title: "棋牌游戏",
            url: img_base_url + "home/game_list_5.jpg",
            roter: "/chess",
            rule:"",
            url_type:0,
        }
    ],

}

