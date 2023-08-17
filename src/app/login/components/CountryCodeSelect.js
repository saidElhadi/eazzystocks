// 'use client'
import React, { Children } from "react";
import Select from "react-select";
import styled from "styled-components";

export const CountryCodeSelect = ({
  setSelectedCountryCode,
  selectedCountryCode,
}) => {
  const handleChange = (selectedOption) => {
    setSelectedCountryCode(selectedOption.value);
  };

  return (
    <CountrySelectWrapper>
      <Select
        options={countryOptions}
        onChange={handleChange}
        placeholder="Select country"
      />
    </CountrySelectWrapper>
  );
};
const countryOptions = [
  { value: "+213", label: "DZA" },
  { value: "+86", label: "CHN" },
  { value: "+852", label: "HKG" },
  { value: "+1", label: "USA" },
  { value: "+7", label: "RUS" },
  { value: "+81", label: "JPN" },
  { value: "+82", label: "KOR" },
  { value: "+91", label: "IND" },
];

const CountrySelectWrapper = styled.div`
  width: 50%;
  display:flex
`;
