<template>
  <div class="list-header">
    <h1 class="title">Список постов</h1>

    <div class="wrapper">
      <div class="search-container" v-if="$store.state.posts.length">
        <input
          v-model="searchQuery"
          type="text"
          class="input"
          placeholder="Поиск..."
          @input="searchHandler"
        />
      </div>

      <app-button class="add-btn" type="add" @click="openAddPopup">+ Добавить</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from './general/AppButton.vue';

export default {
  name: 'ListHeader',
  components: { AppButton },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    openAddPopup() {
      this.$store.commit('setPopupName', 'NewPostPopup');
    },
    searchHandler() {
      this.$emit('find', this.searchQuery);
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

      .input {
        height: 34px;
        margin-right: 20px;
        padding: 0 20px;
        border: 1px solid #4d4d4d;
        border-radius: 20px;
        font-size: 12px;
        color: #000000;
      }
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
