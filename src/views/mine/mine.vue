<template>
  <div class="lottery">
    <ul>
      <li :class="amplification_index === 1 ? 'active' : ''">一等奖</li>
      <li :class="amplification_index === 2 ? 'active' : ''">二等奖</li>
      <li :class="amplification_index === 3 ? 'active' : ''">三等奖</li>
      <li :class="amplification_index === 8 ? 'active' : ''">八等奖</li>
      <li class="btn" @click="startrolling">开始抽奖</li>
      <li :class="amplification_index === 4 ? 'active' : ''">四等奖</li>
      <li :class="amplification_index === 7 ? 'active' : ''">七等奖</li>
      <li :class="amplification_index === 6 ? 'active' : ''">六等奖</li>
      <li :class="amplification_index === 5 ? 'active' : ''">五等奖</li>
    </ul>
    <m-marquee></m-marquee>
  </div>
  
</template>

<script type="text/ecmascript-6">
import MMarquee from "components/marquee/index";
/**
 * https://github.com/Venler/vue-lottery
 * https://github.com/jlianphoto/iver/blob/master/src/packages/lottery/src/lottery.vue
 * https://blog.csdn.net/YaoDeBiAn/article/details/82767831
 * https://github.com/moshanghan/vue-mo-cli
 * https://blog.csdn.net/hushilin001/article/details/78606618/
 * https://www.bbsmax.com/A/KE5QXMe0JL/
 */
export default {
  name: "minePage",
  data() {
    return {
      last_index: 0, //上一回滚动的位置
      amplification_index: 0, //轮盘的当前滚动位置
      roll_flag: true, //是否允许滚动
      max_number: 8, //轮盘的全部数量
      speed: 300, //速度，速度值越大，则越慢 初始化为300
      finalindex: 5, //最终的奖励距离当前的位置！不是最后的几等奖！
      myInterval: "", //定时器
      max_speed: 40, //滚盘的最大速度
      minturns: 8, //最小的圈数为2
      runs_now: 0 //当前已跑步数
    };
  },
  components: { MMarquee },
  methods: {
    _rnd(n, m) {
      return parseInt(n + Math.random() * (m - n));
    },
    //开始滚动
    startrolling: function() {
      let _this = this;
      //初始化步数
      _this.runs_now = 0;
      //当前可以点击的状态下
      if (_this.roll_flag) {
        _this.roll_flag = false;
        //启动滚盘，注，若是最终后台无返回就不好意思里
        _this.rolling();
      }
    },
    //滚动轮盘的动画效果
    rolling() {
      var _this = this;
      this.myInterval = setTimeout(function() {
        _this.rolling();
      }, this.speed);
      this.runs_now++; //已经跑步数加一
      this.amplification_index++; //当前的加一
      //获取总步数，接口延迟问题，所以最后还是设置成1s以上
      // this.minturns = this._rnd(8, 12);
      var count_num =
        this.minturns * this.max_number + this.finalindex - this.last_index;
      //模拟随机
      //上升期间
      if (this.runs_now <= (count_num / 3) * 2) {
        this.speed -= 30; //加速
        if (this.speed <= this.max_speed) {
          this.speed = this.max_speed; //最高速度为40；
        }
      }
      //抽奖结束
      else if (this.runs_now >= count_num) {
        clearInterval(this.myInterval);
        this.roll_flag = true;
        console.log(`恭喜你抽到了${this.amplification_index}等奖`);
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
    }
  }
};
</script>
<style lang="scss" scoped>
.lottery {
  overflow: hidden;
  ul {
    width: 670px;
    clear: both;
    margin: 20px auto;
  }
  li {
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    margin: 10px;
    border: 1px solid #333;
    float: left;
    &.btn {
      color: red;
      font-weight: 600;
      cursor: pointer;
    }
    &.active {
      border: 1px solid red;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
