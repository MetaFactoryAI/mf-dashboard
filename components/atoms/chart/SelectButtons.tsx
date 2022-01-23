/* eslint-disable react/jsx-props-no-spreading */
import { Text, Button } from "@chakra-ui/react";
import React from "react";

export type ChartTab = {
  title: string;
  key: number;
};

const SelectButtons: React.FC<{
  selectOptions: ChartTab[];
  handleOptionClickCallback: (key: number) => void;
  selectedOption: number;
}> = ({ selectOptions, handleOptionClickCallback, selectedOption }) => {
  const handleOptionClick = (currentOptionKey: number) => {
    handleOptionClickCallback(currentOptionKey);
  };

  return (
    <>
      {selectOptions.map((currentTab: ChartTab) => (
        <Button
          _focus={{ boxShadow: "none" }}
          onClick={() => handleOptionClick(currentTab.key)}
          variant="unstyled"
          key={`yearly_bar_chart_years_buttons_${currentTab.key}`}
        >
          <Text
            px="13px"
            py="8px"
            background={currentTab.key === selectedOption ? "yellow" : "black"}
            color={currentTab.key === selectedOption ? "black" : "white"}
            key={`yearly_bar_chart_years_buttons_text_${currentTab.key}`}
            fontSize="24px"
            fontWeight="400"
          >
            {currentTab.title}
          </Text>
        </Button>
      ))}
    </>
  );
};

export default SelectButtons;
