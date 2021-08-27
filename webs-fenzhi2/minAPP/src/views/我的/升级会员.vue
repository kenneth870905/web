<template>
    <div>
 
       <br>
       <br>

       <br>

       <br>
       <h1>升级会员</h1>

    </div>

</template>

<script> 
export default {
    data() {
        return {
          list:[
             {
                 title:"首页",
                 type:0,//总的大类型
                 lbimg:[//优惠活动 轮播
                     {   
                         id:"1",//活动唯一标识
                         imgurl:"LDKSAj.jpg", //活动图片
                        hdlist:{ //活动信息
                            hdtitle:"首充200送100",//活动标题
                            time:"2019-11-8 到 2019-12-8",//活动时间
                            content:"活动内容" //活动内容
                        }
                     },
                       {   
                         id:"1",//活动唯一标识
                         imgurl:"LDKSAj.jpg",
                      hdlist:{
                            hdtitle:"首充200送100",//活动标题
                            time:"2019-11-8 到 2019-12-8",//活动时间
                            content:"活动内容" //活动内容
                        }
                     },  
                 ],
                   ggimg:[//公告
                     {   
                         id:"1",//公告唯一标识
                         imgurl:"LDKSAj.jpg", //公告图片
                          gglist:{ //公告息
                            hdtitle:"首充200送100",//公告标题
                            time:"2019-11-8 到 2019-12-8",//公告发布时间
                            content:"公告内容" //公告内容
                        }
                     },
                 ],
                 homeContent:[ //数组默认顺序 如果用户添加了我德兴趣  后面顺序可能变
                     {
                         titlec:"视频",
                         contentSC:[
                             {
                                 type:"中文",//属于某一个风格得类型
                                 content_C:[ //单个视频内容信息
                                     {
                                         videoUrl:"",//视频路径
                                         titleVideo:"",//视频名称
                                         id:"1",//视频唯一标识码
                                     }
                                 ]
                             },
                              {
                                 type:"港台",//属于某一个风格得类型
                                 content_C:[ //单个视频内容信息
                                     {
                                         videoUrl:"",//视频路径
                                         titleVideo:"",//视频名称
                                         id:"2",//视频唯一标识
                                     }
                                 ]
                             },
                              {
                                 type:"日韩",//属于某一个风格得类型
                                 content_C:[ //单个视频内容信息
                                     {
                                         videoUrl:"",//视频路径
                                         titleVideo:"",//视频名称
                                         id:"3",//视频唯一标识
                                     }
                                 ]
                             }
                             
                         ]
                     },
                      {
                        titlec:"漫画",
                        contentSC:[
                            {
                                type:"中文",//属于某一个风格得类型
                                content_C:[ //单个漫画内容信息
                                    {
                                        videoUrl:"",//漫画图片路径
                                        titleVideo:"",//漫画名称
                                        id:"1",//漫画唯一标识
                                        jrsc:"0",//是否加入收藏  0表示未收藏 1表示已收藏
                                         timesj:"",//更新时间
                                        mamin_C:{//漫画详细内容
                                            titlejs:"",//漫画简介
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            ZZvideo:"",//漫画作者
                                            typeMH:"都市",//漫画类型
                                            dqh:"",//当前更新到多少话  如124话
                                            wjms:"",//是否完结
                                            timesj:"",//更新时间
                                            mlmh:[
                                                {
                                                ha:96, //第多少章  也就是96话
                                                    content_ma:[ //章节详情观看页面
                                                      "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                       "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                        "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                    ] 
                                                }
                                            ]
                                        },
                                        tjmh:[//相关类型推荐漫画 共3部
                                        {
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            id:"11",//漫画唯一标识
                                        },
                                            {
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            id:"11",//漫画唯一标识
                                        },
                                            {
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            id:"11",//漫画唯一标识
                                        },
                                        ]
                                    },  

                                     { //第二部漫画介绍
                                        videoUrl:"",//漫画图片路径
                                        titleVideo:"",//漫画名称
                                        id:"2",//漫画唯一标识
                                        jrsc:"0",//是否加入收藏  0表示未收藏 1表示已收藏
                                        mamin_C:{//漫画详细内容
                                            titlejs:"",//漫画详细内容介绍
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            ZZvideo:"",//漫画作者
                                            typeMH:"都市",//漫画类型
                                            dqh:"",//当前更新到多少话  如124话
                                            wjms:"",//是否完结
                                            mlmh:[
                                                {
                                                ha:96, //第多少章  也就是96话
                                                    content_ma:[ //章节详情观看页面
                                                    "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                    "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                        "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                    ] 
                                                }
                                            ]
                                        },
                                        tjmh:[//相关类型推荐漫画 共3部
                                        {
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            id:"11",//漫画唯一标识
                                        },
                                            {
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            id:"11",//漫画唯一标识
                                        },
                                            {
                                            videoUrl:"",//漫画图片路径
                                            titleVideo:"",//漫画名称
                                            id:"11",//漫画唯一标识
                                        },
                                        ]
                                        
                                    },


                                ]
                            },
                            {
                                type:"港台",//属于某一个风格得类型
                              
                            },
                            {
                                type:"日韩",//属于某一个风格得类型
                            
                            }
                            
                        ] 
                     },
                      {
                         titlec:"小说",
                          contentSC:[
                              {
                                  type:"中文",
                                  content_C:[
                                      {//每一部小说的格式
                                            videoUrl:"",//小说图片路径
                                            titleVideo:"",//小说名称
                                            id:"1",//小说唯一标识
                                            jrsc:"0",//是否加入收藏  0表示未收藏 1表示已收藏
                                            xsjj:"",//小说简介
                                             timesj:"",//更新时间
                                              titlejs:"",//小说详细内容介绍
                                             mamin_C:{//小说详细内容
                                                   titlejs:"",//小说详细内容介绍
                                                    videoUrl:"",//小说图片路径
                                                    titleVideo:"",//小说名称
                                                    ZZvideo:"",//小说作者
                                                    typeMH:"都市",//小说类型
                                                    dqh:"",//当前更新到多少话  如124话
                                                    wjms:"",//是否完结  0未完结  1表示已完结
                                                    timesj:"",//更新时间
                                                      mlmh:[
                                                            {
                                                            ha:96, //第多少章  也就是96话
                                                                content_ma:[ //章节详情观看页面
                                                                "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                                "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                               "http://10.10.27.79:8080/img/0002.b9c0e580.jpg",
                                                                ] 
                                                            }
                                                        ]
                                            }
                                      }
                                  
                                  ]
                              },
                          ]
                     },
                 ]
                 
             },
             {
                 title:"视频",
                  type:1,//总的大类型 
                  lbimg:[ //轮播视频
                      {
                         id:"1",//视频唯一标识
                         imgurl:"LDKSAj.jpg", //视频图片
                         url:"路径"
                      }
                  ]

             },
               {
                 title:"漫画",
                   type:2,//总的大类型
             },
               {
                 title:"小说",
                   type:3,//总的大类型
             },
           ]
               
           
        }
    },
    computed: {
         
    },
    created(){
    },
    methods: {
       
         


    },
    mounted() {
       
    },
}


</script>
<style lang="scss" scoped>






</style>