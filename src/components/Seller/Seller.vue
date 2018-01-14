<template>
  <div class="seller">
    <div class="seller-wrapper">
        <Split></Split>
        <div class="seller-view">
          <div class="address-wrapper">
            <div class="address-left">
              {{seller.address}}
            </div>
            <div class="address-right">
              <div class="content"></div>
            </div>
          </div>
          <div class="pics-wrapper" ref="picsView">
          <ul class="pics-list" v-if="seller.poi_env" ref="picsList">
            <li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" ref="picsItem">
            <img :src="imgurl" alt="">
            </li>
          </ul>
          </div>
          <div class="safety-wrapper">
             查看食品安全檔案
             <span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>

        <Split></Split>
        <div class="tip-wrapper">
          <div class="delivery-wrapper">
            配送服務： {{seller.app_delivery_tip}}
          </div>
          <div class="shipping-wrapper">
          配送時間： {{seller.shipping_time}}
          </div>
        </div>

        <Split></Split>
        <div class="other-wrapper">
          <div class="poi-server">
            <div class="server-wrapper">
             商家服務
             <div class="poi-server" v-for="item in seller.poi_service">
             <img :src="item.icon" alt="">
             {{item.content}}
             </div>
            </div>
          </div>
          <div class="discounts-wrapper">
          <div class="discounts-item" v-for="item in seller.discounts2">
          <div class="icon">
            <img :src="item.icon_url" alt="">
            </div>
          <div class="text">
            {{item.info}}
          </div>

          </div>
          </div>
        </div>
        <Split class="bottom"></Split>
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
          that.$nextTick(() => {
            if (that.seller.poi_env.thumbnails_url_list) {
              let imgW = that.$refs.picsItem[0].clientWidth;
              let marginR =11;
              let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length;
              that.$refs.picsList.style.width = width +'px';
              that.scroll = new BScroll(that.$refs.picsView, { scrollX: true});
            } 
            // else {
            //   that.scroll.refresh();
            // }
          });
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

