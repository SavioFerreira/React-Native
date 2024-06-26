import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm } from 'react-hook-form';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password?: string | null;
  old_password?: string | null;
  confirm_password?: string | null;
};

const ProfileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe seu email.').email('Email inválido'),
  old_password: yup.string().min(6, 'A senha não deve ser menor que 6 caracteries').nullable().transform((value) => !!value ? value : null),
  password: yup.string().min(6, 'A senha não deve ser menor que 6 caracteries').nullable().transform((value) => !!value ? value : null),
  confirm_password: yup.string().nullable().transform((value) => !!value ? value : null).oneOf([yup.ref('password'), null], 'Digite a nova senha corretamente'),
});

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const { user } = useAuth();
  const [userPhoto, setUserPhoto] = useState(user.avatar);
  const toast = useToast();
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(ProfileSchema)
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch (error) {
      throw error;
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data)
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
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
                source={{ uri: userPhoto }}
                alt="Imagem do usuário"
                size={PHOTO_SIZE}
                borderColor={'green.700'}
              />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg="gray.500"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                bg="gray.500"
                onChangeText={onChange}
                value={value}
                isDisabled
                readOnly
              />
            )}
          />

        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={3}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name='old_password'
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.500"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.500"
                placeholder="nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='confirm_password'
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.500"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />
          <Button title="Atualizar" mt={4} 
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}