<template>
  <div>
    <Header />
    <div class="bg">
      <div class="dainyiyouyi">
        <img src="static/dianziyouyi/181011072258.jpg" alt />
      </div>
      <div class="slot_header">
        <ul>
          <li class v-for="(item,key , index) in res"  :key="index">
            <a class="#"  target="_self">
              <span class="s_h_ico s_h_ico_CQ" :style="'background: url(static/dianziyouyi/'+key.toLowerCase()+'-1.png) no-repeat center'" im ></span>
              <span class="s_h_name">{{item.name}}</span>
            </a>
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="slot_body">
        <!--    搜索栏-->
        <!-- <div class="slot_banner">
          <div class="slot_banner_in hb-logo">
            <div class="slot_search hb-color">
              <form action="hb" method="post" style="margin:0;">
                <input type="text" name="keyWord" value class="slot_input" />
                <input type="submit" name="submit" class="slot_sub" value />
              </form>
            </div>
          </div>
        </div>-->
        <!--    分类-->
        <div class="slot_menu2 hb-color">
          <div class="slot_menu2_text">游戏分类：</div>
          <div class="slot_menu2_list" v-for="(item,index) in res" :key="index">
            <a class="cur" href="#">{{item.name}}</a>
          </div>
        </div>
        <div class="clear"></div>

        <!--    全部游戏-->
        <div class="splite_title hb-border">
          <span class="hb-color">全部游戏</span>
          <span style="float: right;"></span>
        </div>
        <div class="newgame_main">
          <div class="newgame_inner">
            <ul id="allgames" class="gamenewslots">
              <li class="hb" v-for="(x,index) in 当前选中.game" :key="index">
                <div class="slotliitem">
                  <div class="picbox">
                    <a href target="_blank">
                      <img class="pic" :src="'static/dianziyouyi/'+当前选中.cname.toLowerCase()+'/'+x.id+当前选中.img " />
                      <!-- <img class="pic" :src="'static/dianziyouyi/'+当前选中.cname.toLowerCase()+'/'+x.id+当前选中.img " /> -->
                    </a>
                  </div>
                  <div class="titlebox">
                    <a href target="_blank">{{x.title}}</a>
                  </div>
                  <div class="pthvbg">
                    <a href="#" target="_blank"></a>
                  </div>
                  <a href target="_blank" class="gameinto animated bounceIn">进入游戏</a>
                </div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
          <div id="mgwrap">
            <!--            <div id="page" class=clearfloat>-->
            <!--</div>-->
            <div class="g_loading" style="display: none;">
              <span class="gui gui-spinner gui-spin"></span>正在加载...
            </div>
            <div class="g_all_game_loaded">全部游戏加载完成</div>
            <input id="game-page" type="hidden" data-curpage="2" data-totalgames="158" />
          </div>
        </div>
      </div>
      <Fotter />
    </div>

    <!--推荐栏-->
        <!-- <div class="splite_title hb-border">
          <span class="hb-color">推荐游戏</span>
        </div>
        <div class="tuijian_main">
          <div class="tuijian_inner">
            <div class="tempWrap" style="overflow:hidden; position:relative; width:950px">
              <ul
                id="tjgames"
                class="gamenewslots"
                style="width: 3800px; position: relative; overflow: hidden; padding: 0px; margin: 0px; left: -950px;"
              >
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGMountMazuma_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043" target="_blank">财宝山</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGSantasVillage_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4" target="_blank">圣诞乐村</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGJump_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450" target="_blank">疯狂百搭</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGHappiestChristmasTree_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555" target="_blank">快乐圣诞</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGFaCaiShen_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1" target="_blank">发财神</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGHotHotFruit_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28" target="_blank">疯狂水果</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGFourDivineBeasts_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727" target="_blank">四大神兽</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGMagicOak_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea" target="_blank">神奇橡树</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGTheKoiGate_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54" target="_blank">鲤鱼门</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SG5LuckyLions_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd" target="_blank">欢乐喜狮</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGMountMazuma_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043" target="_blank">财宝山</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/ab2b8e24-cfb6-437b-b74e-9dd60f4fc043"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGSantasVillage_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4" target="_blank">圣诞乐村</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/d53c9055-82c9-4f26-ba08-c8c232ea17a4"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGJump_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450" target="_blank">疯狂百搭</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/f35c6ef9-365f-4d6c-aa23-ac1fb57f4450"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGHappiestChristmasTree_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555" target="_blank">快乐圣诞</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/f509bbea-f9e0-4062-a04d-c5840fa68555"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGFaCaiShen_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1" target="_blank">发财神</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/1fa57f7d-a0fe-43c0-a3f2-cd7eedef01a1"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGHotHotFruit_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28" target="_blank">疯狂水果</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/13fd0b47-10a8-4172-b8e1-f5c0aa9a3b28"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGFourDivineBeasts_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727" target="_blank">四大神兽</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/3f4995f4-40a2-4606-a22f-28764e59b727"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGMagicOak_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea" target="_blank">神奇橡树</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/483ac29f-ac85-403e-9e50-356f53a2e3ea"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SGTheKoiGate_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54" target="_blank">鲤鱼门</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/4afafb4e-a437-4c5a-a6cd-d19b57bb1c54"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
                <li class="hb clone" style="float: left; width: 190px;">
                  <div class="slotliitem">
                    <div class="picbox">
                      <a href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd" target="_blank">
                        <img
                          class="pic"
                          src="https://app-a.insvr.com/img/square/162/SG5LuckyLions_zh-CN.png"
                        />
                      </a>
                    </div>
                    <div class="titlebox">
                      <a href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd" target="_blank">欢乐喜狮</a>
                    </div>
                    <div class="pthvbg">
                      <a href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd" target="_blank"></a>
                    </div>
                    <a
                      href="/hb/play/71881b3b-20a0-4c54-a5c9-810fc3a940bd"
                      target="_blank"
                      class="gameinto animated bounceIn"
                    >进入游戏</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> --> 
  </div>
