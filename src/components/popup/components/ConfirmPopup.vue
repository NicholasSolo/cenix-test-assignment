<template>
  <div class="confirm-popup">
    <h3 class="title">Точно удаляем?</h3>

    <div class="controls">
      <app-button @click="remove">Удалить</app-button>
      <app-button @click="cancel">Отмена</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '../../general/AppButton.vue';

export default {
  name: 'ConfirmPopup',
  components: { AppButton },
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$store.commit('setPopupName', '');
      this.$store.commit('setPopupContent', {});
    },
    remove() {
      const state = this.$store.state;
      const itemToDelete = state.posts.indexOf(
        state.posts.find(item => item.id === state.popupContent.id)
      );
      const arr = JSON.parse(JSON.stringify(state.posts));
      arr.splice(itemToDelete, 1);

      this.$store.commit('setPosts', arr);

      this.$store.commit('setPopupName', '');
      this.$store.commit('setPopupContent', {});
    },
  },
};
</script>

<style scoped lang="scss">
.confirm-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 30px 0;

  .title {
    max-width: 780px;
    margin-bottom: 20px;
    font-size: 34px;
    line-height: 38px;
    text-align: center;

    @media screen and (max-width: 500px) {
      font-size: 24px;
      line-height: 28px;
    }
  }

  .controls {
    display: flex;

    .app-button:first-child {
      margin-right: 10px;
    }
  }
}
</style>
