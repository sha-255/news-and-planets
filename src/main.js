import { createApp, watch } from "vue";
import "./style.css";
import App from "./App.vue";
//import "./magicApi";

const app = createApp(App);
//  to magicApi.js
let currentComponent = null;

app.mixin({
  created() {
    if (!this.$options.setup) return;
    currentComponent = this;
    const reactiveVars = this.$options.setup.call(this);
    currentComponent = null;
    Object.assign(this, reactiveVars);
  },
});

export const watches = (...args) => {
  if (!currentComponent) return;
  return currentComponent.$watch(...args);
};
//
app.mount("#app");
