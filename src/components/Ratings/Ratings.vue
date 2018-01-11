<template>
  <div class="ratings">
    <div class="ratings-wrapper">
        <div class="overview">
          <div class="overview-left">
            <div class="comment-score">
              <p class="score">{{ratings.comment_score}}</p>
              <p class="text">商家評分</p>
            </div>
            <div class="other-score">
              <div class="quality-score item">
                <span class="text">口味</span>
                <Star :score="ratings.quality_score" class="star"></Star>
                <span class="score">{{ratings.quality_score}}</span>
              </div>
              <div class="pack-score item">
                  <span class="text">包裝</span>
                <Star :score="ratings.pack_score" class="star"></Star>
                <span class="score">{{ratings.pack_score}}</span>
              </div>
            </div>
          </div>
          <div class="overview-right">
            <div class="delivery-score">
              <p class="score">{{ratings.delivery_score}}</p>
              <p class="text">配送評分</p>
            </div>
          </div>
        </div>
           <Split></Split>
    <div class="content">
      <div class="rating-select" v-if="ratings.tab">
        <span class="item">
          {{ratings.tab[0].comment_score_title}}
        </span>
        <span class="item">
          {{ratings.tab[1].comment_score_title}}
        </span>
        <span class="item">
          <img src="./icon_sub_tab_dp_normal@2x.png" alt="">
          {{ratings.tab[2].comment_score_title}}
        </span>
      </div>

      <div class="labels-view">
      </div>
      <div class="rating-list">
      </div>
    </div>
    </div>

  </div>
</template>

<script>
//導入Star組件
import Star from "components/Star/Star";
//導入Split組件
import Split from "components/Split/Split";

export default {
  data() {
    return {
      ratings: {}
    };
  },
  created() {
    var that = this;
    this.$axios
      .get("/api/ratings")
      .then(function(response) {
        //獲取到數據
        var dataSource = response.data;
        if (dataSource.code == 0) {
          that.ratings = dataSource.data;
        }
      })
      .catch(function(error) {
        //出錯處理
        console.log(error);
      });
  },
  components: {
    Star,
    Split
  }
};
</script>


<style lang="scss" scoped>
@import "./Ratings.scss";
</style>


