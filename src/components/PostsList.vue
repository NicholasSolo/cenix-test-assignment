<template>
  <ul class="list">
    <li class="item">
      <post-item
        v-for="item in posts"
        :key="item.id"
        :post="item"
        :selected="item.id === currentPostId"
        @delete="deletePost(item.id)"
        @edit="editPost(item)"
        @click="selectPost(item.id)"
      />
    </li>
  </ul>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  name: 'PostsList',
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPostId: '',
    };
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

<style scoped></style>
