<template>
  <div class="lottery">
    <ul>
      <li v-for="(item,index) in prizeInfo" :key="index" ref="pice" :class="amplification_index === item.level ? 'selected' : ''">
        <img :src="item.picUrlDesc" v-if="item.picUrlDesc" />
      </li>
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
      roll_direction: [1, 2, 3, 8, 4, 7, 6, 5], //转动顺序
      last_index: 0, //上一回滚动的位置
      amplification_index: 0, //轮盘的当前滚动位置
      roll_flag: true, //是否允许滚动
      max_number: 8, //轮盘的全部数量
      speed: 300, //速度，速度值越大，则越慢 初始化为300
      finalindex: 0, //最终的奖励距离当前的位置！不是最后的几等奖！
      myInterval: "", //定时器
      max_speed: 40, //滚盘的最大速度
      minturns: 6, //最小的圈数为2
      runs_now: 0, //当前已跑步数
      residue_num: 3, //剩余次数
      prizeLevel: "", //中奖等级
      prizeName: "", // 奖品名称
      prizeUrl: "", // 奖品图片
      prizeInfo: [
        {
          level: 1,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/1-2.png",
          prizeId: "436066c40529401287658bfd67c1d346",
          commodityName: "华为 P10 Plus 全网通"
        },
        {
          level: 2,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/2-2.png",
          prizeId: "acdcb838bda74ec8b1fd202234f852ec",
          commodityName: "200优惠劵"
        },
        {
          level: 3,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/3-2.png",
          prizeId: "484bf4c856b94265960b3e182e9f597f",
          commodityName: "100优惠劵"
        },
        {
          level: 8,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/4-2.png",
          prizeId: "d5c7784c4c4d4a33b141fc1be3b11a71",
          commodityName: "15福币"
        },
        {
          level: 4,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/5-2.png",
          prizeId: "7221846d585a4bed80bf486f94fcabae",
          commodityName: "10福币"
        },
        {
          level: 7,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/6-1.png",
          prizeId: "33c6413801fd44c594cbf6642840a614",
          commodityName: "8福币"
        },
        {
          level: 6,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/7-1.png",
          prizeId: "e453f94905334ea083fca649e87b3308",
          commodityName: "5福币"
        },
        {
          level: 5,
          picUrlDesc: "http://qdtalk.com/wp-content/uploads/2017/09/8-1.png",
          prizeId: "e8df88de1878428bb58d0cc9152d8849",
          commodityName: "3福币"
        }
      ]
    };
  },
  components: { MMarquee },
  mounted() {
    this.prizeInfo.splice(4, 0, " ");
    console.log(this.$refs.pice[4]);
    this.startrolling();
  },
  methods: {
    //开始滚动
    startrolling: function() {
      this.$refs.pice[4].onclick = () => {
        let _this = this;
        //初始化步数
        _this.runs_now = 0;
        //当前可以点击的状态下
        if (_this.roll_flag) {
          _this.roll_flag = false;
          //启动滚盘，注，若是最终后台无返回就不好意思里
          _this.rolling();
        }
      };
    },
    //抽奖结果
    result() {
      setTimeout(() => {
        this.finalindex = this.prizeInfo[0].level;
        this.prizeName = this.prizeInfo[0].commodityName;
      }, 2000);
    },
    //滚动轮盘的动画效果
    rolling() {
      var _this = this;
      this.myInterval = setTimeout(() => {
        _this.rolling();
      }, this.speed);
      this.runs_now++; //已经跑步数加一
      this.amplification_index++; //当前的加一
      //获取总步数，接口延迟问题，所以最后还是设置成1s以上
      setTimeout(() => {
        this.result();
      }, 0);
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
        clearInterval(this.myInterval);
        this.roll_flag = true;
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
        alert(`恭喜你抽到了${this.prizeName}`);
      }, 200);
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
    border: 8px solid #ffd200;
    background: #00a0ff;
    border-radius: 30px;
    float: left;
    &.btn {
      color: red;
      font-weight: 600;
      cursor: pointer;
    }
    &.selected {
      border: 8px solid #ff6f00;
      background: #0082ff;
    }
  }
}
</style>
