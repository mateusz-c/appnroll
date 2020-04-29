import React from "react"
import AppFunctionComponent from "../../types/app-function-component.interface"
import styled from "styled-components"

interface Props {
  organization: {}
}

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AccountImage = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 5px;
`

const AccountInfoWrapper = styled.div``

const AccountName = styled.h1`
  font-size: 20px;
  color: #243c56;
`

const AccountSubname = styled.h3`
  font-size: 14px;
  color: #818fa3;
  letter-spacing: 0.16px;
  line-height: 18px;
`

const AccountInfo = styled.span`
  font-size: 14px;
  color: #243c56;
  letter-spacing: 0.16px;
  line-height: 18px;
`

const Account: AppFunctionComponent<Props> = (
  {
    //   currentYear = new Date().getFullYear(),
  }
) => {
  return (
    <AccountWrapper>
      <AccountImage />
      <AccountInfoWrapper>
        <AccountName>App’n’roll’s repositories</AccountName>
        <AccountSubname>We rock IT!</AccountSubname>
        <div>
          <AccountInfo>Warsaw, PL</AccountInfo>
          <AccountInfo>http://appnroll.com</AccountInfo>
        </div>
      </AccountInfoWrapper>
    </AccountWrapper>
  )
}

export default Account
