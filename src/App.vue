<template>
  <div class="app app-container">
    <list-header @find="findPost" />

    <main class="main">
      <ul class="list" v-if="getPostsContent.length">
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

    <the-popup v-if="$store.state.popupName" />
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
      searchString: '',
      currentPostId: '',
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
    selectPost(id) {
      if (this.currentPostId === id) {
        this.currentPostId = '';
      } else {
        this.currentPostId = id;
      }
    },
    findPost(searchString) {
      this.searchString = searchString;
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
