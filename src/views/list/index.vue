<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <!--日历-->
      <div class="calendar">
        <div class="calendar__header">
          <div class="current__year">{{selectedYear}}年</div>
          <div class="current__month swiper-container" id="topNav" >
             <div class="swiper-wrapper scroll__month__body">
                <div 
                class="swiper-slide scroll__item" 
                :class="{cur__month:i == selectedMonth}"
                v-for="(item ,i) in calendarMonth" 
                :data-month="item.mid"
                style="width: 160px"
                :key="i">
                  {{item.name}}
                </div>
             </div>
          </div>
          <div class="toogle__icon"></div>
        </div>
        <div class="calendar__main">
          <div class="main__head" v-for="(item, index) in calendarWeek"
              :key="index">
            {{item}}
          </div>
          <div class="main__block"
               :class="{'main__block__disabled': item.type !=='nowMonth', 'main__block__today' : item.isToday}"
               @click.prevent="handleDayClick(item)"
               v-for="(item, index) in getMonthDays(selectedYear, selectedMonth)"
               :key="item.type + item.day + `${index}`">
            {{item.isToday ? '今天' :item.day}}
          </div>
        </div>
      </div>
    </m-content>
    <m-footer></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "swiper";
import timeUtil from "../../assets/js/utils/calendar.js";
export default {
  name: "listPage",
  data() {
    return {
      hasBack: false,
      titleTxt: "日历",
      calendarWeek: ["日", "一", "二", "三", "四", "五", "六"],
      calendarMonth: [
        { mid: "1", name: "1月" },
        { mid: "2", name: "2月" },
        { mid: "3", name: "3月" },
        { mid: "4", name: "4月" },
        { mid: "5", name: "5月" },
        { mid: "6", name: "6月" },
        { mid: "7", name: "7月" },
        { mid: "8", name: "8月" },
        { mid: "9", name: "9月" },
        { mid: "10", name: "10月" },
        { mid: "11", name: "11月" },
        { mid: "12", name: "12月" }
      ],
      minYearMonth: "", //起始时间
      maxYearMonth: "", //结束时间
      today: "", //今天
      currentDate: "", //服务器当前时间 2019-02-20
      storeSelectedFullDate: "", //手动选择的日期
      selectedYear: "",
      selectedMonth: "",
      selectedDate: "",
      prevYearMonthBoolean: false,
      nextYearMonthBoolean: false,
      mySwiper: null,
      navItemWidth: 160
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
      this.mySwiper = new Swiper("#topNav", {
        slidesPerView: "auto",
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        observer: true,
        observeParents: false,
        on: {
          init: () => {
            //默认选中
            this.initData();
          },
          tap: () => {
            //滑动时间
            this.mySwiper.setTransition(300);
            //滑动
            this._slide(swiperWidth, maxTranslate, maxWidth);
            //更改class
            this.selectedMonth = this.mySwiper.clickedIndex;
          },
          touchmove: e => {
            //解决拖动警告
            e.stopPropagation();
            e.preventDefault();
          }
        }
      });
      //导航可视宽度
      const swiperWidth = this.mySwiper.width;
      //导航最大移动距离
      const maxTranslate =
        swiperWidth - parseInt(this.navItemWidth) * this.mySwiper.slides.length;
      //导航移动
      const maxWidth = -maxTranslate + swiperWidth / 2;
    },
    _slide(swiperWidth, maxTranslate, maxWidth) {
      //点击的nav
      const slide = this.mySwiper.slides[this.mySwiper.clickedIndex];
      //点击的nav offsetLeft距离浏览器左边距离
      const slideLeft = slide.offsetLeft;
      //点击的nav的可视宽度
      const slideWidth = slide.clientWidth;
      //导航可视宽度
      const clientWidth = this.mySwiper.width;
      //导航总宽度
      const navWidth = slideWidth * this.mySwiper.slides.length;
      if (slideLeft < (clientWidth - parseInt(slideWidth)) / 2) {
        this.mySwiper.setTranslate(0);
      } else if (
        slideLeft >
        navWidth - parseInt(slideWidth + clientWidth) / 2
      ) {
        this.mySwiper.setTranslate(clientWidth - navWidth);
      } else {
        this.mySwiper.setTranslate(
          (clientWidth - parseInt(slideWidth)) / 2 - slideLeft
        );
      }
    },
    initData() {
      this.today = this.currentDate || this._getDateStr(0); // 如果没有服务器时间，拿本地时间
      this.minYearMonth = "2018-06";
      this.maxYearMonth = "2020-12";
      // 是否有手动选中的日期
      let selectedFullDate = this.storeSelectedFullDate;
      if (!this.storeSelectedFullDate) {
        selectedFullDate = this.currentDate || this._getDateStr(0); // 如果没有服务器时间，拿本地时间
      }
      this.selectedYear = Number(selectedFullDate.split("-")[0]);
      this.selectedMonth = Number(selectedFullDate.split("-")[1]) - 1;
      this.selectedDate = Number(selectedFullDate.split("-")[2]);
    },
    //渲染日期
    getMonthDays(year, month) {
      const total_calendar_list = timeUtil.getMonthList(new Date(year, month));
      console.log(total_calendar_list);
      const DATE = [
        {
          date: "2019-02-02",
          refund: "REFUNDED"
        },
        {
          date: "2019-02-06",
          refund: "REFUNDED"
        },
        {
          date: "2019-02-18",
          refund: "REFUNDING"
        },
        {
          date: "2019-02-28",
          refund: "REFUNDING"
        }
      ];
      const obj = {};
      DATE.map(e => {
        obj[e.date] = e.refund;
      });
      for (let i = 0; i < total_calendar_list.length; i++) {
        if (
          obj[total_calendar_list[i].date] !== undefined &&
          total_calendar_list[i].type === "nowMonth"
        ) {
          total_calendar_list[i].refund = obj[total_calendar_list[i].date];
        }
      }
      console.log(total_calendar_list);
      return total_calendar_list;
    },
    handleDayClick(item) {
      if (item.type === "normal") {
        // do anything...
        this.selectedDate = Number(item.day);
      }
    },
    handlePreMonth() {
      if (this.prevYearMonthBoolean) return;
      if (this.selectedMonth === 0) {
        this.selectedYear = this.selectedYear - 1;
        this.selectedMonth = 11;
        this.selectedDate = 1;
      } else {
        this.selectedMonth = this.selectedMonth - 1;
        this.selectedDate = 1;
      }
    },
    handleNextMonth() {
      if (this.nextYearMonthBoolean) return;
      if (this.selectedMonth === 11) {
        this.selectedYear = this.selectedYear + 1;
        this.selectedMonth = 0;
        this.selectedDate = 1;
      } else {
        this.selectedMonth = this.selectedMonth + 1;
        this.selectedDate = 1;
      }
    },
    _toDou(iNum) {
      //补零
      return iNum * 1 < 10 ? "0" + iNum : "" + iNum;
    },
    _getDateStr(AddDayCount, dateStr, type) {
      //格式化日期
      var dd;
      if (!dateStr) {
        dd = new Date();
      } else {
        // 判断是否为IOS
        const isIOS = !!navigator.userAgent.match(
          /\(i[^;]+;( U;)? CPU.+Mac OS X/
        );

        let formatDateStr = isIOS ? dateStr.replace(/-/g, "/") : dateStr;
        dd = new Date(
          formatDateStr.length < 12
            ? formatDateStr + " 00:00:00"
            : formatDateStr
        );
      }
      dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

      let y = dd.getFullYear();
      let m;
      let d;
      if (type === "lhRili") {
        m = dd.getMonth() + 1;
        d = dd.getDate();
      } else {
        let currentMon = dd.getMonth() + 1;
        let getDate = dd.getDate();
        m = currentMon < 10 ? "0" + currentMon : currentMon; // 获取当前月份的日期，不足10补0
        d = getDate < 10 ? "0" + getDate : getDate; // 获取当前几号，不足10补0
      }

      let time = y + "-" + m + "-" + d;
      return time;
    }
  }
};
</script>
<style lang="scss" scoped>
.calendar {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0 20px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
}
.calendar__header {
  color: #2c3135;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  overflow: hidden;
  .current__year {
    padding-left: 30px;
    flex: 0 0 150px;
    font-size: 28px;
  }
  .current__month {
    flex: 0 0 520px;
    position: relative;
    overflow-x: hidden;
    .scroll__month__body {
      width: 100%;
      height: 100%;
      display: flex;
      white-space: nowrap;
      -webkit-user-drag: none;
      touch-action: pan-x;
      touch-action: pan-y;
    }
    .scroll__item {
      flex: 1;
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: auto;
      box-sizing: border-box;
      font-size: 28px;
      text-align: center;
      color: #000;
      display: block;
      &.cur__month {
        color: #f90;
        font-weight: 550;
      }
    }
  }
  .toogle__icon {
    flex: 0 0 60px;
    height: 30px;
    background: url(./images/list.png) no-repeat center 0;
    background-size: 30px auto;
    font-size: 30px;
  }
}
.calendar__main {
  width: 700px;
  max-width: 700px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 19px;
  .main__head {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    margin-bottom: 20px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: #7f8fa4;
    background-color: #fff;
    flex-shrink: 0;
  }
  .main__block {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    margin-bottom: 20px;
    border-radius: 50%;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2e2e39;
    background-color: #fff;
    flex-shrink: 0;
    box-shadow: 0;
    position: relative;
    &.main__block__disabled {
      transition: 0.2s all;
      color: #cbc9d5;
    }
  }
  .main__block__today {
    transition: 0.5s all;
    background-color: #ff8200;
    color: #fff;
    box-shadow: 0 4px 10px rgba(171, 171, 171, 0.5);
  }
  .main__block__refunding {
    transition: 0.5s all;
    background-color: red;
    color: #fff;
  }
  .main__block__refunded {
    transition: 0.5s all;
    background-color: #ccc;
  }
}
</style>
