

// var title="威尼斯人"
var config = {
    // weihu:false,//控制维护页面的显示与隐藏
    // 图片前缀
    // img_url: "https://0698bb.com/M1/",
    img_url: "",
    // 会员代理 地址 只在APP内部有效
    agency_url:"0698aa.com",
    // 接口前缀 
    api_url: "/apis",
    // api_url:"http://10.10.27.150:3001/api",
    // api_url:"http://10.10.27.31:82",
    // app 下载地址
    app_download: "https://luofandiya.com/down.php?id=1001",
    // 聊天室接口地址
    // wchat_url: 'http://10.10.27.39:789',
    wchat_url: 'http://10.10.27.121:82',
    // iframe 和 a 标签跳转前缀
    iframe_url: "http://10.10.27.31:82",
    // iframe_url: "http://10.10.27.31:82",
    // iframe_url:"/apis",
    img_upload:'http://msg.yooy8.com',
    // img_upload:"http://10.10.27.30/tuku",
    // img_upload:"https://0698aa.com/imgs",
    //国际电话
    // internation_phone:"+639770796888",
    //监督电话
    // supervision_phone:"+639770797888",
    title: "威尼斯人",
    // logo:"webConfig/image/logo.png",
    //首页滚动字幕
    roll_titles: "✿尊敬的会员您好，感谢您的到来！我们拥有真人百家乐骰宝龙虎、电子游戏、老虎机、水果机、捕鱼、彩票等等游戏品类，满足您的所有需求。活动多多彩种多多，请尽情享受吧。",

    //在线客服跳转地址
    online_chat: "https://e-143504.chatnow.meiqia.com/dist/standalone.html",
    qq: "68383668",
    // 邮箱
    mail: "yunlaiservice@gmail.com",
    kefu_phone:"+63 9278935888",  
    //显示微信客服二维码充值次数 0 表示一直显示
    ck: 0,
    tk:6,   //提款次数

    //绑定 支付银行卡 所有银行
    bank: ['农业银行', '中国银行', '招商银行', '建设银行', '交通银行', '渤海银行', '广大银行', '兴业银行', '民生银行', '中信银行', '广发银行', '华夏银行'],
    mobile_url:"https://0698aa.com/m/other/index",
    // telegram: {
    //     number: '1111',
    //     a: 'https://t.me/boleee',   //添加好友链接
    //     //不区分大小写  菲律宾        缅甸     泰国       澳大利亚    柬埔寨        美国
    //     whiteList: ['PHILIPPINES', 'Myanmar', 'Thailand', 'AUSTRALIA', 'CAMBODIA', 'UNITED STATES']
    // },
    // 没有纸飞机显示下面设置
    noTelegram:{
        img:"static/image/home_8.png",  //每日首存图片
        // img:"static/image/home_9.png",  //特邀嘉宾图片
        // name:"每日首存",
        name:"扫雷红包",
        // path:"/ifr/ShouChong",
        path:"/hbgame",
        // path:"/ifr/zdy?u=/Html/teyaojiabin/"   //特邀嘉宾
    },
    welcome_chat: '尊敬的用户：欢迎来到这里开启您的幸运之旅，请遵守聊天室相关规定，禁止任何形式的广告以及发送相关联系方式，管理员有权撤回不当言论或消息，并禁言停用用户账号，如果遇到充值或提现问题，请联系所在平台的客服，谢谢！',
    Agent_consultants:{
        qq:55325111,
        Skype:"dailizixun"
    },
    //个人中心隐藏页面
    my: {
        // yuEbao:true,       //余额宝
        // geRenBaoBiao: true,  //个人报表
        // heMai:true,  //合买
    },
    //天天礼包
    libao2:[
        { name: "新春抽奖", path: '/ifr/zdy?u=/Html/DuLiHuoDong/xinCunJiangChi/index.html', NoShiWan:true ,img: 'static/image/libaoTK/choujiang.png' },
        { name: "新春集福", path: '/ifr/zdy?u=/Html/Card/', NoShiWan:true , img: 'static/image/libaoTK/jifuka.png' },
        { name: "新春红包", path: '/ifr/zdy?u=/Htnml/teyaojiabin2/index.html', img: 'static/image/xingteyao.png' },
    ],
    libao: [
        { name: "每日签到", path: '/ifr/qd', NoShiWan:true ,img: 'static/image/3.png' },
        { name: "每日首存", path: '/ifr/ShouChong', NoShiWan:true , img: 'static/image/1.png' },
        { name: "代理中心", path: '/agent', img: 'static/image/5.png' },
        {name:"余额宝",path:'/yeb/yeb',img:'static/image/2.png'},
        // { name: "余额宝", path: '', img: 'static/image/2.png' }, //没地址的不跳转
        // { name: "特邀嘉宾", path: '/vipbet', img: '', icon: 'icon iconfont icon-hezuo', bg: 'linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209))' },
        // { name: "特邀嘉宾", path: '/ifr/zdy?u=/Html/teyaojiabin/', img: '', icon: 'icon iconfont icon-hezuo', bg: 'linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209))' },
        // { name: "特邀嘉宾", path: '/ifr/zdy?u=http://10.10.27.150:8080/teyaojiabin2/index.html', img: '', icon: 'icon iconfont icon-hezuo', bg: 'linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209))' },
        // { name: "21点红包", path: '/ifr/zdy?u=http://10.10.27.150:8080/teyaojiabin2/index.html', img: 'static/image/xingteyao.png' },
        {name:"彩票转运金",path:"/ifr/zdy?u=/html/cpZhuanYunJin/index.html",img:'static/image/8.png'},
        {name:"玩转棋牌",path:'/ifr/zdy?u=1',img:'static/image/7.png'},
        {name:"棋牌助力红包",path:"/ifr/zdy?u=/html/qiPaiZhuLi/index.html",img:'static/image/9.png'}
    ],
    
    // 聊天室福利图标
    fuli:[
        {path:"/ltsOrders?back=1&state=1",img:"static/image/liaotian/fuli1.png"},   //注单
        {path:"/ifr/zdy?u=/M/System/SignIn",img:"static/image/liaotian/fuli2.png"},   //签到
        {path:"/ifr/zdy?u=/Html/1/index.html",img:"static/image/liaotian/fuli6.png"},   //玩转棋牌
        {path:"/ifr/zdy?u=/Html/ShouChong/index.html",img:"static/image/liaotian/fuli7.png"},   //每日首冲
        {path:"/ifr/zdy?u=/html/cpZhuanYunJin/index.html",img:"static/image/liaotian/fuli8.png"},   //彩票转运金
        {path:"/ifr/zdy?u=/html/qiPaiZhuLi/index.html",img:"static/image/liaotian/fuli9.png"},   //棋牌助力红包
        // {path:"/vipbet",img:"static/image/liaotian/fuli5.png"}
        {path:"/ifr/zdy?u=http://10.10.27.150:8080/teyaojiabin2/index.html",img:"static/image/liaotian/fuli5.png"},
        // {path:"/hbgame",img:"static/image/liaotian/fuli10.png"}
        // {path:"",img:""},   //
        // /apis/html/qiPaiZhuLi/index.html?back=1
    ],
    
    //隐藏注册推荐人Id
    ruidHidden:true,
    //首页彩票资料
    news:{
        index:3,    //从第几个开始排
        list:[
            {
                name:"马会资料",
                img:'webConfig/image/lhzl4.png',
                path:'/lhzl/4'  //固定格式 六合资料
            },
            {
                name:"高手专区",
                img:'webConfig/image/lhzl2.png',
                path:'/lhzl/2'
            },
            {
                name:"精选彩图",
                img:'webConfig/image/lhzl3.png',
                path:'/lhzl/3'
            },
            {
                name:"公式专区",
                img:'webConfig/image/lhzl1.png',
                path:"/lhzl/1"
            }
        ]
    },
    // 游戏彩票排序
    typeSort:[
        {
            url:['10.10.27.150'],
            // sort:['体育','棋牌','彩票','真人','电子','捕鱼']
            sort:['体育','真人','电子','棋牌','捕鱼','彩票']
        },
        {
            url:['127.0.0.1','591857.com','816276.com','576336.com','0996996.com','0996997.com','0996998.com'],
            sort:['彩票','真人','电子','棋牌','体育','捕鱼']
        },{
            url:['0698k.com','localhost'],
            sort:['棋牌','彩票','真人','电子','体育','捕鱼']
        },
        {
            url:['681153.com','4dfg56hgsw54ffhfghdfas.com','flcp6606.com','flcp8808.com'],
            sort:['彩票','真人','电子','体育','捕鱼','棋牌']
        }
    ],
    
    //  真人，棋牌，电子，捕鱼，体育，彩票
    newbet:true,
    // 订单查询类型
    orderType:[
        { value: '', text: '系统彩票' },
        { value: 'ag', text: 'AG平台' },
        // { value: 'kg', text: 'KG平台' },
        // { value: 'by', text: 'BBIN平台' },
        // { value: 'ky', text: 'KY平台' },
        // { value: "mg", text: "MG平台" },
        // { value: "ss", text: "三昇体育" },
        // { value: "mg", text: "MG平台" },
        // { value: "fg", text: "FG平台" },
        // { value: "fy", text: "泛亚电竞" },
        // { value: "bg", text: "BG平台" },
        // { value: "vr", text: "VR平台" },
        // { value: "gm", text: "GM平台" },
        // { value: "QL", text: "爱棋牌" },
        // { value: "HL", text: "欢乐棋牌" },
        // { value: "HB", text: "哈巴电游" },
        // { value: "LY", text: "乐游棋牌" },
        // { value: "CQ9", text: "CQ9平台" },
        // { value: "SW", text: "SW平台" },
        // { value: "DT", text: "DT平台" }
    ],
    //自动计划最大展示数量
    jihuaMax:4,
    // 新特邀嘉宾
    newTeYao:{
        url:"http://10.10.27.150:5500/kenneth/%E7%8B%AC%E7%AB%8B%E6%B4%BB%E5%8A%A8/hongBaoDaoJiShi/index.html",
        url_list:[
            // 'localhost',
            // '209151.com',
            // '209150.com',
            // '209086.com',
            // '209190.com',
            // '2019313.com',
            // '10.10.27.150'
        ]
    },
    
}