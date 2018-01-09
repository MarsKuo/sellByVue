<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count">
        <span class="inner  icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <i class="icon-add_circle">
        <i class="bg"></i>
      </i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    decreaseCart() {
      this.food.count--;
    },
    addCart() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    }
  }
};
</script>

<style lang="sass" scoped  >
  @import './Cartcontrol.sass'
</style>
