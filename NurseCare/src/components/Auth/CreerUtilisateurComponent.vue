<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        <div>Créez ici un nouvel utilisateur.</div>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input outlined class="col" label="email" stack-label v-model="formData.email" ref="emailInput"
        :rules="[validateEmail]" lazy-rules="ondemand" />
    </div>
    <div class="row q-mb-md">
      <q-input outlined class="col" label="Mot de passe" :rules="[validatePassword]" lazy-rules="ondemand" stack-label
        type="password" v-model="formData.password" ref="passwordInput" />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" label="Créer un utilisateur" type="submit"></q-btn>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { validateEmail, validatePassword } from 'src/helpers/InputHelper'
import { QInput } from 'quasar'
export default defineComponent({
  name: 'CreerUtilisateurComponent',
  setup () {
    const formData = ref({
      email: '',
      password: ''
    })

    const emailInput = ref<QInput>()
    const passwordInput = ref<QInput>()

    const submitForm = async () => {
      console.log('Form submitted:', formData.value)
      const isValidemail = await emailInput.value?.validate()
      const isValidPassword = await passwordInput.value?.validate()
      if (isValidemail && isValidPassword) {
        console.log('register user')
      }
    }

    return {
      formData,
      submitForm,
      validatePassword,
      validateEmail,
      emailInput,
      passwordInput
    }
  }
})

</script>
