import { reactive } from "vue";
import { watches } from "../../main";

export const useFilterable = ({ loadItems, initialFiltres }) => {
  if (!watches) return;
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
  watches(() => page.value, load);
  watches(() => filters, load, {
    deep: true,
  });
  load();
  return {
    page,
    filters,
    items,
  };
};
