import { reactive } from "vue";

export const useFilterable = ({ loadItems, initialFiltres }, component) => {
  const watch = component.$watch.bind(component);
  const page = reactive({ value: 1 });
  const filters = reactive({
    ...initialFiltres,
  });
  const items = reactive({ value: [] });
  const load = () =>
    loadItems({
      page: page.value,
      filters,
    }).then((result) => {
      items.value = result;
    });
  watch(() => page.value, load);
  watch(() => filters, load, {
    deep: true,
  });
  load();
  return {
    page,
    filters,
    items,
  };
};
