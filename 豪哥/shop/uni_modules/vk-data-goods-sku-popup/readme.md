
### 插件名称：`vk-data-goods-sku-popup`
### 插件类型：`业务型数据驱动组件`
### 作者：`VK`
### 更新时间：`2021-02-07`
##### 此插件为`vk-unicloud-router`插件的一部分独立出来而形成的。
##### uniCloud云函数路由开发框架研究Q群:`22466457` 如有问题或建议可以在群内讨论。

### 【开箱即用】商品sku选择器组件豪华独立版（打造uni插件市场功能最全的SKU选择器组件）

##### 商品SKU选择器组件一般用于电商商品详情页的规格选择时使用。

### 【重要】自`1.1.0`版本起，组件已定义成`datacom`数据驱动式组件，组件名称已修改成`vk-data-goods-sku-popup` 原名称`vk-u-goods-sku-popup`
### 什么是datacom?
```
datacom，全称是data components，数据驱动的组件。

这种组件也是vue组件，是一种子类，是基础组件的再封装。

相比于普通的vue组件，datacom组件的特点是，给它绑定一个data，data中包含一组候选数据，即可自动渲染出结果。

```
### `而业务型数据驱动组件是更高一级的封装，它直接服务于业务需求，做到开箱即用！`
### datacom对于开发者的好处
##### datacom组件，对服务器数据规范、前端组件的数据输入和输出规范，做了定义。它提升了产业的标准化程度、细化了分工，提升了效率。
##### 且不论产业影响，对开发者个人而言，显而易见的好处也很多：
```
更少的代码量。从前述的传统写法对比可见，使用datacom的前端页面，代码量可减少一半以上。
设计更加清晰。服务器端给符合规范的数据，然后接受选择的结果数据。中间的ui交互无需关心。
```

### 体验地址
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/23023100-ffae-11ea-b997-9918a5dda011.png)

### 插件示例版运行步骤

##### 1、上传部署云函数cloudfunctions目录下的`findGoodsInfo`
##### 2、运行项目即可


##### 3、通过下面的基本使用示例的方式使用组件，API文档 在最下面

#### 基本使用示例
```html
<vk-data-goods-sku-popup
  v-model="sku_key" 
  :custom-action="findGoodsInfo"
  :mode="1"	
  border-radius="20"
  @add-cart="addCart"
  @buy-now="buyNow"
></vk-data-goods-sku-popup>
```

```js
methods: {
  // 加入购物车前的判断
  addCartFn(obj) {
    let {
      selectShop
    } = obj;
    // 模拟添加到购物车,请替换成你自己的添加到购物车逻辑
    let res = {};
    let name = selectShop.goods_name;
    if (selectShop.sku_name != "默认") {
      name += "-" + selectShop.sku_name;
    }
    res.msg = `$ {name}已添加到购物车`;
    if (typeof obj.success == "function") obj.success(res);
  },
  // 加入购物车按钮
  addCart(selectShop) {
    console.log("监听 - 加入购物车");
    that.addCartFn({
      selectShop: selectShop,
      success: function(res) {
        // 实际业务时,请替换自己的加入购物车逻辑
        that.toast(res.msg);
      }
    });
  },
  // 立即购买
  buyNow(selectShop) {
    console.log("监听 - 立即购买");
    that.addCartFn({
      selectShop: selectShop,
      success: function(res) {
        // 实际业务时,请替换自己的立即购买逻辑
        that.toast("立即购买");
      }
    });
  },
  /**
   * 获取商品信息
   * 这里可以看到每次打开SKU都会去重新请求商品信息,为的是每次打开SKU组件可以实时看到剩余库存
   */
  findGoodsInfo() {
    return new Promise(function(resolve, reject) {
      // 这里是获取商品信息的后端请求,可以用你自己的方式请求获取,本例子中用的是unicloud的云函数获取商品信息
      that.callFunction({
        success(data) {
          resolve(data.goodsInfo);
        }
      });
    });
  },
  toast(msg) {
    uni.showToast({
      title: msg,
      icon: "none"
    });
  },
  callFunction(obj) {
    uni.showLoading({
      title: '请求中'
    });
    uniCloud.callFunction({
      name: 'findGoodsInfo',
      data: {
        goods_id: that.goods_id
      },
      success(res) {
        console.log(res);
        if (typeof obj.success == "function") obj.success(res.result);
      },
      fail(err) {
        console.error(err);
      },
      complete() {
        uni.hideLoading();
      }
    });
  },
}
```

