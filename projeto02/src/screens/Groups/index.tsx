import { Container } from './styles';
import { useState } from 'react';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Pamonha frita', 'rabanete']);

  return (
    <Container>
      <Header />
      <Highlight
        title='Denuncias'
        subtitle='selecione uma denúncia e inicie sua verificação'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={(
          <ListEmpty
            message="Nenhuma denúncia disponível"/>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button  title="Iniciar Coleta"/>
    </Container>
  );
}
