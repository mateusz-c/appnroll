import { graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AppFunctionComponent from "../types/app-function-component.interface"
import Account, {
  Organization,
  RepositoryNode,
} from "../components/account/account.component"
import Repo from "../components/repo/repo.component"
import Filters from "../components/filters/filters.component"

const RepoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  readonly data: {
    readonly github: {
      readonly organization: Organization
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
  const [languages, setLanguages] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [reposToShow, setReposToShow] = useState<RepositoryNode[]>([])

  useEffect(() => {
    getLanguages()
    getAllRepos()
  }, [])

  useEffect(() => {
    searchRepos()
  }, [selectedLanguage, searchText])

  const getLanguages = () => {
    const languagesArray = repositories.edges.map(repo => {
      return repo.node.primaryLanguage.name
    })
    const languagesArrayUnique = languagesArray.filter(
      (v, i) => languagesArray.indexOf(v) === i
    )
    setLanguages(languagesArrayUnique)
  }

  const getAllRepos = () => {
    setReposToShow(repositories.edges)
  }

  const searchRepos = () => {
    if (searchText || selectedLanguage) {
      setReposToShow(
        repositories.edges.filter(repo => {
          const includesLanguage = selectedLanguage
            ? repo.node.primaryLanguage.name ===
              languages[parseInt(selectedLanguage)]
            : true
          const includesText = repo.node.name
            .toLowerCase()
            .includes(searchText.toLowerCase())

          return includesLanguage && includesText
        })
      )
    } else {
      getAllRepos()
    }
  }

  const languageChange = (optionValue: string) => {
    setSelectedLanguage(optionValue)
  }

  const searchChange = (searchText: string) => {
    setSearchText(searchText)
  }

  const clearFilters = () => {
    setSelectedLanguage("")
    setSearchText("")
  }

  return (
    <Layout>
      <SEO title="Home" />

      <Account organization={organization} />
      <Filters
        languages={languages}
        selectedLanguage={selectedLanguage}
        languageChange={languageChange}
        searchText={searchText}
        searchChange={searchChange}
        clearFilters={clearFilters}
      />
      <RepoWrapper>
        {reposToShow.length > 0
          ? reposToShow.map(repo => (
              <Repo repo={repo.node} login={organization.login} />
            ))
          : "No repositories found"}
      </RepoWrapper>
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
        websiteUrl
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