## API

### Props

| 参数                   | 说明                                                | 类型      | 默认值    | 可选值        |
|------------------------|----------------------------------------------------|---------|--------|------------|
| v-mode                 | 双向绑定，true为打开组件，false为关闭组件             | Boolean | false  | true、false |
| noStockText            | 该商品已抢完时的按钮文字                              | String  | 该商品已抢完 | -          |
| stockText              | 库存文字                                            | String | 库存           | - |
| mode                   | 模式 1:都显示  2:只显示购物车 3:只显示立即购买        | Number          | 1           | 1、2、3      |
| maskCloseAble          | 点击遮罩是否关闭组件 true 关闭 false 不关闭 默认true  | Boolean         | true        | true、false |
| borderRadius           | 顶部圆角值                                          | [String,Number] | 0           | -          |
| minBuyNum              | 最小购买数量                                        | Number          | 1           | -          |
| maxBuyNum              | 最大购买数量                                        | Number          | 100000      | -          |
| stepBuyNum             | 每次点击后的数量                                     | Number    
| stepStrictly（v1.1）           | 是否只能输入 step 的倍数                             | Boolean      | false           | true、false          |
| hideStock（v1.1）              | 是否隐藏库存的显示                             | Boolean      | false           | true、false          |
| theme（v1.1.1）              | 主题风格                             | String      | default     | default、red-black、black-white、coffee、green  |
| customAction           | 自定义获取商品信息的函数                              | Function        | null        | -          |
| showClose              | 是否显示右上角关闭按钮                                | Boolean | true | true、false |
| closeImage             | 关闭按钮的图片地址                                    | String  | -    | -             |
| priceColor             | 价格的字体颜色                                        | String          | #fe560a     | -          |
| buyNowText             | 立即购买 - 按钮的文字                      | String | 立即购买    | - |
| buyNowColor            | 立即购买 - 按钮的字体颜色                  | String | #ffffff | - |
| buyNowBackgroundColor  | 立即购买 - 按钮的背景颜色                  | String | #fe560a | - |
| addCartText            | 加入购物车 - 按钮的文字                    | String | 加入购物车   | - |
| addCartColor           | 加入购物车 - 按钮的字体颜色                | String | #ffffff | - |
| addCartBackgroundColor | 加入购物车 - 按钮的背景颜色                 | String | #ff9402 | - |
| disableStyle           | 样式 - 不可点击时,按钮的样式  | Object | null    | - |
| activedStyle           | 样式 - 按钮点击时的样式     | Object | null    | - |
| btnStyle               | 样式 - 按钮常态的样式      | Object | null    | - |
| goodsIdName            | 字段名 - 商品表id的字段名      | String | _id          | - |
| skuIdName              | 字段名 - sku表id的字段名     | String | _id          | - |
| skuListName            | 字段名 - 商品对应的sku列表的字段名 | String | sku_list     | - |
| specListName           | 字段名 - 商品规格名称的字段名     | String | spec_list    | - |
| stockName              | 字段名 - sku库存的字段名      | String | stock        | - |
| skuName                | 字段名 - sku名称的字段名      | String | sku_name     | - |
| skuArrName             | 字段名 - sku组合路径的字段名                            | String | sku_name_arr | - |
| goodsThumbName         | 字段名 - 商品缩略图字段名(未选择sku时)                   | String          | goods_thumb | -          |


### Event

| 事件名   | 说明                    | 回调参数 |
|----------|------------------------|------|
| open     | 打开组件时                  |      |
| close    | 关闭组件时                             |      |
| add-cart | 点击添加到购物车时（需选择完SKU才会触发） |   selectShop：当前选择的sku数据    |
| buy-now  | 点击立即购买时（需选择完SKU才会触发） |    selectShop：当前选择的sku数据    |


## uniCloud云函数路由开发框架研究Q群:`22466457` 如有问题或建议可以在群内讨论。
## 你也可以在评论区发布留言交流心得。