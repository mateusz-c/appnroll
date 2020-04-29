import React from "react"
import AppFunctionComponent from "../../types/app-function-component.interface"
import styled from "styled-components"
import { RepoNode } from "../repo/repo.component"
import LinkIcon from "../../images/link.svg"
import LocationIcon from "../../images/location.svg"

interface RepositoryNode {
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
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 70px;
`

const AccountImage = styled.div`
  height: 102px;
  width: 102px;
  border-radius: 5px;
  background: #0f1436;
  border: 1px solid #e3e5e8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 21px;
`

const AccountInfoWrapper = styled.div``

const AccountName = styled.h1`
  font-size: 20px;
  line-height: 1;
  color: #243c56;
  margin: 0 0 8px;
  font-weight: 500;
`

const AccountSubname = styled.h3`
  font-size: 14px;
  color: #818fa3;
  line-height: 1;
  letter-spacing: 0.16px;
  line-height: 18px;
  font-weight: 400;
  margin: 0 0 8px;
  font-weight: 300;
`
const AccountData = styled.div`
  display: flex;
`

const AccountInfo = styled.span`
  font-size: 14px;
  color: #243c56;
  letter-spacing: 0.16px;
  line-height: 18px;
  margin-right: 24px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`

const StyledLink = styled.a`
  font-size: 14px;
  color: #243c56;
  letter-spacing: 0.16px;
  line-height: 18px;
  text-decoration: none;
  font-weight: 400;

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
        <img src={avatarUrl} />
      </AccountImage>
      <AccountInfoWrapper>
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
      </AccountInfoWrapper>
    </AccountWrapper>
  )
}

export default Account
