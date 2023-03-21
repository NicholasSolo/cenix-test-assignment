<template>
  <div class="edit-post-popup">
    <h3 class="title">Редактирование</h3>

    <form class="new-post" @submit.prevent="editPost">
      <textarea v-model="post" class="input" ref="input" />
      <app-button :disabled="!post">Сохранить</app-button>
    </form>
  </div>
</template>

<script>
import AppButton from '../../general/AppButton.vue';

export default {
  name: 'EditPostPopup',
  components: { AppButton },
  data() {
    return { post: '' };
  },
  methods: {
    editPost() {
      if (this.post) {
        const arr = JSON.parse(JSON.stringify(this.$store.state.posts));

        arr.find(i => i.id === this.$store.state.popupContent.id).name = this.post;

        this.$store.commit('setPosts', arr);

        this.post = '';
        this.$store.state.popupContent = {};
        this.$emit('close');
      }
    },
  },
  mounted() {
    this.post = this.$store.state.popupContent.name;
    this.$refs.input.focus();
  },
};
</script>

<style scoped lang="scss">
.edit-post-popup {
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

  .new-post {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    .input {
      width: 100%;
      height: 20%;
      margin-bottom: 10px;
      padding: 10px;
      outline: none;
      border-radius: 10px;
      color: #000000;
      resize: none;
    }
  }
}
</style>
