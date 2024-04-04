import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  async function handleUserPhotoSelect() {
    await ImagePicker.launchImageLibraryAsync();
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>
      <ScrollView>
        <Center mt={6} px={10}>  
        {
          photoIsLoading ? 
            <Skeleton 
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            /> 
            :       
            <UserPhoto 
              source={{uri: 'https://github.com/savioferreira.png'}}
              size={PHOTO_SIZE}
              borderColor={'green.700'}
            />
        }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input 
            placeholder="Nome"
            bg="gray.500"
          />
          
          <Input
            bg="gray.500"
            placeholder="E-mail"
            isDisabled
            _disabled={{backgroundColor: 'gray.900'}}
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={3}>
            Alterar senha
          </Heading>
          <Input 
            bg="gray.500"
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input 
            bg="gray.500"
            placeholder="nova senha"
            secureTextEntry
          />
          <Input 
            bg="gray.500"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />
          <Button title="Atualizar" mt={4}/>
        </VStack>
      </ScrollView>
    </VStack>
  )
}