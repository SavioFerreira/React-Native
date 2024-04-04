import { useState } from 'react';
import { HStack, VStack, FlatList, Heading, Text } from 'native-base';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [groups, setGroups ] = useState(['costas', 'Bíceps', 'trípiCePs', 'ombro']);
  const [exercises, setExercises ] = useState(['remada', 'teste', 'outro', 'remas']);
  const [groupSelected, setGroupSelected] = useState('costas');
    return (
        <VStack flex={1}>
          <HomeHeader userName="Sávio Fc"/>
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
          />
          <VStack flex={1} px={8}>
            <HStack justifyContent="space-between" mb={5}>
              <Heading color="gray.200" fontSize="md">
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
                <ExerciseCard />
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{paddingBottom: 20}}
            />
          </VStack>
        </VStack>
    )
}