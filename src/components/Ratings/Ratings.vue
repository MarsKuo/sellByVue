<template>
  <div class="ratings"  ref="ratingView">
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
        <span class="item" @click="selectTypeFn(2)" :class="{'active':selectType ==2}">
          {{ratings.tab[0].comment_score_title}}
        </span>
        <span class="item" @click="selectTypeFn(1)" :class="{'active':selectType ==1}">
          {{ratings.tab[1].comment_score_title}}
        </span>
        <span class="item" @click="selectTypeFn(0)" :class="{'active':selectType ==0}">
          <img src="./icon_sub_tab_dp_normal@2x.png" alt="" v-show="selectType !=0">
          <img src="./icon_sub_tab_dp_highlighted@2x.png" alt="" v-show="selectType ==0">
          {{ratings.tab[2].comment_score_title}}
        </span>
      </div>

      <div class="labels-view">
        <span v-for="item in ratings.labels" class="item" :class="{'highlight':item.label_star>0}">
        {{item.content}}  {{item.label_count}}
        </span>
      </div>
      <div class="rating-list">
        <li v-for="comment in selectComments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <img :src="comment.user_pic_url" alt="" srcset="" v-if="comment.user_pic_url">
              <img src="./anonymity.png" alt="" srcset="" v-else>
            </div>
            <div class="comment-main">
              <div class="user">
                {{comment.user_name}}
              </div>
              <div class="time">
                {{formatDate(comment.comment_time)}}
              </div>
              <div class="star-wrapper">
                <span class="text">評分</span>
                <Star :score='comment.order_comment_score' class="star"></Star>
              </div>
              <div class="c_content" v-html="commentStr(comment.comment)">
              </div>
              <div class="img-wrapper" v-if="comment.comment_pics.length">
                <img v-for="item in comment.comment_pics" :src="item.thumbnail_url">
              </div>
            </div>
          </li>
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

// 導入iscroll
import BScroll from "better-scroll";

const ALL = 2 ; //全部
const PICTURE = 1 ;  //帶圖片
const COMMENT = 0;   //點評

export default {
  data() {
    return {
      ratings: {},
      selectType: ALL,
    };
  },
  methods:{
    selectTypeFn(type){
      this.selectType = type;
      this.$nextTick(()=>{
        this.scroll.refresh();
      })
    },
    formatDate(time) {
          let date = new Date(time * 1000);
          //時間格式

          let fmt = 'yyyy.MM.dd';
          if(/(y+)/.test(fmt)){
            let year = date.getFullYear().toString();
            fmt=fmt.replace(RegExp.$1,year);
          }

          if(/(M+)/.test(fmt)){
            let month = date.getMonth() +1 ;
            if(month<10){
              month='0' + month;
            }
            fmt = fmt.replace(RegExp.$1,month);
          }
           if(/(d+)/.test(fmt)){
            let mydate = date.getDate()  ;
             if(mydate<10){
              mydate='0' + mydate;
            }
            fmt = fmt.replace(RegExp.$1,mydate);
           }

           return fmt;
    },
    commentStr(content){
      let rel = /#[^#]+#/g;
      return content.replace(rel,'<i style="color: #576b95">$&</i>')
    }
  },
  computed:{
    selectComments(){
      if(this.selectType == ALL){
        //全部
        return this.ratings.comments;
      }else if(this.selectType == PICTURE){  //有圖
        let arr = [];
        this.ratings.comments.forEach((comment)=>{
          if(comment.comment_pics.length){
            arr.push(comment);
          }
        });
        return arr;
      }else{   //點評
        return this.ratings.comments_dp;
      }
    }
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


          //初始化滾動
          that.$nextTick(()=>{
                  if(!that.scroll){
                    that.scroll = new BScroll(that.$refs.ratingView,{click:true});
                  }
                  else{
                    that.scroll.refresh();
                  }
          });
        }
      })
      .catch(function(error) {
        //出錯處理
        console.log(error);
      });
  },
  components: {
    Star,
    Split,
    BScroll
  }
};
</script>


<style lang="scss" scoped>
@import "./Ratings.scss";
</style>


