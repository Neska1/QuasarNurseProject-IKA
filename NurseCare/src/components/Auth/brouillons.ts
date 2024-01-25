// <template>
//   <!-- Votre code de template ici Un composant Vue (par exemple, AuthComponent.vue) : -->
// </template>

// <script lang="ts">
// import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';
// import { useRouter } from 'vue-router';
// import { useAuthStore } from 'src/stores/auth';

// export default defineComponent({
//   setup() {
//     const $q = useQuasar();
//     const router = useRouter();
//     const authStore = useAuthStore();

//     const register = async (email, password) => {
//       try {
//         await authStore.registerUser(email, password);
//       } catch (error) {
//         $q.notify({
//           color: 'negative',
//           position: 'top',
//           message: 'Registration Error',
//           icon: 'report_problem'
//         });
//       }
//     };

//     const login = async (email, password) => {
//       try {
//         await authStore.loginUser(email, password);
//       } catch (error) {
//         $q.notify({
//           color: 'negative',
//           position: 'top',
//           message: 'Login Error',
//           icon: 'report_problem'
//         });
//       }
//     };

//     const logout = async () => {
//       await authStore.logoutUser();
//       router.push('/auth');
//     };

//     // Watcher pour le changement d'état d'authentification
//     authStore.handleAuthStateChange();

//     return {
//       register,
//       login,
//       logout
//     };
//   }
// });
// </script>
