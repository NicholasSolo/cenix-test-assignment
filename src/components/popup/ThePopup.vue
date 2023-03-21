<template>
  <div class="the-popup">
    <div class="content">
      <button class="close" @click="close" />

      <component :is="getCurrentPopup" @close="close" />
    </div>
  </div>
</template>

<script>
import EditPopup from './components/EditPopup.vue';
import NewPostPopup from './components/NewPostPopup.vue';

const popups = {
  NewPostPopup,
  EditPopup,
};

export default {
  name: 'ThePopup',
  computed: {
    getCurrentPopup() {
      return popups[this.$store.state.popupName];
    },
  },
  methods: {
    close() {
      this.$store.commit('setPopupName', '');
    },
  },
};
</script>

<style scoped lang="scss">
.the-popup {
  z-index: 10;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;
  background: #00000060;
  backdrop-filter: blur(10px);

  .content {
    position: absolute;
    min-width: 320px;
    width: 480px;
    border-radius: 10px;
    background-color: #4d4d4d;

    .close {
      z-index: 2;
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      border-radius: 30%;
      background-color: #ffffff;
      background-image: url('../../assets/img/close.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 60%;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .the-popup {
    .content {
      width: 320px;

      .close {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
