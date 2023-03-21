<template>
  <ul class="app-pagination">
    <li class="pagination-item">
      <button
        :disabled="page === 1"
        :class="['pagination-arrow', 'pagination-prev', { _disabled: page === 1 }]"
        aria-label="Предыдущая страница"
        @click="paginate(page - 1)"
      />
    </li>

    <li v-for="pageNumber in pages" :key="pageNumber + Math.random()" class="pagination-item">
      <button
        :class="['pagination-button', { _current: pageNumber === page }]"
        :aria-label="`Перейти на страницу ${page}`"
        :disabled="pageNumber === '...'"
        @click="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        :disabled="getIsNextDisabled"
        :class="['pagination-arrow', 'pagination-next', { _disabled: getIsNextDisabled }]"
        aria-label="Следующая страница"
        @click="paginate(page + 1)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    perPage: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  computed: {
    pages() {
      const arr = [];
      const count = Math.ceil(this.count / this.perPage);

      for (let i = 1; i <= count; i++) {
        if (count <= 8) {
          arr.push(i);
        } else if (i === 1 || i === this.page || i === count) {
          arr.push(i);
        } else if (i === this.page - 1 || i === this.page + 1) {
          arr.push('...');
        }
      }

      if (!arr.length) {
        arr.push(1);
      }

      return arr;
    },
    getIsNextDisabled() {
      return this.page === this.pages[this.pages.length - 1] || this.pages.length === 1;
    },
  },
  methods: {
    paginate(value) {
      this.$emit('update:page', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-pagination {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;

  .pagination-item {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: lightblue;
    }

    .pagination-button,
    .pagination-arrow {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      font-size: 14px;
      color: grey;

      &._current {
        background-color: dodgerblue;
        color: #ffffff;
      }

      &._disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }

    .pagination-arrow {
      background-position: center;
      background-color: lightblue;
      background-image: url('../../assets/img/pagination-arrow.svg');
      background-repeat: no-repeat;

      &.pagination-prev {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
