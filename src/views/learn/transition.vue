<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="transitions">
        <!--fade 淡入淡出-->
        <m-button type="info" @click="show1=!show1">fade</m-button>
        <transition name="fade">
          <h1 v-show="show1">FADE</h1>
        </transition>
        <!--slide 左右切换-->
        <m-button type="danger" @click="show2=!show2">slide</m-button>
        <transition name="slide">
          <h1 v-show="show2">SLIDE</h1>
        </transition>
        <!--动画钩子-->
        <m-button type="warning" @click="show3=!show3">动画钩子</m-button>
        <transition
          name="js"
          @before-enter="_beforeEnter"
          @enter="_enter"
          @after-enter="_afterEnter"
          @before-leave="_beforeLeave"
          @leave="_leave"
          @after-leave="_afterLeave"
        >
          <h1 v-show="show3">FUNCTION</h1>
        </transition>
        <!--多个元素间的过渡-->
        <m-button type="primary" @click="show4=!show4">多个元素间的过渡</m-button>
        <transition name="fade" mode="out-in">
          <h1 v-if="show4" key="hello">KEY</h1>
          <h1 v-else key="bye">MODE</h1>
        </transition>
        <!--列表的进入/离开过渡-->
        <m-button type="info" @click="add">添加</m-button>
        <m-button type="danger" @click="remove">删除</m-button>
        <transition-group name="list" tag="div">
          <span v-for="item in items" :key="item" class="list-item">{{item}}</span>
        </transition-group>
        <hr>
        <!--列表动画过渡-->
        <transition-group name="list-move" tag="div">
          <span v-for="item in items" :key="item" class="list-move-item">{{item}}</span>
        </transition-group>
        <!--
          列表过渡需要使用transition-group，并且需要绑定唯一key
          v-move特性：
          1.Vue使用了一个FLIP的动画队列（使用 FLIP 过渡的元素不能设置为 display: inline），使用transform将元素从原来的位置平滑过渡到新位置
          2.v-movev-move 是在过渡开始时候判断元素的位置是否发生改变，并且key是识别每个元素的关键，在v-for中用index来绑定key就虽然可行，但是不会触发v-move效果；
          3.一定要在过渡开始的时候就让元素的位置发生改变：v-enter或者v-leave或者active阶段，而v-leave-to哈v-enter-to不行。
        -->
      </div>
    </m-content>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "minePage",
  data() {
    return {
      hasBack: false,
      titleTxt: "过渡",
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    };
  },
  methods: {
    //进场
    _beforeEnter(el) {
      el.style.color = "#f90";
    },
    _enter(el, done) {
      setTimeout(() => {
        el.style.color = "#f09"; //1s之后变色
      }, 1000);
      setTimeout(() => {
        //3s之后done
        done(); //done被调用的时候，vue会触发一个after-enter事件
      }, 2000);
    },
    _afterEnter(el) {
      el.style.color = "#c0c0c0";
    },
    //离场
    _beforeLeave(el) {
      el.style.color = "green";
    },
    _leave(el, done) {
      setTimeout(() => {
        el.style.color = "red";
      }, 1000);
      setTimeout(() => {
        //3s之后done
        done(); //done被调用的时候，vue会触发一个after-leave事件
      }, 4000);
    },
    _afterLeave(el) {
      el.style.color = "blue";
    },
    _randomIndex() {
      return Math.floor(Math.random() * this.items.length);
    },
    add() {
      this.items.splice(this._randomIndex(), 0, this.nextNum++);
    },
    remove() {
      this.items.splice(this._randomIndex(), 1);
    }
  }
};
</script>
<style lang="scss" scoped>
h1 {
  margin: 30px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.slide-enter-active {
  transition: all 0.3s ease-out;
}
.slide-leave-active {
  transition: all 0.8s ease-in;
}

.list-item {
  display: inline-block;
  margin: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.8s linear;
}
.list-enter,
.list-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.list-move-item {
  display: inline-block; //使用 FLIP 过渡的元素不能设置为 display: inline
  margin: 10px;
  transition: all 1s;
}
.list-move-enter,
.list-move-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.list-move-leave-active {
  position: absolute;
}
</style>
