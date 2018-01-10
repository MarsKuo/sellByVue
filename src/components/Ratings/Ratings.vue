<template>
  <div class="ratings">
    <div class="ratings-wrapper">
        <div class="overview">
          <div class="overview-left">{{}}</div>
          <div class="overview-right"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ratings: {}
    }
  },
  created(){
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
}
</script>


<style lang="scss" scoped>

@import './Ratings.scss';
</style>


