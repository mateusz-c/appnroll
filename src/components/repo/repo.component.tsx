import React from "react"
import AppFunctionComponent from "../../types/app-function-component.interface"
import styled, { CSSObject } from "styled-components"
import StarsIcon from "../../images/star.svg"
import PersonIcon from "../../images/person.svg"
import ForkIcon from "../../images/forks.svg"
import LinkIcon from "../../images/external_link.svg"

export interface RepoNode {
  readonly description: string
  readonly id: string
  readonly name: string
  readonly forkCount: number
  readonly url: string
  readonly primaryLanguage: {
    readonly color: CSSObject
    readonly name: string
  }
  readonly watchers: {
    totalCount: number
  }
  readonly stargazers: {
    totalCount: number
  }
}

interface Props {
  readonly repo: RepoNode
  readonly login: String
}
interface RepoLangColorProps {
  langColor: CSSObject
}

const RepoBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: calc(100% / 3 - 10px);
  margin-bottom: 15px;
  height: 349px;
  border: 1px solid #e3e5e8;
  border-radius: 5px;

  :not(:nth-of-type(3n)) {
    margin-right: 15px;
  }
`

const RepoMain = styled.div`
  background: #ffffff;
  padding: 39px 33px;
  flex: 1;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: ${(props: RepoLangColorProps) =>
      props.langColor || "transparent"};
  }
`

const RepoName = styled.div`
  font-size: 24px;
  color: #243c56;
  letter-spacing: 0;
  line-height: 1.5;
  margin-bottom: 16px;
`

const RepoDescription = styled.p`
  font-size: 16px;
  color: #7d8ca1;
  line-height: 24px;
  margin-bottom: 0;
`

const RepoBottom = styled.div`
  height: 86px;
  flex-shrink: 0;
  background: rgba(39, 124, 220, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 35px 30px;
  font-size: 12px;
  color: #243c56;
  letter-spacing: 0.32px;
`

const RepoLang = styled.div`
  display: flex;
  align-items: center;

  ::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: ${(props: RepoLangColorProps) =>
      props.langColor || "transparent"};
    border-radius: 50%;
    margin-right: 4px;
  }
`

const RepoInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 1px;
`

const RepoInfoItem = styled.div`
  margin-left: 28px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    margin-top: -1px; // visual fix to make vertital align correct
  }
`

const StyledLink = styled.a`
  font-size: 14px;
  color: #0062ff;
  letter-spacing: 0.16px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    margin-right: 10px;
  }

  &:hover {
    text-decoration: underline;
  }
`

const Repo: AppFunctionComponent<Props> = ({
  login,
  repo: {
    description,
    name,
    primaryLanguage,
    forkCount,
    url,
    watchers,
    stargazers,
  },
}) => {
  return (
    <RepoBox>
      <RepoMain langColor={primaryLanguage.color}>
        <RepoName>{name}</RepoName>
        <StyledLink href={url} target="_blank" rel="noopener noreferrer">
          <LinkIcon />
          {login}/{name}
        </StyledLink>
        <RepoDescription>{description}</RepoDescription>
      </RepoMain>

      <RepoBottom>
        <RepoLang langColor={primaryLanguage.color}>
          {primaryLanguage.name}
        </RepoLang>
        <RepoInfo>
          <RepoInfoItem>
            <StarsIcon /> {forkCount}
          </RepoInfoItem>
          <RepoInfoItem>
            <PersonIcon /> {watchers.totalCount}
          </RepoInfoItem>
          <RepoInfoItem>
            <ForkIcon /> {stargazers.totalCount}
          </RepoInfoItem>
        </RepoInfo>
      </RepoBottom>
    </RepoBox>
  )
}

export default Repo
