import React from "react"
import AppFunctionComponent from "../../types/app-function-component.interface"
import styled from "styled-components"
import { RepoNode } from "../repo/repo.component"
import LinkIcon from "../../images/link.svg"
import LocationIcon from "../../images/location.svg"

export interface RepositoryNode {
  readonly node: RepoNode
}

export interface Organization {
  readonly name: string
  readonly avatarUrl: string
  readonly description: string
  readonly email: string
  readonly location: string
  readonly login: string
  readonly websiteUrl: string
  readonly repositories: {
    edges: RepositoryNode[]
  }
}

interface Props {
  organization: Organization
}

const AccountWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 40px;
  margin-top: 70px;
`

const AccountImage = styled.div`
  align-items: center;
  background: #0f1436;
  border: 1px solid #e3e5e8;
  border-radius: 5px;
  display: flex;
  height: 102px;
  justify-content: center;
  margin-right: 21px;
  width: 102px;
`

const AccountName = styled.h1`
  color: #243c56;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  margin: 0 0 8px;
`

const AccountSubname = styled.h3`
  color: #818fa3;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 1;
  font-weight: 400;
  margin: 0 0 8px;
`

const AccountData = styled.div`
  display: flex;
`

const AccountInfo = styled.span`
  align-items: center;
  color: #243c56;
  display: flex;
  font-size: 14px;
  letter-spacing: 0.16px;
  line-height: 18px;
  margin-right: 24px;

  svg {
    margin-right: 4px;
  }
`

const StyledLink = styled.a`
  color: #243c56;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.16px;
  line-height: 18px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Account: AppFunctionComponent<Props> = ({
  organization: { name, avatarUrl, description, location, websiteUrl },
}) => {
  return (
    <AccountWrapper>
      <AccountImage>
        <img src={avatarUrl} alt={`${name} avatar`} />
      </AccountImage>
      <div>
        <AccountName>{name}’s repositories</AccountName>
        <AccountSubname>{description}</AccountSubname>
        <AccountData>
          <AccountInfo>
            <LocationIcon />
            {location}
          </AccountInfo>
          <AccountInfo>
            <LinkIcon />
            <StyledLink
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {websiteUrl}
            </StyledLink>
          </AccountInfo>
        </AccountData>
      </div>
    </AccountWrapper>
  )
}

export default Account
