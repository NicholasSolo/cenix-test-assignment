<template>
  <div :class="['post-item', { _selected: selected }]" @click.stop="$emit('click')">
    <p class="content" v-html="post.name" />
    <div class="controls">
      <app-button type="edit" @click="clickHandler('edit')">Изменить</app-button>
      <app-button type="delete" @click="clickHandler('delete')">Удалить</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from './general/AppButton.vue';

export default {
  name: 'PostItem',
  components: { AppButton },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickHandler(type) {
      this.$emit(type);
    },
  },
};
</script>

<style scoped lang="scss">
.post-item {
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ffffff;

  &:hover,
  &._selected {
    background-color: #007385;
  }

  .content {
    margin-bottom: 5px;
  }
  .controls {
    display: flex;

    ::v-deep(.app-button) {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
