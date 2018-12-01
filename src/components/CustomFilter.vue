<template>
    <div class='customfilter'>
        <b-collapse :open="false" class="filterbutton">
            <button class="button is-primary" slot="trigger">Toggle Filter!</button>
            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="NYPD"
            type="is-danger">
            <span>New York Police Department</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DSNY"
            type="is-success">
            <span>Department of Sanitation</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DPR">
            <span>Dep of Parks and Rec</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="EDC">
            <span>Economic Dev Corp</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DOT">
            <span>Dep of Transportation</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DOHMH">
            <span>Dep of Health and Mental Hygiene</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DHS">
            <span>Dep of Homeless Services</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="TLC">
            <span>Taxi and Limo Commis</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DOITT">
            <span>LinkNYC Unit</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.agencyName"
            native-value="DEP">
            <span>Dep of Environ Protection</span>
            </b-checkbox-button>

        </b-collapse>

        <!-- Status filter -->
        <b-collapse :open="false" class="filterbutton">
            <button class="button is-primary" slot="trigger">Status Filter!</button>

            <b-checkbox-button v-model="filterGroup.statusType"
            native-value="Open">
            <span>Open</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.statusType"
            native-value="Closed">
            <span>Closed</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="filterGroup.statusType"
            native-value="Assigned">
            <span>Assigned</span>
            </b-checkbox-button>
        </b-collapse>

            <!--start date filter -->
            <div>
                <b-field label="Service requests between">
                    <b-datepicker
                        placeholder="Type or select a date..."
                        v-model="filterGroup.date.start"
                        icon="calendar-today"
                        :readonly="true">
                    </b-datepicker>
                </b-field>
            </div>
            <!--end date filter -->
            <div>
                <b-field label="and:">
                    <b-datepicker
                        placeholder="Type or select a date..."
                        v-model="filterGroup.date.end"
                        icon="calendar-today"
                        :readonly="true">
                    </b-datepicker>
                </b-field>
            </div>
    </div>

</template>

<script>
export default {
    name: 'customfilter',
    data() {
        var start = new Date()
        start = start.setDate(start.getDate() - 1)
        console.log(start)
        return {
            filterGroup: {
                agencyName: [],
                statusType: [],
                date: {
                    start: new Date(start),
                    end: new Date()
                }
            }
        }
    },
    methods: {
        test: function() {
            console.log('test')
        }
    },
    watch: {
        filterGroup: {
            handler: function (group) {
                this.$emit('updateGroup', group);
            },
            deep: true
        }
    },
    props: ['']
}
</script>

<style scoped>
.label {
  margin-top: 10px !important;
}
.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selected {
  background-color:#feee1f;
}
.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-today {
  border: 1px solid #feee1f;
}

.filterbutton {
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>
