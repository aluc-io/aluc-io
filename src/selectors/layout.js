import theme from "_src/theme/theme.yaml"
import { createSelector } from 'reselect'

export const isWideScreenSelector = createSelector(
  state => (state.layout.windowSize || {}).width || -1,
  () => theme.mediaQueryTresholds.L,
  (width, mediaQueryL) => {
    if (typeof window === `undefined`) {
      return false
    }
    return width >= mediaQueryL
  }
)

export const canRenderTOCSelector = createSelector(
  state => (state.layout.windowSize || {}).width || -1,
  () => theme.mediaQueryTresholds.L,
  (width, mediaQueryL) => {
    if (typeof window === `undefined`) {
      return false
    }
    return width >= mediaQueryL
  }
)
