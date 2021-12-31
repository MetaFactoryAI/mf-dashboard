import { Center, Text } from "@chakra-ui/react";
import { FC } from "react";


const MFAbout: FC<{}> = () => {
    return (
        <Center w="660px">
            <Text margin={10} fontSize={12}>
                MetaFactory is a community-owned culture studio and marketplace focused on the creation and sale of digi-physical goods that celebrate crypto. Artists of all types are invited to create products that promote their art, community, project, protocol, token, etc. We abstract away all the production and logistics with our network of fashion houses and production partners in California and Sweden, so creators can focus on their craft while MetaFactory facilitates creation, fulfillment, sales and support.
            </Text>
        </Center>
    )

}

export default MFAbout;