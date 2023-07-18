<template>
  <div>
    <label
      >Category:
      <select v-model="filters.categories">
        <option
          v-for="(category, idx) in availableCategories"
          :key="idx"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
    <hr />
    <div>
      <button :disabled="page.value === 1" @click="page.value -= 1">
        Prev
      </button>
      {{ page.value }}
      <button @click="page.value += 1">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="(item, idx) in items.value" :key="idx">
        <a target="_blank" :href="item.link" v-html="item.title.rendered"></a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPosts, getCategories } from "../api/techcrunch";
import { useFilterable } from "./use/filtarable";

export default {
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    availableCategories() {
      return [{ id: null, name: "(no category)" }, ...this.categories];
    },
  },
  methods: {
    async loadCategories() {
      this.categories = await getCategories();
    },
  },
  setup() {
    const { page, filters, items } = useFilterable({
      loadItems: getPosts,
      initialFiltres: {
        categories: null,
      },
    });
    return {
      page,
      filters,
      items,
    };
  },
  created() {
    this.loadCategories();
  },
};
</script>
