<template>
  <div class="food" v-show="isShow" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>

      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" transition="fade" v-show="!food.count" @click="addFirst">加入购物车
        </div>
      </div>

      <split></split>

      <div class="info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>

      <split></split>

      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :ratings="food.ratings"
                      :select-type="selectType"
                      :only-content="onlyContent"
                      :desc="desc"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item border-1px" v-for="rating in food.ratings"
                v-show="filterRating(rating.rateType, rating.text)">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | dateString}}</div>
              <p class="text">
                <span :class="{'icon-thumb_down': rating.rateType===1, 'icon-thumb_up': rating.rateType===0 }"></span>{{rating.text}}
                <!--<span :class="ratingType(rating.rateType)"></span>{{rating.text}}-->
              </p>
            </li>
          </ul>
          <div class="no-rating" v-if="food.ratings" v-show="food.ratings.length===0">暂无评价</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'

  const ALL = 2

  export default{
    props: {
      food: Object
    },

    data () {
      return {
        isShow: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '所有',
          positive: '很好',
          negative: '咻咻'
        }
      }
    },

    methods: {
      show () {
        this.isShow = true
        if(!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            })
          })
        } else {
          this.scroll.refresh()
        }
      },
      hide () {
        this.isShow = false
      },
      ratingType (rateType) {
        return rateType===1 ? 'icon-thumb_down' : 'icon-thumb_up'
      },
      addFirst (event) {
        if(!event._constructed) {
          return
        }
        // this.food.count = 1
        Vue.set(this.food, 'count', 1)
      },

      filterRating (type, text) { //type: 0/1

        this.$nextTick(() => {
          this.scroll.refresh()
        })

        const selectType = this.selectType //0/1/2
        const onlyContent = this.onlyContent  //true/false

        if(onlyContent&&!text) {
          return false
        }

        if(selectType===ALL) {
          return true
        }

        return type===selectType
      }
    },

    events: {
      'select.type': function (type) {
        this.selectType = type
      },
      'only.content': function (onlyContent) {
          this.onlyContent = onlyContent
      }
    },

    filters: {
      dateString(value) {
        return moment(value).format('YYYY-MM-DD HH:mm')
      }
    },

    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transition
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-transition
          transition: all 0.2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
