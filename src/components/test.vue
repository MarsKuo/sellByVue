<template>
  <div class="text">
    我是測試組建中的內容
    <br>
    {{msg}}
  </div>
</template>
<script>
export default {
  data(){
    return {
      msg: "我是data屬性中的數據"
    }
  }
};
</script>
<style>
.text {
  color: red;
}
</style>


