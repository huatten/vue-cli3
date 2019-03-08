<template>
  <div class="m-tabbar">
    <div class="swiper-container" :class="options.container">
      <div class="swiper-wrapper" >
        <div 
          class="m-tabbar-item swiper-slide"
          :class="{'m-tabbar-item-checked' : index === slideOptions.slideIndex}"
          v-for="(item, index) in slideArr"
          :style="[slideStyle]" 
          :data-id="options.slideId[index]"
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
import Swiper from 'swiper/dist/js/swiper.js'; //reason => https://github.com/nolimits4web/swiper/issues/2263
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
        height: this.options.height || "80px",
        //垂直高度
        lineHeight: this.options.height || "80px"
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
      this.mySwiper = new Swiper(`.${this.options.container}`, {
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
            this._slideMove();
            //更改class
            this.slideOptions.slideIndex = this.mySwiper.clickedIndex;
            //下划线
            this.$refs.slideDownLine.style.transform = `translateX(${this
              .slideOptions.slideIndex * parseInt(this.slideStyle.width)}px)`;
            //回调函数
            this.$emit(
              "callback",
              event,
              this.mySwiper.clickedIndex,
              event.target.innerText,
              event.target.dataset.id
            );
          }
        }
      });
    },
    _slideMove() {
      //点击的nav
      const slide = this.mySwiper.slides[this.mySwiper.clickedIndex];
      //点击的nav offsetLeft距离浏览器左边距离
      const slideLeft = slide.offsetLeft;
      //点击的nav的可视宽度
      const slideWidth = slide.clientWidth;
      //导航可视宽度
      const clientWidth = this.mySwiper.width;
      //导航总宽度
      const swiperWidth = slideWidth * this.mySwiper.slides.length;
      if (slideLeft < (clientWidth - parseInt(slideWidth)) / 2) {
        this.mySwiper.setTranslate(0);
      } else if (
        slideLeft >
        swiperWidth - parseInt(slideWidth + clientWidth) / 2
      ) {
        this.mySwiper.setTranslate(clientWidth - swiperWidth);
      } else {
        this.mySwiper.setTranslate(
          (clientWidth - parseInt(slideWidth)) / 2 - slideLeft
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.m-tabbar {
  background: #fff;
  &.m-tabbar-more {
    position: relative;
    &::before {
      pointer-events: none;
      content: "";
      height: 100%;
      width: 80px;
      position: absolute;
      top: 0;
      z-index: 3;
      left: 0;
      background: linear-gradient(90deg, #fff, rgba(230, 0, 68, 0));
    }
    &::after {
      pointer-events: none;
      content: "";
      height: 100%;
      width: 80px;
      position: absolute;
      top: 0;
      z-index: 3;
      right: 0;
      background: linear-gradient(270deg, #fff, rgba(230, 0, 68, 0));
    }
  }
  .swiper-container {
    width: 100%;
    margin: 0 auto;
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
