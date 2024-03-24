import { Header } from '@components/Header';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { PlayersCard } from '@components/PlayersCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useRoute } from '@react-navigation/native';


type RouteParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState(['']);

  const route = useRoute();
  const { group } = route.params as RouteParams;
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title='Denúncias Groups'
        subtitle='nome dos componentes da coleta coletiva'
      />
      <Form>
        <Input
          placeholder='Nome do membro'
          autoCorrect={false}
        />
        <ButtonIcon
          icon='add'
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['coleta 01', 'coleta 02', 'coleta 03']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item} 
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
         /> 
         <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayersCard 
            name={item}
            onRemove={() => {}} 
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message='Não há pessoas na coleta'
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom : 100 }, players.length === 0 && { flex: 1 }]}
      />
      <Button 
        title='Remover membro'
        type='SECONDARY'
      />  
    </Container>
  );
}