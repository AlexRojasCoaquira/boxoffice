export function formatDataEvents(data) {
  return data.map((item) => {
    const dts = item[0].dates

    const dates = Object.keys(dts).map((key) => {
      const days = {}
      const arrd = Object.keys(dts[key]).map((keyh) => {
        const types = dts[key][keyh]

        types.forEach((type) => {
          if (type.type === 'venue') {
            type.value = '' // Asigna directamente, reactividad automática en Vue 3
          } else {
            const max = type.maxQuantityPerOrder > 1 ? 2 : 1
            type.value = max
          }
        })

        return {
          hour: keyh,
          types
        }
      })

      days.day = key
      days.hours = arrd
      return days
    })

    item[0].dates = dates
    item[0].showInfo = false // Asigna directamente, no es necesario Vue.set
    return item[0]
  })
}
