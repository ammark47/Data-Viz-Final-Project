  <template>
    <div class="GoogleMapSearch">
      <nav id="menu">
        <div class="logo"></div>
        <p class="content">
            <b>Optional Filters</b>
        </p>
        <section>
          <CustomFilter :filterGroup='filterGroup' @updateGroup='filterServiceRequests'/>
        </section>
      </nav>

      <main id="panel">
        <header>
          <div><button class="toggle-button">☰</button></div>
        </header>
        <transition name="fade">
          <serviceRequest v-if="showSrBox" :infoContent="infoContent"  v-on:enlarge-text="sayHi"/>
        </transition>

         <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>

        <div v-if="points.length" :key="points">
          <vue-google-heatmap :points="points"
                      style="width:100%;  height: 100vh;"
                      :lat=center.lat
                      :lng=center.lng
                      :initial-zoom=12
                      />
        </div>

      </main>
    </div>
  </template>

  <script>
  import axios from 'axios'
  import CustomFilter from './CustomFilter'
  import soda from 'soda-js'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import serviceRequest from '../components/serviceRequest.vue'

  export default {
    name: 'googlemapsearch',
    components: { CustomFilter, serviceRequest },
    data() {
      return {
        points: [],
        center: { lat: 40.730610, lng: -73.935242 },
        infoOpened: false,
        infoCurrentKey: null,
        showSrBox: false,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'getAddress'
      ]) 
    },
    mounted() {
      this.geolocate();
      this.isLoading = true
    },
    methods: {
      sayHi () {
        this.showSrBox = false
      },
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      convertToDate(datestring) {
        var st = datestring
        return (st.substring(5,7) + "/" + st.substring(8,10) + "/" + st.substring(0,4))
      },
      getPosition: function(marker,index) {
          return {
          lat: parseFloat(marker[index].lat),
          lng: parseFloat(marker[index].lng),
          status: parseFloat(marker[index].status),

        }
      },
      getLatLngCoors() {
        //open loading symbol while api call is running
        this.isLoading = true
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          this.center = marker;
          this.markers = []
          this.$store.dispatch('updateAddressValue', marker)
          this.getServiceRequest(this.$store.getters.getAddress)
          this.currentPlace = null;
        }
      },
      getServiceRequest(address) {
        var today = new Date()
        var oldDate = new Date()
        var daysPrior = 0
        oldDate.setDate(today.getDate() - daysPrior)
        today = today.toISOString().substring(0, today.toISOString().indexOf('.'))
        oldDate = oldDate.toISOString().substring(0, oldDate.toISOString().indexOf('.'))
       
        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        var serviceRequests = apiEndpoint
        console.log("original")
        serviceRequests += '&$limit=50000'

        axios
        .get(serviceRequests)
        .then((response) => (this.convertRequestsToPoints(response.data)))
      },
      filterServiceRequests(newfilterGroup) {
        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        const address = this.$store.getters.getAddress
        var initServiceRequests = apiEndpoint  + '$where=' // within_circle(location,' + address.lat + ',' + address.lng + ',500)'

        //open loading symbol while api call is running
        this.isLoading = true

        //loop through filters and add new term to search api
        for (const key in newfilterGroup) {
          // initServiceRequests += '&'
          switch (key) {
            case 'agencyName':
              newfilterGroup[key].forEach((agency, index) =>{
                if (index == 0) {
                  initServiceRequests += encodeURI('&agency=') + '%27' + encodeURI(agency) + '%27'
                } else {
                  initServiceRequests += '%20or%20agency=%27' + agency + '%27'
                }
              })
              break
            case 'date':
              // convert date to iso 8601 so api can use it
              var startDate = newfilterGroup[key]['start'].toISOString()
              startDate = startDate.substring(0, startDate.indexOf('.'))
              var endDate = newfilterGroup[key]['end'].toISOString()
              endDate = endDate.substring(0, endDate.indexOf('.'))

              if (initServiceRequests.includes("agency") || initServiceRequests.includes("status")){
                initServiceRequests += encodeURI(" and ")
              }

              initServiceRequests += encodeURI('created_date between') + '%27' + encodeURI(startDate) + '%27' + encodeURI(' and ')
                                  + '%27' + encodeURI(endDate) + '%27'
              break
            case 'statusType':
              newfilterGroup[key].forEach((status, index) =>{
                if (index == 0) {
                  initServiceRequests += encodeURI('&status=') + '%27' + status + '%27'
                } else {
                  initServiceRequests += '%20or%20agency=%27' + status + '%27'
                }
              })
              break
          }

        }
 
        // limit responses
       initServiceRequests += '&$limit=50000'

        axios
        .get(initServiceRequests)
        .then((response) => (this.convertRequestsToPoints(response.data)))
        .catch(err => {
          this.points = [{lat:0,lng:0}]
          console.error(err)
        })

      },
      convertRequestsToPoints(rqsts){
        var pointsTemp = []
        rqsts.forEach(serviceRequestObject => {
          if (serviceRequestObject.latitude && serviceRequestObject.longitude) {
            pointsTemp.push(
              {
                lat: parseFloat(serviceRequestObject.latitude),
                lng: parseFloat(serviceRequestObject.longitude),
              }
            )
          }
        })
        if (pointsTemp.length == 0){ 
          this.points = [{lat:0,lng:0}]
        } else {
          this.points = pointsTemp
        }
        this.isLoading = false
        console.log(this.points)
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          this.$store.dispatch('updateAddressValue', this.center)
          this.getServiceRequest(this.$store.getters.getAddress)
        })
      },
      ...mapMutations([
        'updateAddress'
      ]),
      ...mapActions([
        'updateAddressValue'
      ])
    },
    props: {
      msg: String
    },
    events: {
      'child-msg': function (msg) {
        console.log(msg)
      }
    }
  }

  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .label {
    color: #feee1f !important;
  }

  /*.gmnoprint {
      display: none !important;
  } */
  button.toggle-button {
      background: #feee1f;
      border: none;
      float: left;
      font-size: 24px;
      color: black;
      margin-left: 10px;
      margin-top: 55px;
      z-index: 9999;
      position: absolute;
      left: 5px;
  }

  button.toggle-button:focus {
      outline: 0;
  }
  .searchBar input[type="text"] {
      height: 35px;
      width: 200px;
  }
  .button.is-primary {
      background-color: #feee1f;
      border-radius: 0;
      color: black;
      margin-top: 5px;
      width: 200px;
      border: none;
      margin-bottom: 20px;
      height:35px;
      font-weight:bold;
      font-size:12px;
  }
  .button.is-primary:hover {
    background-color: #1d1f20;
    border:1px solid #feee1f;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .logo{
      background-image: url(../assets/311_logo.png);
      width: 200px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      border-bottom: 1px #363636 solid;
      padding-bottom: 100px;
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 20px;
  }
  </style>
