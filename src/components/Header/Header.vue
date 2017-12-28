<template>
  <div class="header">
    <!-- {{poiInfo.name}} -->

    <!-- Top內容 -->
    <div class="top-wrapper">
      <div class="back--wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜尋店內商品">
      </form>
      <div class="more-wrapper">
          <a href="#" class="spell-bt">訂購單</a>
          <div class="more-bt"></div>
      </div>
    </div>
    <!-- 主題內容 -->
    <div class="content-wrapper"></div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper"></div>

  </div>
</template>

<script>
export default {
  props: {
    poiInfo:{
      type: Object,
      default: {},
    }
  }
};
</script>



<style >
 /* 導入css樣式 */
  @import url("Header.scss");
</style>

