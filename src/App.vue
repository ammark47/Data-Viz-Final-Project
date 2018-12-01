<template>
  <div id="app">
    <!-- <Modal/> -->

    <Slideout :touch="false" :toggleSelectors="['.toggle-button','.searchButton']" @on-open="logger">
      <GoogleMapSearch/>

    </Slideout>

  </div>
</template>

<script>
import GoogleMapSearch from './components/GoogleMapSearch.vue'
import Slideout from "vue-slideout"
import Modal from './components/Modal.vue'



export default {
  name: 'app',
  components: {
    Modal,
    GoogleMapSearch,
    Slideout,
  },
  mounted: function() {

  },
  methods: {
    logger: function() {
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');
.label {
  color: #feee1f !important;
  margin-top: 10px !important;
}

#app {
  font-family:'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 256px;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  z-index: 2;
  display: none;
  background-color: #1d1f20;
  color: white;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  background-color: rgb(229, 227, 223);
  color: white;
  position: relative;
  z-index: 1;
  will-change: transform;
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
  padding-left:25px;
  padding-right: 25px;
}
.b-checkbox.checkbox {
  outline: none;
  display: -webkit-inline-box;
  align-items: center;
  margin-bottom: 5px;
  font-size: 10px;
  text-transform: uppercase;
  float: left;
  height: 36px;
  margin-right: 5px;
}
</style>
