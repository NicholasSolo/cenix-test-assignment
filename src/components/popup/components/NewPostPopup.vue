<template>
  <div class="new-post-popup">
    <h3 class="title">Новый пост</h3>
    <form class="new-post" @submit.prevent="addPost">
      <textarea v-model="newPost" class="input" ref="input" />
      <app-button :disabled="!newPost">Сохранить</app-button>
    </form>
  </div>
</template>

<script>
import AppButton from '../../general/AppButton.vue';

export default {
  name: 'NewPostPopup',
  components: { AppButton },
  data() {
    return { newPost: '' };
  },
  methods: {
    addPost() {
      if (this.newPost) {
        this.$store.commit('addPost', {
          name: this.newPost,
          id: Date.now(),
        });

        this.newPost = '';
        this.$emit('close');
      }
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>

<style scoped lang="scss">
.new-post-popup {
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
