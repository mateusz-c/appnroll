/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactChild } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import theme from "../theming/theme"
import GlobalStyle from "./global-style.component"

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 1190px;
  padding: 0 1.0875rem 1.45rem;
`

const Layout = ({ children }: { children: ReactChild | ReactChild[] }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <GlobalStyle />
        <ContentWrapper>
          <main>{children}</main>
        </ContentWrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout
