import theme from "_src/theme/theme.yaml"
import { createSelector } from 'reselect'

export const canRenderTOCSelector = createSelector([
  state => (state.layout.windowSize || {}).width || -1,
  () => theme.mediaQueryTresholds.XL,
], (width, xl) => {
  if (typeof window === `undefined`) return false
  return width >= xl
})
