<template>
  <input
    v-model="searchQuery"
    type="text"
    class="input"
    placeholder="Поиск..."
    @input="searchHandler"
  />
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    searchHandler() {
      this.$emit('find', this.searchQuery);
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  height: 34px;
  margin-right: 20px;
  padding: 0 20px;
  border: 1px solid #4d4d4d;
  border-radius: 20px;
  font-size: 12px;
  color: #000000;
}
</style>
