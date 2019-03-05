<template>
  <div class="m-tabbar" >
    <div class="swiper-container" :class="options.container" id="tabbar">
      <div class="swiper-wrapper" >
        <div 
          class="m-tabbar-item swiper-slide"
          :class="{'m-tabbar-item-checked' : index === slideOptions.slideIndex}" 
          v-for="(item, index) in slideArr"
          :style="[slideStyle]" 
          :key="index">{{item}}</div>
          <!-- 下划线 -->
        <div 
          :style="{width: slideStyle.width, height: downLineStyle.downLineHeight, background: downLineStyle.downLineColor}"
          ref="slideDownLine" class="m-tabbar-line"></div>
    </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Swiper from "swiper";
export default {
  name: "MTabbar",
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      mySwiper: null,
      slideArr: this.options.slideData,
      slideStyle: {
        //宽度
        width: this.options.width || "100px",
        //高度
        height: this.options.height || "60px",
        //垂直高度
        lineHeight: this.options.height || "60px"
      },
      downLineStyle: {
        //下划线高度
        downLineHeight: this.options.downLineHeight || "2px",
        //下划线颜色
        downLineColor: this.options.downLineColor || "#f90"
      },
      //选项
      slideOptions: {
        slideIndex: this.options.index || 0
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      if (this.mySwiper) {
        this.mySwiper.destroy(true, false);
      }
      this.mySwiper = new Swiper("#tabbar", {
        slidesPerView: "auto",
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        observer: true,
        observeParents: true,
        on: {
          init: () => {
            //默认选中
            this.slideOptions.slideIndex = this.options.index || 0;
            //下划线
            this.$refs.slideDownLine.style.transform = `translateX(${this
              .slideOptions.slideIndex * parseInt(this.slideStyle.width)}px)`;
          },
          tap: () => {
            //滑动时间
            this.mySwiper.setTransition(300);
            //滑动
            this._slideMove(swiperWidth, maxTranslate, maxWidth);
            //更改class
            this.slideOptions.slideIndex = this.mySwiper.clickedIndex;
            //下划线
            this.$refs.slideDownLine.style.transform = `translateX(${this
              .slideOptions.slideIndex * parseInt(this.slideStyle.width)}px)`;
          }
        }
      });
      //swiper可视宽度
      const swiperWidth = this.mySwiper.width;
      //swiper最大移动距离
      const maxTranslate =
        swiperWidth - parseInt(this.slideStyle.width) * this.slideArr.length;
      //
      const maxWidth = -maxTranslate + swiperWidth / 2;
    },
    _slideMove(swiperWidth, maxTranslate, maxWidth) {
      //点击的slide
      const slide = this.mySwiper.slides[this.mySwiper.clickedIndex];
      //点击的slide offsetLeft距离浏览器左边距离
      const slideLeft = slide.offsetLeft;
      //点击的slide的可视宽度
      const slideWidth = slide.clientWidth;
      // 被点击slide的中心点
      const slideCenter = slideLeft + slideWidth / 2;
      //当中心点距离少于一半宽度时
      if (
        slideWidth * this.mySwiper.slides.length < swiperWidth ||
        slideCenter < swiperWidth / 2
      ) {
        this.mySwiper.setTranslate(0);
      } else if (slideCenter > maxWidth) {
        this.mySwiper.setTranslate(maxTranslate);
      } else {
        const nowTlanslate = slideCenter - swiperWidth / 2;
        this.mySwiper.setTranslate(-nowTlanslate);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.m-tabbar {
  background: #fff;
  .swiper-container {
    width: 700px;
    margin: 50px auto;
    position: relative;
    overflow-x: hidden;
  }
  .swiper-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    white-space: nowrap;
    -webkit-user-drag: none;
    touch-action: pan-x;
    touch-action: pan-y;
    .m-tabbar-item {
      flex: 1;
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: auto;
      box-sizing: border-box;
      font-size: 28px;
      text-align: center;
      color: #333;
      display: block;
      &.m-tabbar-item-checked {
        color: #f90;
      }
    }
  }
  .m-tabbar-line {
    position: absolute;
    left: 0;
    bottom: 0;
    transition: transform 0.3s;
    transform: translateX(0);
  }
}
</style>
