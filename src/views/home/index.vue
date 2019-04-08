<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content :className="className">
      <div class="lottery">
        <ul>
          <li
            v-for="(item, index) in prizeInfo"
            :key="index"
            ref="pice"
            :class="
              amplification_index === item.level ? 'selected' : item.class
            "
            @click="startrolling(item)"
          >
            <img :src="item.picUrlDesc" v-if="item.picUrlDesc" />
            <template v-if="!item.level">
              <h4>立即抽奖</h4>
              <p>剩余1次</p>
            </template>
          </li>
        </ul>
      </div>
      <m-marquee :scrollList="scrollList"></m-marquee>
    </m-content>
    <m-footer></m-footer>
    <!--confirm-->
    <m-confirm
      ref="confirm"
      @confirm="_confirmClear"
      :text="alertPrizeName"
    ></m-confirm>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
  name: "mHome",
  data() {
    return {
      className: "indexWrap",
      hasBack: false,
      titleTxt: "首页",

      roll_direction: [1, 2, 3, 8, 4, 7, 6, 5], //转动顺序
      last_index: 0, //上一回滚动的位置
      amplification_index: 0, //轮盘的当前滚动位置
      roll_flag: true, //是否允许滚动
      max_number: 8, //轮盘的全部数量
      speed: 300, //速度，速度值越大，则越慢 初始化为300
      finalindex: 0, //最终的奖励距离当前的位置！不是最后的几等奖！
      myInterval: "", //定时器
      max_speed: 40, //滚盘的最大速度
      minturns: 8, //最小的圈数为2
      runs_now: 0, //当前已跑步数
      startStatus: "", //活动状态
      prizeInfo: [], //奖项列表
      residue_num: 3, //剩余次数
      prizeLevel: "", //中奖等级
      prizeName: "", // 奖品名称
      prizeUrl: "", // 奖品图片
      scrollList: [] //滚动中奖信息
    };
  },
  computed: {
    alertPrizeName() {
      return `恭喜您抽到了${this.prizeName}啦啦啦~`;
    }
  },
  mounted() {
    this.getinfo();
    this.scrollInfo();
  },
  methods: {
    //获取奖品信息
    getinfo() {
      axios
        .get(
          "https://easy-mock.com/mock/5c4137f5cee47f2c67974e24/api/prizeInfo"
        )
        .then(res => {
          const data = res.data;
          if (data.code === 0) {
            this.prizeInfo = data.data.prizeInfo;
          }
        });
    },
    //获取滚动信息
    scrollInfo() {
      axios
        .get("https://easy-mock.com/mock/5c4137f5cee47f2c67974e24/api/winList")
        .then(res => {
          const data = res.data;
          if (data.code === 0) {
            this.scrollList = data.data.list;
          }
        });
    },
    //初始化状态
    init() {
      this.amplification_index = 0;
      //初始化步数
      this.runs_now = 0;
    },
    //请求后端中奖信息
    getPrize() {
      axios
        .get("https://easy-mock.com/mock/5c4137f5cee47f2c67974e24/api/winInfo")
        .then(res => {
          const data = res.data;
          if (data.code === 0) {
            if (data.data.lotteryResult) {
              //中奖了
              this.rolling(); //启动滚盘
              this.finalindex = data.data.position;
              this.prizeName = data.data.prizeName;
            } else {
              alert("抽奖次数已用尽");
            }
          } else {
            alert("服务端错误");
          }
        });
    },
    //开始滚动
    startrolling(item) {
      if (item.level) return;
      //当前可以点击的状态下
      if (this.roll_flag) {
        this.roll_flag = false; //不能点击了
        this.getPrize();
      }
    },
    //滚动轮盘的动画效果
    rolling() {
      var _this = this;
      this.myInterval = setTimeout(() => {
        _this.rolling();
      }, this.speed);
      this.runs_now++; //已经跑步数加一
      this.amplification_index++; //当前的加一
      //获取总步数
      const count_num =
        this.minturns * this.max_number + this.finalindex - this.last_index;
      //上升期间
      if (this.runs_now <= (count_num / 3) * 2) {
        this.speed -= 30; //加速
        if (this.speed <= this.max_speed) {
          this.speed = this.max_speed; //最高速度为40；
        }
      }
      //抽奖结束
      else if (this.runs_now >= count_num) {
        this.roll_flag = true;
        clearInterval(this.myInterval);
        this.showAlert();
      }
      //下降期间
      else if (count_num - this.runs_now <= 10) {
        this.speed += 20;
      }
      //缓冲区间
      else {
        this.speed += 10;
        if (this.speed >= 100) {
          this.speed = 100; //最低速度为100；
        }
      }
      if (this.amplification_index > this.max_number) {
        //判定！是否大于最大数
        this.amplification_index = 1;
      }
    },
    //展示中奖弹层
    showAlert() {
      setTimeout(() => {
        this._showConfirm();
      }, 200);
      setTimeout(() => {
        this.init();
      }, 300);
    },
    _showConfirm() {
      this.$refs.confirm.show();
    },
    _confirmClear() {
      this.$refs.confirm.hide();
    }
  }
};
</script>
<style lang="scss" scoped>
.indexWrap {
  background: #ffdda6;
}
.lottery {
  overflow: hidden;
  width: 650px;
  height: 630px;
  margin: 100px auto;
  animation: background 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  ul {
    width: 550px;
    height: 550px;
    clear: both;
    margin: 50px auto;
  }
  li {
    width: 169px;
    height: 163px;
    margin: 7px;
    float: left;
    position: relative;
    background: url("./images/shadow.png") no-repeat center 0;
    background-size: 169px auto;
    &.btn {
      background: url("./images/active_shadow.png") no-repeat center 0;
      background-size: 169px auto;
      &:active {
        border-radius: 30px;
        background: #ffdf3f;
      }
    }
    h4 {
      text-align: center;
      font-size: 36px;
      color: #f73a50;
      font-weight: 600;
      margin-top: 50px;
    }
    p {
      padding-top: 10px;
      text-align: center;
      font-size: 22px;
      color: #f73a50;
      font-weight: 500;
    }
    img {
      width: 120px;
      height: 108px;
      position: absolute;
      z-index: 88;
      top: 50%;
      left: 50%;
      margin-left: -60px;
      margin-top: -54px;
    }
    &.btn {
      color: red;
      font-weight: 600;
      cursor: pointer;
    }
    &.selected {
      background: url("./images/active_shadow.png") no-repeat center 0;
      background-size: 169px auto;
      transition: 0.1s all;
      img {
        transform: scale(1.1);
      }
    }
  }
}
@-webkit-keyframes background {
  from {
    background: url("./images/draw_bg.png") no-repeat center center;
    background-size: 650px auto;
  }
  to {
    background: url("./images/draw_bg_next.png") no-repeat center center;
    background-size: 650px auto;
  }
}
@keyframes background {
  from {
    background: url("./images/draw_bg.png") no-repeat center center;
    background-size: 650px auto;
  }
  to {
    background: url("./images/draw_bg_next.png") no-repeat center center;
    background-size: 650px auto;
  }
}
</style>
