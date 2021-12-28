import { useState } from "react";
import { Box, Button, Flex, HStack, Image, Input, Select, Spacer, Text, VStack } from "@chakra-ui/react";

const Swap: React.FC<{}> = () => {
    const [currency1, setCurrency1] = useState("");
    const [currency2, setCurrency2] = useState("");

    const handleCurrency1Change = (selected : string) => {
        setCurrency1(selected)
    }

    const handleCurrency2Change = (selected : string) => {
        setCurrency2(selected)
    }


    const switchCurrencies = () => {
        setCurrency1(currency2)
        setCurrency2(currency1)
    }

    return (
    <Box w="420px" h="412px">
          <VStack>
            <Text align="start">Send</Text>
            <Flex>
              <Select 
                h="50px" 
                value={currency1}
                borderRadius={0} 
                variant="unstyled" 
                onChange={(event) => handleCurrency1Change(event.target.value)}>
                    <option value='ETH'>ETH</option>
                    <option value='BTC'>BTC</option>
                    <option value='ROBOT'>ROBOT</option>
              </Select>
              <Input h="50px" placeholder={currency1} size='lg' borderRadius={0} />
            </Flex>
            <Spacer />
            <Button w="40px" h="40px" onClick={() => switchCurrencies}>
                <Image src="/swap-direction-icon.svg"/>
            </Button>
            <Spacer />
            <Text align="start">Receive</Text>
            <Flex>
              <Select 
                h="50px" 
                borderRadius={0} 
                variant="unstyled" 
                placeholder={currency2}
                onChange={(event) => handleCurrency2Change(event.target.value)}>
                    <option value='ETH'>ETH</option>
                    <option value='BTC'>BTC</option>
                    <option value='ROBOT'>ROBOT</option>
              </Select>
              <Input h="50px" placeholder={currency2} size='lg' borderRadius={0} />
            </Flex>
          </VStack>
        </Box>

    );
};

export default Swap;
