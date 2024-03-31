import { Header } from '@components/Header';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Alert, FlatList } from 'react-native';
import { useState } from 'react';
import { PlayersCard } from '@components/PlayersCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useRoute } from '@react-navigation/native';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByGroup } from '@storage/player/playersGetByGroup';


type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState(['denun 1', 'denun 2']);


  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {

    if (newPlayerName.trim().length === 0){
      return Alert.alert('Novo membro', 'Informe o nome do usuário.')
    }
    const NewPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(NewPlayer, group);
      const players =  await playerGetByGroup(group);
      console.log(players);
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Novo membro', error.message)
      } else {
        console.log(error);
        Alert.alert('Novo membro', 'Nao foi possível adicionar');
      }
    }
    setNewPlayerName('');
  }
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle='nome dos componentes da coleta'
      />
      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder='Nome do membro'
          autoCorrect={false}
        />
        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={players}
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
        data={''}
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