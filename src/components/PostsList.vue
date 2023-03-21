<template>
  <div class="wrapper">
    <ul class="list">
      <li class="item">
        <post-item
          v-for="item in getPageItems"
          :key="item.id"
          :post="item"
          :selected="item.id === currentPostId"
          @delete="deletePost(item.id)"
          @edit="editPost(item)"
          @click="selectPost(item.id)"
        />
      </li>
    </ul>

    <app-pagination v-if="posts.length > pagination.perPage" v-bind.sync="pagination" />
  </div>
</template>

<script>
import { getPaginationPageArray } from '../utils';
import PostItem from './PostItem.vue';
import AppPagination from './general/AppPagination';

export default {
  name: 'PostsList',
  components: { AppPagination, PostItem },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPostId: '',
      pagination: {
        page: 1,
        count: this.posts.length,
        perPage: 50,
      },
    };
  },
  computed: {
    getPageItems() {
      const setPagination = {
        pagination: this.pagination,
        array: this.posts,
      };

      return getPaginationPageArray(setPagination);
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
    editPost(post) {
      this.$store.commit('setPopupName', 'EditPopup');
      this.$store.commit('setPopupContent', post);
    },
    deletePost(id) {
      this.$store.commit('setPopupName', 'ConfirmPopup');
      this.$store.commit('setPopupContent', { id, posts: this.posts });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  .list {
    margin-bottom: 20px;
  }
}
</style>
