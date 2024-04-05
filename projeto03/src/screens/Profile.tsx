import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/savioferreira.png');
  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;
      if (photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5){
          console.log(photoInfo.size / 1024 / 1024)
            return toast.show({
              title: 'Essa imagem é muito grande. Escolha uma até 5MB.',
              placement: 'top',
              bgColor: 'red.500',
            });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch(error) {
        throw error;
    } finally {
      setPhotoIsLoading(false);
    }
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
              source={{uri: userPhoto}}
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
            readOnly
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={3}>
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