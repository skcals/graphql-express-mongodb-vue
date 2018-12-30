import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "./registerServiceWorker";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import VueApollo from "vue-apollo";

Vue.use(Vuetify);
Vue.use(VueApollo);
Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql"
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "loading"
  }
});

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
