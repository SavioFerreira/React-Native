import { useCallback, useEffect, useState } from 'react';
import { Heading, VStack, SectionList, Text, useToast } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { useFocusEffect } from '@react-navigation/native';

export function History() {
  const [ isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([
    {
      title: "04.04.24",
      data: ["puxada frontal", "Remada unilateral"]
    },
    {
      title: "04.04.24",
      data: ["puxada frontal"]
    }
  ])

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');
      console.log(response.data)

    }  catch (error) {
      console.log(" Erro ==> " + error)
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico';
     
      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  )


  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={[].length === 0 && {flex: 1, justifyContent: 'center'}}
        ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
    )
}