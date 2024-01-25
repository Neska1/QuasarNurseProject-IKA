export function logout () {
  // Supprimez le token JWT du localStorage
  localStorage.removeItem('userToken')
}
