<template>
  <div class="m-action-sheet">
    <m-popup
      v-model="actionSheetShow"
      position="bottom"
      @open="_onOpen"
      @close="_onClose"
    >
      <div class="m-action-sheet-cont">
        <div class="m-action-sheet-head">{{ title }}</div>
        <div class="m-action-sheet-wrap">
          <div
            :class="[
              'm-action-sheet-item',
              'm-hairline-top',
              index === disabledIndex && 'disabled',
              index === clickIndex && 'active'
            ]"
            v-for="(item, index) in actions"
            :key="item.value"
            @click="_onSelect(item, index)"
          >{{ item.label }}</div>
        </div>
        <div class="m-action-sheet-cancel" v-show="cancelText" @click="_onCancel">{{cancelText}}</div>
      </div>
    </m-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import { isInDocument } from "assets/js/utils/dom";
export default {
  name: "MActionSheet",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "标题"
    },
    actions: {
      type: Array,
      default() {
        return [
          {
            label: "选项1",
            value: 0
          },
          {
            label: "选项2",
            value: 1
          },
          {
            label: "选项3",
            value: 2
          }
        ];
      }
    },
    defaultIndex: {
      type: Number,
      default: -1
    },
    disabledIndex: {
      type: Number,
      default: -1
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    appendTo: {
      default: () => window.document.body //默认挂载到body
    }
  },
  data() {
    return {
      actionSheetShow: this.value,
      clickIndex: -1
    };
  },
  watch: {
    value(newVal) {
      this.actionSheetShow = newVal
    }
  },
  mounted() {
    if (this.appendTo || !isInDocument(this.$el)) {
      this.appendTo.appendChild(this.$el);
    }
    this.clickIndex = this.defaultIndex;
  },
  methods: {
    _onOpen() {
      this.$emit("open");
    },
    _onClose() {
      this.$emit("close");
      this._hideActionSheet();
    },
    _onSelect(item, index) {
      if (index === this.disabledIndex) {
        return;
      }
      this.clickIndex = index;
      this.$emit("selected", item);
      this._hideActionSheet();
    },
    _hideActionSheet() {
      this.actionSheetShow = false;
      this.$emit("input", false);
    },
    _onCancel() {
      this.$emit("cancel");
      this._hideActionSheet();
    }
  }
};
</script>
<style lang="scss" scoped>
.m-action-sheet {
  &-cont {
    position: relative;
    width: 100%;
    font-size: 32px;
    background: $color_fff;
    text-align: center;
    overflow: auto;
  }
  &-head {
    width: 100%;
    height: 102px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  &-item {
    width: 100%;
    height: 98px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    &.active {
      color: $color_orange;
    }
    &.disabled {
      color: #c8c9cc;
    }
  }
  &-cancel {
    line-height: 108px;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 18px;
      background: #f9fafb;
    }
  }
}
</style>
