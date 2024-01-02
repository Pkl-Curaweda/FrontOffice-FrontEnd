import moment from 'moment'

export const getCurrentTime = () => {
  const currentDate = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const dayOfWeek = days[currentDate.getDay()]
  const dayOfMonth = currentDate.getDate()
  const month = months[currentDate.getMonth()]
  const year = currentDate.getFullYear()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

export const formatDate = (date, format = 'DD MMMM YYYY') => {
  return moment.utc(date).format(format)
}
