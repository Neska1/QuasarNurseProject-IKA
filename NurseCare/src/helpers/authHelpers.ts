export function logout () {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userEmail')
  clearUserRole()
}

// auth.helper.js
let userRole: number

export const setUserRole = (role: number) => {
  userRole = role
}

export const getUserRole = () => {
  return userRole
}

export const clearUserRole = () => {
  userRole = 0
}
