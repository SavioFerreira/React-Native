import { Container } from './styles';
import { useState } from 'react';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { FlatList, Text } from 'react-native';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  

  const listavazia = () =>  {
    return (
    <Text>
      A lista está vazia
    </Text>
    )
  }

  return (
    <Container>
      <Header />
      <Highlight
        title='Denuncias'
        subtitle='selecione uma denúncia e inicie sua verificação'
      />
      <FlatList
        ListEmptyComponent={listavazia}
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        ) }
      />
    </Container>
  );
}
