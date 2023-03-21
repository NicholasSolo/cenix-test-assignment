<template>
  <div class="app app-container">
    <list-header>
      <search-input @find="findPost" />
    </list-header>

    <main class="main">
      <posts-list v-if="getPostsContent.length" :posts="getPostsContent" />

      <div v-else class="no-posts" v-html="getNoPostsText" />
    </main>

    <the-popup v-if="$store.state.popupName" />
  </div>
</template>

<script>
import ListHeader from './components/ListHeader.vue';
import ThePopup from './components/popup/ThePopup';
import SearchInput from './components/general/SearchInput';
import PostsList from './components/PostsList';

export default {
  name: 'App',
  components: { PostsList, SearchInput, ThePopup, ListHeader },
  data() {
    return {
      searchString: '',
    };
  },
  computed: {
    getPostsContent() {
      return this.searchString
        ? this.$store.state.posts.filter(i =>
            i.name.toLowerCase().includes(this.searchString.toLowerCase())
          )
        : this.$store.state.posts ?? [];
    },
    getNoPostsText() {
      return 'Ничего не найдено :(';
    },
  },
  methods: {
    findPost(searchString) {
      this.searchString = searchString;
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
