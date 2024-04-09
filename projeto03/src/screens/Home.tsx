import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HStack, VStack, FlatList, Heading, Text, useToast } from 'native-base';

import { api } from '@services/api';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { AppError } from '@utils/AppError';

export function Home() {
  const [groups, setGroups ] = useState<string[]>([]);
  const [exercises, setExercises ] = useState([]);
  const [groupSelected, setGroupSelected] = useState('costas');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch(error) {
      const isAppErro = error instanceof AppError;
      const title = isAppErro ? error.message : 'Não foi possível carregar os grupos musculares.'

      toast.show({
        title: title,
        bgColor: 'red.500',
        placement: 'top'
      });
    }
  }

  async function fetchExerciseByGroup(){
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      console.log(response.data);
      setGroups(response.data);

    } catch(error) {
      const isAppErro = error instanceof AppError;
      const title = isAppErro ? error.message : 'Não foi possível carregar os exercícios.'

      toast.show({
        title: title,
        bgColor: 'red.500',
        placement: 'top'
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExerciseByGroup();
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <HomeHeader/>
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Group 
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator = {false}
        _contentContainerStyle={{px: 8}}
        my={10}
        maxH={10}
        minH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Execícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <ExerciseCard 
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{paddingBottom: 20}}
        />
      </VStack>
    </VStack>
  );
}