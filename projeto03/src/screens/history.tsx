import { Heading, VStack, SectionList } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { useState } from 'react';

export function History() {
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
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
      />
    </VStack>
    )
}