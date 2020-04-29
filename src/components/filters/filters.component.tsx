import React from "react"
import AppFunctionComponent from "../../types/app-function-component.interface"
import styled from "styled-components"

interface Props {
  readonly languages: string[]
  readonly searchText: string
  readonly selectedLanguage: string
  languageChange(optionValue: string): void
  searchChange(searchText: string): void
  clearFilters(): void
}

interface FieldWrapperProps {
  selected?: string
}

const FiltersWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 40px;
`

const FieldWrapper = styled.div`
  height: 40px;
  margin-right: 10px;

  select,
  input {
    background: #fff;
    border: 1px solid #b9c6e0;
    border-radius: 2px;
    box-shadow: 0;
    font-size: 14px;
    height: 100%;
    letter-spacing: 0.16px;
    line-height: 18px;
    padding: 0 15px;
    transition: box-shadow 0.3s;

    &:focus {
      box-shadow: 0 4px 10px 0 rgba(189, 199, 222, 0.23);
    }
  }

  select {
    width: 275px;
    color: ${(props: FieldWrapperProps) =>
      props.selected ? "#000" : "#818fa3"};
  }

  input {
    width: 225px;

    &::placeholder {
      color: #818fa3;
    }
  }
`

const ClearButton = styled.button`
  background: #0062ff;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.16px;
  line-height: 18px;
  opacity: 1;
  padding: 11px 16px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.85;
  }
`

const Filters: AppFunctionComponent<Props> = ({
  languages,
  languageChange,
  searchChange,
  searchText,
  selectedLanguage,
  clearFilters,
}) => {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchChange(e.target.value)
  }

  const languageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    languageChange(e.target.value)
  }

  return (
    <FiltersWrapper>
      <FieldWrapper>
        <input
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={searchHandler}
        />
      </FieldWrapper>
      <FieldWrapper selected={selectedLanguage}>
        {/* tslint:disable-next-line:react-a11y-no-onchange */}
        <select value={selectedLanguage} onChange={languageChangeHandler}>
          <option value="" disabled hidden role="option" aria-selected={false}>
            Select language
          </option>

          {languages.map((language, i) => (
            <option
              key={language}
              value={i}
              role="option"
              aria-selected={i.toString() === selectedLanguage}
            >
              {language}
            </option>
          ))}
        </select>
      </FieldWrapper>
      <ClearButton onClick={clearFilters}>Clear filters</ClearButton>
    </FiltersWrapper>
  )
}

export default Filters
