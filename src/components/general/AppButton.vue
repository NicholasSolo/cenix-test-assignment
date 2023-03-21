<template>
  <button :class="['app-button', type]" @click="$emit('click')" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 20px;
  background-color: #2a2840;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  min-width: 120px;

  &.edit {
    background-color: deepskyblue;
  }

  &.delete {
    background-color: crimson;
  }

  &.add {
    background-color: #5ab001;
  }

  &:hover {
    background-color: #dc9546;
  }

  @media screen and (max-width: 500px) {
    min-width: 100px;
  }
}
</style>
