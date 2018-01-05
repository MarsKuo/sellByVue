<template>
  <div class="goods">
    <!-- 菜單分類 -->
    <div class="menu-wrapper" ref="menuScroll">
        <ul >
          <!-- 專場 -->
          <li class="menu-item">
            <p class="text">
              <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" alt="">
              {{container.tag_name}}
            </p>
          </li>

          <li class="menu-item" v-for="(item,index) in goods" :key="index">
            <p class="text">
              <img :src="item.icon" v-if="item.icon" class="icon" alt="">
              {{item.name}}
            </p>
          </li>
        </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
        <ul>
            <!-- 專場 -->
        <li class="container-list food-list-hook">
            <div v-for="(item,index) in container.operation_source_list" :key="index">
                  <img :src="item.pic_url" alt="">
            </div>
        </li>
          <!-- 具體分類 -->
          <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
            <!-- 具體商品 -->
            <h3 class="title"> {{item.name}}</h3>
            <ul>
              <li v-for="(food,index) in item.spus" :key="index" class="food-item">
                <div class="icon" :style="head_bg(food.picture)"></div>
                <div class="content">
                    <h3 class="name">{{food.name}}</h3>
                    <p class="desc" v-if="food.description">{{food.description}}</p>
                    <div class="extra">
                      <span class="saled">{{food.month_saled_content}}</span>
                      <span class="praise">{{food.praise_content}}</span>
                    </div>
                    <img :src="food.product_label_picture" alt="" class="product">
                    <p class="price">
                      <span class="text">$ {{food.min_price}}</span>
                      <span class="unit">$ {{food.unit}}</span>
                    </p>
                </div>
              </li>
            </ul>

          </li>
        </ul>
    </div>
  </div>
</template>

<script>
// 導入iscroll
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      container: {},
      goods: [],
      listHeight: [],
    };
  },
  created() {
    //發起非同步請求，獲取數據
    var that = this;
    //通過axios來取得資料
    this.$axios
      .get("/api/goods")
      .then(function(response) {
        //獲取到數據
        var dataSource = response.data;
        if (dataSource.code == 0) {
          that.container = dataSource.data.container_operation_source;
          that.goods = dataSource.data.food_spu_tags;

          //調用滾動的初始化方法
          //開始時，DOM元素還沒有進行渲染，所以高度有問題
          //在獲取到數據後，並DOM已經渲染，表示列表高度是沒問題
          //that.initScroll();
          that.$nextTick(()=>{
            //DOM已經更新
            that.initScroll()

            //計算分類區間高度
            that.calculateHeight();
          });

        }
      })
      .catch(function(error) {
        //出錯處理
        console.log(error);
      });



  },
  methods: {
    head_bg(imgName) {
      return `background-image: url(${imgName})`;
    },
    //滾動的初始化
    initScroll(){
      //一个对象，持有已注册过 ref 的所有子组件。
      //ref屬性就是用來綁定某個dom元素或是某個組件，然後在this.$refs裡面
      new BScroll(this.$refs.menuScroll);
      new BScroll(this.$refs.foodScroll);
    },
    calculateHeight(){
          //通過$erfs得取對應的元素
          let foodlist=this.$refs.getElementByClassName('food-list-hook');
          //添加到數組區間
          //0~216 第一個區間(專場)
          //217-1342 第二個區間(熱銷)
          let height = 0;
          this.listHeight.push(height);
          for(let i = 0;i<foodlist.length;i++){
            let item = foodlist[i];

            //累加
            height +=item.clientHeight;
            this.listHeight.push(height);
          }
    }
  }
  //computed:{ //計算屬性(不能船參數)
  //   head_bg(){
  //   }
  // }
};
</script>

<style lang="sass" scoped  >
  //  導入sass
  @import './Goods.sass'
</style>
