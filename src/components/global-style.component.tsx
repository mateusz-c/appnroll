import { createGlobalStyle } from "styled-components"
import { Theme } from "../theming/theme"
import { textColor } from "../theming/theme-getters"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body  {
    font-family: 'Quicksand', sans-serif;
    line-height: 1.5;
    color: ${textColor("primary")}
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`

export default GlobalStyle
