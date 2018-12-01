<template>
    <section>
        <b-modal :active.sync="isCardModalActive" has-modal-card>
        <div class="modal-card" style="width: 85vh">
                    <header class="modal-card-head">
                        <div class="modal-card-title"></div>
                    </header>
                    <section class="modal-card-body">
                      <p> Welcome to the 311 Service Requests portal. Using this website you can see the currently open and recently closed 311 Service Requests in your area or area of choosing. You can also filter the results based on Status, Agency, Closed & Ceated Dates. A data anaylsis feature is currently in development.
</br></br>
This website uses cookies to enhance your exeperience. If you do not wish to use cookies, please click Opt-Out.
</br></br>
Created by:
Ammar Karim & Nabil Ahmed Khatri</p>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isCardModalActive=false">Opt Out</button>
                        <button class="button is-primary" @click="isCardModalActive=false">Accept</button>
                    </footer>
                </div>
              </b-modal>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                isCardModalActive: true,
            }
        }
    }
</script>

<style scoped>
.modal-card-title {
  background-image: url(/img/311_logo_black.b1fec1db.png);
  width: 35%;
  height: 75px;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
}
.content {
  text-align: justify;
}
section.modal-card-body {
  text-align: justify;
}
</style>
