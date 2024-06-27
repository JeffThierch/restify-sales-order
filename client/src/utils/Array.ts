export function orderValue(valueOne: any, valueTwo: any, type = 'asc') {
  if (type === 'asc') {
    return valueOne - valueTwo
  }
  return valueTwo - valueOne
}

export function removeItemByField(array: any[], field: string, fieldValue: any) {
  array.splice(
    array.findIndex((item) => item[field] === fieldValue),
    1
  )
}

export function updateItemByField(array: any[], field: string, fieldValue: any, data: any) {
  array.forEach((item, index) => {
    if (item[field] === fieldValue) {
      array.splice(index, 1, data)
    }
  })
}
