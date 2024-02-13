export function premiereLettreUpperCase (string : string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function extraireHeureFromISOString (isoString) {
  const date = new Date(isoString)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
