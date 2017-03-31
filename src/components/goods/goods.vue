<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <!--
        <li class="menu-item current">
        <span class="text border-1px">
          热销榜
        </span>
        </li>
        <li class="menu-item">
        <span class="text border-1px">
          <span class="icon special"></span>单人精彩套餐
        </span>
        </li>-->
        <li class="menu-item" v-for="good in goods" :class="{current: $index===currentIndex}"
            @click="selectMenuItem($index, $event)">
          <span class="text border-1px">
            <span class="icon" :class="classMap[good.type]" v-if="good.type>=0"></span>{{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li class="food-list food-list-hook" v-for="good in goods">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="food in good.foods">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"
              :select-foods="selectFoods"></shopcart>
  </div>
  <div>food组件</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import shopcart from '../shopcart/shopcart'

  const OK = 0
  export default{
    props: {
      seller: Object
    },

    data () {
      return {
        goods: [],
        scrollY: 0,
        tops: []
      }
    },

    created () {
      this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"]
      this.$http.get('/api/goods')
        .then(response => {
          const result = response.body
          if(result.code===OK) {
            this.goods = result.data

            // 将回调延迟到下次 DOM 更新循环之后执行
            this.$nextTick(() => {
              //初始化scroll对象
              this._initScroll()
              //初始化所有food标签项的top坐标
              this._initTops()
            })
          }
        })
    },

    methods: {
      _initScroll () {
        //创建menu的scroll
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        })
        //创建foods的scroll
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
          probeType: 3  //才能监视scroll
        })

        //监视foods的scroll
        this.foodsScroll.on('scroll', (pos) => {
          // console.log(pos.x, pos.y)
          this.scrollY = Math.abs(pos.y)
        })
      },
      _initTops () {

        let top = 0
        this.tops.push(top)
        //找到所有food列表项标签
        const foodListEles = this.$els.foodsWrapper.getElementsByClassName('food-list')
        for (let i = 0, length=foodListEles.length; i < length; i++) {
          top += foodListEles[i].clientHeight
          this.tops.push(top)
        }
        console.log(this.tops)
      },

      selectMenuItem (index, event) {
        console.log('selectMenuItem', event)
        //只使用better-scroll为我们分发的事件, 过滤掉浏览器产生的事件
        if(!event._constructed) {
          return
        }
        const foodListEles = this.$els.foodsWrapper.getElementsByClassName('food-list')
        this.foodsScroll.scrollToElement(foodListEles[index], 300)
      }
    },

    computed: {
      //计算当前的下标
      currentIndex () {
        const scrollY = this.scrollY
        const tops = this.tops
        //查找下标
        return tops.findIndex((top, index) => {
          return scrollY>=top && scrollY<tops[index+1]
        })
      },
      //计算出count>0的food数组
      selectFoods () {
        const foods = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if(food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },

    components: {
      cartcontrol,
      shopcart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
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
            right: 0
            bottom: 12px
</style>
