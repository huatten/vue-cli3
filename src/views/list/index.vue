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
                :class="{cur__month:dep_id==item.mid}"
                v-for="(item ,i) in calendarMonth" 
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
               :class="{'main__block__disabled': item.type==='disabled', 'main__block__today' : today === `${selectedYear}-${_toDou(selectedMonth+1)}-${_toDou(item.day)}` }"
               @click.prevent="handleDayClick(item)"
               v-for="(item, index) in getMonthDays(selectedYear, selectedMonth)"
               :key="item.type + item.day + `${index}`">
            {{today === `${selectedYear}-${_toDou(selectedMonth+1)}-${_toDou(item.day)}` ? '今天' :item.day}}
          </div>
        </div>
      </div>
    </m-content>
    <m-footer></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * https://github.com/zwhGithub/vue-calendar
 * https://www.cnblogs.com/fangnianqin/p/9910129.html
 * http://www.cnblogs.com/gqx-html/p/9962148.html
 * https://juejin.im/post/5959b1db6fb9a06ba317c88b#heading-0
 * https://www.cnblogs.com/jlliu/p/9854918.html
 */
import Swiper from "swiper";
//import "../../node_modules/swiper/dist/css/swiper.min.css";
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
      dep_id: 2,
      dep_name: "2月",
      swiperWidth: "",
      maxTranslate: "",
      maxWidth: ""
    };
  },
  mounted() {
    this.initData();
    var that = this;
    that.mySwiper = new Swiper("#topNav", {
      freeMode: true,
      freeModeMomentumRatio: 0.5,
      slidesPerView: "auto",
      resistanceRatio: 0.7,
      observer: true,
      observeParents: false
    });

    that.swiperWidth =
      document.querySelector(".swiper-container").clientWidth ||
      that.mySwiper.width;
    that.maxTranslate = that.mySwiper.maxTranslate();
    that.maxWidth = -that.maxTranslate + that.swiperWidth / 2;

    that.mySwiper.on("tap", function(swiper) {
      //swiper.clickedIndex(获取到当前点击的索引)
      console.log(swiper);
      if (that.dep_id == that.calendarMonth[swiper.clickedIndex].mid) {
        return;
      }
      that.dep_name = that.calendarMonth[swiper.clickedIndex].name;
      that.dep_id = that.calendarMonth[swiper.clickedIndex].mid;
      var slide, slideLeft, slideWidth, slideCenter, nowTlanslate;
      slide = swiper.slides[swiper.clickedIndex];
      slideLeft = slide.offsetLeft;
      slideWidth = slide.clientWidth;
      slideCenter = slideLeft + slideWidth / 2;
      that.mySwiper.setWrapperTransition(300);
      if (slideCenter < that.swiperWidth / 2) {
        that.mySwiper.setWrapperTranslate(0);
      } else if (slideCenter > that.maxWidth) {
        that.mySwiper.setWrapperTranslate(that.maxTranslate);
      } else {
        nowTlanslate = slideCenter - that.swiperWidth / 2;
        that.mySwiper.setWrapperTranslate(-nowTlanslate);
      }
    });
  },
  methods: {
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
      console.log(this.selectedMonth);
    },
    //渲染日期
    getMonthDays(year, month) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }
      // 当月第一天为周几
      let targetDay = new Date(year, month, 1).getDay();
      let total_calendar_list = [];
      let preNum = targetDay;
      let nextNum = 0;
      if (targetDay > 0) {
        // 当前月份1号前的自然周剩余日期，置空
        for (let i = 0; i < preNum; i++) {
          let obj = {
            type: "disabled",
            day: i + 1,
            date: null
          };
          total_calendar_list.push(obj);
        }
      }
      // 判断当前年月份
      let formatMonth = month + 1 >= 10 ? month + 1 : "0" + (month + 1);
      this.prevYearMonthBoolean =
        `${year}-${formatMonth}` === this.minYearMonth ? true : false;
      this.nextYearMonthBoolean =
        `${year}-${formatMonth}` === this.maxYearMonth ? true : false;
      for (let i = 0; i < daysInMonth[month]; i++) {
        let obj = {
          type: "normal",
          day: i + 1,
          date: `${this.selectedYear}-${this._toDou(
            this.selectedMonth + 1
          )}-${this._toDou(i + 1)}`
        };
        total_calendar_list.push(obj);
      }
      // 当前月份28/29/30/31号后的自然周剩余日期，置空
      nextNum = 6 - new Date(year, month + 1, 0).getDay();
      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: "disabled",
          day: i + 1,
          date: null
        };
        total_calendar_list.push(obj);
      }
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
          total_calendar_list[i].type === "normal"
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
      padding: 0 25px;
      font-size: 28px;
      text-align: center;
      color: #000;
      display: block;
      &.cur__month {
        color: #f90;
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
