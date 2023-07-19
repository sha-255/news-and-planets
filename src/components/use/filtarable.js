import { reactive } from "vue";
import { watches /*,beforeUnmounted*/ } from "../../main";

export const useFilterable = ({ loadItems, initialFiltres }) => {
  if (!watches) return;
  const page = reactive({ value: 1 });
  const filters = reactive({
    ...initialFiltres,
  });
  const items = reactive({ value: [] });

  const syncHash = () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const { page: pageValue, ...filtresValue } = Object.fromEntries(
      urlParams.entries()
    );
    if (page) {
      pageValue = pageValue;
    }
    Object.entries(filtresValue).forEach(([key, value]) => {
      filters[key] = value; //v2 not worck Vue.set(filtres, key, value);
    });
  };

  const updateHash = () => {
    const urlParams = new URLSearchParams();
    if (page.value !== 1) {
      urlParams.append("page", page.value);
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        urlParams.append(key, value);
      }
    });
    window.location.hash = urlParams.toString();
  };

  const load = () =>
    loadItems({
      page: page.value,
      filters,
    }).then((result) => {
      items.value = result;
    });
  watches(
    () => page.value,
    () => {
      load();
      updateHash();
    }
  );
  watches(
    () => filters,
    () => {
      load();
      updateHash();
    },
    {
      deep: true,
    }
  );
  load();
  window.addEventListener("hashchange", syncHash);
  // beforeUnmounted(() => {
  //   window.removeEventListener("hashchange", syncHash);
  // });
  return {
    nextPage: () => {
      page.value += 1;
    },
    prevPage: () => {
      page.value -= 1;
    },
    page,
    filters,
    items,
  };
};
