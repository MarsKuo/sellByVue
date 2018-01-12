<template>
  <div class="seller">
    <div class="seller-wrapper">
        <Split></Split>
        <div class="seller-view">
          <div class="address-wrapper">
            <div class="address-left">
              {{seller.address}}
            </div>
            <div class="address-right"></div>
          </div>
          <div class="pics-wrapper">

          </div>
          <div class="safety-wrapper">

          </div>
        </div>

        <Split></Split>
        <div class="top-wrapper"></div>

        <Split></Split>
        <div class="other-wrapper"></div>
    </div>
  </div>
</template>

<script>
// 導入Bscroll
import BScroll from "better-scroll";
//導入 Split
import Split from "components/Split/Split";

export default {
  data(){
      return {
        seller: {}
      }
  },
  created() {
    var that = this;
    this.$axios
      .get("/api/seller")
      .then(function(response) {
        //獲取到數據
        var dataSource = response.data;
        if (dataSource.code == 0) {
          that.seller = dataSource.data;

          //初始化滾動
          // that.$nextTick(() => {
          //   if (!that.scroll) {
          //     that.scroll = new BScroll(that.$refs.ratingView, { click: true});
          //   } else {
          //     that.scroll.refresh();
          //   }
          // });
        }
      })
      .catch(function(error) {
        //出錯處理
        console.log(error);
      });
  },
  components: {
    BScroll,
    Split
  }
};
</script>

<style lang="sass" scoped>
@import './Seller.sass'
</style>

