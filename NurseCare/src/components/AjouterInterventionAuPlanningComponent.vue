<template>
  <div>
    <text style="color: white; margin-right: 16px;">Ajouter intervention au planning :</text>
      <q-card>
        <q-card-section>
          <q-select v-model="selectedHour" :options="hours" label="Heure" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Valider" color="primary" @click="validateForm" />
          <q-btn label="Annuler" color="negative" @click="closeDialog" />
        </q-card-actions>
      </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      selectedHour: null,
      hours: [
        { label: "08:00", value: "08:00" },
        { label: "09:00", value: "09:00" },
        { label: "10:00", value: "10:00" }
      ]
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    },
    validateForm () {
      // Perform validation and submit the form
      const dateHeure = `${this.selectedHour} ${this.selectedDate}`
      // Call the API to save the intervention with the selected date and time
    }
  }
}
</script>

<style scoped>
</style>
