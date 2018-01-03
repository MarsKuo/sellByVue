<template>
  <div class="star">
    <!-- itemClass: on,half,off -->
    <span :key="index"  v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  //先定義星星長度
  const LENGTH= 5;
  // 星星對應的class
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
      props:{
        score: {
          type: Number
        }
      },
      computed: {
          itemClasses(){
            let reslut = [];
            //4.7 => 4.5   3.9= > 3.5
            //對分數進行處理 ，四捨五入
            let score = Math.floor(this.score *2) / 2;
            // 小數 ，控制半星
            let hasDecimal = score % 1 !== 0;
            // 整數，控制全星
            let integer = Math.floor(score);

            //全星
            for(let i=0;i<integer;i++){
              reslut.push(CLS_ON);
            }
            //半星
            if (hasDecimal) {
              reslut.push(CLS_HALF);
            }
            //補齊
            while(reslut.length < LENGTH){
              reslut.push(CLS_OFF)
            }
            return reslut;
          }
      }
  }
</script>

<style lang="sass" scoped  >
  //  導入sass
  @import './star.sass';
</style>
