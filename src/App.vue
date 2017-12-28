<template>
  <div id="app">
    <!-- 綁定屬性傳入參數 -->
   <Myheader :poiInfo="poiInfo">

   </Myheader>
   <MyNav>

   </MyNav>

   <!-- <div class="content">
     content
   </div> -->

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

  </div>
</template>

<script>
//1 導入
import Myheader from "./components/Header/Header";
import MyNav from "./components/Nav/Nav";

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
      poiInfo: {}
    };
  },
  created() {//發起非同步請求，獲取數據
    var that = this;
    //通過axios來取得資料
    this.$axios.get("/api/goods")
      .then(function(response) { //獲取到數據
        var dataSource = response.data;
        if(dataSource.code ==0){
            that.poiInfo = dataSource.data.poi_info;
            // console.log(that.poiInfo);
        }
      })
      .catch(function(error) { //出錯處理
        console.log(error);
      });
  }
};
</script>

<style>

</style>
