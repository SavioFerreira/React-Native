import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayersCard } from '@components/PlayersCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { AppError } from '@utils/AppError';

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [team, setTeam] = useState('denis 1');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);


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

  async function fetchPlayersByTeam(){
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {

  }, []);

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
          data={team}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayersCard 
            name={item.name}
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