import React, { useState, useEffect } from "react"
import AppFunctionComponent from "../../types/app-function-component.interface"
import styled, { CSSObject } from "styled-components"
import StarsIcon from "../../images/star.svg"
import PersonIcon from "../../images/person.svg"
import ForkIcon from "../../images/forks.svg"
import ExternalLinkIcon from "../../images/external_link.svg"
import AddIcon from "../../images/add.svg"
import CheckIcon from "../../images/check.svg"

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
  readonly login: string
}

interface RepoLangColorProps {
  langColor: CSSObject
}

const RepoBox = styled.div`
  border: 1px solid #e3e5e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 349px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  width: calc(100% / 3 - 10px);

  :not(:nth-of-type(3n)) {
    margin-right: 15px;
  }
`

const RepoMain = styled.div`
  background: #fff;
  flex: 1;
  padding: 39px 33px;
  position: relative;

  &::before {
    background-color: ${(props: RepoLangColorProps) =>
      props.langColor || "transparent"};
    content: "";
    height: 6px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

const RepoName = styled.div`
  color: #243c56;
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 16px;
  padding-right: 40px;
`

const RepoDescription = styled.p`
  color: #7d8ca1;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 0;
`

const RepoLikeButton = styled.button`
  align-items: center;
  background: #0062ff;
  border: 0;
  cursor: pointer;
  display: flex;
  height: 32px;
  justify-content: center;
  opacity: 1;
  position: absolute;
  right: 33px;
  top: 39px;
  transition: opacity 0.3s;
  width: 32px;

  &:hover {
    opacity: 0.85;
  }
`

const RepoBottom = styled.div`
  align-items: center;
  background: rgba(39, 124, 220, 0.04);
  color: #243c56;
  display: flex;
  flex-shrink: 0;
  font-size: 12px;
  height: 86px;
  justify-content: space-between;
  letter-spacing: 0.32px;
  padding: 35px 30px;
`

const RepoLang = styled.div`
  align-items: center;
  display: flex;

  &::before {
    background-color: ${(props: RepoLangColorProps) =>
      props.langColor || "transparent"};
    border-radius: 50%;
    content: "";
    display: inline-block;
    height: 16px;
    margin-right: 4px;
    width: 16px;
  }
`

const RepoInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-top: 1px;
`

const RepoInfoItem = styled.div`
  align-items: center;
  display: flex;
  margin-left: 28px;

  svg {
    margin-right: 8px;
    margin-top: -1px; // visual fix to make vertital align correct
  }
`

const StyledLink = styled.a`
  align-items: center;
  color: #0062ff;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.16px;
  line-height: 18px;
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
    id,
    description,
    name,
    primaryLanguage,
    forkCount,
    url,
    watchers,
    stargazers,
  },
}) => {
  const [isLiked, setLiked] = useState(false)

  useEffect(() => {
    const likedRepos = getLikedRepos()
    if (likedRepos.indexOf(id) >= 0) {
      setLiked(true)
    }
  }, [])

  useEffect(() => {
    const likedRepos = getLikedRepos()
    if (isLiked) {
      localStorage.setItem("likedRepos", JSON.stringify([...likedRepos, id]))
    } else {
      localStorage.setItem(
        "likedRepos",
        JSON.stringify(likedRepos.filter((itemId: string) => itemId !== id))
      )
    }
  }, [isLiked])

  const getLikedRepos = () => {
    return JSON.parse(localStorage.getItem("likedRepos") || "[]")
  }

  const toggleLike = () => {
    setLiked(!isLiked)
  }

  return (
    <RepoBox>
      <RepoMain langColor={primaryLanguage.color}>
        <RepoName>{name}</RepoName>
        <StyledLink href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLinkIcon />
          {login}/{name}
        </StyledLink>
        <RepoDescription>{description}</RepoDescription>
        <RepoLikeButton onClick={toggleLike}>
          {isLiked ? <CheckIcon /> : <AddIcon />}
        </RepoLikeButton>
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
