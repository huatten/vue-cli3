<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="calendar">
        <div class="calendar__header">
          <div class="header__pre" @click="handlePreMonth"></div>
          <div class="header__title">{{selectedYear}}年{{selectedMonth + 1}}月{{selectedDate}}日</div>
          <div class="header__next" @click="handleNextMonth"></div>
        </div>
        <div class="calendar__main">
          <div class="main__head" v-for="(item, index) in calendarHeader"
              :key="index">
            {{item}}
          </div>
          <div :class="`main__block ${item.day === selectedDate && 'main__block__today'}`"
               @click="handleDayClick(item)"
               v-for="(item, index) in displayDaysPerMonth(selectedYear, selectedMonth)"
               :key="item.type + item.day + `${index}`">
            {{item.day}}
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
export default {
  name: "listPage",
  data() {
    return {
      hasBack: false,
      titleTxt: "日历",
      calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate(),
      DATE: [
        {
          date: "2019-02-13",
          refund: true
        },
        {
          date: "2019-02-15",
          refund: true
        },
        {
          date: "2019-02-21",
          refund: false
        },
        {
          date: "2019-02-28",
          refund: false
        }
      ]
    };
  },
  methods: {
    displayDaysPerMonth(year, month) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }
      let targetDay = new Date(year, month, 1).getDay();
      let total_calendar_list = [];
      let preNum = targetDay;
      let nextNum = 0;
      if (targetDay > 0) {
        for (let i = 0; i < preNum; i++) {
          let obj = {
            type: "pre",
            day: null,
            date: null
          };
          total_calendar_list.push(obj);
        }
      }
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

      // if (total_calendar_list.length > 35) {
      //   nextNum = 42 - total_calendar_list.length;
      // } else {
      //   nextNum = 35 - total_calendar_list.length;
      // }

      // if (month === 1 && new Date(year, month, 0).getDay() === 6) {
      //   nextNum = 0;
      // }

      nextNum = 6 - new Date(year, month + 1, 0).getDay();

      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: "next",
          day: null,
          date: null
        };
        total_calendar_list.push(obj);
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
      return iNum * 1 < 10 ? "0" + iNum : "" + iNum;
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
  width: 700px;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 44px;
  margin-top: 44px;
  .header__title {
    font-size: 30px;
    letter-spacing: 1px;
  }
  .header__pre {
    height: 24px;
    width: 24px;
    position: relative;
    &:after {
      content: " ";
      display: inline-block;
      height: 18px;
      width: 18px;
      border-width: 4px 4px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
      position: absolute;
      top: 50%;
      margin-top: -9px;
      right: 2px;
    }
  }
  .header__next {
    height: 24px;
    width: 24px;
    position: relative;
    &:after {
      content: " ";
      display: inline-block;
      height: 18px;
      width: 18px;
      border-width: 4px 4px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: absolute;
      top: 50%;
      margin-top: -9px;
      right: 2px;
    }
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
    color: #666;
    background-color: #fff;
    flex-shrink: 0;
    box-shadow: 0;
    position: relative;
  }
  .main__block__today {
    transition: 0.5s all;
    background-color: #ff8200;
    color: #fff;
    box-shadow: 0 4px 10px rgba(171, 171, 171, 0.5);
  }
}
</style>
