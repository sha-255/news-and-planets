<template>
  <div>
    <label>Search:<input v-model.lazy="filters.search" /> </label>
    <hr />
    <div>
      <button :disabled="page === 1" @click="page -= 1">Prev</button>
      {{ page }}
      <button @click="page += 1">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="(item, idx) in items" :key="idx">
        <a target="_blank" :href="item.link">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPlanets } from "../api/swapi";
import { filtarableMixin } from "./Mixins/filtarable";

export default {
  mixins: [filtarableMixin],
  data() {
    return {
      items: [],
      page: 1,
    };
  },
  methods: {
    async loadItems() {
      const { results } = await getPlanets({
        page: this.page,
        ...this.filters,
        search: this.search,
        filters: { categories: this.selectedCategory },
      });
      this.items = results;
    },
  },
};
</script>