</template>

<style>
.dainyiyouyi {
  margin-left: 443px;
}
.bg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
  position: relative;
}
.slot_header {
  width: 1000px;
  background: #272727;
  border: 1px solid #363636;
  border-radius: 5px;
  margin: 5px auto;
  height: 60px;
  box-sizing: border-box;
  position: relative;
  left: -8px;
}
.slot_header ul {
  margin: 0;
  padding: 0;
}
.slot_header ul li {
  list-style: none;
  width: 76px;
  height: 100%;
  float: left;
}
.slot_header ul li .gamenav {
  width: 67px;
  display: block;
  height: 54px;
  margin: 2px auto;
  border-radius: 5px;
}
.slot_header ul li.cur .gamenav,
.slot_header ul li:hover .gamenav {
  background: #fff;
}
.slot_header ul li .s_h_ico {
  margin-top: 2px;
  width: 100%;
  height: 31px;
  display: inline-block;
}
.slot_header ul li .s_h_name {
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  display: inline-block;
  font-size: 12px;
}
.slot_header ul li.cur .s_h_name,
.slot_header ul li:hover .s_h_name {
  color: #000;
}
.slot_body {
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
}
/*  */
gamenewslots li {
  position: relative;
  display: block;
  float: left;
  width: 190px;
}
#allgames li {
  box-sizing: border-box;
  padding: 5px;
  float: left;
}
.gamenewslots li .slotliitem {
  position: relative;
  width: 179px;
  margin: 0 auto;
  border: 1px solid #7f7f7c;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #2f2e2e;
  padding: 7px;
}
.gamenewslots li .picbox {
  margin: 0px auto;
  background: #0a0111;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
}
.gamenewslots li .picbox img.pic {
  width: 100%;
  height: 100%;
}
.gamenewslots li .picbox div.pic {
  width: 100%;
  height: 100%;
}

