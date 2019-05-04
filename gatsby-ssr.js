import React from "react"
import flush from "styled-jsx/server"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"

import theme from '_src/theme/theme.yaml'
import createStore from "./src/store";

require("dotenv").config();

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = createStore()

  const ConnectedBody = () => (
    <Provider store={store}>{bodyComponent}</Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody/>))
}

export const onRenderBody = ({ setPostBodyComponents, setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    const css = flush();

    setHeadComponents([css]);
  }
}
