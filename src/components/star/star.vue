<template>
  <div class="stars" :class="'star-'+size">
    <span class="star" v-for="c in starClasses" :class="c" track-by="$index"></span>
  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  const LENGTH = 5

  export default{
    props: {
      size: Number,
      score: Number
    },

    computed: {
      starClasses () {
        const scs = []   // "on" "half" "off"
        const score = this.score   //4.5
        const scoreInteger = Math.floor(score)
        //添加on
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        //添加half
        if(score-scoreInteger>=0.5) {
          scs.push(CLASS_HALF)
        }
        //添加off
        while(scs.length<LENGTH) {
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .stars
    display: inline-block
    .star
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star
        width: 20px
        height: 20px
        background-size: 20px 20px
        margin-right: 22px
        &:last-child
          margin-right: 0
        &.on
          bg-image(star48_on)
        &.off
          bg-image(star48_off)
        &.half
          bg-image(star48_half)
    &.star-36
      .star
        width: 15px
        height: 15px
        background-size: 15px 15px
        margin-right: 6px
        &:last-child
          margin-right: 0
        &.on
          bg-image(star36_on)
        &.off
          bg-image(star36_off)
        &.half
          bg-image(star36_half)
    &.star-24
      .star
        width: 10px
        height: 10px
        background-size: 10px 10px
        margin-right: 3px
        &:last-child
          margin-right: 0
        &.on
          bg-image(star24_on)
        &.off
          bg-image(star24_off)
        &.half
          bg-image(star24_half)
</style>
