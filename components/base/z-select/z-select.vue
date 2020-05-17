<template>
  <button
    ref="zSelect"
    :class="`${prefixCls} ${isShowOptions ? prefixCls + '-open' : ''}`"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    @keyup.enter="handleEnter"
    @keyup.up="handleKeyupUp"
    @keyup.down="handleKeyupDown"
  >
    <template v-if="selectedArray.length === 0">
      <span :class="`${prefixCls}-placeholder`">{{ placeholder }}</span>
    </template>

    <template v-else>
      <template v-if="multiple">
        <Tag v-for="item in selectedArray" :key="item[valueKey]" theme="success" closeable @on-close="handleSelect(item)">{{ item[labelKey] }}</Tag>
      </template>
      <template v-else>
        <span :class="`${prefixCls}-label`">{{ selectedLabel }}</span>
      </template>
    </template>

    <Icon :class="`${prefixCls}-icon`" type="arrow-down" size="1.6em" />
    <ul v-show="isShowOptions" ref="zSelectOptions" :class="`${prefixCls}-options`">
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="`${prefixCls}-options-item ${includeSomeValue(item, selectedArray) ? prefixCls + '-checked' : ''} ${cursorIndex === index ? prefixCls + '-cursor' : ''}`"
        @click.stop="handleSelect(item)"
        @mouseover="handleMouseoverOptionItem(index)"
      >
        <span>{{ item[labelKey] }}</span>
        <Icon :class="`${prefixCls}-check-icon`" type="check" />
      </li>
    </ul>
  </button>
</template>

<script src="./z-select.js"></script>

<style lang="less" scoped>
button {
  outline: none;
  display: block;
  width: 100%;
  padding: 0;
  line-height: inherit;
}
.z-select {
  text-align: left;
  position: relative;
  min-height: 40px;
  margin: 5px 0;
  padding-left: 10px;
  padding-right: 30px;
  border-radius: 5px;
  border: 1px solid @colorBorder;
  background-color: #fff;

  &:focus {
    border-color: @colorInfo;
  }
  &-placeholder {
    color: @colorTextLight;
    font-size: 14px;
  }
  &-label {
    line-height: 40px;
    font-size: 14px;
  }
  &-icon {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%) rotate(0);
    transition: all 0.2s ease;
  }
  &-open &-icon {
    transform: translate(0, -50%) rotate(180deg);
  }
  &-options {
    position: absolute;
    z-index: 999;
    top: 41px;
    left: 0;
    right: 0;
    background-color: #fff;
    max-height: 300px;
    overflow: auto;
    border: 1px solid @colorBorder;
  }
  &-options-item {
    padding: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: @colorPrimary;
    }
  }
  &-check-icon {
    display: none;
  }
  &-options-item&-checked {
    color: #fff;
    background-color: @colorSuccess;
    &:hover {
      color: #fff;
      background-color: @colorError;
    }
  }
  &-options-item&-checked &-check-icon {
    display: block;
  }

  &-options-item&-cursor {
    color: #fff;
    background-color: @colorPrimary;
  }
  &-options-item&-cursor&-checked {
    color: #fff;
    background-color: @colorSuccess;
  }
}
</style>
