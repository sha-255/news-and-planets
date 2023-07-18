export const filtarableMixin = {
  data() {
    return {
      items: [],
      page: 1,
      filters: {},
    };
  },
  methods: {
    loadItems() {
      throw new Error("not implemented");
    },
    syncHash() {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const { page, ...filtres } = Object.fromEntries(urlParams.entries());
      if (page) {
        this.page = entries.page;
      }
      Object.entries(filtres).forEach(([key, value]) => {
        this[key] = value;
      });
    },

    updateHash() {
      const urlParams = new URLSearchParams();
      if (this.page !== 1) {
        urlParams.append("page", this.page);
      }
      Object.entries(this.filters).forEach(([key, value]) => {
        if (value) {
          urlParams.append(key, value);
        }
      });
      window.location.hash = urlParams.toString();
    },
  },

  created() {
    window.addEventListener("hashchange", this.syncHash);
    this.syncHash();
    this.loadItems();
  },

  beforeUnmount() {
    window.removeEventListener("hashchange", this.syncHash);
  },

  watch: {
    page() {
      this.loadItems();
      this.updateHash();
    },
    filters: {
      deep: true,
      handler() {
        this.page = 1;
        this.loadItems();
        this.updateHash();
      },
    },
  },
};
