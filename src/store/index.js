import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        address: {
            lat: 0,
            lng: 0
        }
    },
    getters: {
        getAddress: state => state.address
    },
    mutations: {
        updateAddress(state, addressPayload) {
            state.address.lat = addressPayload.lat
            state.address.lng = addressPayload.lng
        }
    },
    actions: {
        updateAddressValue(context, address) {
            context.commit('updateAddress', address)
        }
    }
})