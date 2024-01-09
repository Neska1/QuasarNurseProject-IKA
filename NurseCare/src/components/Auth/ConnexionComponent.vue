<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        <div>Connectez-vous et accédez à votre espace.</div>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input outlined class="col" label="Email" stack-label v-model="formData.email" ref="emailInput"
        :rules="[validateEmail]" lazy-rules="ondemand" />
    </div>
    <div class="row q-mb-md">
      <q-input outlined class="col" label="Mot de passe" :rules="[validatePassword]" lazy-rules="ondemand" stack-label
        type="password" v-model="formData.password" ref="passwordInput" />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" label="Se connecter" type="submit"></q-btn>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { validateEmail, validatePassword } from 'src/helpers/InputHelper'
import { QInput, useQuasar } from 'quasar' // Si vous avez les types Quasar installés
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'ConnexionComponent',
  setup () {
    const formData = ref({
      email: '',
      password: ''
    })

    const router = useRouter()
    // Typage des refs avec `any` pour éviter les erreurs TypeScript
    // Si vous avez les types Quasar, vous pouvez remplacer `any` par `QInput`
    const emailInput = ref<QInput>()
    const passwordInput = ref<QInput>()

    const submitForm = async () => {
      console.log('Form submitted:', formData.value)
      const isValidEmail = await emailInput.value?.validate()
      const isValidPassword = await passwordInput.value?.validate()
      if (isValidEmail && isValidPassword) {
        await authenticateUser()
      }
    }

    const authenticateUser = async () => {
      try {
        const response = await api.post('/utilisateur/login', {
          email: formData.value.email,
          password: formData.value.password
        })
        console.log('Login successful:', response.data)

        localStorage.setItem('userToken', response.data.token)

        // Mise à jour de l'état de l'UI ou redirection
        // Par exemple, redirection vers la page d'accueil
        router.push('/')
      } catch (error) {
        console.error('Login failed:', error)
        // Affichage d'un message d'erreur
        // Vous pouvez utiliser Quasar Notify ou une autre méthode pour informer l'utilisateur
        useQuasar().notify({
          type: 'negative',
          message: 'Échec de la connexion. Veuillez vérifier vos identifiants.'
        })
      }
    }

    return {
      formData,
      submitForm,
      validatePassword,
      validateEmail,
      emailInput,
      passwordInput,
      authenticateUser
    }
  }
})

</script>
