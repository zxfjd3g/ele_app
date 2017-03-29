<template>
  <div>
    <!--头部组件标签-->
    <ele-header :seller="seller"></ele-header>
    <!--包含3个路由v-link-->
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path: '/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/seller'}">商家</a>
      </div>
    </div>
    <!--各路由template页面容器-->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header'

  export default {
    data () {
      return {
        seller: {}
      }
    },

    // 配置组件标签
    components: {
      'ele-header': header
    },

    created () {
      this.$http.get('/api/seller')
        .then((response) => {
          const result = response.body
          console.log(result)
          if(result.code===0) {
            this.seller = result.data
          }
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
