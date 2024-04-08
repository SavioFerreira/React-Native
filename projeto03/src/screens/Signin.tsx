import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { api } from '@services/api'

import LogoSvg from '@assets/logo.svg'
import  BackgroundImg  from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.'),
});

export function SignIn() {
  const [isLoading, setIsloading] = useState(false);

  const { singIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } }  = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  });

  async function handleSignIn({email, password}: FormData) {
    try {
      setIsloading(true);
      await singIn(email, password);
      
    } catch(error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível acessar sua conta. Tente novamente mais tarde.'
      
      setIsloading(false);

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16}>
        <Image 
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading  color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          >
          </Controller>
          
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Senha" 
                secureTextEntry
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          >
          </Controller>
          <Button title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text 
            color="gray.100" 
            fontSize="sm" mb={3} 
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button 
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
        
      </VStack>
    </ScrollView>
  );
}