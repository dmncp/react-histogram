export const getOuterHeight = (element?: Element | null): number | undefined => {
  if (!element) {
    return undefined
  }

  const list = ['margin-top', 'margin-bottom', 'border-top', 'border-bottom', 'padding-top', 'padding-bottom', 'height']
  const style = window.getComputedStyle(element)

  return list.map((k) => parseInt(style.getPropertyValue(k), 10)).reduce((prev, cur) => prev + cur)
}
