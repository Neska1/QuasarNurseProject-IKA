export function calculerAge (dateNaissance: string) {
  const today = new Date()
  const birthDate = new Date(dateNaissance)
  let age = today.getFullYear() - birthDate.getFullYear()

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}
