import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import Vuex from 'vuex'
import * as VueGoogleMaps from "vue2-google-maps"
import VueGoogleHeatmap from 'vue-google-heatmap';
import VueResource from 'vue-resource'
import {store} from './store/index.js'
import 'buefy/dist/buefy.css'
import VueCookieAcceptDecline from 'vue-cookie-accept-decline'
Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline)

Vue.use(Buefy)
Vue.use(Vuex)


Vue.use(VueResource)

Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'



// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyDK5wqphsDOHxftF9YKcuVhzPC3N6jBl1g",
//     libraries: "places" // necessary for places input
//   }
// })

 
Vue.use(VueGoogleHeatmap, {
  apiKey: 'AIzaSyCvX_Ii3_7Lg11PF3dOi95f1t3HywAdsLw',
  libraries: "places" // necessary for places input
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
