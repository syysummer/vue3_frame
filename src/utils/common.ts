/*时间格式化方法， 秒转 时：分： 秒 */
export const formatTime = (timeString: number) => {
  const timeStr: any = Number(timeString)
  if (!timeStr || parseFloat(timeStr) != timeStr) {
    return "00:00"
  }
  const hourNumber: any = timeStr / (60 * 60)
  const hour: any = parseInt(hourNumber)
  const minutesNumber: any = (timeStr - 60 * 60 * hour) / 60
  const minutes: any = parseInt(minutesNumber)
  const secounds: any = timeStr - hour * (60 * 60) - minutes * 60
  let hourLabel: any = hour
  let minutesLabel: any = minutes
  let secoundsLabel: any = secounds
  if (hour < 10) hourLabel = "0" + hour
  if (minutes < 10) minutesLabel = "0" + minutes
  if (secounds < 10) secoundsLabel = "0" + secounds
  if (hour > 0) {
    return hourLabel + ":" + minutesLabel + ":" + secoundsLabel
  } else {
    return minutesLabel + ":" + secoundsLabel
  }
}

/*格式化时间， 年月日*/
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() 返回的月份从0开始，所以需要加1
  const day = date.getDate()

  const formattedYear = year < 100 ? "19" + year : year // 如果年份小于100，需要补0
  const formattedMonth = month < 10 ? "0" + month : month // 如果月份小于10，需要补0
  const formattedDay = day < 10 ? "0" + day : day // 如果日期小于10，需要补0

  return formattedYear + "-" + formattedMonth + "-" + formattedDay
}
