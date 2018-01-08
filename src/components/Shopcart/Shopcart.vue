<template>
  <div class="shopcart" :class="{'highlight' :totalCount >0 }">
    <div class="content-left">
      <div class="logo-wrapper" :class="{'highlight' :totalCount >0 }">
        <span class="icon-shopping_cart logo" :class="{'highlight' :totalCount >0 }"></span>
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="total-price" v-show="totalPrice" :class="{'highlight' :totalCount >0 }">{{totalPrice}} </p>
        <p class="tip">另需{{shipping_fee_tip}}</p>
      </div>
    </div>
    <div class="content-right" :class="{'highlight' :totalCount >0 }">
      {{payStr}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min_rice_tip:{
      type:String,
      default: ''
    },
    shipping_fee_tip:{
      type:String,
      default: ''
    },
    selectFoods: {
      type: Array,
      default(){
        return [
          // {
          // min_price : 10,
          // count: 3
          // },
          // {
          // min_price : 20,
          // count: 4
          // },{
          // min_price : 30,
          // count: 5
          // },
        ];
      }
    }
  },
  computed: {
    //總個數
    totalCount(){
      let num =0;
      this.selectFoods.forEach((food)=>{
        num += food.count ;
      })
       return num;
    },
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total += food.min_price * food.count;
      })
      return total;
    },
    //結算按鈕顯示
    payStr(){
      if(this.totalCount > 0){
        return "去結算";
      }
      else{
        return this.min_price_tip
      }
    }
  }
};
</script>

<style lang="sass" scoped  >
.shopcart
  width: 100%
  height: 51px
  background-color: #514f4f
  position: fixed
  bottom: 0
  left: 0
  display: flex
  &.highlight
    background-color: #2d2b2a
  .content-left
    flex: 1
    .logo-wrapper
      width: 50px
      height: 50px
      background-color: #666666
      border-radius: 50%
      position: relative
      top: -14px
      left: 10px
      text-align: center
      float: left
      &.highlight
        background-color: #ffd161
      .logo
        font-size: 28px
        color: #c4c4c4
        line-height: 50px
        &.highlight
          color: #2d2b2a
      .num
        width: 15px
        height: 15px
        line-height: 15px
        border-radius: 50%
        font-size: 9px
        color: white
        background-color: red
        position: absolute
        right: 0
        top: 0

    .desc-wrapper
      float: left
      margin-left: 13px
      .total-price
        font-size: 18px
        line-height: 33px
        color: white
      .tip
        font-size: 12px
        color: #bab9b9
        line-height: 51px
        &.highlight
          line-height: 12px
  .content-right
    flex: 0 0 110px
    background-color: black
    font-size: 15px
    color: #bab9b9
    line-height: 51px
    text-align: center
    &.highlight
      color: #2d2b2a
      background-color: #ffd161
</style>