.gamenewslots li .titlebox {
  height: 35px;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
  background-color: #171717;
  margin-top: 5px;
}
.gamenewslots li .titlebox a {
  line-height: 35px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.gamenewslots li .pthvbg {
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #000000;
  filter: alpha(opacity=80);
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: 0.8;
  z-index: 3;
}
.gamenewslots li:hover .pthvbg a {
  display: block;
  width: 100%;
  height: 100%;
}

.gamenewslots li:hover .pthvbg {
  display: block;
}
.gamenewslots li .gameinto {
  display: none;
  width: 102px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 17px;
  font-family: "微软雅黑";
  background: url() no-repeat;
  position: absolute;
  z-index: 5;
  color: #ffffff;
  top: 85px;
  left: 33px;
}
.gamenewslots li:hover .gameinto {
  display: block;
  color: #ff0;
}
.g_all_game_loaded {
  display: none;
  text-align: center;
  color: #fff;
}
.g_loading {
  display: none;
  text-align: center;
  color: #fff;
}

/* .s_h_ico_CQ {
  background: url("../../assets/dianziyouyi/cq9.png") no-repeat center top;
} */
/* .cq-logo { background:url(logo/cqLogo.png) no-repeat 30px center; } */
.cq-color {
  background-color: #d69324;
}
.cq-border {
  border-color: #d69324;
}
.gamenewslots li.cq .picbox {
  height: 159px;
}

.s_h_ico_FG {
  background: url("../../assets/dianziyouyi/fg.png") no-repeat center top;
}
/* .fg-logo { background:url(logo/fgLogo.png) no-repeat 30px center; } */
.fg-color {
  background-color: #c8236a;
}
.fg-border {
  border-color: #c8236a;
}
.gamenewslots li.fg .picbox {
  height: 156px;
}

.s_h_ico_MG {
  background: url("../../assets/dianziyouyi/mg.png") no-repeat center top;
}
/* .mg-logo { background:url(logo/mgLogo.png) no-repeat 30px center; } */
.mg-color {
  background-color: #219d8e;
}
.mg-border {
  border-color: #219d8e;
}
.gamenewslots li.mg .picbox {
  width: 145px;
  height: 136px;
  background: #fff;
}
.gamenewslots li.mg .titlebox {
  width: 145px;
}
.gamenewslots li.mg .picbox div.pic {
  background-position: 0px 0px;
}
.gamenewslots li.mg .picbox div.pic:hover {
  background-position: -145px 0px !important;
}

.s_h_ico_MP {
  background: url("../../assets/dianziyouyi/mg.png") no-repeat center top;
}
/* .mp-logo { background:url(logo/mpLogo.png) no-repeat 30px center; } */
.mp-color {
  background-color: #219d8e;
}
.mp-border {
  border-color: #219d8e;
}
.gamenewslots li.mp .picbox {
  width: 145px;
  height: 136px;
  background: #fff;
}
.gamenewslots li.mp .titlebox {
  width: 145px;
}
.gamenewslots li.mp .picbox div.pic {
  background-position: 0px 0px;
}
.gamenewslots li.mp .picbox div.pic:hover {
  background-position: -145px 0px !important;
}

.s_h_ico_PT {
  background: url("../../assets/dianziyouyi/pt.png") no-repeat center top;
}
/* .pt-logo { background:url(logo/ptLogo.png) no-repeat 30px center; } */
.pt-color {
  background-color: #bfb908;
}
.pt-border {
  border-color: #bfb908;
}
.gamenewslots li.pt .picbox {
  height: 136px;
}

.s_h_ico_YG {
  background: url("../../assets/dianziyouyi/dt.png") no-repeat center top;
}
/* .yg-logo { background:url(logo/ygLogo.png) no-repeat 30px center; } */
.yg-color {
  background-color: #0d9c0c;
}
.yg-border {
  border-color: #0d9c0c;
}
.gamenewslots li.yg .picbox {
  height: 120px;
}

.s_h_ico_HB {
  background: url("../../assets/dianziyouyi/hb.png") no-repeat center top;
}
.hb-logo {
  background: url(../../assets/dianziyouyi/hbLogo.png) no-repeat 30px center;
}
.hb-color {
  background-color: #c54d3d;
}
.hb-border {
  border-color: #c54d3d;
}
.gamenewslots li.hb .picbox {
  height: 156px;
}

.s_h_ico_DT {
  background: url("../../assets/dianziyouyi/sw.png") no-repeat center top;
}
/* .dt-logo { background:url(logo/dtLogo.png?v=1) no-repeat 30px center;  } */
.dt-color {
  background-color: #618f9e;
}
.dt-border {
  border-color: #618f9e;
}
.gamenewslots li.dt .picbox {
  height: 180px;
}

.s_h_ico_SW {
  background: url("../../assets/dianziyouyi/sw.png") no-repeat center top;
}
/* .sw-logo { background:url(logo/swLogo.png) no-repeat 30px center; } */
.sw-color {
  background-color: #2489b2;
}
.sw-border {
  border-color: #2489b2;
}
.gamenewslots li.sw .picbox {
  height: 159px;
}

.s_h_ico_VT {
  background: url("../../assets/dianziyouyi/vt.png") no-repeat center top;
}
/* .vt-logo { background:url(logo/vtLogo.png) no-repeat 30px center; } */
.vt-color {
  background-color: #8c2f07;
}
.vt-border {
  border-color: #8c2f07;
}
.gamenewslots li.vt .picbox {
  height: 156px;
}

.s_h_ico_MW {
  background: url("../../assets/dianziyouyi/mw.png") no-repeat center top;
}

.s_h_ico_BG {
  background: url("../../assets/dianziyouyi/bbin.png") no-repeat center top;
}

.s_h_ico_BY {
  background: url("../../assets/dianziyouyi/ag.png") no-repeat center top;
}
/*  */

.slot_banner {
  height: 70px;
  margin-top: 1px;
}
.slot_banner_in {
  height: 70px;
}
.slot_search {
  float: right;
  margin-top: 16px;
  margin-right: 500px;
  padding: 3px;
}
.slot_input {
  float: left;
  padding-left: 5px;
  width: 149px;
  height: 25px;
  line-height: 25px;
  background: #ffffff;
  border: 0px;
  color: #333333;
}
.slot_sub {
  background: url() no-repeat center center;
  border: 0px;
  margin-left: 5px;
  display: inline;
  cursor: pointer;
}

.slot_menu2 {
  height: 40px;
  background: #1f1f1f;
  width: 1000px;
  position: relative;
  left: 446px;
  background: red;
}
.slot_menu2_text {
  float: left;
  width: 100px;
  line-height: 40px;
  height: 40px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
}
.slot_menu2_list {
  float: left;
  padding-top: 5px;
}
.slot_menu2 .slot_menu2_list a {
  float: left;
  display: block;
  width: 77px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  margin-right: 5px;
}
.slot_menu2 .slot_menu2_list a:hover,
.slot_menu2 .slot_menu2_list a.cur {
  background: #fff;
  color: #000;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  font-size: 12px;
}

.splite_title {
  height: 30px;
  border-bottom: 3px solid;
  width: 950px;
  margin: 10px auto 0;
}
.splite_title span {
  display: inline-block;
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-size: 14px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.newgame_main,
.tuijian_main {
  width: 1000px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  padding: 10px 0px;
  background: #262626;
  position: relative;
}
.newgame_inner,
.tuijian_inner {
  width: 950px;
  margin: 0 auto;
}

.tuijianhd {
  margin: 15px auto 0;
}
.tuijianhd ul {
  display: block;
  text-align: center;
}
.tuijianhd ul li {
  list-style: none;
  margin: 0 5px;
  height: 14px;
  overflow: hidden;
  width: 14px;
  background: #999;
  cursor: pointer;
  border-radius: 50%;
  display: inline-block;
  zoom: 1;
}
.tuijianhd ul .on {
  background-position: 0 0;
  background: #eb5502;
}
.tj_prev,
.tj_next {
  line-height: 35px;
  text-align: center;
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  font-size: 26px;
  color: #fff;
  opacity: 0.8;
}
.tj_prev {
  left: 10px;
  top: 100px;
}
.tj_next {
  right: 10px;
  top: 100px;
}
.tj_prev:hover,
.tj_next:hover {
  opacity: 1;
}
/*  */

.s_h_ico_HB {
  background: url(../../assets/dianziyouyi/hbLogo.png) no-repeat center top;
}
.hb-logo {
  background: url() no-repeat 30px center;
}
.hb-color {
  background-color: #c54d3d;
}
.hb-border {
  border-color: #c54d3d;
}
.gamenewslots li.hb .picbox {
  height: 156px;
}
</style>

<script>
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";
import axios from "axios";

export default {
  data() {
    return {
      res: {},
      当前选中: {},
      全部游戏:{}
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.$axios.get("static/webConfig/delist.json").then(x => {
        //console.log(x.data);
        this.res = x.data;
        for (const key in this.res) {
          if (this.当前选中) {
            this.当前选中 = this.res[key];
          }
        };
      });
    }
    // 
  },
  components: {
    // 注册组件
    Header,
    Fotter
  },
  computed: {

  }
};
</script>
 