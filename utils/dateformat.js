const nth = function (d) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

const dateformat = (dateObj = new Date()) => {
  const date = dateObj.getDate()

  return `${date}${nth(date)} ${dateObj.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric'
  })} ${dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}`
}

export default dateformat
