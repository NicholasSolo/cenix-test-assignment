<template>
  <div class="app app-container">
    <list-header @find="findPost" />

    <main class="main">
      <ul class="list" v-if="getPostsContent.length && !notFound">
        <li class="item">
          <post-item
            v-for="item in getPostsContent"
            :key="item.id"
            :post="item"
            :selected="item.id === currentPostId"
            @delete="deletePost(item.id)"
            @edit="editPost(item)"
            @click="selectPost(item.id)"
          />
        </li>
      </ul>

      <div v-else class="no-posts" v-html="getNoPostsText" />
    </main>

    <the-popup v-if="this.$store.state.popupName" />
  </div>
</template>

<script>
import PostItem from './components/PostItem.vue';
import ListHeader from './components/ListHeader.vue';
import ThePopup from './components/popup/ThePopup';

export default {
  name: 'App',
  components: { ThePopup, ListHeader, PostItem },
  data() {
    return {
      searchResult: [],
      notFound: false,
      currentPostId: '',
    };
  },
  computed: {
    getPostsContent() {
      return this.searchResult.length ? this.searchResult : this.$store.state.posts;
    },
    getNoPostsText() {
      return this.notFound ? 'Ничего не найдено :(' : 'Пока постов нет. Добавите первый?';
    },
  },
  methods: {
    selectPost(id) {
      if (this.currentPostId === id) {
        this.currentPostId = '';
      } else {
        this.currentPostId = id;
      }
    },
    findPost(searchString) {
      if (!searchString) {
        this.searchResult = [];
      } else {
        this.searchResult = this.$store.state.posts.filter(i =>
          i.name.toLowerCase().includes(searchString.toLowerCase())
        );

        this.notFound = !this.searchResult.length;
      }
    },
    editPost(post) {
      this.$store.commit('setPopupName', 'EditPopup');
      this.$store.commit('setPopupContent', post);
    },
    deletePost(id) {
      const itemToDelete = this.getPostsContent.indexOf(
        this.getPostsContent.find(item => item.id === id)
      );
      const arr = JSON.parse(JSON.stringify(this.getPostsContent));
      arr.splice(itemToDelete, 1);

      this.$store.commit('setPosts', arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  .main {
    .no-posts {
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>
