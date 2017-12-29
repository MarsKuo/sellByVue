<template>
  <div class="header">
    <!-- {{poiInfo.name}} -->

    <!-- Top內容 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜尋店內商品">
      </form>
      <div class="more-wrapper">
          <a href="#" class="spelling-bt">拚單</a>
          <div class="more-bt">
            <i class="s-radius"></i>
            <i class="s-radius"></i>
            <i class="s-radius"></i>
          </div>

      </div>
    </div>
    <!-- 主題內容 -->
    <div class="content-wrapper"></div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper"></div>
    <!-- 背景 -->
    <div class="bg-wrapper" :style="content_bg" >
      <!-- <img :src="poiInfo.head_pic_url" alt=""> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {    //組件傳值
    poiInfo:{
      type: Object,
      default: {},
    }
  },
  computed:{  //計算屬性
    content_bg(){
      return `background-image: url(${this.poiInfo.head_pic_url})`;
    }
  }
};
</script>



<style>
 /* 導入字體圖標 */
 @import url("../../common/styles/icon.css");
</style>




<style lang="sass" scoped  >
  //  導入sass
  @import './Header.sass';
</style>
