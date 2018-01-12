<template>
  <div class="goods">
    <!-- 菜單分類 -->
    <div class="menu-wrapper" ref="menuScroll">
        <ul >
          <!-- 專場 -->
          <li class="menu-item" :class="{'current': currentIndex === 0 }" @click="selectMenu(0)">
            <p class="text">
              <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" alt="" >
              {{container.tag_name}}
            </p>
          </li>

          <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current': currentIndex === index +1}" @click="selectMenu(index +1)">
            <p class="text">
              <img :src="item.icon" v-if="item.icon" class="icon" alt="">
              {{item.name}}
            </p>
            <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
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
          <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook" >
            <!-- 具體商品 -->
            <h3 class="title"> {{item.name}}</h3>
            <ul>
              <li v-for="(food,index) in item.spus" :key="index" class="food-item" @click="showDetail(food)">
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

                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food='food'></Cartcontrol>
                </div>

              </li>
            </ul>

          </li>
        </ul>
    </div>
    <!-- <Shopcart :shipping_fee_tip='poiInfo.shipping_fee_tip' :min_price_tip = 'poiInfo.min_price_tip' :selectFoods='selectFoods' ></Shopcart> -->
    <Shopcart :poiInfo='poiInfo' :selectFoods='selectFoods' ></Shopcart>

    <!-- 商品詳情 -->
    <Food :food='selectedFood' ref='foodView'></Food>
  </div>
</template>

<script>
// 導入iscroll
import BScroll from 'better-scroll'

//導入shopcart
import Shopcart from 'components/Shopcart/Shopcart'

//導入cartcontrol
import Cartcontrol from 'components/Cartcontrol/Cartcontrol'

//導入food
import Food from 'components/food/food'

export default {
  data() {
    return {
      container: {},
      goods: [],
      poiInfo: {},
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      footScroll:{},
      selectedFood: {}
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
          that.poiInfo = dataSource.data.poi_info;
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
     this.menuScroll = new BScroll(this.$refs.menuScroll,{click: true});

     //設定probeType才能捕抓捲軸高度  ref: https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html#scroll
     this.foodScroll = new BScroll(this.$refs.foodScroll,{probeType: 3,click: true});

     //監聽滾動監聽事件
     this.foodScroll.on('scroll',(pos)=>{
      this.scrollY = Math.abs(Math.round(pos.y));
     });
    },
    calculateHeight(){
          //通過$erfs得取對應的元素
          let foodlist=this.$refs.foodScroll.getElementsByClassName('food-list-hook');
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
    },
   selectMenu(index){
      let foodlist=this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      //根據下標滾動到相對應的元素
      let el = foodlist[index];
      this.foodScroll.scrollToElement(el,250);
   },
   calculateCount(spus){

     let count = 0;
     spus.forEach((food)=>{
       if(food.count>0){
         count += food.count;
       }
     })
     return count;
   },
   showDetail(food){
     //傳值
     this.selectedFood = food;

     //顯示詳情頁
      this.$refs.foodView.showView();
   }
  },
  computed:{ //計算屬性(不能傳參數)
   currentIndex(){//根據右側滾動位置，確定對硬的索引下標
      for(let i = 0 ;  i < this.listHeight.length ; i++){

        //獲取商品區間的範圍
        let height1 =  this.listHeight[i];
        let height2 =  this.listHeight[i+1];

        //是否再上述區間中
        if( (this.scrollY >= height1 && this.scrollY < height2))
        {

          return i;

        }
      }
      return 0;
   },
   selectFoods(){
    let foods = [];
     this.goods.forEach((good)=>{
       good.spus.forEach((food)=>{
            if(food.count >0){
              foods.push(food);
            }
       })
     });
      return foods;
   }

  },
  components:{
    BScroll,
    Shopcart,
    Cartcontrol,
    Food
  }
};
</script>

<style lang="sass" scoped  >
  //  導入sass
  @import './Goods.sass'
</style>

