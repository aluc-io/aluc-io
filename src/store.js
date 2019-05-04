import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

/*
 * action types
 */

const SET_NAVIGATOR_POSITION = "SET_NAVIGATOR_POSITION"
const SET_NAVIGATOR_SHAPE = "SET_NAVIGATOR_SHAPE"
const SET_NAVIGATOR_FILTER = "SET_NAVIGATOR_FILTER"
const SET_SCROLL_TO_TOP = "SET_SCROLL_TO_TOP"
const SET_FONT_SIZE_INCREASE = "SET_FONT_SIZE_INCREASE"
const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER"
const SET_WINDOW_SIZE = "SET_WINDOW_SIZE"
const SET_SHOW_LAYOUT = "SET_SHOW_LAYOUT"

/*
 * action creators
 */

export function setNavigatorPosition(val) {
  return { type: SET_NAVIGATOR_POSITION, val }
}

export function setNavigatorShape(val) {
  return { type: SET_NAVIGATOR_SHAPE, val }
}

export function setNavigatorFilter(val) {
  return { type: SET_NAVIGATOR_FILTER, val }
}

export function setWindowSize(val) {
  return { type: SET_WINDOW_SIZE, val }
}

export function setScrollToTop(val) {
  return { type: SET_SCROLL_TO_TOP, val }
}

export function setFontSizeIncrease(val) {
  return { type: SET_FONT_SIZE_INCREASE, val }
}

export function setCategoryFilter(val) {
  return { type: SET_CATEGORY_FILTER, val }
}

/*
 * reducer
 */
const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAVIGATOR_POSITION:
      return { ...state, navigatorPosition: action.val }
    case SET_NAVIGATOR_SHAPE:
      return { ...state, navigatorShape: action.val }
    case SET_NAVIGATOR_FILTER:
      return { ...state, navigatorFilter: action.val }
    case SET_SCROLL_TO_TOP:
      return { ...state, scrollToTop: action.val }
    case SET_FONT_SIZE_INCREASE:
      return { ...state, fontSizeIncrease: action.val }
    case SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.val }
    default:
      return state
  }
}

const initialLayout = {
  windowSize: { width: -1, height: -1 },
  showLayout: false,
}
const layoutReducer = (state=initialLayout ,action) => {
  switch (action.type) {
    case SET_WINDOW_SIZE:
      return { ...state, windowSize: action.val }
    case SET_SHOW_LAYOUT:
      return { ...state, showLayout: action.val }
    default:
      return state
  }
}

export function setShowLayout(val) {
  return { type: SET_SHOW_LAYOUT, val }
}

const initialState = {
  navigatorPosition: "is-aside",
  navigatorShape: "open",
  navigatorFilter: "",
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: "all posts",
}

const createStore = () => {
  const cReducer = combineReducers({
    layout: layoutReducer,
  })

  return reduxCreateStore(cReducer, void 0, composeWithDevTools(applyMiddleware()))
}

export default createStore

