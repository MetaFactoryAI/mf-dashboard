/* eslint-disable react/jsx-props-no-spreading */
import { Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";

// @ts-ignore
const SelectButtons: React.FC = ({ selectOptions, handleOptionClickCallback, defaultOption }) => {
  const [option, setOption] = useState<number>(defaultOption);
  const handleOptionClick = (currentOption: number) => {
    setOption(currentOption);
    handleOptionClickCallback(currentOption);
  };

  // @ts-ignore
  return selectOptions.map((currentOption) => (
    <Button
      _focus={{ boxShadow: "none" }}
      onClick={() => handleOptionClick(currentOption)}
      variant="unstyled"
      key={`yearly_bar_chart_years_buttons_${currentOption}`}
    >
      <Text
        px="13px"
        py="8px"
        background={currentOption === option ? "yellow" : "black"}
        color={currentOption === option ? "black" : "white"}
        key={`yearly_bar_chart_years_buttons_text_${currentOption}`}
      >
        {currentOption}
      </Text>
    </Button>
  ));
};

export default SelectButtons;
