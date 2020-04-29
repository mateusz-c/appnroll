import { graphql } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import React from "react"
import styled, { CSSObject } from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AppFunctionComponent from "../types/app-function-component.interface"
import Account from "../components/account/account.component"
import Repo, { RepoNode } from "../components/repo/repo.component"

const Content = styled.div`
  max-width: 300px;
  margin-bottom: 1.45rem;
`

const RepoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface RepositoryNode {
  readonly node: RepoNode
}

interface Props {
  readonly data: {
    readonly github: {
      readonly organization: {
        readonly name: string
        readonly avatarUrl: string
        readonly description: string
        readonly email: string
        readonly location: string
        readonly login: string
        readonly url: string
        readonly repositories: {
          edges: RepositoryNode[]
        }
      }
    }
  }
}

const IndexPage: AppFunctionComponent<Props> = ({
  data: {
    github: {
      organization,
      organization: { repositories },
    },
  },
}) => {
  console.log(organization)
  return (
    <Layout>
      <SEO title="Home" />

      <Account organization={organization} />
      <RepoWrapper>
        {repositories.edges.map(repo => (
          <Repo repo={repo.node} login={organization.login} />
        ))}
      </RepoWrapper>

      {/* <Content>
      <Image fluid={fluid} />
    </Content> */}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    github {
      organization(login: "appnroll") {
        name
        login
        avatarUrl(size: 80)
        description
        email
        location
        url
        repositories(first: 100) {
          edges {
            node {
              description
              id
              name
              forkCount
              url
              watchers {
                totalCount
              }
              stargazers {
                totalCount
              }
              primaryLanguage {
                color
                name
              }
            }
          }
        }
      }
    }
  }
`

// export const query = graphql`
//   query {
//     placeholderImage: file(relativePath: { eq: "appnroll.png" }) {
//       childImageSharp {
//         fluid(maxWidth: 300) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `
