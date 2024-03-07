import { Container } from './styles';
import { useState } from 'react';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from 'react-native';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Pamonha Frita', 'Correria', 'Propraroxitona']);

  return (
    <Container>
      <Header />
      <Highlight
        title='O senhor dos Aneis'
        subtitle='lá ele, só se for o seu'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
      />
    </Container>
  );
}
