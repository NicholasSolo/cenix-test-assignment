<template>
  <div class="list-header">
    <h1 class="title">Список постов</h1>

    <div class="wrapper">
      <div class="search-container" v-if="$store.state.posts.length"><slot /></div>
      <app-button class="add-btn" type="add" @click="openAddPopup">+ Добавить</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from './general/AppButton.vue';

export default {
  name: 'ListHeader',
  components: { AppButton },

  methods: {
    openAddPopup() {
      this.$store.commit('setPopupName', 'NewPostPopup');
    },
  },
};
</script>

<style scoped lang="scss">
.list-header {
  margin-top: 30px;
  margin-bottom: 30px;

  .title {
    margin-bottom: 10px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-container {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 600px) {
      flex-direction: column-reverse;
      align-items: flex-start;

      .add-btn {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
