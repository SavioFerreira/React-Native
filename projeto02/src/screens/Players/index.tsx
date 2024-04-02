import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

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
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('denun 1');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0){
      return Alert.alert('Novo membro', 'Informe o nome do usuário.')
    } Alert.alert('Usuário adicionado', `Usuário ${newPlayerName} foi adicionado com sucesso!`)
    
    const NewPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(NewPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
      
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Novo membro', error.message)
      } else {
        console.log(error);
        Alert.alert('Novo membro', 'Nao foi possível adicionar');
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try{
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch(error){
      Alert.alert('Remover membro', 'Não foi possível remover o membro');
      throw error;
    }
  }

  async function groupRemove(){
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch(error) {
      throw error;
    }
  }

  async function handleGroupRemove(){
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]
    );
  }

  async function fetchPlayersByTeam(){
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      
    } catch(error) {
      console.log(error);
      Alert.alert("Não foi possível carregar os membros")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle='nome dos componentes da coleta'
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder='Nome do membro'
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon='add'
          onPress={() => {
            handleAddPlayer()
          }}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['denun 1', 'denun 2']}
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
      {
        isLoading ? <Loading /> :
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayersCard
                name={item.name}
                onRemove={() => { handlePlayerRemove(item.name) }}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty
                message='Não há pessoas na coleta'
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
          />
      }
      <Button 
        title='Remover denunica'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />  
    </Container>
  );
}