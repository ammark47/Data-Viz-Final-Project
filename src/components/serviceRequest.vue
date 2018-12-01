<template>
  <section class="serviceRequests">
    <div class="container is-fluid srBox">
      <div class="closeSrBox"><button v-on:click="$emit('enlarge-text')">X</button></div>
      <h2>Service Request #{{infoContent.uniquekey}} </h2>
      <div class="columns is-multiline">
        <div class="column is-one-fifth">
          <h3>Status</h3>
          <div class="status">{{ infoContent.status }}</div>
        </div>
        <div class="column is-one-fifth">
          <div class="columns is-multiline is-mobile">
            <div class="column">
            <h3> Date Created </h3>
            <h4> {{ infoContent.created_date }}</h4>
            </div>
            <div class="column">
            <h3> Date Closed </h3>
            <h4> {{ infoContent.closed_date }}</h4>
            </div>
          </div>
        </div>
        <div class="column last-col">
          <div class="columns is-multiline is-mobile">
            <div class="column">
            <h3> Agency </h3>
            <h4> {{ infoContent.agency_name }}</h4>
            </div>
            <div class="column">
            <h3> Incident Address </h3>
            <h4> {{ infoContent.incident_address }} </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
          <div class="column is-one-fourth">
            <h3>Complaint Type</h3>
            <h4> {{ infoContent.complaint_type }}</h4>

          </div>
          <div class="column is-two-thirds">
            <h3>Complaint Description</h3>
            <h4> {{ infoContent.description }} </h4>

          </div>
      </div>
      <div class="columns lastItem">
          <div class="column">
            <h3>Resolution Description</h3>
            <h4> {{ infoContent.resolution }}</h4>
          </div>
      </div>
  </div>
  </section>
</template>

<style scoped>
/* section.serviceRequests {
    position: absolute;
    top: 75px;
    z-index: 9;
    background-color: white;
    color: black;
    padding: 15px;
    border: 1px solid lightgray;
    width: 650px;
    box-shadow: 2px 2px 20px lightgray;
    /* margin-right: 50%; */
    /* margin-left: 50%; */
    /* align-self:  center; */
    /* left: 15px;
    /* margin-left: -50%;
  } */
  .columns {
      margin-top: .34rem;
  }

  .column.last-col {
      margin-top: 15px;
  }

  .column {
    padding-top:0px;
    padding-bottom:0px;
  }

  h3 {
      padding-top: 5px;
  }

  .columns.lastItem {
      margin-bottom: 5px;
  }

section.serviceRequests {
  position: absolute;
  z-index: 9;
  background-color: white;
  color: black;
  padding: 15px;
  border: 1px solid lightgray;
  width: 90%;
  -webkit-box-shadow: 2px 2px 20px lightgrey;
  box-shadow: 2px 2px 20px lightgrey;
  left: 50%;
  top: 70px;
  transform: translate(-50%);
  -webkit-transform: translate(-50%);
  -moz-transform: translate(-50%);
}

h2 {
    text-align: left;
    /* font-size: 24px; */
    font-size: 16px;
}

h3 {
    text-align: left;
    text-transform: uppercase;
    font-size: 9px;
    color: gray;
}

h4 {
    text-align: left;
    font-weight: bold;
    font-size: 13px;
}
.closeSrBox {
    float: right;
    font-size: 16px;
}
.status {
    border: 1px solid #770000;
    background-color: pink;
    height: 50px;
    line-height: 50px;
}

.container.srBox {
    margin-left: 15px;
    margin-right: 15px;
}

.srBox {
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 769px) {
  section.serviceRequests {
    left:15px;
    top:60px;
    width: 650px;
    transform: translate(0);
    -webkit-transform: translate(0);
    -moz-transform: translate(0);
  }
  .column.last-col {
      margin-top: 0px;
  }
}
</style>
<script>
export default {
       props: ['infoContent', 'showSrBox'],
       methods: {
         notify: function() {
           this.$dispatch('child-msg', this.first_column)
           this.msg= ' '
         }
       },
       data() {
           return {
               first_column: '1st',
               second_column: '2nd',
               third_column: '3rd',
               fourth_column: '4th'
           }
       }
   }

</script>
