export const validatePassword = (val: string) => val.length >= 6 || 'Veuillez renseigner au moins 6 caractères.'

export const validateEmail = (email: string) => isValidEmailAddress(email) || 'Veuillez renseigner une adresse mail valide.'

export function isValidEmailAddress (email: string) {
  // Expression régulière js
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}
