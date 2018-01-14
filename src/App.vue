<template>
  <div id="app">
    <!-- 綁定屬性傳入參數 -->
   <Myheader :poiInfo="poiInfo">

   </Myheader>
   <MyNav :commentNum = "commentNum">

   </MyNav>

   <!-- <div class="content">
     content
   </div> -->

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->

 <!-- keep-alive保留位置，避免多次請求 -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  

  </div>
</template>

<script>
//1 導入
import Myheader from "components/Header/Header";
import MyNav from "components/Nav/Nav";

export default {
  name: "app",
  components: {
    //2 註冊組件
    Myheader,
    MyNav
  },
  //傳遞資料給子組件
  data() {
    return {
      //header組件需要的信息(商家信息)
      poiInfo: {},
      commentNum: 0
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
          that.poiInfo = dataSource.data.poi_info;
          // console.log(that.poiInfo);
        }
      })
      .catch(function(error) {
        //出錯處理
        console.log(error);
      });

    this.$axios
      .get("/api/ratings")
      .then(function(response) {
        //獲取到數據
        var dataSource = response.data;
        if (dataSource.code == 0) {
          that.commentNum = dataSource.data.comment_num;
        }
      })
      .catch(function(error) {
        //出錯處理
        console.log(error);
      });
  }
};
</script>

<style>

</style>
