<template>
  <div class="m-action-sheet">
    <m-popup v-model="actionSheetShow" position="bottom">
      <div class="m-action-sheet-cont">
        <div class="m-action-sheet-head m-hairline-bottom">标题</div>
        <div class="m-action-sheet-wrap">
          <div class="m-action-sheet-item m-hairline-bottom">选项一</div>
          <div class="m-action-sheet-item m-hairline-bottom">选项二</div>
          <div class="m-action-sheet-item m-hairline-bottom">选项三</div>
          <div class="m-action-sheet-item">选项四</div>
        </div>
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
    actions: {
      type: Array,
      default(){
        return []
      }
    },
    appendTo: {
      default: () => window.document.body //默认挂载到body
    }
  },
  data() {
    return {
      actionSheetShow: false
    };
  },
  watch: {
    value(newVal) {
      newVal && (this.actionSheetShow = newVal);
    }
  },
  mounted() {
    if (this.appendTo || !isInDocument(this.$el)) {
      this.appendTo.appendChild(this.$el);
    }
  },
  methods: {}
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
  &-wrap {
  }
  &-item {
    width: 100%;
    height: 98px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }
}
</style>
