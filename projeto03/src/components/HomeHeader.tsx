import { HStack, Heading, Text, VStack, Icon, IHeadingProps } from "native-base";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from "./UserPhoto";

type Props = IHeadingProps & {
    userName: string;
}

export function HomeHeader({userName}: Props){
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={{ uri: 'https://github.com/savioferreira.png' }}
        size={16} 
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          {userName}
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        /> 
      </TouchableOpacity>
    </HStack>
  )
}