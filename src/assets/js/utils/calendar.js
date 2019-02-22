export default {
  // 当某月的天数
  getDaysInOneMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = new Date(year, month, 0);
    return d.getDate();
  },
  // 向前空几个
  getMonthweek(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateFirstOne = new Date(year + "-" + month + "-1");
    return this.sundayStart
      ? dateFirstOne.getDay() == 0
        ? 7
        : dateFirstOne.getDay()
      : dateFirstOne.getDay() == 0
        ? 6
        : dateFirstOne.getDay() - 1;
  },
  /**
   * 获取当前日期上个月或者下个月
   */
  getOtherMonth(date, str = "nextMonth") {
    const timeArray = this.dateFormat(date).split("-");
    const year = timeArray[0];
    const month = timeArray[1];
    const day = timeArray[2];
    let year2 = year;
    let month2;
    if (str === "nextMonth") {
      month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
    } else {
      month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
    }
    let day2 = day;
    const days2 = new Date(year2, month2, 0).getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    if (day2 < 10) {
      day2 = "0" + day2;
    }
    const t2 = year2 + "-" + month2 + "-" + day2;
    return new Date(t2);
  },
  // 上个月末尾的一些日期
  getLeftArr(date) {
    const arr = [];
    const leftNum = this.getMonthweek(date);
    const num =
      this.getDaysInOneMonth(this.getOtherMonth(date, "preMonth")) -
      leftNum +
      1;
    const preDate = this.getOtherMonth(date, "preMonth");
    // 上个月多少开始
    for (let i = 0; i < leftNum; i++) {
      const nowTime =
        preDate.getFullYear() +
        "-" +
        this._toDou(preDate.getMonth() + 1) +
        "-" +
        this._toDou(num + i);
      arr.push({
        day: num + i,
        date: nowTime,
        isToday: false,
        type: "preMonth"
      });
    }
    return arr;
  },
  // 下个月末尾的一些日期
  getRightArr(date) {
    const arr = [];
    const nextDate = this.getOtherMonth(date, "nextMonth");
    const leftLength = this.getDaysInOneMonth(date) + this.getMonthweek(date);
    const _length = 7 - (leftLength % 7);
    for (let i = 0; i < _length; i++) {
      const nowTime =
        nextDate.getFullYear() +
        "-" +
        this._toDou(nextDate.getMonth() + 1) +
        "-" +
        this._toDou(i + 1);
      arr.push({
        day: i + 1,
        date: nowTime,
        isToday: false,
        type: "nextMonth"
      });
    }
    return arr;
  },
  // format日期
  dateFormat(date) {
    date = typeof date === "string" ? new Date(date.replace(/\//g, "-")) : date;
    return (
      date.getFullYear() +
      "-" +
      this._toDou(date.getMonth() + 1) +
      "-" +
      this._toDou(date.getDate())
    );
  },
  // 获取某月的列表不包括上月和下月
  getMonthListNoOther(date) {
    const arr = [];
    const num = this.getDaysInOneMonth(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const toDay = this.dateFormat(new Date());
    for (let i = 0; i < num; i++) {
      const nowTime =
        year + "-" + this._toDou(month) + "-" + this._toDou(i + 1);
      arr.push({
        day: i + 1,
        date: nowTime,
        isToday: toDay === nowTime,
        type: "nowMonth"
      });
    }
    return arr;
  },
  // 获取某月的列表 用于渲染
  getMonthList(date) {
    return [
      ...this.getLeftArr(date),
      ...this.getMonthListNoOther(date),
      ...this.getRightArr(date)
    ];
  },
  _toDou(iNum) {
    //补零
    return iNum * 1 < 10 ? "0" + iNum : "" + iNum;
  },
  // 默认是周日开始
  sundayStart: true
};
